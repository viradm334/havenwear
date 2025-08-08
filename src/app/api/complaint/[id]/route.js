import prisma from "@/lib/prisma";

export async function GET(req,{params}) {
    try{
        const {id} = await params;
        
        const complaint = await prisma.complaint.findUnique({
            where: {
                id: id
            }
        });

        return Response.json({message: "Successfully get complaint details!", complaint});
    }catch(err){
        console.error(err.message);
        return Response.json({message: err.message}, {status: 500});
    }
}