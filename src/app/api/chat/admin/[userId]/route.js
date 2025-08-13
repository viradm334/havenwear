import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  try {
    const { userId } = await params;
    const admin = await prisma.user.findFirst({
      where: { email: "havenwear@gmail.com" },
    });

    const adminId = admin?.id;
    const chatPartner = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true
      }
    });

    const chatPartnerName = chatPartner?.name;

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId, receiverId: adminId },
          { senderId: adminId, receiverId: userId },
        ],
      },
      orderBy: { created_at: "asc" },
    });

    return Response.json({
      message: "Successfully fetched conversation between admin and user!",
      success: true,
      messages,
      chatPartnerName
    });
  } catch (err) {
    console.error(err.message);
    return Response.json({ message: err.message }, { status: 500 });
  }
}
