import prisma from "@/lib/prisma";

export async function POST(req){
    try{
        const body = await req.json();
        const {cartId, productSizeId, quantity} = body;

        const existingItem = await prisma.cartItem.findFirst({
            where: {
              cartId: cartId,
              productSizeId: productSizeId,
            },
          });
          
          if (existingItem) {
            await prisma.cartItem.update({
              where: { id: existingItem.id },
              data: { quantity: existingItem.quantity + quantity },
            });
          } else {
            await prisma.cartItem.create({
              data: {
                cartId: cartId,
                productSizeId: productSizeId,
                quantity: quantity,
              },
            });
          }

        return Response.json({message: "Berhasil menambahkan produk ke keranjang!", success: true});
    }catch(err){
        console.error(err.message);
        return Response.json({message: err.message}, {status: 500});
    }
}