import prisma from "@/lib/prisma";

export async function GET(req){
    try{

        const admin = await prisma.user.findFirst({where: {email: "admin@gmail.com"}});
        const adminId = admin?.id;

        const messages = await prisma.message.findMany({
            where: {
                OR : [{senderId: {not: adminId}},
                    {receiverId: {not: adminId}}
                ]
            },
            orderBy: {created_at: 'asc'}
        });

        const grouped = {};

        for(const msg of messages){
            const userId = msg.senderId === adminId? msg.receiverId : msg.senderId;
            if(!grouped[userId]) grouped[userId] = [];
            grouped[userId].push(msg);
        }
        return Response.json({message: "Sucessfully retrieved all chats!", grouped});
    }catch(err){
        console.error(err.message);
        return Response.json({message: err.message}, {status: 500});
    }
}