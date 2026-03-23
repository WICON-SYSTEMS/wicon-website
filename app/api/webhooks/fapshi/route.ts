import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Fapshi Webhook Received:", body);

    const { transId, status, externalId } = body;

    if (!externalId) {
      return NextResponse.json({ ok: false, error: "Missing externalId" }, { status: 400 });
    }

    // @ts-ignore
    const order = await prisma.order.findUnique({
      where: { id: externalId },
    });

    if (!order) {
      console.error(`Order ${externalId} not found for webhook`);
      return NextResponse.json({ ok: false, error: "Order not found" }, { status: 404 });
    }

    // Update payment status based on Fapshi status
    // Fapshi uses "SUCCESSFUL", "FAILED", "EXPIRED"
    let newPaymentStatus = "pending";
    if (status === "SUCCESSFUL") {
      newPaymentStatus = "paid";
    } else if (status === "FAILED" || status === "EXPIRED") {
      newPaymentStatus = "failed";
    }

    // @ts-ignore
    await prisma.order.update({
      where: { id: externalId },
      data: {
        paymentStatus: newPaymentStatus,
        fapshiTransId: transId || order.fapshiTransId,
      },
    });

    // If paid, we might want to reduce stock here if not already done
    // For simplicity, we assume stock was handled or will be handled manually by admin
    // But ideally, we should decrement stock on "paid" status if not done at order creation.

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("Webhook error:", e);
    return NextResponse.json({ ok: false, error: e?.message }, { status: 500 });
  }
}
