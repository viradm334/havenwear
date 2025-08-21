import prisma from "@/lib/prisma";

export async function GET(req, {params}){
    try{
        const {userId} = await params;

        const complaints = await prisma.complaint.findMany({
            where: {userId: userId},
            select : {
                id: true,
                userId: true,
                message: true,
                adminMessage: true,
                created_at: true,
                resolved_at: true,
                reviewed_at: true,
                canceled_at: true,
                status: true,
                orderItem: {
                    select : {
                        id: true,
                        price: true,
                        quantity: true,
                        order: {
                            select: {
                                orderNumber: true,
                                user: {
                                    select: {
                                        name: true
                                    }
                                }
                            }
                        },
                        productSize: {
                            select: {
                                name: true,
                                product: {
                                    select: {
                                        name: true,
                                        price: true,
                                        slug: true,
                                        productPhotos: {
                                            select: {
                                                imageUrl: true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        return Response.json({message: "Successfully get complaints!", complaints});
    }catch(err){
        console.error(err.message);
        return Response.json({message: err.message}, {status: 500});
    }
}