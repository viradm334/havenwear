import prisma from "@/lib/prisma";

export async function GET(req){
    try{
        const complaints = await prisma.complaint.findMany({
            select : {
                id: true,
                message: true,
                created_at: true,
                status: true,
                orderItem: {
                    select : {
                        id: true,
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
                                        slug: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        return Response.json({message: "Successfully retrieved all complaints!", complaints});
    }catch(err){
        console.error(err.message);
        return Response.json({message: err.message}, {status: 500});
    }
}