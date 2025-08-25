import prisma from "@/lib/prisma";
import dayjs from "dayjs";

export async function GET(req) {
  try {
    const totalIncome = await prisma.orderItem.aggregate({
      _sum: {
        price: true,
      },
      where: {
        order: {
          payment: "PAID",
        },
      },
    });

    const pendingOrders = await prisma.order.count({
      where: {
        paid_at: {
          not: null,
        },
        payment_confirmed_at: null,
      },
    });

    const openComplaints = await prisma.complaint.count({
      where: {
        status: "OPEN",
      },
    });

    const ordersToSend = await prisma.order.count({
      where: {
        status: "PROCESSED",
        no_resi: null,
      },
    });

    const last7Days = Array.from({ length: 7 }, (_, i) =>
      dayjs().subtract(i, "day").format("YYYY-MM-DD")
    ).reverse();

    const rawResults =
      await prisma.$queryRaw`SELECT DATE(created_at) AS orderDate, COUNT(*) as totalOrders
        FROM \`order\`  WHERE created_at >= CURDATE() - INTERVAL 7 DAY
        GROUP BY DATE(created_at);
        `;

    const chartData = last7Days.map((date) => {
      const match = rawResults.find((r) => {
        const formatted = dayjs(r.orderDate).format("YYYY-MM-DD");
        return formatted === date;
      });

      return {
        orderDate: date,
        totalOrders: match ? Number(match.totalOrders) : 0,
      };
    });

    const rawMostProductsSold =
      await prisma.$queryRaw`SELECT p.name, SUM(i.quantity) AS totalProductsSold
  FROM \`order\` o
  JOIN orderItem i ON o.id = i.orderId
  JOIN productSize s ON i.productSizeId = s.id
  JOIN product p ON p.id = s.productId
  GROUP BY p.name
  ORDER BY totalProductsSold DESC
  LIMIT 3;`;

    const mostProductsSold = rawMostProductsSold.map((r) => ({
      name: r.name,
      totalProductsSold: Number(r.totalProductsSold),
    }));

    return Response.json({
      message: "Successfully get dashboard data!",
      success: true,
      totalIncome,
      pendingOrders,
      openComplaints,
      ordersToSend,
      chartData,
      mostProductsSold,
    });
  } catch (err) {
    console.error(err.message);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
