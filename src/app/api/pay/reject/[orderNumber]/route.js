import prisma from "@/lib/prisma";

export async function PATCH(req, {params}){
    try{
        const {orderNumber} = await params;

        const confirmed = await prisma.order.update({
            where: {orderNumber: orderNumber},
            data: {
                rejected_at: new Date(),
                payment: 'REJECTED',
                status: "REJECTED"
            }
        });

        return Response.json({message: "Successfully rejected payment!", success: true, confirmed});
    }catch(err){
        if(err.code === 'P2025'){
            return Response.json({message: "Order not found!"}, {status: 404});
        }
        console.error(err);
        return Response.json({message: err.message}, {status: 500});
    }
}