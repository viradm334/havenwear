import prisma from "@/lib/prisma";

export async function PATCH(req, {params}){
    try{
        const {orderNumber} = await params;

        const confirmed = await prisma.order.update({
            where: {orderNumber: orderNumber},
            data: {
                payment_confirmed_at: new Date(),
                status: "PROCESSED"
            }
        });

        return Response.json({message: "Successfully confirmed payment!", success: true, confirmed});
    }catch(err){
        if(err.code === 'P2025'){
            return Response.json({message: "Order not found!"}, {status: 404});
        }
        console.error(err);
        return Response.json({message: err.message}, {status: 500});
    }
}