import prisma from "@/lib/prisma";

export async function PATCH(req, {params}) {
    try{
        const {id} = await params;

        const body = await req.json();
        const {adminMessage} = body;

        const reviewed = await prisma.complaint.update({
            where: {id: id},
            data: {
                status: "RESOLVED",
                updated_at: new Date(),
                resolved_at: new Date(),
                ...(adminMessage ? {adminMessage} : {})
            }
        });

        return Response.json({message: "Complaint has been resolved!", success: true});
    }catch(err){
        console.error(err.message);
        return Response.json({message: err.message}, {status: 500})
    }
}