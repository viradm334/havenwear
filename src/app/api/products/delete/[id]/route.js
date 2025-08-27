import prisma from "@/lib/prisma";

export async function PATCH(req, { params }) {
  try {
    const { id } = await params;

    await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        deleted_at: new Date(),
      },
    });

    return Response.json({ message: "Successfully deleted product!", success: true });
  } catch (err) {
    if (err.code === "P2025") {
      return Response.json({ message: "Product not found!" }, { status: 404 });
    }

    console.error(`Error deleting product: ${err.message} ${err.code}`);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
