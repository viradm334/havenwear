import prisma from "@/lib/prisma";

export async function GET(req){
    try{
        const {searchParams} = new URL(req.url);
        const userId = searchParams.get("userId");
        const productId = searchParams.get("productId");

        const isWishlisted = await prisma.wishlist.findFirst({
            where: {userId, productId}
        });

        return Response.json({wishlisted: Boolean(isWishlisted) });
    }catch(err){
        console.error(err.message);
        return Response.json({message: "Internal server error"}, {status: 500})
    }
}