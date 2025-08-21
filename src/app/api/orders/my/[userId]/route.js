import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  try {
    const { userId } = await params;

    const orders = await prisma.order.findMany({
      where: { userId: userId },
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
                        imageUrl: true
                      }
                    }
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    return Response.json({ message: "Successfully retrieved orders!", orders });
  } catch (err) {
    console.error(err.message);
    return Response.json({ message: err.message }, { status: 500 });
  }
}
