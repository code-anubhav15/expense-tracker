import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Transaction from "@/model/Transaction";

export async function GET() {
  await connectDB();
  const transactions = await Transaction.find().sort({ date: -1 });
  return NextResponse.json(transactions);
}

export async function POST(req: Request) {
  try {
    console.log("Adding transaction...");
    await connectDB();
    console.log("Connected to database");
    const body = await req.json();
    const { amount, date, description, category } = body;

    if (!amount || !date || !description) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const transaction = await Transaction.create({
      amount,
      date,
      description,
      category,
    });

    return NextResponse.json(transaction, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to add transaction" }, { status: 500 });
  }
}
