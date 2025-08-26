import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  // search params
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const { userId } = await params;

  // pagination data
  const limit = 10;
  const page = parseInt(searchParams.get("page") || "1");
  const skip = (page - 1) * limit;

  // where clause
  const whereClause = { userId: userId };
  if (status) whereClause.status = status;
  try {
    const complaints = await prisma.complaint.findMany({
      where: whereClause,
      select: {
        id: true,
        userId: true,
        message: true,
        adminMessage: true,
        created_at: true,
        resolved_at: true,
        reviewed_at: true,
        canceled_at: true,
        status: true,
        orderItem: {
          select: {
            id: true,
            price: true,
            quantity: true,
            order: {
              select: {
                orderNumber: true,
                user: {
                  select: {
                    name: true,
                  },
                },
              },
            },
            productSize: {
              select: {
                name: true,
                product: {
                  select: {
                    name: true,
                    price: true,
                    slug: true,
                    productPhotos: {
                      select: {
                        imageUrl: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      skip,
      take: limit,
    });

    const total = await prisma.complaint.count({ where: whereClause });

    return Response.json({
      message: "Successfully get complaints!",
      complaints,
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
