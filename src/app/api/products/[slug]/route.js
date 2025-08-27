import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, {params}){
    try{
        const {slug} = await params;

        const product = await prisma.product.findUnique({
            where: { slug },
            include: {
              productSizes: {
                select: {
                  id: true,
                  name: true,
                  stock: true,
                },
              },
              productPhotos: {
                select: {
                  id: true,
                  imageUrl: true,
                  public_id: true
                },
              },
              category: {
                select: {
                    name: true
                }
              }
            },
          });

          if(!product || product.deleted_at){
            return Response.json({message: "Product not found!"}, {status: 404});
          }

          return Response.json({message: "Sucessfully fetched product!", product})
    }catch(err){
        console.error(err.message);
        return Response.json({message: "Internal server error"}, {status: 500});
    }
}