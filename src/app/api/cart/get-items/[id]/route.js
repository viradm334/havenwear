import prisma from "@/lib/prisma";

export async function GET(req, {params}){
    try{
        const {id} = await params;

        const cartItems = await prisma.cartItem.findMany({
            where : {
                cartId: id
            },
            include: {
                productSize: {
                    select: {
                        name: true,
                        stock: true,
                        product: {
                            select: {
                                id: true,
                                name: true,
                                slug: true,
                                price: true,
                                color: true
                            }
                        }
                    }
                }
            }
        });

        return Response.json({message: 'Successfully retrieved cart items!', data: cartItems});
    }catch(err){
        return Response.json({message: err.message}, {status: 500});
    }
}