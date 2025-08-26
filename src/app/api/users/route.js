import prisma from "@/lib/prisma";

export async function GET(req) {
  const limit = 10;
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const skip = (page - 1) * limit;

  // search params
  const role = searchParams.get("role");
  const whereClause = role ? { role } : {};

  try {
    const users = await prisma.user.findMany({
      where: whereClause,
      include: {
        _count: {
          select: {
            orders: true,
          },
        },
      },
      skip,
      take: limit,
      orderBy: {
        created_at: "desc",
      },
    });
    const total = await prisma.user.count({
      where: whereClause
    });

    return Response.json({
      message: "Successfully retrieved users!",
      data: users,
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
