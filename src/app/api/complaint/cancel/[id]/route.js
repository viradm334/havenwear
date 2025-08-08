import prisma from "@/lib/prisma";

export async function PATCH(req, {params}){
    try{
        const {id} = await params;

        const canceled = await prisma.complaint.update({
            where: {id: id},
            data: {
                status: "CANCELED",
                updated_at: new Date()
            }
        });

        return Response.json({message: "Successfully canceled a complaint!", success: true, complaint: canceled});
    }catch(err){
        console.error(err.message);
        return Response.json({message: err.message}, {status: 500})
    }
}