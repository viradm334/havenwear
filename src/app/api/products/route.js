import prisma from "@/lib/prisma";

export async function GET(req) {
  try {
    // search params
    const { searchParams } = new URL(req.url);
    const categorySlug = searchParams.get("category");

    // pagination data
    const limit = 10;
    const page = parseInt(searchParams.get("page") || "1");
    const skip = (page - 1) * limit;

    // where clause
    const whereClause = {status: "PUBLISHED"};
    if(categorySlug) whereClause.category = {
      slug: categorySlug
    };

    const products = await prisma.product.findMany({
      where: whereClause,
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
      skip,
      take: limit
    });

    const total = await prisma.product.count({where: whereClause});

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
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
