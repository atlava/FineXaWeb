'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginAdmin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/');
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* Bagian Kiri: Visual Dark Teal khas FineXa (Sesuai Figma) */}
      <div className="md:w-1/2 bg-gradient-to-br from-[#1B5245] to-[#0E352B] text-white flex flex-col justify-center px-8 py-12 md:p-16 relative overflow-hidden">
        <div className="relative z-10 max-w-lg mx-auto md:mx-0">
          {/* Logo & Brand FineXa */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center border border-emerald-400/30">
              <span className="text-emerald-400 text-2xl font-black">↗</span>
            </div>
            <span className="text-3xl font-bold tracking-tight text-white">FineXa</span>
          </div>

          {/* Judul Utama */}
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">
            Platform Investasi<br />Terpercaya untuk<br />Masa Depan
          </h1>

          {/* Sub-judul */}
          <p className="text-sm md:text-base text-gray-300 mb-12 font-normal leading-relaxed">
            Rekomendasi investasi yang dipersonalisasi berdasarkan profil risiko dan tujuan finansial Anda.
          </p>

          {/* Statistik 3 Kolom */}
          <div className="flex gap-8 md:gap-12 border-t border-white/10 pt-8">
            <div>
              <p className="text-2xl md:text-3xl font-extrabold text-white">5,000+</p>
              <p className="text-xs text-gray-300 font-medium mt-1">Active Users</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-extrabold text-white">98%</p>
              <p className="text-xs text-gray-300 font-medium mt-1">Satisfaction</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-extrabold text-white">₹150B+</p>
              <p className="text-xs text-gray-300 font-medium mt-1">
                Assets Under<br />Management
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bagian Kanan: Form Login */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-16 bg-white">
        <div className="w-full max-w-md space-y-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
              Selamat Datang Kembali
            </h2>
            <p className="text-xs md:text-sm text-gray-500 mt-1">
              Masuk ke akun FineXa Anda untuk melanjutkan
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Input Email dengan Ikon */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Alamat Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs md:text-sm text-gray-900 focus:outline-none focus:border-[#1B5245] focus:bg-white transition-all"
                  required
                />
              </div>
            </div>

            {/* Input Password dengan Ikon Lock & Toggle Eye */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs md:text-sm text-gray-900 focus:outline-none focus:border-[#1B5245] focus:bg-white transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Link Lupa Password */}
            <div className="flex justify-end">
              <Link href="#" className="text-xs font-semibold text-emerald-600 hover:underline">
                Lupa password?
              </Link>
            </div>

            {/* Tombol Masuk */}
            <button
              type="submit"
              className="w-full bg-[#0F3D32] hover:bg-[#0B2E26] text-white font-bold py-3 rounded-xl text-xs md:text-sm shadow-md hover:shadow-lg transition-all duration-200"
            >
              Masuk ke Dashboard
            </button>

            {/* Link Daftar */}
            <p className="text-center text-xs text-gray-500 pt-2">
              Belum punya akun?{' '}
              <Link href="#" className="font-bold text-emerald-600 hover:underline">
                Daftar sekarang
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}