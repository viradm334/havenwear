import prisma from "@/lib/prisma";
import slugify from "slugify";
import { makeUniqueCategorySlug } from "@/lib/makeUniqueCategorySlug";

export async function PUT(req, {params}){
    try{
        const {id} = await params;
        const body = await req.json();
        const {name, slug: providedSlug} = body;

        const base = providedSlug
      ? slugify(providedSlug, { lower: true, strict: true })
      : slugify(name, { lower: true, strict: true });

      const finalSlug = await makeUniqueCategorySlug(base, id);

        const updated = await prisma.category.updateMany({
            where: {id: id},
            data: {
                name,
                slug: finalSlug
            }
        });

        if(updated.count === 0){
            return Response.json({message: 'Category not found!'}, {status: 404});
        }

        return Response.json({message: 'Successfully updated category!'});
    }catch(err){
        return Response.json({message: err.message}, {status: 500});
    }
}