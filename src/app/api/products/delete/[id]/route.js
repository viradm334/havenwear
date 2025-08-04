import prisma from "@/lib/prisma";

export async function DELETE(req, {params}){
    try{
        const {id} = await params;

        await prisma.product.delete({where: {
            id: id
        }});

        return Response.json({message: "Successfully deleted product!"})
    }catch(err){

        if(err.code === 'P2025'){
            return Response.json({ message: "Product not found!" }, { status: 404 });
        };

        console.error(`Error deleting product: ${err.message} ${err.code}`);
        return Response.json({ message: "Internal server error" }, { status: 500 });
    }
}