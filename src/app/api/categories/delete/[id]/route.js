import prisma from "@/lib/prisma";

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    const result = await prisma.category.deleteMany({
      where: {
        id: id,
      },
    });

    if (result.count === 0) {
      return Response.json({ message: "Category not found!" }, { status: 404 });
    } else {
      return Response.json({ message: "Successfully deleted category!" });
    }
  } catch (err) {
    console.error(`Error deleting category: ${err.message}`);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
