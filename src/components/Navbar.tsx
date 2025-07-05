'use client';

import React from "react";
import {
  Menu,
  Sun,
  Moon,
  Settings,
  Bell,
  User,
} from "lucide-react";

type NavbarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
};

const Navbar: React.FC<NavbarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  darkMode,
  setDarkMode,
}) => {
  return (
    <nav className="flex items-center justify-between px-4 md:px-8 py-3 bg-[#f7fafd] dark:bg-[#232b3e] shadow-sm">
      <div className="flex items-center gap-4">
        {/* Hamburger */}
        <button
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-[#232b3e] transition"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          <Menu size={24} className="text-[#5a6a82] dark:text-white" />
        </button>
        {/* Breadcrumb */}
        <span className="text-[#5a6a82] dark:text-white text-sm font-medium">
          Home <span className="mx-1">{'>'}</span> <span className="text-[#232b3e] dark:text-white font-semibold">Dashboard</span>
        </span>
      </div>
      <div className="flex items-center gap-6">
        {/* Theme Toggle */}
        <button
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-[#232b3e] transition"
          aria-label="Toggle theme"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? (
            <Sun size={22} className="text-[#5a6a82] dark:text-white" />
          ) : (
            <Moon size={22} className="text-[#5a6a82]" />
          )}
        </button>
        {/* Settings */}
        <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-[#232b3e] transition" aria-label="Settings">
          <Settings size={22} className="text-[#5a6a82] dark:text-white" />
        </button>
        {/* Notifications */}
        <div className="relative">
          <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-[#232b3e] transition" aria-label="Notifications">
            <Bell size={22} className="text-[#5a6a82] dark:text-white" />
          </button>
          <span className="absolute -top-1 -right-1 bg-[#2edfc2] text-white text-xs font-bold rounded-full px-1.5 py-0.5">
            3
          </span>
        </div>
        {/* User */}
        <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-[#232b3e] transition" aria-label="User">
          <User size={22} className="text-[#5a6a82] dark:text-white" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;