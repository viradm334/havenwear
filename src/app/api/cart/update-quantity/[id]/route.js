import prisma from "@/lib/prisma";

export async function PATCH(req, {params}){
    try{
        const {id} = await params;
        const body = await req.json();
        const {quantity} = body;

        const updated = await prisma.cartItem.update({
            where: {id: id},
            data: {
                quantity: quantity
            }
        });

        return Response.json({message: "Successfully updated cart item quantity!", cartItem: updated})
    }catch(err){
        console.error(err.message);
        return Response.json({message: err.message}, {status:500})
    }
}