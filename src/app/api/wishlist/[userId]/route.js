import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  // search params
  const { searchParams } = new URL(req.url);

  // pagination data
  const limit = 10;
  const page = parseInt(searchParams.get("page") || "1");
  const skip = (page - 1) * limit;
  const { userId } = await params;
  try {
    const wishlist = await prisma.wishlist.findMany({
      where: {
        userId: userId,
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
            price: true,
            productPhotos: {
              select: {
                imageUrl: true,
              },
            },
          },
        },
      },
      skip,
      take: limit,
    });

    const total = await prisma.wishlist.count();

    return Response.json({
      message: "Successfully get wishlist items!",
      success: true,
      wishlist,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error(err.message);
    return Response.json({ message: err.message }, { status: 500 });
  }
}
