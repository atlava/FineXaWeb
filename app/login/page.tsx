'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginAdmin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/');
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Visual Kiri */}
      <div className="md:w-1/2 relative overflow-hidden bg-gradient-to-b from-[#51BA55] to-[#3A8E3F] text-white flex flex-col justify-center px-8 py-12 md:p-16 rounded-b-[30px] md:rounded-none z-0">
        <div className="absolute -top-10 -right-20 w-80 h-80 md:w-[450px] md:h-[450px] bg-white opacity-10 rounded-full pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-40 h-40 md:w-56 md:h-56 bg-white opacity-10 rounded-full pointer-events-none" />
        <div className="relative z-10 flex flex-col h-full justify-center">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-xl flex items-center justify-center font-bold text-xl">
              FX
            </div>
            <span className="text-3xl font-bold tracking-wide">FineXa</span>
          </div>
          <h1 className="text-4xl md:text-[42px] font-bold leading-[1.2] mb-5">
            Platform Investasi<br />Terpercaya untuk<br />Masa Depan
          </h1>
          <p className="text-sm md:text-base text-white/80 mb-14 max-w-md font-light leading-relaxed">
            Rekomendasi investasi yang dipersonalisasi berdasarkan profil risiko dan tujuan finansial Anda.
          </p>
          <div className="flex gap-6 md:gap-10">
            <div className="flex flex-col">
              <span className="text-2xl md:text-[28px] font-bold mb-1">5,000+</span>
              <span className="text-xs md:text-sm text-white/80 font-light">Active Users</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl md:text-[28px] font-bold mb-1">98%</span>
              <span className="text-xs md:text-sm text-white/80 font-light">Satisfaction</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl md:text-[28px] font-bold mb-1">Rp 150B+</span>
              <span className="text-xs md:text-sm text-white/80 font-light leading-tight">
                Assets Under<br />Management
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Kanan */}
      <div className="w-full md:w-1/2 flex items-start md:items-center justify-center p-6 md:p-16 -mt-10 md:mt-0 z-10">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Selamat Datang Kembali</h2>
          <p className="text-sm text-gray-500 mb-6">Masuk ke akun FineXa Anda untuk melanjutkan</p>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Alamat Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@gmail.com"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 transition-all text-sm"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 transition-all text-sm"
                required
              />
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 border-gray-300 rounded accent-emerald-600 cursor-pointer"
                />
                Ingat Saya
              </label>
              <Link href="#" className="font-medium text-emerald-600 hover:underline">
                Lupa password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-[#0F3D32] hover:bg-[#0B2E26] text-white font-bold py-3 rounded-xl text-xs md:text-sm shadow-md hover:shadow-lg transition-all duration-200"
            >
              Masuk ke Dashboard
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}