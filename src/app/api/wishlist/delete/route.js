import prisma from "@/lib/prisma";

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const productId = searchParams.get("productId");

  try {
    const deleted = await prisma.wishlist.delete({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    return Response.json({
      message: "Successfully deleted item from wishlist!",
      success: true,
    });
  } catch (err) {
    console.error(err.message);
    return Response.json({ message: err.message }, { status: 500 });
  }
}
