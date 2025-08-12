import prisma from "@/lib/prisma";

export async function GET(req){
    try{
        const orders = await prisma.order.findMany({
            include: {
                user: {
                    select : {
                        name: true
                    }
                },
                orderItems : {
                    select: {
                        price: true,
                        quantity: true
                    }
                }
            }, omit : {
                address: true,
                province: true,
                city: true
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        const ordersWithTotal = orders.map(order => {
            const totalPrice = order.orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
            return {...order, totalPrice}
        });

        return Response.json({message: 'Successfully get all orders!', ordersWithTotal})
    }catch(err){
        return Response.json({message: err.message}, {status: 500})
    }
}