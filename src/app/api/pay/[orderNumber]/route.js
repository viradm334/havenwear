import prisma from "@/lib/prisma";

export async function PATCH(req, {params}){
    try{
        const {orderNumber} = await params;

        const orderPaid = await prisma.order.update({
            where : {
                orderNumber: orderNumber
            }, 
            data: {
                payment: "PAID",
                paid_at: new Date()
            }
        });

        return Response.json({message: "Successfully paid order!", success: true, orderPaid});
    }catch(err){
        console.error(err.message);
        return Response.json({message: err.message}, {status: 500});
    }
}