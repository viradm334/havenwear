import prisma from "@/lib/prisma";

export async function GET(req) {
  // search params
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  // pagination data
  const limit = 10;
  const page = parseInt(searchParams.get("page") || "1");
  const skip = (page - 1) * limit;

  // where clause
  const whereClause = {};
  if (status) whereClause.status = status;

  try {
    const complaints = await prisma.complaint.findMany({
      where: whereClause,
      select: {
        id: true,
        message: true,
        created_at: true,
        status: true,
        orderItem: {
          select: {
            id: true,
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
                    slug: true,
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
      message: "Successfully retrieved all complaints!",
      success: true,
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
