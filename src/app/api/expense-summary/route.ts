import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Transaction from "@/model/Transaction";

export async function GET() {
  try {
    await connectDB();

    const now = new Date();

    // Get first day of the current month
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    // Get start of current week (Monday) and end (Sunday)
    const day = now.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
    const weekStart = new Date(now);
    const weekEnd = new Date(now);
    weekStart.setDate(now.getDate() - ((day + 6) % 7)); // Move to Monday
    weekEnd.setDate(weekStart.getDate() + 6);
    weekStart.setHours(0, 0, 0, 0);
    weekEnd.setHours(23, 59, 59, 999);

    // 1. Total Expenses (All Time)
    const totalAgg = await Transaction.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalExpenses = totalAgg[0]?.total || 0;

    // 2. Category-wise Expenses for Current Month
    const categoryAgg = await Transaction.aggregate([
      {
        $match: {
          date: {
            $gte: monthStart,
            $lt: nextMonth,
          },
        },
      },
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

    // 3. Monthly Totals (All Time)
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

    // 4. This Week's Total
    const weekAgg = await Transaction.aggregate([
      {
        $match: {
          date: {
            $gte: weekStart,
            $lte: weekEnd,
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);
    const weeklyTotal = weekAgg[0]?.total || 0;

    return NextResponse.json({
      totalExpenses,
      weeklyTotal,
      categoryTotals: categoryAgg,
      monthlyTotals: monthlyAgg,
    });
  } catch (err) {
    console.error("❌ Error in /api/summary", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
