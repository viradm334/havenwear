import prisma from "@/lib/prisma";

export async function GET(req){
    try{
        const products = await prisma.product.findMany({
            select: {
                id: true,
                name: true,
                status:true,
                slug: true,
                price: true,
                color: true,
                description: true,
                category : {
                    select : {
                        name: true
                    }
                },
                productSizes : {
                    select : {
                        id: true,
                        name: true,
                        stock: true,
                        orderItems: {
                            select: {
                                orderId: true,
                                quantity: true
                            }
                        }
                    }
                },
                productPhotos: {
                    select: {
                        imageUrl: true
                    }
                }
            }
        });

        const enrichedProducts = products.map(product => {
            const totalStock = product.productSizes.reduce((sum, size) => sum + size.stock, 0);
            const totalSold = product.productSizes.reduce((sum, size) => {
              const sizeSold = size.orderItems.reduce((qtySum, item) => qtySum + item.quantity, 0);
              return sum + sizeSold;
            }, 0);
          
            return {
              ...product,
              totalStock,
              totalSold
            };
          });
                    
        return Response.json({message: 'Succesfully retrieved all products!', data: enrichedProducts});
    }catch(err){
        return Response.json({message: err.message}, {status: 500});
    }
}