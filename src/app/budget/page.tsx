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
  Save,
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
  Legend,
} from "recharts";

import axios from "axios";

// Example data for pie chart (replace with your real data)
const categoryExpenses = [
  {
    name: "Food & Groceries",
    value: 1200,
    color: "#7b7ce6",
    duration: "This month",
  },
  {
    name: "Transportation",
    value: 800,
    color: "#ff5c70",
    duration: "This month",
  },
  {
    name: "Housing & Utilities",
    value: 1500,
    color: "#2edfc2",
    duration: "This month",
  },
  {
    name: "Subscriptions & Bills",
    value: 400,
    color: "#ffa940",
    duration: "This month",
  },
  {
    name: "Shopping & Personal Care",
    value: 600,
    color: "#232b3e",
    duration: "This month",
  },
  {
    name: "Education & Work",
    value: 300,
    color: "#6c7a93",
    duration: "This month",
  },
  {
    name: "Health & Wellness",
    value: 200,
    color: "#ffb6b6",
    duration: "This month",
  },
  {
    name: "Miscellaneous",
    value: 100,
    color: "#b6e6ff",
    duration: "This month",
  },
];

// Find the max spent category and its percentage
const totalExpenses = categoryExpenses.reduce((sum, cat) => sum + cat.value, 0);
const maxCategory = categoryExpenses.reduce(
  (max, cat) => (cat.value > max.value ? cat : max),
  categoryExpenses[0]
);
const maxCategoryPercent = ((maxCategory.value / totalExpenses) * 100).toFixed(
  1
);

// Summary Cards
const summaryCards = [
  {
    title: "TOTAL EXPENSES",
    value: "$53,000",
    change: "+55%",
    changeText: "since yesterday",
    changeColor: "text-green-500",
    iconBg: "bg-[#7b7ce6]",
    icon: <Wallet size={28} className="text-white" />,
  },
  {
    title: "SPENT THIS WEEK",
    value: "2,300",
    change: "+3%",
    changeText: "since last week",
    changeColor: "text-green-500",
    iconBg: "bg-[#ff5c70]",
    icon: <Users size={28} className="text-white" />,
  },
  {
    title: "BUDGET STATUS",
    value: "+3,462",
    change: "-2%",
    changeText: "since last quarter",
    changeColor: "text-red-500",
    iconBg: "bg-[#2edfc2]",
    icon: <UserPlus size={28} className="text-white" />,
  },
  {
    title: (
      <>
        MOST SPENT CATEGORY
        <br />
        <span className="text-[#232b3e] font-bold">{maxCategory.name}</span>
      </>
    ),
    value: `$${maxCategory.value}`,
    change: `+${maxCategoryPercent}%`,
    changeText: `of total expenses`,
    changeColor: "text-blue-500",
    iconBg: `bg-[${maxCategory.color}]`,
    icon: (() => {
      // Map category name to icon
      switch (maxCategory.name) {
        case "Food & Groceries":
          return <Utensils size={28} className="text-white" />;
        case "Transportation":
          return <Bus size={28} className="text-white" />;
        case "Housing & Utilities":
          return <Home size={28} className="text-white" />;
        case "Subscriptions & Bills":
          return <CreditCard size={28} className="text-white" />;
        case "Shopping & Personal Care":
          return <ShoppingBag size={28} className="text-white" />;
        case "Education & Work":
          return <GraduationCap size={28} className="text-white" />;
        case "Health & Wellness":
          return <HeartPulse size={28} className="text-white" />;
        case "Miscellaneous":
          return <MoreHorizontal size={28} className="text-white" />;
        default:
          return <Wallet size={28} className="text-white" />;
      }
    })(),
  },
];

// 8 Useful Categories
const categories = [
  {
    icon: <Utensils size={22} className="text-white" />,
    title: "Food & Groceries",
    desc: <>Groceries, restaurants, snacks</>,
  },
  {
    icon: <Bus size={22} className="text-white" />,
    title: "Transportation",
    desc: <>Fuel, cab, metro, maintenance</>,
  },
  {
    icon: <Home size={22} className="text-white" />,
    title: "Housing & Utilities",
    desc: <>Rent, electricity, Wi-Fi</>,
  },
  {
    icon: <CreditCard size={22} className="text-white" />,
    title: "Subscriptions & Bills",
    desc: <>Streaming, mobile, insurance</>,
  },
  {
    icon: <ShoppingBag size={22} className="text-white" />,
    title: "Shopping & Personal Care",
    desc: <>Clothing, cosmetics, supplies</>,
  },
  {
    icon: <GraduationCap size={22} className="text-white" />,
    title: "Education & Work",
    desc: <>Tuition, books, courses</>,
  },
  {
    icon: <HeartPulse size={22} className="text-white" />,
    title: "Health & Wellness",
    desc: <>Gym, doctor visits, medicine</>,
  },
  {
    icon: <MoreHorizontal size={22} className="text-white" />,
    title: "Miscellaneous",
    desc: <>Other uncategorized expenses</>,
  },
];

