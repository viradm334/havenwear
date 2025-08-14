import prisma from "@/lib/prisma";
import { pusher } from "@/lib/pusher";

export async function GET(req, {params}){
    try{
        const {userId} = await params;

        pusher.trigger(`chat-${userId}`, "test-event", {note: 'Hello world'});
       

        return Response.json({message: "Successfully hit event"});
    }catch(err){
        console.error(err.message);
        return Response.json({message: err.message}, {status: 500});
    }
}