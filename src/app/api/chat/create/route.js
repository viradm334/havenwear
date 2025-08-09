import prisma from "@/lib/prisma";

export async function POST(req) {
    try{
        const body = await req.json();
        const {senderId, receiverId, content} = body;

        const chat = await prisma.message.create({
            data: {
                senderId,
                receiverId,
                content
            }
        });

        return Response.json({message: "Successfully sent message!", success: true, chat})
    }catch(err){
        console.error(err.message);
        return Response.json({message: err.message}, {status: 500});
    }
}