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
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

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
const maxCategoryPercent = ((maxCategory.value / totalExpenses) * 100).toFixed(1);

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

// Custom Tooltip for Pie Chart
const CustomPieTooltip = ({ active, payload }: PieTooltipProps) => {
  if (active && payload && payload.length) {
    const { name, value, duration, color } = payload[0].payload;
    return (
      <div className="flex flex-col items-start">
        {/* Tooltip content */}
        <div
          className="bg-white shadow-lg rounded px-3 py-2 mt-1 ml-2 border border-gray-200"
          style={{ minWidth: 140 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ background: color }}
            />
            <span className="font-semibold text-sm text-[#232b3e]">{name}</span>
          </div>
          <div className="text-xs text-[#6c7a93]">
            Expense: <span className="font-semibold">${value}</span>
          </div>
          <div className="text-xs text-[#6c7a93]">Duration: {duration}</div>
        </div>
      </div>
    );
  }
  return null;
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
    const label = date.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
    return {
      dateLabel: label,
      items: [
        { heading: "Online Subscription", amount: -12.99 },
        { heading: "Freelance", amount: 200 },
      ],
    };
  }),
];

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

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
          {/* Summary Cards */}
          <div className="flex flex-col gap-2 md:flex-row md:gap-3 mb-4">
            {summaryCards.map((card, i) => (
              <div
                key={i}
                className="flex-1 min-w-[220px] bg-white rounded-none shadow-xl flex items-center justify-between px-6 py-5"
              >
                <div>
                  <div className="text-xs font-semibold text-[#6c7a93] mb-1">
                    {card.title}
                  </div>
                  <div className="text-2xl font-bold text-[#232b3e]">
                    {card.value}
                  </div>
                  <div className="text-sm mt-1">
                    <span className={`${card.changeColor} font-semibold mr-1`}>
                      {card.change}
                    </span>
                    <span className="text-[#6c7a93]">{card.changeText}</span>
                  </div>
                </div>
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center ${card.iconBg}`}
                >
                  {card.icon}
                </div>
              </div>
            ))}
          </div>

          {/* Main Sections */}
          <div className="flex flex-col md:flex-row gap-3">
            {/* Left Column */}
            <div className="flex flex-col gap-3 flex-[3_3_0%]">
              {/* Section 1 */}
              <div className="bg-white rounded-none shadow-xl p-6 min-h-[180px] flex flex-col">
                <div className="text-md font-semibold text-[#6c7a93] mb-2">
                  EXPENSE DISTRIBUTION
                </div>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                  {/* Pie Chart */}
                  <div className="w-full md:w-1/2 flex justify-center">
                    <ResponsiveContainer width={220} height={220}>
                      <PieChart>
                        <Pie
                          data={categoryExpenses}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={90}
                          innerRadius={55}
                          paddingAngle={2}
                          isAnimationActive={true}
                        >
                          {categoryExpenses.map((entry, idx) => (
                            <Cell key={`cell-${idx}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomPieTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  {/* Legends */}
                  <div className="flex-1 flex flex-col gap-2 md:justify-center md:mt-2">
                    {categoryExpenses.map((cat, idx) => (
                      <div key={cat.name} className="flex items-center gap-2 text-sm">
                        <span
                          className="inline-block w-3 h-3 rounded-full"
                          style={{ background: cat.color }}
                        />
                        <span className="text-[#232b3e] font-medium">{cat.name}</span>
                        <span className="ml-auto text-[#6c7a93]">${cat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-none shadow-xl p-6 flex flex-col">
                <div className="text-md font-semibold text-[#6c7a93] mb-4">
                  CATEGORIES
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
                        <div className="text-sm text-[#6c7a93]">{cat.desc}</div>
                      </div>
                      <ChevronRight
                        size={18}
                        className="text-[#232b3e] transform transition-transform duration-200 group-hover:translate-x-2"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex-[2_2_0%] flex flex-col">
              <div
                className="bg-white rounded-none shadow-xl p-6 flex flex-col"
                style={{
                  maxHeight: "616px", // Reduced height (adjust as needed)
                  height: "616px",    // Fixed height for the section
                }}
              >
                <div className="text-md font-semibold text-[#6c7a93] mb-2 flex items-center justify-between">
                  <span>RECENT TRANSACTIONS</span>
                  <span className="text-xs text-[#6c7a93] font-normal">
                    {(() => {
                      const dates = transactions
                        .slice(2)
                        .map((t) => t.dateLabel)
                        .reverse();
                      return dates.length
                        ? `${dates[dates.length - 1]} - ${dates[0]}`
                        : "";
                    })()}
                  </span>
                </div>
                <div className="flex-1 min-h-0 overflow-y-auto pr-1 scrollbar-hide">
                  {transactions.map((section, idx) => (
                    <div key={section.dateLabel} className="mb-2">
                      <div className="text-[15px] font-semibold text-[#232b3e] mb-1 mt-2 uppercase tracking-wide">
                        {section.dateLabel}
                      </div>
                      <div className="flex flex-col gap-1">
                        {section.items.map((tx, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between px-1 py-1"
                          >
                            <div>
                              <div className="text-[15px] font-medium text-[#6c7a93] leading-tight">
                                {tx.heading}
                              </div>
                              <div className="text-xs text-[#b0b7c3] mt-0.5">
                                {section.dateLabel === "Today"
                                  ? "12:30 PM"
                                  : section.dateLabel === "Yesterday"
                                  ? "09:15 AM"
                                  : "08:00 AM"}
                              </div>
                            </div>
                            <div className="pl-2">
                              {typeof tx.amount === "string" && tx.amount === "Pending" ? (
                                <span className="text-sm font-semibold text-yellow-400">
                                  Pending
                                </span>
                              ) : typeof tx.amount === "number" ? (
                                <span
                                  className={`text-[15px] font-semibold ${
                                    tx.amount < 0 ? "text-red-500" : "text-green-500"
                                  }`}
                                >
                                  {tx.amount < 0 ? "- " : "+ "}
                                  ${Math.abs(tx.amount)}
                                </span>
                              ) : null}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
