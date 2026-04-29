import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import https from "https";

const FAPSHI_API_URL = process.env.FAPSHI_API_URL;
const FAPSHI_API_KEY = process.env.FAPSHI_API_KEY;
const FAPSHI_API_USER = process.env.FAPSHI_API_USER;

/**
 * Verify the claimed payment status directly against Fapshi's API.
 * This prevents forged webhook requests from falsely marking orders as paid.
 * SECURITY: We never trust the webhook payload alone.
 */
async function verifyWithFapshi(transId: string): Promise<{
  status: string;
  externalId: string | null;
  amount: number;
  dateConfirmed: string | null;
} | null> {
  if (!FAPSHI_API_KEY || !FAPSHI_API_USER || !transId) return null;

  return new Promise((resolve) => {
    const url = new URL(`${FAPSHI_API_URL}/payment-status/${transId}`);
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname,
      method: "GET",
      headers: {
        "apiuser": String(FAPSHI_API_USER),
        "apikey": String(FAPSHI_API_KEY),
      },
      family: 4, // Force IPv4
    };

    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (d) => { body += d; });
      res.on("end", () => {
        try {
          const data = JSON.parse(body);
          resolve({
            status: data.status,
            externalId: data.externalId ?? null,
            amount: data.amount,
            dateConfirmed: data.dateConfirmed ?? null,
          });
        } catch {
          console.error("[Fapshi Verify] Non-JSON response:", body.substring(0, 200));
          resolve(null);
        }
      });
    });

    req.on("error", (e) => {
      console.error("[Fapshi Verify] HTTPS error:", e);
      resolve(null);
    });
    req.end();
  });
}

/**
 * Fapshi Webhook Handler
 *
 * Security Model:
 * 1. Receive webhook from Fapshi (POST)
 * 2. VERIFY the status by calling Fapshi's own /payment-status/{transId} API
 *    — this prevents forged payloads from falsely marking orders as paid
 * 3. Idempotency: if the order is already "paid", skip silently
 * 4. Update DB only after server-side verification passes
 *
 * Fapshi sends ONE webhook per event. We respond quickly with 200 to avoid timeouts.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { transId, externalId } = body;

    // Basic validation
    if (!transId || !externalId) {
      console.warn("[Webhook] Missing transId or externalId in payload:", body);
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    console.log(`[Webhook] Received for order=${externalId}, transId=${transId}`);

    // STEP 1: Verify with Fapshi's own API — never trust the webhook payload alone
    const verified = await verifyWithFapshi(transId);

    if (!verified) {
      console.error(`[Webhook] Could not verify transId=${transId} with Fapshi. Rejecting.`);
      // Respond 200 to avoid Fapshi retrying; log internally
      return NextResponse.json({ ok: true, note: "Could not verify. Logged for review." });
    }

    if (verified.externalId && verified.externalId !== externalId) {
      console.error(`[Webhook] externalId mismatch: claimed=${externalId}, verified=${verified.externalId}`);
      return NextResponse.json({ ok: false, error: "Transaction mismatch" }, { status: 400 });
    }

    const fapshiStatus = verified.status; // "SUCCESSFUL" | "FAILED" | "EXPIRED" | "PENDING" | "CREATED"

    // Only act on terminal states
    if (!["SUCCESSFUL", "FAILED", "EXPIRED"].includes(fapshiStatus)) {
      console.log(`[Webhook] Status is non-terminal (${fapshiStatus}). No DB update needed.`);
      return NextResponse.json({ ok: true, note: `Status ${fapshiStatus} — no action taken` });
    }

    // STEP 2: Find the order
    // @ts-ignore
    const order = await prisma.order.findUnique({ where: { id: externalId } });

    if (!order) {
      console.error(`[Webhook] Order ${externalId} not found in DB.`);
      return NextResponse.json({ ok: false, error: "Order not found" }, { status: 404 });
    }

    // STEP 3: Idempotency — don't re-process if already settled
    if (order.paymentStatus === "paid") {
      console.log(`[Webhook] Order ${externalId} already paid. Skipping.`);
      return NextResponse.json({ ok: true, note: "Already processed" });
    }

    // STEP 4: Map Fapshi status → our internal status
    const newPaymentStatus = fapshiStatus === "SUCCESSFUL" ? "paid" : "failed";

    // @ts-ignore
    await prisma.order.update({
      where: { id: externalId },
      data: {
        paymentStatus: newPaymentStatus,
        fapshiTransId: transId,
        // If SUCCESSFUL, move order to "confirmed" so admin can fulfill it
        ...(newPaymentStatus === "paid" ? { status: "confirmed" } : {}),
      },
    });

    console.log(`[Webhook] Order ${externalId} → payment=${newPaymentStatus}, fapshiStatus=${fapshiStatus}`);

    return NextResponse.json({ ok: true });

  } catch (e: any) {
    console.error("[Webhook] Unhandled error:", e);
    // Always return 200 to Fapshi so they don't retry (we log internally)
    return NextResponse.json({ ok: true, note: "Internal error logged" });
  }
}
