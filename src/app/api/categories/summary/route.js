import prisma from "@/lib/prisma";

export async function GET(req){
    try{
        const categories = await prisma.category.findMany({
            select: {
                name: true,
                imageUrl: true,
                _count: {
                    select: {products: true}
                }
            }
        });

        const result = categories.map(c => ({
            name: c.name,
            productsCount: c._count.products,
            imageUrl: c.imageUrl
        }));

        return Response.json({message: "Successfully retrieved categories data summary!", data: result})
    }catch(err){
        return Response.json({message: err.message}, {status: 500});
    }
}