import prisma from "@/lib/prisma";
import { pusher } from "@/lib/pusher";

export async function GET(req, {params}){
    try{
        const {userId} = await params;

        pusher.trigger(`chat-045317fb-e5e6-4e7e-80e0-0949cefdf980`, "test-event", {note: 'Hello world'});
       

        return Response.json({message: "Successfully hit event"});
    }catch(err){
        console.error(err.message);
        return Response.json({message: err.message}, {status: 500});
    }
}