import prisma from "@/lib/prisma";

export async function PATCH(req, {params}){
    try{
        const {orderNumber} = await params;
        const body = await req.json();
        const {no_resi} = body;

        const sentOrder = await prisma.order.update({
            where: {
                orderNumber: orderNumber
            }, data: {
                no_resi: no_resi,
                status: 'SENT',
                updated_at: new Date(),
                sent_at: new Date()
            }
        });

        return Response.json({message: "Succesfully send order!", success: true});
    }catch(err){
        if(err.code === 'P2025'){
            return Response.json({message: "Order number not found!"}, {status: 404});
        }

        console.error(err);
        return Response.json({message: err.message}, {status: 500});
    }
}