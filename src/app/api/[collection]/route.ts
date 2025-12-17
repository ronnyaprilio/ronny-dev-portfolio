import { NextResponse } from "next/server";
import { findAll, createOne } from "@/lib/db/repository";
import { verifyAuthentication } from "@/lib/admin/login/auth";

export async function GET(_: Request, { params }: { params: Promise<{ collection: string}> }) {
  try{
    const session = await verifyAuthentication();

    if (!session.user || !session.session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    
    const { collection } = await params;
    const data = await findAll(collection);
    return NextResponse.json(data);
  }catch(error){
    console.error("Error fetching documents:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request, { params }: { params: Promise<{ collection: string }> }) {
  try{
    const session = await verifyAuthentication();
    
    if (!session.user || !session.session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { collection } = await params;
    const id = await createOne(collection, body);

    return NextResponse.json({ id });
  }catch(error){
    console.error("Error creating document:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}