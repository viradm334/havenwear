import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      userId,
      address,
      city,
      province,
      productSizes,
      phoneNumber,
      email,
      paymentMethod,
      cartId
    } = body;
    const orderNumber = `ORD-${Date.now()}`;

    const sizeIds = productSizes.map((item) => item.productSizeId);

    await prisma.$transaction(async (tx) => {
      const productSizeRecords = await tx.productSize.findMany({
        where: { id: { in: sizeIds } },
        include: { product: true },
      });

      for (const size of productSizes) {
        const record = productSizeRecords.find((p) => p.id === size.productSizeId);
        if (!record) {
          throw new Error(`Size not found: ${size.productSizeId}`);
        }
        if (record.stock < size.quantity) {
          throw new Error(`Stok untuk ukuran ${record.name} tidak mencukupi`);
        }
      }
          
    
      const order = await tx.order.create({
        data: {
          orderNumber,
          userId,
          email,
          phoneNumber,
          address,
          city,
          province,
          paymentMethod,
          orderItems: {
            create: productSizes.map((size) => {
              const record = productSizeRecords.find(
                (p) => p.id === size.productSizeId
              );
              return {
                productSizeId: size.productSizeId,
                quantity: size.quantity,
                price: record?.product.price ?? 0,
              };
            }),
          },
        },
      });
    
      await Promise.all(
        productSizes.map((size) =>
          tx.productSize.update({
            where: { id: size.productSizeId },
            data: {
              stock: {
                decrement: size.quantity,
              },
            },
          })
        )
      );

      await tx.cartItem.deleteMany({
        where: {
          cartId: cartId,
          productSizeId: {
            in: sizeIds
          }
        }
      });
        
    });
    
    const orderNum = orderNumber;

    return Response.json({
      message: "Berhasil membuat pesanan!",
      orderNumber: orderNum,
    });
  } catch (err) {
    console.error(err.message);
    return Response.json({ message: err.message }, { status: 500 });
  }
}
