'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import LogoutModal from '../../components/layout/LogoutModal';

interface LogoutError {
  message: string;
  code?: string;
}

const LOGOUT_ERROR_MESSAGE =
  'Terjadi gangguan koneksi ke server saat memvalidasi status logout. Sesi Anda masih aktif demi keamanan akun.';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // ===== ERROR STATE LOGOUT =====
  const [logoutError, setLogoutError] = useState<LogoutError | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleConfirmLogout = async () => {
    setLogoutError(null);
    setIsLoggingOut(true);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        // Logout sukses: bersihkan data sesi lalu ke halaman login
        localStorage.removeItem('token');
        localStorage.removeItem('nama');
        localStorage.removeItem('email');
        setShowLogoutModal(false);
        router.push('/login');
        return;
      }

      // Server membalas tapi gagal
      setLogoutError({
        message: LOGOUT_ERROR_MESSAGE,
        code: `ERR_SESSION_LOGOUT_FAILED (Status ${res.status})`,
      });
    } catch {
      // Server mati / timeout
      setLogoutError({
        message: LOGOUT_ERROR_MESSAGE,
        code: 'ERR_SESSION_LOGOUT_TIMEOUT',
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Tutup modal + reset error supaya tidak muncul lagi saat dibuka ulang
  const handleCloseLogout = () => {
    setShowLogoutModal(false);
    setLogoutError(null);
  };

  return (
    <div className="h-screen overflow-hidden bg-gray-50 flex">
      {/* SIDEBAR (Sticky) */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        onOpenLogout={() => setShowLogoutModal(true)}
      />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header onOpenSidebar={() => setIsSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-7xl p-4 md:p-8">
            {children}
          </div>
        </main>
      </div>

      {/* MODAL LOGOUT */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={handleCloseLogout}
        onConfirm={handleConfirmLogout}
        error={logoutError}
        isLoggingOut={isLoggingOut}
      />
    </div>
  );
}