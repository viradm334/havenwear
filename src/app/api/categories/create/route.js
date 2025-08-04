import prisma from "@/lib/prisma";
import slugify from "slugify";

export async function POST(req, res){
    try{
        const body = await req.json();
        const {name} = body;
        const slug = slugify(name, {lower: true, trim: true, strict: true});
        const category = await prisma.category.create({
            data: {
                name,
                slug: slug
            }
        });
        return Response.json({message: 'Successfully created new category!', data: category});
    }catch(err){
        return Response.json({message: err.message}, {status: 500});
    }
}