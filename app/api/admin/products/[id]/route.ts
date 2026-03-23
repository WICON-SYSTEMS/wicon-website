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

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    if (!checkPass(req))
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    // @ts-ignore
    const product = await prisma.product.findUnique({
      where: { id: params.id },
    });

    if (!product)
      return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });

    const item = {
      ...product,
      image_url: product.imageUrl,
      created_at: product.createdAt,
    };

    return NextResponse.json({ ok: true, item });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Unknown error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    if (!checkPass(req))
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { name, description, price, imageUrl, category, stock, status } = body;

    // @ts-ignore
    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        name,
        description,
        price: price !== undefined ? Number(price) : undefined,
        imageUrl,
        category,
        stock: stock !== undefined ? Number(stock) : undefined,
        status,
      },
    });

    return NextResponse.json({ ok: true, item: product });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Unknown error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    if (!checkPass(req))
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    // @ts-ignore
    await prisma.product.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
