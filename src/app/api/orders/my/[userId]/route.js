import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  // search params
  const { searchParams } = new URL(req.url);
  const orderNumber = searchParams.get("orderNumber");
  const status = searchParams.get("status");
  const payment = searchParams.get("payment");

  // pagination data
  const limit = 10;
  const page = parseInt(searchParams.get("page") || "1");
  const skip = (page - 1) * limit;

  // where clause
  const { userId } = await params;
  const whereClause = {userId: userId};
  if (status) whereClause.status = status;
  if (orderNumber) whereClause.orderNumber = { contains: orderNumber };
  if (payment) whereClause.payment = payment;

  try {

    const orders = await prisma.order.findMany({
      where: whereClause,
      select: {
        id: true,
        orderNumber: true,
        status: true,
        payment: true,
        created_at: true,
        orderItems: {
          select: {
            quantity: true,
            price: true,
            productSize: {
              select: {
                name: true,
                product: {
                  select: {
                    name: true,
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
      orderBy: {
        created_at: "desc",
      },
      skip,
      take: limit,
    });

    const total = await prisma.order.count({ where: whereClause });

    return Response.json({
      message: "Successfully retrieved orders!",
      orders,
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
