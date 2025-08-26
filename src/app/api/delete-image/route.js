import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(req){
    try{
        const body = await req.json();

        const {public_id} = body;

        cloudinary.uploader.destroy(public_id, function(result){
            console.log(result);
        })

        return Response.json({message: "Successfully deleted image!", success: true});

    }catch(err){
        console.error(err.message);
        return Response.json({message: "Internal server error"}, {status: 500});
    }
}