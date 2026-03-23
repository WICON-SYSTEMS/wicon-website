import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const FAPSHI_API_URL = "https://api.fapshi.com/v1";
const FAPSHI_API_KEY = process.env.FAPSHI_API_KEY;
const FAPSHI_API_USER = process.env.FAPSHI_API_USER;

export async function POST(req: Request) {
  try {
    const { customer, items } = await req.json();

    if (!customer?.name || !customer?.phone || !items || items.length === 0) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    // 1. Validate items and calculate total
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      // @ts-ignore
      const product = await prisma.product.findUnique({ where: { id: item.id } });
      if (!product || product.status !== "active") {
        return NextResponse.json({ ok: false, error: `Product ${item.name} not found` }, { status: 400 });
      }
      if (product.stock < item.quantity) {
        return NextResponse.json({ ok: false, error: `Not enough stock for ${product.name}` }, { status: 400 });
      }
      totalAmount += product.price * item.quantity;
      orderItems.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    // 2. Create order in database
    // @ts-ignore
    const order = await prisma.order.create({
      data: {
        customerName: customer.name,
        email: customer.email || "",
        phone: customer.phone,
        address: customer.address || "",
        totalAmount,
        status: "processing",
        paymentStatus: "pending",
        items: {
          create: orderItems,
        },
      },
    });

    // 3. Initiate Fapshi Payment
    if (!FAPSHI_API_KEY || !FAPSHI_API_USER) {
      console.error("Fapshi credentials missing");
      return NextResponse.json({ ok: true, orderId: order.id, paymentNeeded: false, message: "Order placed, but payment gateway not configured." });
    }

    try {
      const fapshiRes = await fetch(`${FAPSHI_API_URL}/direct-pay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apiuser": FAPSHI_API_USER,
          "apikey": FAPSHI_API_KEY,
        },
        body: JSON.stringify({
          amount: totalAmount,
          phone: customer.phone,
          externalId: order.id,
        }),
      });

      const fapshiData = await fapshiRes.json();

      if (fapshiRes.ok && fapshiData.transId) {
        // Update order with Fapshi transaction ID
        // @ts-ignore
        await prisma.order.update({
          where: { id: order.id },
          data: { fapshiTransId: fapshiData.transId },
        });

        return NextResponse.json({ 
          ok: true, 
          orderId: order.id, 
          transId: fapshiData.transId,
          message: "Payment initiated. Please check your phone for a MoMo push notification." 
        });
      } else {
        console.error("Fapshi error:", fapshiData);
        return NextResponse.json({ 
          ok: true, 
          orderId: order.id, 
          paymentError: true,
          message: "Order placed, but payment initiation failed. Please contact support." 
        });
      }
    } catch (e: any) {
      console.error("Fapshi fetch error:", e);
      return NextResponse.json({ ok: true, orderId: order.id, paymentError: true, message: "Order placed, but payment system is offline." });
    }

  } catch (e: any) {
    console.error("Order creation error:", e);
    return NextResponse.json({ ok: false, error: e?.message || "Internal server error" }, { status: 500 });
  }
}
