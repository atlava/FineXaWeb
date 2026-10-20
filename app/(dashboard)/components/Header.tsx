'use client';

import React from 'react';
import { Menu, Bell } from 'lucide-react';

interface HeaderProps {
  onOpenSidebar: () => void;
}

export default function Header({ onOpenSidebar }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-100 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
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
  );
}