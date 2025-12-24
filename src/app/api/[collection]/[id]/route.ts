import "server-only";

import { NextResponse } from "next/server";
import { findById, updateById, deleteById } from "@/lib/db/repository";
import { revalidatePath } from "next/cache";
import { PROJECT_COLLECTION_NAME } from "@/lib/projectsData";
import { getCloudinary } from "@/lib/cloudinary";
import { verifyAuthentication } from "@/lib/admin/login/authenticationGuard";

export async function GET(_: Request, { params }: { params: Promise<{ collection: string; id: string }> }) {
  try{
    const session = await verifyAuthentication();
    
    if (!session.user || !session.session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { collection, id } = await params;
    const data = await findById(collection, id);
    return NextResponse.json(data);
  }catch(error){
    console.error("Error fetching document:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
  
}

export async function PUT(req: Request,{ params }: { params: Promise<{ collection: string; id: string }> }) {
  try {
    const session = await verifyAuthentication();
    
    if (!session.user || !session.session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { collection, id } = await params;

    const body = await req.json();
    const { _id, ...safeData } = body;
    await updateById(collection, id, safeData);
    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating document:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ collection: string; id: string }>  }) {
  try{
    const session = await verifyAuthentication();

    if (!session.user || !session.session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { collection, id } = await params;
    

    if(collection === PROJECT_COLLECTION_NAME){
      const doc = await findById(PROJECT_COLLECTION_NAME, id);

      if (!doc) throw new Error("Document not found");

      if (doc.image_public_id) {
        try {
          await getCloudinary().uploader.destroy(doc.image_public_id);
        } catch (err) {
          console.warn("Cloudinary delete failed:", err);
        }
      }
    }

    await deleteById(collection, id);
    revalidatePath("/");
    return NextResponse.json({ success: true });
  }catch(error){
    console.error("Error deleting document:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}