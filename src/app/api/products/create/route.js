import { makeUniqueProductSlug } from "@/lib/makeUniqueProductSlug";
import prisma from "@/lib/prisma";
import slugify from "slugify";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, categoryId, description, color, price, productSizes, imageUrl } = body;

    const baseSlug = slugify(name, { lower: true, strict: true, trim: true });
    const uniqueSlug = await makeUniqueProductSlug(baseSlug);

    await prisma.product.create({
      data: {
        name,
        slug: uniqueSlug,
        categoryId,
        description,
        color,
        price: parseInt(price),
        productSizes: {
          create: productSizes.map(size => ({
            name: size.name,
            stock: parseInt(size.stock),
          })),
        },
        productPhotos: {
          create: imageUrl.map(url => ({ imageUrl: url }))
        }
      },
    });

    return Response.json({ message: "Product created successfully", success: true });
  } catch (err) {
    console.error(err);
    return Response.json({ message: err.message }, { status: 500 });
  }
}
