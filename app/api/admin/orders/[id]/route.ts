import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function checkPass(req: Request) {
  const user = req.headers.get("x-admin-username") || "";
  const pass = req.headers.get("x-admin-passcode") || "";
  const expectedUser = process.env.ADMIN_USERNAME || "";
  const expectedPass = process.env.ADMIN_PASSCODE || "";
  if (!expectedUser || !expectedPass) return false;
  return user === expectedUser && pass === expectedPass;
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!checkPass(req))
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    // @ts-ignore
    const order = await prisma.order.findUnique({
      where: { id: id },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    if (!order)
      return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });

    const item = {
      ...order,
      customer_name: order.customerName,
      total_amount: order.totalAmount,
      payment_status: order.paymentStatus,
      fapshi_trans_id: order.fapshiTransId,
      created_at: order.createdAt,
    };

    return NextResponse.json({ ok: true, item });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Unknown error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!checkPass(req))
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { status, paymentStatus } = body;

    // @ts-ignore
    const order = await prisma.order.update({
      where: { id: id },
      data: {
        status,
        paymentStatus,
      },
    });

    return NextResponse.json({ ok: true, item: order });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
