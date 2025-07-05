'use client'
import React, { useState } from "react";
import Link from "next/link";

const navItems = [
	{
		key: "dashboard",
		label: "Dashboard",
		href: "/dashboard",
		icon: (
			<svg width="22" height="22" fill="none" viewBox="0 0 24 24">
				<path
					d="M3 10.5L12 4l9 6.5V20a1 1 0 0 1-1 1h-5v-5h-6v5H4a1 1 0 0 1-1-1V10.5z"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinejoin="round"
				/>
			</svg>
		),
	},
	{
		key: "transactions",
		label: "Transactions",
		href: "/transactions",
		icon: (
			<svg width="22" height="22" fill="none" viewBox="0 0 24 24">
				<rect
					x="4"
					y="4"
					width="16"
					height="16"
					rx="2"
					stroke="currentColor"
					strokeWidth="1.5"
				/>
				<path
					d="M8 8h8M8 12h8M8 16h4"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
				/>
			</svg>
		),
	},
	{
		key: "budget",
		label: "Budget",
		href: "/budget",
		icon: (
			<svg width="22" height="22" fill="none" viewBox="0 0 24 24">
				<rect
					x="2"
					y="7"
					width="20"
					height="10"
					rx="2"
					stroke="currentColor"
					strokeWidth="1.5"
				/>
				<circle cx="16" cy="12" r="1" fill="currentColor" />
			</svg>
		),
	},
];

const accountItems = [
	{
		key: "profile",
		label: "Profile",
		href: "/profile",
		icon: (
			<svg width="22" height="22" fill="none" viewBox="0 0 24 24">
				<circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
				<path
					d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6"
					stroke="currentColor"
					strokeWidth="1.5"
				/>
			</svg>
		),
	},
	{
		key: "logout",
		label: "Logout",
		href: "/logout",
		icon: (
			<svg width="22" height="22" fill="none" viewBox="0 0 24 24">
				<path
					d="M16 17l5-5-5-5"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M21 12H9"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M12 19v2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinejoin="round"
				/>
			</svg>
		),
	},
];

type SidebarProps = {
	open?: boolean;
	setOpen?: (open: boolean) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
	const [activeTab, setActiveTab] = useState("dashboard");

	return (
		<aside className="w-64 h-screen bg-[#44506a] text-white flex flex-col py-8 gap-8 font-sans">
			{/* User Profile */}
			<div className="flex items-center gap-4 mb-3 ml-5">
				<div className="w-12 h-12 rounded-full bg-[#3ed2a7] flex items-center justify-center overflow-hidden">
					<svg width="32" height="32" fill="none" viewBox="0 0 24 24">
						<circle cx="12" cy="8" r="4" fill="#fff" />
						<path d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6" fill="#fff" />
					</svg>
				</div>
				<div className="flex flex-col">
					<span className="text-base font-semibold leading-tight">
						John Doe
					</span>
					<span className="text-xs text-[#bfc9da] leading-tight">
						john.doe@email.com
					</span>
				</div>
			</div>

			{/* NAVIGATION */}
			<div>
				<div className="text-xs font-bold text-[#bfc9da] mb-4 tracking-wider ml-6">
					NAVIGATION
				</div>
				<nav className="flex flex-col gap-1">
					{navItems.map((item) => (
						<Link
							key={item.key}
							href={item.href}
							onClick={() => setActiveTab(item.key)}
							className={`flex items-center gap-3 w-full text-left rounded-none px-6 py-3 text-lg font-medium transition-colors
                ${
									activeTab === item.key
										? "bg-[#35405a] text-white border-l-4 border-[#3ed2a7]"
										: "text-[#bfc9da] hover:bg-[#35405a] hover:text-white"
								}
              `}
							style={{ minHeight: "48px" }}
						>
							<span className="shrink-0">{item.icon}</span>
							{item.label}
						</Link>
					))}
				</nav>
			</div>

			{/* Spacer to push ACCOUNT to bottom */}
			<div className="flex-1"></div>

			{/* ACCOUNT */}
			<div>
				<div className="text-xs font-bold text-[#bfc9da] mb-4 ml-6 tracking-wider">
					ACCOUNT
				</div>
				<nav className="flex flex-col gap-1">
					{accountItems.map((item) => (
						<Link
							key={item.key}
							href={item.href}
							onClick={() => setActiveTab(item.key)}
							className={`flex items-center gap-3 w-full text-left rounded-none px-6 py-3 text-lg font-medium transition-colors
                ${
									activeTab === item.key
										? "bg-[#35405a] text-white border-l-4 border-[#3ed2a7]"
										: "text-[#bfc9da] hover:bg-[#35405a] hover:text-white"
								}
              `}
							style={{ minHeight: "48px" }}
						>
							<span className="shrink-0">{item.icon}</span>
							{item.label}
						</Link>
					))}
				</nav>
			</div>
		</aside>
	);
};

export default Sidebar;