import prisma from "@/lib/prisma";

export async function GET(req){
    try{
        const totalIncome = await prisma.orderItem.aggregate({
            _sum: {
                price: true
            },
            where: {
                order: {
                    payment: 'PAID'
                }
            }
        });

        const pendingOrders = await prisma.order.count({
            where: {
                paid_at: {
                    not: null
                },
                payment_confirmed_at: null
            }
        });

        const openComplaints = await prisma.complaint.count({
            where: {
                status: 'OPEN'
            }
        });

        const ordersToSend = await prisma.order.count({
            where: {
                status: 'PROCESSED',
                no_resi: null
            }
        })

        return Response.json({message: "Successfully get dashboard data!", success: true, totalIncome, pendingOrders, openComplaints, ordersToSend});
    }catch(err){
        console.error(err.message);
        return Response.json({message: "Internal server error"}, {status: 500});
    }
}