// app/api/transactions/[id]/route.ts
import { connectDB } from "@/lib/db";
import Transaction from "@/model/Transaction";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const body = await req.json();

  const updated = await Transaction.findByIdAndUpdate(
    params.id,
    { ...body },
    { new: true }
  );

  if (!updated)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const deleted = await Transaction.findByIdAndDelete(params.id);

  if (!deleted)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ success: true });
}
