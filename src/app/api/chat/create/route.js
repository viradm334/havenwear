import prisma from "@/lib/prisma";
import { pusher } from "@/lib/pusher";

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

        await pusher.trigger(`chat-${receiverId}`, "new-message", {
            senderId, 
            content,
            created_at: chat.created_at
        })

        return Response.json({message: "Successfully sent message!", success: true, chat})
    }catch(err){
        console.error(err.message);
        return Response.json({message: err.message}, {status: 500});
    }
}