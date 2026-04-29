import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import https from "https";

const FAPSHI_API_URL = process.env.FAPSHI_API_URL || "https://live.fapshi.com";
const FAPSHI_API_KEY = process.env.FAPSHI_API_KEY;
const FAPSHI_API_USER = process.env.FAPSHI_API_USER;

/**
 * Check payment status directly from Fapshi's API.
 * Used as a fallback if the webhook hasn't arrived yet.
 */
async function checkFapshiStatus(transId: string): Promise<string | null> {
  if (!transId || !FAPSHI_API_KEY || !FAPSHI_API_USER) return null;

  return new Promise((resolve) => {
    const url = new URL(`${FAPSHI_API_URL}/payment-status/${transId}`);
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname,
      method: "GET",
      headers: {
        apiuser: String(FAPSHI_API_USER),
        apikey: String(FAPSHI_API_KEY),
      },
      family: 4,
    };

    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (d) => { body += d; });
      res.on("end", () => {
        try {
          const data = JSON.parse(body);
          resolve(data.status ?? null);
        } catch {
          resolve(null);
        }
      });
    });

    req.on("error", () => resolve(null));
    req.end();
  });
}

/**
 * GET /api/orders/:id
 *
 * Returns order payment status from the DB.
 * If the order still shows "pending" but has a fapshiTransId, 
 * also checks Fapshi's API directly as a fallback (in case the webhook hasn't
 * arrived yet) and syncs the DB if Fapshi reports a terminal status.
 *
 * The browser polls this endpoint every few seconds after checkout.
 * API keys are NEVER sent to the browser — only this server calls Fapshi.
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {

    // @ts-ignore
    const order = await prisma.order.findUnique({
      where: { id },
      select: {
        id: true,
        paymentStatus: true,
        status: true,
        totalAmount: true,
        customerName: true,
        fapshiTransId: true,
      },
    });

    if (!order) {
      return NextResponse.json({ ok: false, error: "Order not found" }, { status: 404 });
    }

    // If payment is already settled in our DB → return immediately
    if (order.paymentStatus !== "pending") {
      return NextResponse.json({ ok: true, order });
    }

    // --- Fallback: Still pending locally — check Fapshi directly ---
    // This handles the case where Fapshi's webhook was delayed or missed.
    if (order.fapshiTransId) {
      const fapshiStatus = await checkFapshiStatus(order.fapshiTransId);

      if (fapshiStatus === "SUCCESSFUL") {
        // @ts-ignore
        await prisma.order.update({
          where: { id },
          data: { paymentStatus: "paid", status: "confirmed" },
        });
        return NextResponse.json({
          ok: true,
          order: { ...order, paymentStatus: "paid", status: "confirmed" },
        });
      }

      if (fapshiStatus === "FAILED" || fapshiStatus === "EXPIRED") {
        // @ts-ignore
        await prisma.order.update({
          where: { id },
          data: { paymentStatus: "failed" },
        });
        return NextResponse.json({
          ok: true,
          order: { ...order, paymentStatus: "failed" },
        });
      }

      // PENDING or CREATED — still in progress, return current state
      return NextResponse.json({
        ok: true,
        order: { ...order, fapshiLiveStatus: fapshiStatus },
      });
    }

    return NextResponse.json({ ok: true, order });

  } catch (e: any) {
    console.error(`[GET /api/orders/${id}] Error:`, e);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
