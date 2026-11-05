'use client';

import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';

interface HeaderProps {
  onOpenSidebar: () => void;
}

export default function Header({ onOpenSidebar }: HeaderProps) {
  // State untuk data profil admin yang dinamis
  const [userName, setUserName] = useState('Admin FineXa');
  const [userEmail, setUserEmail] = useState('admin@gmail.com');

 useEffect(() => {
    const storedName = localStorage.getItem('nama');
    const storedEmail = localStorage.getItem('email');

    if (storedName) setUserName(storedName);
    if (storedEmail) setUserEmail(storedEmail);
  }, []);

  // Fungsi untuk membuat inisial otomatis dari nama (Contoh: "Hero Manurung" -> "HM")
  const getInitials = (name: string) => {
    const words = name.trim().split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <header className="h-16 bg-white border-b border-gray-100 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        {/* Teks Header yang sudah dipercantik */}
        <div className="flex flex-col">
          <span className="text-xs md:text-sm font-bold text-gray-900 tracking-tight">
            FineXa Management System
          </span>
          <span className="text-[10px] text-gray-400 hidden sm:inline">
            Pusat Kendali & Analisis Platform
          </span>
        </div>
      </div>

      {/* Profil Admin (Tanpa Lonceng) */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 pl-2">
          {/* Kotak Inisial Dinamis */}
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 font-extrabold flex items-center justify-center text-xs shadow-inner">
            {getInitials(userName)}
          </div>
          
          {/* Nama & Email Dinamis dari Akun Login */}
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-bold text-gray-900">{userName}</span>
            <span className="text-[10px] text-gray-400 font-medium">{userEmail}</span>
          </div>
        </div>
      </div>
    </header>
  );
}