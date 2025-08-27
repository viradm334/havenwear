import prisma from "@/lib/prisma";

export async function GET(req) {
  // search params
  const { searchParams } = new URL(req.url);
  const categorySlug = searchParams.get("category");
  const name = searchParams.get("name");
  const status = searchParams.get("status");

  // pagination data
  const limit = 10;
  const page = parseInt(searchParams.get("page") || "1");
  const skip = (page - 1) * limit;

  // where clause
  const whereClause = {deleted_at: null};
  if (categorySlug)
    whereClause.category = {
      slug: categorySlug,
    };
  if (name) whereClause.name = { contains: name };
  if (status) whereClause.status = status;

  try {
    const products = await prisma.product.findMany({
      where: whereClause,
      select: {
        id: true,
        name: true,
        status: true,
        slug: true,
        price: true,
        color: true,
        description: true,
        category: {
          select: {
            name: true,
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
      take: limit,
    });

    const total = await prisma.product.count({ where: whereClause });

    const enrichedProducts = products.map((product) => {
      const totalStock = product.productSizes.reduce(
        (sum, size) => sum + size.stock,
        0
      );
      const totalSold = product.productSizes.reduce((sum, size) => {
        const sizeSold = size.orderItems.reduce(
          (qtySum, item) => qtySum + item.quantity,
          0
        );
        return sum + sizeSold;
      }, 0);

      return {
        ...product,
        totalStock,
        totalSold,
      };
    });

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
