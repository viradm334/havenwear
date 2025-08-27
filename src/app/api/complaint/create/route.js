import prisma from "@/lib/prisma";

export async function POST(req){
    try{
        const body = await req.json();
        const {userId, orderItemId, message} = body;

        const [complaint, updatedOrderItem] = await prisma.$transaction([
            prisma.complaint.create({
              data: {
                userId,
                orderItemId,
                message,
              },
            }),
            prisma.orderItem.update({
              where: { id: orderItemId },
              data: {
                complained_at: new Date(),
              },
            }),
          ]);

        return Response.json({message: "Successfully filed complaint!", complaint, success: true});
    }catch(err){
        console.error(err.message);
        return Response.json({message: err.message}, {status: 500});
    }
}