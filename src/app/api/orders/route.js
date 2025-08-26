import prisma from "@/lib/prisma";

export async function GET(req) {
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
  const whereClause = {};
  if (status) whereClause.status = status;
  if (orderNumber)
    whereClause.orderNumber = { contains: orderNumber };
  if (payment) whereClause.payment = payment;

  try {
    const orders = await prisma.order.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            name: true,
          },
        },
        orderItems: {
          select: {
            price: true,
            quantity: true,
          },
        },
      },
      omit: {
        address: true,
        province: true,
        city: true,
      },
      orderBy: {
        created_at: "desc",
      },
      skip,
      take: limit,
    });

    const total = await prisma.order.count({ where: whereClause });

    const ordersWithTotal = orders.map((order) => {
      const totalPrice = order.orderItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      return { ...order, totalPrice };
    });

    return Response.json({
      message: "Successfully get all orders!",
      ordersWithTotal,
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
