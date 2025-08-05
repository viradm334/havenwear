import { makeUniqueProductSlug } from "@/lib/makeUniqueProductSlug";
import prisma from "@/lib/prisma";
import slugify from "slugify";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, categoryId, description, color, price, productSizes } = body;

    const baseSlug = slugify(name, { lower: true, strict: true, trim: true });
    const uniqueSlug = await makeUniqueProductSlug(baseSlug);

    await prisma.product.create({
      data: {
        name,
        slug: uniqueSlug,
        categoryId,
        description,
        color,
        price: parseFloat(price),
        productSizes: {
          create: productSizes.map(size => ({
            name: size.name,
            stock: parseInt(size.stock),
          })),
        },
      },
    });

    return Response.json({ message: "Product created successfully" });
  } catch (err) {
    console.error(err);
    return Response.json({ message: err.message }, { status: 500 });
  }
}
