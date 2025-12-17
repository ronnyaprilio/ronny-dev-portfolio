import { NextResponse } from "next/server";
import { findById, updateById, deleteById } from "@/lib/db/repository";
import { verifyAuthentication } from "@/lib/admin/login/auth";
import { revalidatePath } from "next/cache";

export async function GET(_: Request, { params }: { params: Promise<{ collection: string; id: string }> }) {
  try{
    const session = await verifyAuthentication();
    const { collection, id } = await params;
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

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
  const { collection, id } = await params;

  console.log("collection:", collection);
  console.log("id:", id);

  try {
    const session = await verifyAuthentication();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

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
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { collection, id } = await params;
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