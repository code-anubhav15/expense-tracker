import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Transaction from "@/model/Transaction";

export async function GET() {
  try {
    await connectDB();

    // Get total expenses
    const totalAgg = await Transaction.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalExpenses = totalAgg[0]?.total || 0;

    // Get category-wise totals
    const categoryAgg = await Transaction.aggregate([
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          total: 1,
        },
      },
    ]);

    // Get monthly totals
    const monthlyAgg = await Transaction.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m", date: "$date" },
          },
          total: { $sum: "$amount" },
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id",
          total: 1,
        },
      },
      { $sort: { month: -1 } },
    ]);

    return NextResponse.json({
      totalExpenses,
      categoryTotals: categoryAgg,
      monthlyTotals: monthlyAgg,
    });
  } catch (err) {
    console.error("❌ Error in /api/summary", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
