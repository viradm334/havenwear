import prisma from "@/lib/prisma";

export async function DELETE(req, {params}){
    try{
        const {id} = await params;
        
        const deleted = await prisma.cartItem.delete({
            where: {id: id}
        });

        return Response.json({message: "Cart item berhasil dihapus!", success: true});
    }catch(err){
        console.error(err.message);
        return Response.json({message: err.message}, {status: 500})
    }
}