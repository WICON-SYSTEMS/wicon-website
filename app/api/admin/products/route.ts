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

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w-]+/g, '')  // Remove all non-word chars
    .replace(/--+/g, '-')     // Replace multiple - with single -
}

export async function GET(req: Request) {
  try {
    if (!checkPass(req))
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const q = (searchParams.get("q") || "").trim();

    // @ts-ignore
    const products = await prisma.product.findMany({
      where: q
        ? {
            OR: [
              { name: { contains: q, mode: "insensitive" } },
              { category: { contains: q, mode: "insensitive" } },
              { description: { contains: q, mode: "insensitive" } },
            ],
          }
        : {},
      orderBy: { createdAt: "desc" },
    });

    // Match the frontend's expected format (snake_case if needed, but the models use camelCase)
    // The AdminPage expected image_url, created_at. Prisma uses imageUrl, createdAt.
    const formattedProducts = products.map((p: any) => ({
      ...p,
      image_url: p.imageUrl,
      created_at: p.createdAt,
    }));

    return NextResponse.json({ ok: true, items: formattedProducts });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Unknown error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    if (!checkPass(req))
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { name, description, price, imageUrl, category, stock, status } = body;

    if (!name || price === undefined) {
      return NextResponse.json(
        { ok: false, error: "Name and price are required" },
        { status: 400 }
      );
    }

    let slug = slugify(name);
    // Check for collision
    // @ts-ignore
    const existing = await prisma.product.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Math.floor(Math.random() * 1000)}`;
    }

    // @ts-ignore
    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description: description || "",
        price: Number(price),
        imageUrl,
        category,
        stock: Number(stock || 0),
        status: status || "active",
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
