import prisma from "@/lib/prisma";

export async function PATCH(req, { params }) {
  try {
    const { orderNumber } = await params;
    const finishedOrder = await prisma.order.update({
      where: { orderNumber: orderNumber },
      data: {
        finished_at: new Date(),
        arrived_at: new Date(),
        status: 'FINISHED',
        updated_at: new Date()
      },
    });

    return Response.json({message: "Successfully finished order!", success: true, finishedOrder});
  } catch (err) {
    console.error(err);
    return Response.json({ message: err.message }, { status: 500 });
  }
}
