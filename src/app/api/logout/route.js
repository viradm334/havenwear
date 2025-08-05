import { cookies } from "next/headers";

export async function POST(){
    (await cookies()).set('token', '', {
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
        maxAge: 0
    });

    return Response.json({message: 'Berhasil logout!', success: true});
}