import prisma from "@/lib/prisma";

export async function PATCH(req, { params }) {
  try {
    const { orderNumber } = await params;
    const order = await prisma.order.update({
      where: { orderNumber: orderNumber },
      data: {
        status: 'CANCELED',
        updated_at: new Date(),
        canceled_at: new Date()
      },
    });

    return Response.json({message: "Successfully canceled order!", success: true, order});
  } catch (err) {
    console.error(err.message);
    return Response.json({ message: err.message }, { status: 500 });
  }
}