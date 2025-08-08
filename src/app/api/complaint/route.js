import prisma from "@/lib/prisma";

export async function GET(req){
    try{
        const complaints = await prisma.complaint.findMany({});

        return Response.json({message: "Successfully retrieved all complaints!", complaints});
    }catch(err){
        console.error(err.message);
        return Response.json({message: err.message}, {status: 500});
    }
}