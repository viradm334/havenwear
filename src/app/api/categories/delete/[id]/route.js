import prisma from "@/lib/prisma";

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    await prisma.category.delete({
      where: {
        id: id,
      },
    });

    return Response.json({ message: "Successfully deleted category!" });
  } catch (err) {
    if (err.code === "P2025") {
      return Response.json({ message: "Category not found!" }, { status: 404 });
    }
    console.error(`Error deleting category: ${err.message}`);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
