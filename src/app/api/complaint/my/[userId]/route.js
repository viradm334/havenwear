import prisma from "@/lib/prisma";

export async function GET(req, {params}){
    try{
        const {userId} = await params;

        const complaints = await prisma.complaints.findMany({
            where: {userId: userId}
        });

        return Response.json({message: "Successfully get complaints!", complaints});
    }catch(err){
        console.error(err.message);
        return Response.json({message: err.message}, {status: 500});
    }
}