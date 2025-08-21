import prisma from "@/lib/prisma";

export async function GET(req, {params}){
    try{
        const {userId} = await params;

        const wishlist = await prisma.wishlist.findMany({
            where: {
                userId: userId
            },
            include: {
                product: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                        price: true,
                        productPhotos: {
                            select: {
                                imageUrl: true
                            }
                        }
                    }
                }
            }
        });

        return Response.json({message: "Successfully get wishlist items!", success: true, wishlist});
    }catch(err){
        console.error(err.message);
        return Response.json({message: err.message}, {status: 500});
    }
}