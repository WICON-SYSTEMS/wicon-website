import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    // @ts-ignore
    const products = await prisma.product.findMany({
      where: {
        status: "active",
        ...(category ? { category } : {}),
      },
      orderBy: { createdAt: "desc" },
    });

    console.log(`[GET /api/products] Found ${products.length} products. First slug: ${products[0]?.slug}`);

    return NextResponse.json({ ok: true, items: products });
  } catch (e: any) {
    console.error("[GET /api/products] Error:", e);
    return NextResponse.json(
      { ok: false, error: "Unable to load products. Please check your connection." },
      { status: 500 }
    );
  }
}
