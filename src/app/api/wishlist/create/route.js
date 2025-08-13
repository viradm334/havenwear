import prisma from "@/lib/prisma";

export async function POST(req){
    try{
        const body = await req.json();
        const {userId, productId} = body;

        const wishlist = await prisma.wishlist.create({
            data: {
                userId,
                productId
            }
        });

        return Response.json({message: "Successfully added item to wishlist!", success: true, wishlist});
    }catch(err){
        console.error(err.message);
        return Response.json({message: err.message}, {status: 500});
    }
}