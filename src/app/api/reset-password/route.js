import prisma from "@/lib/prisma";
import crypto from 'crypto';
import bcrypt from 'bcrypt';

export async function POST(req){
    try{
        const body = await req.json();
        const {token, email, newPassword, confirmPassword} = body;

        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        const user = await prisma.user.findFirst({
            where: {email,resetToken: hashedToken, resetTokenExpiryTime: {
                gt: new Date()
            }}
        });

        if(!user){
            return Response.json({message: "Invalid or expired token!"}, {status: 400});
        }

        if(newPassword !== confirmPassword){
            return Response.json({message: "Password does not match!"}, {status: 400});
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({where: {email}, data: {
            password: hashedPassword,
            resetToken: null,
            resetTokenExpiryTime: null
        }});

        return Response.json({message: "Successfully updated password!", success: true});
    }catch(err){
        console.error(err.message);
        return Response.json({message: "Internal server error"}, {status: 500});
    }
}