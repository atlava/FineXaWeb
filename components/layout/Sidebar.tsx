'use client';

import React from 'react';
import Link from 'next/link';
import Image from "next/image";
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BarChart3,
  HelpCircle,
  Users,
  LogOut,
  X,
} from 'lucide-react';

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  onOpenLogout: () => void;
}

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  onOpenLogout,
}: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'User Management', href: '/users', icon: Users },
    { name: 'FAQ Management', href: '/faq', icon: HelpCircle },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  ];

  return (
    <>
      {/* Overlay Mobile */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR STICKY */}
      <aside
        className={`fixed md:sticky top-0 inset-y-0 left-0 z-50 h-screen w-64 bg-white border-r border-brand flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Logo Brand & Badge Admin */}
          <div className="flex items-center gap-0 px-7 py-7">
            <Image
            src="/images/logo_finexa.png"
            alt="Logo FineXa"
            width={50}
            height={50}
            className="rounded-xl"
            />
            <span className="text-xl font-bold" style={{ color: "#0C4137" }}>
              FineXa
              </span>
            </div>
          <div className="px-7 py-0">
            <span className="bg-amber-100/70 text-amber-700 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
              Admin Panel
            </span>
          </div>

          {/* Navigasi Menu */}
          <nav className="p-4 space-y-1.5 mt-5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-F0FDF4 text-brand shadow-sm'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-brand' : 'text-brand'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Tombol Keluar di Sidebar */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={onOpenLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-5 h-5 text-red-500" />
            Keluar
          </button>
        </div>
      </aside>
    </>
  );
}