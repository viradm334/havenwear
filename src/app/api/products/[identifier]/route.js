import { getProductByIdOrSlug } from "@/lib/getProductByIdOrSlug";

export async function GET(req, {params}){
    try{
        const {identifier} = await params;

        const product = await getProductByIdOrSlug(identifier);

        if(product.length === 0){
            return Response.json({ message: "Product not found!" }, { status: 404 });
        }

        return Response.json({message: "Successfuly retrieved data!", data: product});
    }catch(err){
          console.error(`Error fetching product: ${err.message}`);
          return Response.json({ message: "Internal server error" }, { status: 500 });
    }
}