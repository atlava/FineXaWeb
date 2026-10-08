'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  BarChart3,
  HelpCircle,
  Users,
  LogOut,
  Menu,
  X,
  Bell,
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const navItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'User Management', href: '/users', icon: Users },
    { name: 'FAQ Management', href: '/faq', icon: HelpCircle },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  ];

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Overlay Mobile */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Logo Brand & Badge Admin */}
          <div className="p-6 border-b border-gray-100">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                ↗
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">FineXa</span>
            </Link>
            <div className="mt-2">
              <span className="bg-amber-100/70 text-amber-700 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                Admin Panel
              </span>
            </div>
          </div>

          {/* Navigasi Menu */}
          <nav className="p-4 space-y-1.5">
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
                      ? 'bg-emerald-50 text-emerald-600 shadow-sm'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-600' : 'text-gray-400'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Tombol Keluar di Sidebar */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-5 h-5 text-red-500" />
            Keluar
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* HEADER TOPBAR */}
        <header className="h-16 bg-white border-b border-gray-100 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 text-gray-500 hover:bg-gray-50 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-xs md:text-sm font-medium text-gray-400 hidden sm:inline">
              Admin Panel / FineXa
            </span>
          </div>

          {/* Profil Admin & Notifikasi */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl relative">
              <Bell className="w-5 h-5" />
              <span className="w-2 h-2 bg-emerald-500 rounded-full absolute top-2 right-2" />
            </button>
            <div className="flex items-center gap-3 border-l border-gray-100 pl-4">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs">
                AD
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-xs font-bold text-gray-900">Admin FineXa</span>
                <span className="text-[10px] text-gray-400">admin@gmail.com</span>
              </div>
            </div>
          </div>
        </header>

        {/* KONTEN UTAMA */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* MODAL POP-UP KONFIRMASI KELUAR */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl text-center space-y-4 transform transition-all">
            <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
              Kamu yakin ingin keluar?
            </h3>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed px-2">
              Sesi Anda akan diakhiri. Anda perlu login kembali untuk mengakses FineXa.
            </p>

            <div className="flex items-center justify-center gap-3 pt-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs md:text-sm px-6 py-2.5 rounded-full transition-all shadow-sm hover:shadow"
              >
                Tidak, Kembali
              </button>
              <button
                onClick={handleConfirmLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold text-xs md:text-sm px-6 py-2.5 rounded-full transition-all shadow-sm hover:shadow"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}