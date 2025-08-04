import prisma from "@/lib/prisma";
import bcrypt from 'bcrypt';

export async function POST(req){
    try{
        const body = await req.json();
        const {name, email, password, phoneNumber} = body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                phoneNumber,
            }
        });

        return Response.json({message: "Successfuly created new account!"});
    }catch(err){

        if(err.code === 'P2002'){
            return Response.json({message: "Email already exists"}, {status: 409});
        }
        console.error(`Error creating new user: ${err.message}, ${err.code}`);
        return Response.json({message: "Internal server error"}, {status: 500});
    }
}