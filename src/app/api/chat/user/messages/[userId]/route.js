import prisma from "@/lib/prisma";

export async function GET(req, {params}){
    try{
        const {userId} = await params;

        const admin = await prisma.user.findFirst({where: {email: "admin@gmail.com"}});
        const adminId = admin?.id;

        const messages = await prisma.message.findMany({
            where : {
                OR : [
                    {senderId: userId, receiverId: adminId},
                    {senderId: adminId, receiverId: userId}
                ]
            }, orderBy: {
                created_at : 'asc'
            }
        });

        return Response.json({message: "Successfully fetched messages!", messages});
    }catch(err){
        console.error(err.message);
        return Response.json({message: err.message}, {status: 500});
    }
}