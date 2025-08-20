import prisma from "@/lib/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const categorySlug = searchParams.get("category");

    const products = await prisma.product.findMany({
      where: {
        status: "PUBLISHED",
        ...(categorySlug && {
          category: {
            slug: categorySlug,
          },
        }),
      },
      select: {
        id: true,
        name: true,
        slug: true,
        price: true,
        color: true,
        description: true,
        category: {
          select: {
            name: true,
            slug: true
          },
        },
        productSizes: {
          select: {
            id: true,
            name: true,
            stock: true,
            orderItems: {
              select: {
                orderId: true,
                quantity: true,
              },
            },
          },
        },
        productPhotos: {
          select: {
            imageUrl: true,
          },
        },
      },
    });

    const enrichedProducts = products
      .map((product) => {
        const totalStock = product.productSizes.reduce(
          (sum, size) => sum + size.stock,
          0
        );

        return {
          ...product,
          totalStock,
        };
      })
      .filter((product) => product.totalStock > 0);

    return Response.json({
      message: "Succesfully retrieved all products!",
      data: enrichedProducts,
    });
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
