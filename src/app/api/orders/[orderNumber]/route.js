import prisma from "@/lib/prisma";

export async function GET(req, {params}){
    try{
        const {orderNumber} = await params;

        const order = await prisma.order.findUnique({where: {
            orderNumber: orderNumber
        }, include: {
            user : {
                select : {
                    name: true
                }
            },
            orderItems : {
                select: {
                    id: true,
                    price: true,
                    quantity: true,
                    complained_at: true,
                    productSize: {
                        select : {
                            name: true,
                            product: {
                                select : {
                                    name: true,
                                    productPhotos: {
                                        select: {
                                            imageUrl: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    complaints: {
                        select: {
                            id: true
                        }
                    }
                }
            }
        }});

        if(!order){
            return Response.json({message: "Order not found!"}, {status: 404});
        };

        const totalPrice = order.orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const orderWithTotal = {...order, totalPrice}


        return Response.json({message: 'Successfully get order!', orderWithTotal});
    }catch(err){
        console.error(err.message);
        return Response.json({message: err.message}, {status: 500});
    }
}