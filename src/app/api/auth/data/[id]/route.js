import prisma from "@/lib/prisma";

export async function GET(req, {params}){
    try{
        const {id} = await params;

        const user = await prisma.user.findUnique({where: {id: id}});
        return Response.json({message: "Berhasil mendapatkan data user!", user});
    }catch(err){
        return Response.json({message: err.message}, {status: 500});
    }
}