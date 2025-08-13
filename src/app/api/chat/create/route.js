import prisma from "@/lib/prisma";
import { pusher } from "@/lib/pusher";

export async function POST(req) {
  try {
    const body = await req.json();
    const { senderId, content, role, targetUserId } = body;

    let receiverId;

    if (role === "USER") {
      const admin = await prisma.user.findFirst({
        where: { email: "havenwear@gmail.com" },
      });
      const adminId = admin?.id;
      receiverId = adminId;
    } else if (role === "ADMIN") {
      receiverId = targetUserId;
      if (!receiverId) {
        return Response.json(
          { message: "Target user not specified!" },
          { status: 400 }
        );
      }
    } else {
      return Response.json({ message: "Invalid role!" }, { status: 400 });
    }

    const chat = await prisma.message.create({
      data: {
        senderId,
        receiverId,
        content,
      },
    });

    console.log(receiverId);

    if (senderId !== receiverId) {
      pusher.trigger(`chat-${receiverId}`, "new-message", {
        id: chat.id,
        receiverId,
        senderId,
        content,
        created_at: chat.created_at,
        updated_at: chat.updated_at,
      });
    }

    return Response.json({
      message: "Successfully sent message!",
      success: true,
      chat,
    });
  } catch (err) {
    console.error(err.message);
    return Response.json({ message: err.message }, { status: 500 });
  }
}
