import { makeUniqueProductSlug } from "@/lib/makeUniqueProductSlug";
import prisma from "@/lib/prisma";
import slugify from "slugify";

export async function PUT(req, {params}){
    try{
        const {slug} = await params;
        const body = await req.json();
        const {name, price, categoryId, description, productSizes, existingImages, newImages, deletedImages} = body;

        const existingProduct = await prisma.product.findUnique({where: {slug}});

        const shouldUpdateSlug = name !== existingProduct.name;
        
        const baseSlug = slugify(name, {lower: true, strict: true, trim: true});
        const uniqueSlug = await makeUniqueProductSlug(baseSlug);

        const updateData = {
            name,
            ...(shouldUpdateSlug && { slug: uniqueSlug }),
            price: Number(price),
            categoryId,
            description,
            productSizes: {
                update: productSizes.map((size) => ({
                  where: { id: size.id },
                  data: {
                    name: size.name,
                    stock: Number(size.stock),
                  },
                })),
              }, 
              productPhotos: {
                deleteMany: deletedImages.map((img) => ({ id: img.id })),
                update: existingImages.map((item) => ({
                  where: { id: item.id },
                  data: {
                    imageUrl: item.imageUrl,
                    public_id: item.public_id,
                  },
                })),
                create: newImages.map((item) => ({
                  imageUrl: item.imageUrl,
                  public_id: item.public_id,
                })),
                        
          }}

        const updated = await prisma.product.update({
            where: {slug},
            data: updateData
        });

        return Response.json({message: "Successfully updated product data!", data: updated});
    }catch(err){
        console.error(err.message);
        return Response.json({message: "Internal server error"}, {status: 500});
    }
}