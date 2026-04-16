import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import https from "https";

const FAPSHI_API_URL = process.env.FAPSHI_API_URL;
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
      const payload: any = {
        amount: Math.max(totalAmount, 100),
        phone: customer.phone,
        externalId: order.id,
        message: `Payment for WiCon Ltd Order ${order.id}`,
      };
      if (customer.name) payload.name = customer.name;
      if (customer.email) payload.email = customer.email;

      // Using native https request to force IPv4 due to Node 18 ETIMEDOUT bug on Vercel/Local dev
      const fapshiRes = await new Promise<{ ok: boolean; status: number; data: any; text: string }>((resolve, reject) => {
        const url = new URL(!FAPSHI_API_URL?.endsWith('/') && !FAPSHI_API_URL ? "https://sandbox.fapshi.com/direct-pay" : `${FAPSHI_API_URL}/direct-pay`);
        const options = {
          hostname: url.hostname,
          port: url.port || 443,
          path: url.pathname,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apiuser': String(FAPSHI_API_USER),
            'apikey': String(FAPSHI_API_KEY),
          },
          family: 4 // FORCE IPv4 HERE
        };

        const req = https.request(options, (res) => {
          let body = "";
          res.on('data', (d) => { body += d; });
          res.on('end', () => {
            let data: any = {};
            try {
              data = JSON.parse(body);
            } catch (err) {
              // Not JSON
            }
            resolve({
              ok: res.statusCode ? res.statusCode >= 200 && res.statusCode < 300 : false,
              status: res.statusCode || 500,
              text: body,
              data
            });
          });
        });

        req.on('error', (e) => reject(e));
        req.write(JSON.stringify(payload));
        req.end();
      });

      const fapshiData = fapshiRes.data;
      const textRes = fapshiRes.text;

      if (!fapshiData || Object.keys(fapshiData).length === 0) {
        throw new Error(`Fapshi returned non-JSON: ${textRes.substring(0, 100)}`);
      }

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
        console.error("Fapshi error status:", fapshiRes.status, "data:", fapshiData);
        return NextResponse.json({
          ok: true,
          orderId: order.id,
          paymentError: true,
          message: fapshiData.message || fapshiData.error || "Payment initiation failed at gateway."
        });
      }
    } catch (e: any) {
      console.error("Fapshi fetch error:", e);
      return NextResponse.json({
        ok: true,
        orderId: order.id,
        paymentError: true,
        message: "Payment system error: " + (e?.message || e.toString())
      });
    }

  } catch (e: any) {
    console.error("Order creation error:", e);
    return NextResponse.json({ ok: false, error: e?.message || "Internal server error" }, { status: 500 });
  }
}
