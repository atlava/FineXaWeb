'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

const CREDENTIAL_ERROR = 'Format email tidak valid atau akun tidak terdaftar';

export default function LoginAdmin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ===== ERROR STATES =====
  // Error per field (email / password salah, kosong, format tidak valid)
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  // Error server (5xx / server mati), bukan salah input user
  const [serverError, setServerError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Validasi di frontend dulu (tanpa request ke server)
    const errs: { email?: string; password?: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      errs.email = 'Email tidak boleh kosong';
    } else if (!emailRegex.test(email)) {
      errs.email = "Email tidak valid. Pastikan terdapat tanda '@' dan domain (contoh: user@mail.com).";
    }
    if (!password) {
      errs.password = 'Password tidak boleh kosong';
    }

    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setIsLoading(true);

    try {
      // Menembak API Express milikmu
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, platform: 'web' }),
      });

      // .catch penting: saat server error, balasan bisa HTML/kosong dan json() akan throw
      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        // Ambil token, nama, dan email dari response JSON backend
        const token = data.token || (data.data && data.data.token);
        const nama = data.nama || (data.data && data.data.nama);
        const userEmail = data.email || (data.data && data.data.email);

        // Simpan semuanya ke browser localStorage agar bisa dibaca Header
        if (token) localStorage.setItem('token', token);
        if (nama) localStorage.setItem('nama', nama);
        if (userEmail) localStorage.setItem('email', userEmail);

        // Login sukses, meluncur ke dashboard!
        router.push('/');
        return;
      }

      if (response.status >= 500) {
        // Server error / database gangguan
        setServerError(
          `Terjadi gangguan pada server (Status ${response.status}). Silakan coba lagi beberapa saat.`
        );
      } else {
        // 400 / 401 / 404 dst: kredensial salah. Pesan sengaja sama di kedua field
        // supaya tidak membocorkan apakah email atau password yang salah.
        setFieldErrors({ email: CREDENTIAL_ERROR, password: CREDENTIAL_ERROR });
      }
    } catch (err) {
      console.error(err);
      // Fetch gagal total (server mati, timeout, CORS)
      setServerError('Tidak dapat terhubung ke server. Periksa koneksi Anda lalu coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* Visual Kiri */}
      <div className="md:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#1f8a74] via-[#0f5c4b] to-[#0C4137] text-white flex flex-col justify-center px-8 py-12 md:p-16 rounded-b-[30px] md:rounded-none z-0">
        <div className="absolute -top-10 -right-20 w-80 h-80 md:w-[450px] md:h-[450px] bg-white opacity-10 rounded-full pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-40 h-40 md:w-56 md:h-56 bg-white opacity-10 rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full justify-center">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-10">
            <Image
              src="/images/logo_finexa.png"
              alt="Logo FineXa"
              width={180}
              height={180}
              className="w-28 h-28 md:w-40 md:h-40"
            />
            <span className="text-5xl md:text-6xl font-bold">FineXa</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold leading-[1.25] mb-5 max-w-md">
            Platform Investasi<br />Terpercaya untuk<br />Masa Depan
          </h1>
          <p className="text-sm text-white/80 mb-12 max-w-md font-light leading-relaxed">
            Rekomendasi investasi yang dipersonalisasi berdasarkan profil risiko dan tujuan finansial Anda.
          </p>

          {/* Statistik */}
          <div className="grid grid-cols-3 gap-4 max-w-md text-center">
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
                <span className="text-2xl md:text-[28px] font-bold mb-1 whitespace-nowrap">Rp 150B+</span>
                <span className="text-xs md:text-sm text-white/80 font-light leading-tight">
                  Assets Under<br />Management
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Kanan */}
      <div className="w-full md:w-1/2 flex items-start md:items-center justify-center p-6 md:p-16 -mt-10 md:mt-0 z-10">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Selamat Datang Kembali</h2>
          <p className="text-sm text-gray-500 mb-6">Masuk ke akun FineXa Anda untuk melanjutkan</p>

          {/* Banner error server (5xx / server mati) */}
          {serverError && (
            <div
              role="alert"
              className="mb-4 flex items-start gap-2 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100"
            >
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{serverError}</span>
            </div>
          )}

          {/* noValidate: supaya error ditampilkan oleh kode kita, bukan tooltip bawaan browser */}
          <form onSubmit={handleLogin} noValidate className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Alamat Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setFieldErrors((prev) => ({ ...prev, email: undefined }));
                }}
                placeholder="admin@gmail.com"
                aria-invalid={!!fieldErrors.email}
                className={`border rounded-lg p-3 focus:outline-none focus:ring-2 transition-all text-sm text-gray-900 bg-white placeholder-gray-400 ${
                  fieldErrors.email
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-gray-300 focus:border-emerald-600 focus:ring-emerald-600/20'
                }`}
              />
              {fieldErrors.email && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setFieldErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  placeholder="Masukkan password"
                  aria-invalid={!!fieldErrors.password}
                  className={`w-full border rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 transition-all text-sm text-gray-900 bg-white placeholder-gray-400 ${
                    fieldErrors.password
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-gray-300 focus:border-emerald-600 focus:ring-emerald-600/20'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Sembunyikan password' : 'Lihat password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.password}</p>
              )}
            </div>

            <div className="flex items-center text-sm mt-1">
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 border-gray-300 rounded accent-emerald-600 cursor-pointer"
                />
                Ingat Saya
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0F3D32] hover:bg-[#0B2E26] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl text-xs md:text-sm shadow-md hover:shadow-lg transition-all duration-200"
            >
              {isLoading ? 'Memeriksa Data...' : 'Masuk ke Dashboard'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}