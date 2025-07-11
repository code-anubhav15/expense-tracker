"use client";

import React, { useState, useEffect } from "react";
import {
  Wallet,
  Users,
  UserPlus,
  ShoppingCart,
  Utensils,
  Bus,
  Home,
  CreditCard,
  ShoppingBag,
  PartyPopper,
  HeartPulse,
  MoreHorizontal,
  ChevronRight,
  GraduationCap,
  Briefcase,
  Edit,
  Delete,
  Trash,
  Trash2,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import axios from "axios";

const weeklyData = [
  { name: "27 Jun", amount: 1097 },
  { name: "28 Jun", amount: 1277 },
  { name: "29 Jun", amount: 1320 },
  { name: "30 Jun", amount: 931 },
  { name: "01 Jul", amount: 567 },
  { name: "02 Jul", amount: 653 },
  { name: "03 Jul", amount: 1218 },
  { name: "04 Jul", amount: 659 },
  { name: "05 Jul", amount: 787 },
  { name: "06 Jul", amount: 894 },
  { name: "07 Jul", amount: 1479 },
  { name: "08 Jul", amount: 980 },
  { name: "09 Jul", amount: 564 },
  { name: "10 Jul", amount: 819 },
  { name: "11 Jul", amount: 1193 },
];

const monthlyData = [
  { name: "07 Apr - 13 Apr", amount: 3984 },
  { name: "14 Apr - 20 Apr", amount: 3798 },
  { name: "21 Apr - 27 Apr", amount: 4640 },
  { name: "28 Apr - 04 May", amount: 2232 },
  { name: "05 May - 11 May", amount: 4532 },
  { name: "12 May - 18 May", amount: 3212 },
  { name: "19 May - 25 May", amount: 3513 },
  { name: "26 May - 01 Jun", amount: 2222 },
  { name: "02 Jun - 08 Jun", amount: 3311 },
  { name: "09 Jun - 15 Jun", amount: 3536 },
  { name: "16 Jun - 22 Jun", amount: 3370 },
  { name: "23 Jun - 29 Jun", amount: 3770 },
  { name: "30 Jun - 06 Jul", amount: 3715 },
  { name: "07 Jul - 13 Jul", amount: 2109 },
];

const yearlyData = [
  { name: "Feb - 2024", amount: 8306 },
  { name: "Mar - 2024", amount: 11365 },
  { name: "Apr - 2024", amount: 10351 },
  { name: "May - 2024", amount: 13911 },
  { name: "Jun - 2024", amount: 10901 },
  { name: "Jul - 2024", amount: 10507 },
  { name: "Aug - 2024", amount: 10997 },
  { name: "Sep - 2024", amount: 13873 },
  { name: "Oct - 2024", amount: 10022 },
  { name: "Nov - 2024", amount: 12204 },
  { name: "Dec - 2024", amount: 8185 },
  { name: "Jan - 2025", amount: 13494 },
  { name: "Feb - 2025", amount: 10498 },
  { name: "Mar - 2025", amount: 12423 },
  { name: "Apr - 2025", amount: 8437 },
  { name: "May - 2025", amount: 12066 },
  { name: "Jun - 2025", amount: 9774 },
  { name: "Jul - 2025", amount: 8117 },
];

export default function TransactionsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const [filter, setFilter] = useState("monthly");

  const getChartData = () => {
    switch (filter) {
      case "weekly":
        return weeklyData;
      case "yearly":
        return yearlyData;
      case "monthly":
      default:
        return monthlyData;
    }
  };

  // Example transaction data
  const [transactions, setTransactions] = useState([
    {
      dateLabel: "Today",
      items: [
        { heading: "Netflix", amount: -2500 },
        { heading: "Apple", amount: 2000 },
      ],
    },
    {
      dateLabel: "Yesterday",
      items: [
        { heading: "Stripe", amount: 750 },
        { heading: "HubSpot", amount: 1000 },
        { heading: "Creative Tim", amount: 2500 },
        { heading: "Webflow", amount: "Pending" },
      ],
    },
    // Past week (previous 6 days)
    ...Array.from({ length: 6 }).map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (i + 2));
      const label = date.toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      return {
        dateLabel: label,
        items: [
          { heading: "Online Subscription", amount: -12.99 },
          { heading: "Freelance", amount: 200 },
        ],
      };
    }),
  ]);

  const [newTransaction, setNewTransaction] = useState({
    title: "",
    spent: 0,
    received: 0,
    date: "",
  });

  const addTransaction = () => {
    const dateLabel = new Date(newTransaction.date).toLocaleDateString(
      undefined,
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );

    const amount = newTransaction.received - newTransaction.spent;

    const newTx = {
      heading: newTransaction.title,
      amount: amount,
    };

    const updatedTransactions = [...transactions];
    const existingSection = updatedTransactions.find(
      (section) => section.dateLabel === dateLabel
    );

    if (existingSection) {
      existingSection.items.push(newTx);
    } else {
      updatedTransactions.unshift({ dateLabel, items: [newTx] });
    }

    setTransactions(updatedTransactions);
    setNewTransaction({ title: "", spent: 0, received: 0, date: "" });
  };

  return (
    <div className="flex min-h-screen bg-[#f4f7fa] dark:bg-[#181f2a]">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Navbar */}
        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* Main Page Content */}
        <main className="flex-1 overflow-y-auto p-3 md:p-4">
          {/* Main Sections */}
          <div className="flex flex-col gap-4">
            {/* Bar Chart Section */}
            <div className="bg-white rounded-none shadow-xl p-6 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <div className="text-md font-semibold text-[#6c7a93]">
                  TRANSACTION SUMMARY
                </div>
                <div className="flex gap-2">
                  {["weekly", "monthly", "yearly"].map((option) => (
                    <button
                      key={option}
                      onClick={() => setFilter(option)}
                      className={`text-sm px-3 py-1 rounded-md border ${
                        filter === option
                          ? "bg-[#7b7ce6] text-white"
                          : "text-[#6c7a93] border-gray-300"
                      }`}
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={getChartData()}
                    margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="#6c7a93" />
                    <YAxis stroke="#6c7a93" />
                    <Tooltip />
                    <Bar
                      dataKey="amount"
                      fill="#7b7ce6"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Transactions & Add Transaction Section */}
            <div className="flex flex-col lg:flex-row gap-4 w-full">
              {/* Transactions Table Section (70%) */}
              <div className="bg-white shadow-xl p-6 flex-1">
                <div className="text-md font-semibold text-[#6c7a93] mb-2">
                  TRANSACTIONS
                </div>
                <div className="overflow-x-auto">
                  <div className="max-h-[300px] overflow-y-auto scrollbar-hide">
                    <table className="min-w-full text-sm text-left">
                      <thead className="text-[#b0b7c3] uppercase sticky top-0 bg-white z-10 border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-3">Title</th>
                          <th className="px-4 py-3">Date</th>
                          <th className="px-4 py-3">Amount</th>
                          <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((section, sectionIdx) =>
                          section.items.map((tx, itemIdx) => {
                            const isFirstItem = itemIdx === 0;
                            return (
                              <tr
                                key={`${section.dateLabel}-${itemIdx}`}
                                className={`border-b border-gray-100 hover:bg-gray-50 ${
                                  isFirstItem
                                    ? "border-t-4 border-[#7b7ce6]"
                                    : ""
                                }`}
                              >
                                <td className="px-4 py-3 text-[#232b3e] font-medium">
                                  {tx.heading}
                                </td>
                                <td className="px-4 py-3 text-[#6c7a93]">
                                  {section.dateLabel}
                                </td>
                                <td className="px-4 py-3 font-semibold">
                                  {typeof tx.amount === "string" &&
                                  tx.amount === "Pending" ? (
                                    <span className="text-sm font-semibold text-yellow-400">
                                      Pending
                                    </span>
                                  ) : typeof tx.amount === "number" ? (
                                    <span
                                      className={`text-[15px] font-semibold ${
                                        tx.amount < 0
                                          ? "text-red-500"
                                          : "text-green-500"
                                      }`}
                                    >
                                      {tx.amount < 0 ? "- " : "+ "}$
                                      {Math.abs(tx.amount)}
                                    </span>
                                  ) : null}
                                </td>
                                <td className="px-4 py-3 text-right space-x-2">
                                  <button className="text-blue-600 hover:text-blue-800 text-xs font-medium cursor-pointer">
                                    <Edit size={24} className="inline" />
                                  </button>
                                  <button className="text-red-500 hover:text-red-700 text-xs font-medium cursor-pointer">
                                    <Trash2 size={24} className="inline" />
                                  </button>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Add Transaction Section (30%) */}
              <div className="bg-white shadow-xl p-6 w-full lg:w-[30%] rounded-md flex flex-col justify-between">
                <h2 className="text-md font-semibold text-[#6c7a93] mb-4">
                  ADD TRANSACTION
                </h2>
                <form
                  className="flex flex-col gap-4 h-full"
                  onSubmit={(e) => {
                    e.preventDefault();
                    addTransaction();
                  }}
                >
                  <input
                    type="text"
                    placeholder="Title"
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                    value={newTransaction.title}
                    onChange={(e) =>
                      setNewTransaction({
                        ...newTransaction,
                        title: e.target.value,
                      })
                    }
                    required
                  />

                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="0"
                      placeholder="Spent"
                      className="border border-gray-300 rounded-md px-3 py-2 text-sm w-1/2 bg-red-100 placeholder:text-red-600"
                      value={newTransaction.spent}
                      onChange={(e) =>
                        setNewTransaction({
                          ...newTransaction,
                          spent: parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                    <input
                      type="number"
                      min="0"
                      placeholder="Received"
                      className="border border-gray-300 rounded-md px-3 py-2 text-sm w-1/2 bg-green-100 placeholder:text-green-600"
                      value={newTransaction.received}
                      onChange={(e) =>
                        setNewTransaction({
                          ...newTransaction,
                          received: parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                  </div>

                  <input
                    type="date"
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                    value={newTransaction.date}
                    onChange={(e) =>
                      setNewTransaction({
                        ...newTransaction,
                        date: e.target.value,
                      })
                    }
                    required
                  />

                  <button
                    type="submit"
                    className="bg-[#7b7ce6] text-white px-4 py-2 rounded-md text-sm hover:bg-[#6869d6] transition"
                  >
                    Add Transaction
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
