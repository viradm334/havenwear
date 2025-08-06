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
      paymentMethod
    } = body;
    const orderNumber = `ORD-${Date.now()}`;

    const sizeIds = productSizes.map((item) => item.productSizeId);

    const productSizeRecords = await prisma.productSize.findMany({
      where: { id: { in: sizeIds } },
      include: { product: true },
    });

    const order = await prisma.order.create({
      data: {
        orderNumber: orderNumber,
        userId: userId,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
        city: city,
        province: province,
        paymentMethod: paymentMethod,
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

    const orderNum = order.orderNumber;

    return Response.json({
      message: "Berhasil membuat pesanan!",
      orderNumber: orderNum,
    });
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
