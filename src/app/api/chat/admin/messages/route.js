import prisma from "@/lib/prisma";

export async function GET(req) {
  try {
    const admin = await prisma.user.findFirst({
      where: { email: "havenwear@gmail.com" },
    });
    const adminId = admin?.id;

    const allMessages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: adminId },
          { receiverId: adminId }
        ]
      },
      orderBy: {
        created_at: "desc"
      },
      include: {
        sender: {
          select: {
            name: true,
            id: true
          }
        },
        receiver: {
          select: {
            id: true,
            name:true
          }
        }
      }
    });
    
    // Group messages by conversation partner
    const latestByUser = new Map();
    
    for (const msg of allMessages) {
      const partner =
        msg.senderId === adminId ? msg.receiver : msg.sender;
    
      if (!latestByUser.has(partner.id)) {
        latestByUser.set(partner.id, {
          user: partner,
          message: msg
        });
      }
    }
    
    const latestMessages = Array.from(latestByUser.values());

    // bikin 2 query,
    // yg ke-1 ambil semua userid dari messages yang non admin
    // yg ke-2 ada dua parameter, userid sama adminid pake or, ambil semua message, semua message nya diqueryin ke adminid atau userid, receiverid include adminid, userid, si sender juga sama include adminid, userid, nanti dapet conversation 2 orang nanti order by created_at desc terus ambil 1 paling atas (ini jadi lastmessage) terus nanti objeknya diconstruct

    // cara kedua
    // query awal tetep sama, hasilnya itu diiterasi dicoba dibalik parameternya, jadi kalu sendernya user, receiver admin, coba dibalik sender admin, receiver user terus dibandingin messagenya dari created_at kalo lebih baru dari latestmessages y
    // hasil dari latestmessage (query awal) diforeach nanti senderid diambil
    // const latestMessages = await prisma.message.findMany({
    //   // where: {
    //   //   receiverId: item.senderId,
    //        senderId: item.receiverId,
    //   // },
    //   orderBy: {
    //     created_at: "desc",
    //   },
    //   distinct: ["senderId"],
    //   include: {
    //     sender: true,
    //   },
    // });
    // 

    // where receivernya siapa aja antara admin dan user idnya
    // sender id itu harus usernya
    // not dihilangin
    // senderId dibikin harus jadi userid, jangan not admin
    // atur supaya senderid jangan adminid

    // realtime error, buat sekarang unsubscribe boleh dicomment, tapi cari tau kenapa buat admin will unmount hooknya ketrigger
    // latestmessages update kondisi backend, latestmessage kalo dari non admin bukan masalah, tapi kalo latesmessage terakhir dari admin pasti senderid itu sama kaya adminid, terus dimapping pastiin senderid itu harus userid, pastiin bukan admin
    // select distinct userid, tapi not adminid
    // ui dirapihin lagi, card jadi ke tengahin, pemilihan warna lebih bagus sama padding card, detail produk dirapihin lagi, image gausah aspect ratio originalnya, kasih model cover, setiap image aspect ratio fix tiap komponen

    return Response.json({message: "Successfully fetched all users and messages!", success: true, latestMessages})
  } catch (err) {
    console.error(err.message);
    return Response.json({ message: err.message }, { status: 500 });
  }
}
