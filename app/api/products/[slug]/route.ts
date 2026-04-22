import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    // @ts-ignore
    const product = await prisma.product.findUnique({
      where: {
        slug: slug,
        status: "active",
      },
    });

    if (!product) {
      return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, item: product });
  } catch (e: any) {
    console.error("[GET /api/products/slug] Error:", e);
    return NextResponse.json(
      { ok: false, error: "Product currently unavailable. Please try again later." },
      { status: 500 }
    );
  }
}
