import prisma from "@/lib/prisma";

export async function GET(req){
    try{
        const users = await prisma.user.findMany({
            include: {
              _count: {
                select: {
                  orders: true
                }
              }
            }
          });
                    
        return Response.json({message: "Successfully retrieved users!", data: users});
    }catch(err){
        return Response.json({message: err.message}, {status: 500});
    }
}