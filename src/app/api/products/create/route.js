import { makeUniqueProductSlug } from "@/lib/makeUniqueProductSlug";
import prisma from "@/lib/prisma";
import slugify from "slugify";
import { fetchRandomPexelsImage } from "@/lib/pexelsClient";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, price, stock, categoryId, description, imageUrl } = body;
    const baseSlug = slugify(name, { lower: true, strict: true, trim: true });
    const uniqueSlug = await makeUniqueProductSlug(baseSlug);

    let finalImageUrl = imageUrl;
    if (!finalImageUrl) {
      finalImageUrl =
        (await fetchRandomPexelsImage(name)) || "/placeholder.png";
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug: uniqueSlug,
        price: Number(price),
        stock: Number(stock),
        categoryId,
        description,
        imageUrl: finalImageUrl,
      },
    });

    return Response.json({
      message: "Successfully created new product!",
      data: product,
    });
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