type PieTooltipProps = {
  active?: boolean;
  payload?: {
    payload: {
      name: string;
      value: number;
      duration: string;
      color: string;
    };
  }[];
};

// Example transaction data
const transactions = [
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
];

export default function BudgetPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [editingBudgets, setEditingBudgets] = useState(false);
  const [editableBudgets, setEditableBudgets] = useState<number[]>(
    categoryExpenses.map((c) => c.value + Math.floor(Math.random() * 400 - 200))
  );

  const totalSpent = categoryExpenses.reduce((sum, cat) => sum + cat.value, 0);
const totalBudget = editableBudgets.reduce((sum, val) => sum + Number(val), 0);
const remainingBudget = totalBudget - totalSpent;

const pieData = [
  { name: "Spent", value: totalSpent, color: "#ff5c70" },
  { name: "Remaining", value: remainingBudget > 0 ? remainingBudget : 0, color: "#7b7ce6" },
];


  const handleBudgetChange = (index: number, value: string) => {
    const newBudgets = [...editableBudgets];
    newBudgets[index] = parseFloat(value) || 0;
    setEditableBudgets(newBudgets);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

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
          <div className="flex flex-col md:flex-row gap-3">
            {/* Left Column */}
            <div className="flex flex-col gap-3 flex-[3_3_0%]">
              {/* Section 1 */}
              <div className="bg-white rounded-none shadow-xl p-6 min-h-[180px] flex flex-col">
                <div className="text-md font-semibold text-[#6c7a93] mb-2">
                  BUDGET VS ACTUAL COMPARISON
                </div>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                  {/* Pie Chart */}
                  <div className="w-full h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={categoryExpenses.map((cat) => ({
                          name: cat.name,
                          actual: cat.value,
                          budget: cat.value + Math.floor(Math.random() * 400), // Simulated budget
                        }))}
                        margin={{ top: 40, right: 30, left: 10, bottom: 5 }} // Add extra top margin for legend space
                      >
                        <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                        <YAxis />
                        <Tooltip />
                        <Legend
                          layout="vertical"
                          verticalAlign="top"
                          align="right"
                          iconType="circle"
                          wrapperStyle={{ top: 0 }}
                        />
                        <Bar
                          dataKey="actual"
                          fill="#7b7ce6"
                          name="Actual Spent"
                          radius={[6, 6, 0, 0]}
                        />
                        <Bar
                          dataKey="budget"
                          fill="#ffb64d"
                          name="Budgeted"
                          radius={[6, 6, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  {/* Legends */}
                </div>
              </div>
              <div className=" flex flex-col md:flex-row gap-4">
                {/* Left Section */}
                <div className="bg-white rounded-none shadow-xl p-6 flex flex-col max-w-3xl w-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-md font-semibold text-[#6c7a93]">
                      CATEGORY WISE BUDGET
                    </div>
                    <button
                      onClick={() => setEditingBudgets(!editingBudgets)}
                      className="text-sm font-medium text-[#7b7ce6] hover:underline"
                    >
                      {editingBudgets ? <Save size={20} /> : <Edit size={20} />}
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {categories.map((cat, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 group cursor-pointer transition"
                      >
                        <div className="w-11 h-11 rounded-2xl bg-[#232b3e] flex items-center justify-center">
                          {cat.icon}
                        </div>
                        <div className="flex-1">
                          <div className="text-base font-semibold text-[#232b3e]">
                            {cat.title}
                          </div>
                          <div className="text-sm text-[#6c7a93]">
                            {cat.desc}
                          </div>
                          <div className="text-xs text-[#6c7a93] mt-1 flex gap-4">
                            <span>
                              <strong>Spent:</strong> $
                              {categoryExpenses[i].value}
                            </span>
                            <span>
                              <strong>Budget:</strong>{" "}
                              {editingBudgets ? (
                                <input
                                  type="number"
                                  value={editableBudgets[i]}
                                  onChange={(e) =>
                                    handleBudgetChange(i, e.target.value)
                                  }
                                  className="border px-1 py-[1px] text-sm w-[70px]"
                                />
                              ) : (
                                `$${editableBudgets[i]}`
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Section - Summary Cards */}
                <div className="flex flex-col gap-4 w-full max-w-md">
                  {summaryCards.slice(0, 3).map((card, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-none shadow-xl px-5 py-4 flex items-center justify-between"
                    >
                      <div>
                        <div className="text-xs font-semibold text-[#6c7a93] mb-1">
                          {card.title}
                        </div>
                        <div className="text-xl font-bold text-[#232b3e]">
                          {card.value}
                        </div>
                        <div className="text-sm mt-1">
                          <span
                            className={`${card.changeColor} font-semibold mr-1`}
                          >
                            {card.change}
                          </span>
                          <span className="text-[#6c7a93]">
                            {card.changeText}
                          </span>
                        </div>
                      </div>
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center ${card.iconBg}`}
                      >
                        {card.icon}
                      </div>
                    </div>
                  ))}
                  <div className="bg-white rounded-none shadow-xl px-5 py-4 flex items-center justify-between">
                    </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
