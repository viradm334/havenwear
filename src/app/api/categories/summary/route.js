import prisma from "@/lib/prisma";

export async function GET(req) {
  // search params
  const { searchParams } = new URL(req.url);

  // pagination data
  const limit = 10;
  const page = parseInt(searchParams.get("page") || "1");
  const skip = (page - 1) * limit;

  try {
    const categories = await prisma.category.findMany({
      select: {
        name: true,
        imageUrl: true,
        _count: {
          select: { products: true },
        },
      },
      skip,
      take: limit,
    });

    const result = categories.map((c) => ({
      name: c.name,
      productsCount: c._count.products,
      imageUrl: c.imageUrl,
    }));

    const total = await prisma.category.count();

    return Response.json({
      message: "Successfully retrieved categories data summary!",
      data: result,
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
