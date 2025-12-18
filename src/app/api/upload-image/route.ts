import { verifyAuthentication } from "@/lib/admin/login/auth";
import { getCloudinary } from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try{
    const session = await verifyAuthentication();
      
    if (!session.user || !session.session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const cloudinary = getCloudinary();
    const formData = await req.formData();
    const file = formData.get("file") as File;

    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: cloudinary.config().folder },
          (error, result) => {
            if (error) reject(error);
            resolve(result);
          }
        )
        .end(buffer);
    });

    return NextResponse.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  }catch(error){
    console.error("Error uploading image:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}