import prisma from "@/lib/prisma";

export async function POST(req){
    try{
        const body = await req.json();
        const {orderItemId, message} = body;

        const complaint = await prisma.complaint.create({
            data: {
                orderItemId,
                message
            }
        });

        return Response.json({message: "Successfully filed complaint!", complaint, success: true});
    }catch(err){
        console.error(err.message);
        return Response.json({message: err.message}, {status: 500});
    }
}