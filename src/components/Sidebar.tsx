'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ReceiptText,
  Wallet,
  User,
  LogOut,
} from 'lucide-react';

const navItems = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard size={20} />,
  },
  {
    key: 'transactions',
    label: 'Transactions',
    href: '/transactions',
    icon: <ReceiptText size={20} />,
  },
  {
    key: 'budget',
    label: 'Budget',
    href: '/budget',
    icon: <Wallet size={20} />,
  },
];

const accountItems = [
  {
    key: 'profile',
    label: 'Profile',
    href: '/profile',
    icon: <User size={20} />,
  },
  {
    key: 'logout',
    label: 'Logout',
    href: '/logout',
    icon: <LogOut size={20} />,
  },
];

type SidebarProps = {
  open?: boolean;
  setOpen?: (open: boolean) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ open = true }) => {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    const current = pathname.split('/')[1];
    setActiveTab(current || 'dashboard');
  }, [pathname]);

  return (
    <aside
      className={`${
        open ? 'w-64' : 'w-22'
      } h-screen bg-[#44506a] text-white flex flex-col py-8 gap-8 font-sans transition-all duration-300`}
    >
      {/* User Info */}
      <div className="flex items-center gap-4 mb-3 px-5">
        <div className="w-12 h-12 rounded-full bg-[#3ed2a7] flex items-center justify-center text-[#44506a] font-bold text-lg">
          JD
        </div>
        {open && (
          <div className="flex flex-col">
            <span className="text-base font-semibold leading-tight">
              John Doe
            </span>
            <span className="text-xs text-[#bfc9da] leading-tight">
              john.doe@email.com
            </span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div>
        {open && (
          <div className="text-xs font-bold text-[#bfc9da] mb-4 tracking-wider px-6">
            NAVIGATION
          </div>
        )}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              title={item.label}
              aria-current={activeTab === item.key ? 'page' : undefined}
              className={`flex items-center gap-3 w-full text-left rounded-none px-6 py-3 text-base font-medium transition-colors ${
                activeTab === item.key
                  ? 'bg-[#35405a] text-white border-l-4 border-[#3ed2a7]'
                  : 'text-[#bfc9da] hover:bg-[#35405a] hover:text-white'
              }`}
              style={{ minHeight: '48px' }}
            >
              <span className="shrink-0">{item.icon}</span>
              {open && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Account */}
      <div>
        {open && (
          <div className="text-xs font-bold text-[#bfc9da] mb-4 px-6 tracking-wider">
            ACCOUNT
          </div>
        )}
        <nav className="flex flex-col gap-1">
          {accountItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              title={item.label}
              aria-current={activeTab === item.key ? 'page' : undefined}
              className={`flex items-center gap-3 w-full text-left rounded-none px-6 py-3 text-base font-medium transition-colors ${
                activeTab === item.key
                  ? 'bg-[#35405a] text-white border-l-4 border-[#3ed2a7]'
                  : 'text-[#bfc9da] hover:bg-[#35405a] hover:text-white'
              }`}
              style={{ minHeight: '48px' }}
            >
              <span className="shrink-0">{item.icon}</span>
              {open && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
