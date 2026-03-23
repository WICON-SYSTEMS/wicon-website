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

export async function GET(req: Request) {
  try {
    if (!checkPass(req))
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const q = (searchParams.get("q") || "").trim();

    // @ts-ignore
    const orders = await prisma.order.findMany({
      where: q
        ? {
            OR: [
              { customerName: { contains: q, mode: "insensitive" } },
              { email: { contains: q, mode: "insensitive" } },
              { phone: { contains: q, mode: "insensitive" } },
            ],
          }
        : {},
      orderBy: { createdAt: "desc" },
    });

    const formattedOrders = orders.map((o: any) => ({
      ...o,
      customer_name: o.customerName,
      total_amount: o.totalAmount,
      payment_status: o.paymentStatus,
      fapshi_trans_id: o.fapshiTransId,
      created_at: o.createdAt,
    }));

    return NextResponse.json({ ok: true, items: formattedOrders });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
