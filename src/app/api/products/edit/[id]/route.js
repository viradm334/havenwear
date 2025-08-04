import { makeUniqueProductSlug } from "@/lib/makeUniqueProductSlug";
import prisma from "@/lib/prisma";
import slugify from "slugify";
import { fetchRandomPexelsImage } from "@/lib/pexelsClient";

export async function PUT(req, {params}){
    try{
        const {id} = await params;
        const body = await req.json();
        const {name, price, stock, categoryId, description, imageUrl: incomingImage} = body;

        const existing = await prisma.product.findUnique({
            where: { id },
            select: { imageUrl: true, name: true },
        });
        if (!existing) {
            return Response.json({ message: "Product not found." }, { status: 404 });
        }
        
        const baseSlug = slugify(name, {lower: true, strict: true, trim: true});
        const uniqueSlug = await makeUniqueProductSlug(baseSlug);

        const updateData = {
            name,
            slug: uniqueSlug,
            price: Number(price),
            stock: Number(stock),
            categoryId,
            description,
          };

        if (incomingImage) {
            updateData.imageUrl = incomingImage;
          } else if (!existing.imageUrl) {
            const randomImage = await fetchRandomPexelsImage(name);
            updateData.imageUrl = randomImage || "/placeholder.png";
          }

        const updated = await prisma.product.update({
            where: {id: id},
            data: updateData
        });

        return Response.json({message: "Successfully updated product data!", data: updated});
    }catch(err){
        return Response.json({message: err.message}, {status: 500});
    }
}