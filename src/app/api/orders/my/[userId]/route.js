import prisma from "@/lib/prisma";

export async function GET(req, {params}){
    try{
        const {userId} = await params;

        const orders = await prisma.order.findMany({
            where: {userId: userId}
        });

        return Response.json({message: "Successfully retrieved orders!", orders})
    }catch(err){
        console.error(err.message);
        return Response.json({message: err.message}, {status: 500});
    }
}