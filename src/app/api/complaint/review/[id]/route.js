import prisma from "@/lib/prisma";

export async function PATCH(params) {
    try{
        const {id} = await params;

        const reviewed = await prisma.complaint.update({
            where: {id: id},
            data: {
                status: "REVIEWED",
                updated_at: new Date(),
                reviewed_at: new Date()
            }
        });

        return Response.json({message: "Complaint has been reviewed!", success: true});
    }catch(err){
        console.error(err.message);
        return Response.json({message: err.message}, {status: 500})
    }
}