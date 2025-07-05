'use client';

import React, { useState, useEffect } from "react";
import {
  Wallet,
  Users,
  UserPlus,
  ShoppingCart,
  Tablet,
  Tag,
  Bug,
  Smile,
  ChevronRight,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

// Summary card data
const summaryCards = [
  {
    title: "TODAY'S MONEY",
    value: "$53,000",
    change: "+55%",
    changeText: "since yesterday",
    changeColor: "text-green-500",
    iconBg: "bg-[#7b7ce6]",
    icon: <Wallet size={28} className="text-white" />,
  },
  {
    title: "TODAY'S USERS",
    value: "2,300",
    change: "+3%",
    changeText: "since last week",
    changeColor: "text-green-500",
    iconBg: "bg-[#ff5c70]",
    icon: <Users size={28} className="text-white" />,
  },
  {
    title: "NEW CLIENTS",
    value: "+3,462",
    change: "-2%",
    changeText: "since last quarter",
    changeColor: "text-red-500",
    iconBg: "bg-[#2edfc2]",
    icon: <UserPlus size={28} className="text-white" />,
  },
  {
    title: "SALES",
    value: "$103,430",
    change: "+5%",
    changeText: "than last month",
    changeColor: "text-green-500",
    iconBg: "bg-[#ffa940]",
    icon: <ShoppingCart size={28} className="text-white" />,
  },
];

// Categories data
const categories = [
  {
    icon: <Tablet size={22} className="text-white" />,
    title: "Devices",
    desc: (
      <>
        250 in stock, <span className="text-[#7b7ce6] font-medium">346+ sold</span>
      </>
    ),
  },
  {
    icon: <Tag size={22} className="text-white" />,
    title: "Tickets",
    desc: (
      <>
        123 closed, <span className="text-[#7b7ce6] font-medium">15 open</span>
      </>
    ),
  },
  {
    icon: <Bug size={22} className="text-white" />,
    title: "Error logs",
    desc: (
      <>
        1 is active, <span className="text-[#7b7ce6] font-medium">40 closed</span>
      </>
    ),
  },
  {
    icon: <Smile size={22} className="text-white" />,
    title: "Happy users",
    desc: (
      <>
        + <span className="font-medium">430</span>
      </>
    ),
  },
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
        {/* Navbar (fixed at the top) */}
        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* Scrollable content area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {/* Summary Cards */}
          <div className="flex flex-col gap-4 md:flex-row md:gap-6 mb-8">
            {summaryCards.map((card, i) => (
              <div
                key={i}
                className="flex-1 min-w-[220px] bg-white rounded-2xl shadow-sm flex items-center justify-between px-6 py-5"
              >
                <div>
                  <div className="text-xs font-semibold text-[#6c7a93] mb-1">{card.title}</div>
                  <div className="text-2xl font-bold text-[#232b3e]">{card.value}</div>
                  <div className="text-sm mt-1">
                    <span className={`${card.changeColor} font-semibold mr-1`}>{card.change}</span>
                    <span className="text-[#6c7a93]">{card.changeText}</span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${card.iconBg}`}>
                  {card.icon}
                </div>
              </div>
            ))}
          </div>

          {/* Main Sections */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Column (2 stacked sections) */}
            <div className="flex flex-col gap-6 flex-[3_3_0%]">
              {/* Top Section */}
              <div className="bg-white rounded-2xl shadow-sm p-6 min-h-[180px] flex flex-col">
                <div className="text-lg font-semibold text-[#232b3e] mb-2">Section 1</div>
                <div className="text-[#6c7a93]">Content for the first section goes here.</div>
              </div>
              {/* Bottom Section (Categories) */}
              <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col">
                <div className="text-lg font-semibold text-[#232b3e] mb-4">Categories</div>
                <div className="flex flex-col gap-5">
                  {categories.map((cat, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-[#232b3e] flex items-center justify-center">
                        {cat.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-base font-semibold text-[#232b3e]">{cat.title}</div>
                        <div className="text-sm text-[#6c7a93]">{cat.desc}</div>
                      </div>
                      <ChevronRight size={18} className="text-[#232b3e]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Right Section */}
            <div className="flex-[2_2_0%]">
              <div className="bg-white rounded-2xl shadow-sm p-6 min-h-[390px] flex flex-col h-full">
                <div className="text-lg font-semibold text-[#232b3e] mb-2">Section 3</div>
                <div className="text-[#6c7a93]">Content for the third section goes here.</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
