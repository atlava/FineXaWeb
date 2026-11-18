'use client';

import React from 'react';

interface LogoutError {
  message: string;
  code?: string; // contoh: "ERR_SESSION_LOGOUT_TIMEOUT (Status 504)"
}

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  error?: LogoutError | null; // opsional, jadi pemanggil lama tidak rusak
  isLoggingOut?: boolean;
}

export default function LogoutModal({
  isOpen,
  onClose,
  onConfirm,
  error = null,
  isLoggingOut = false,
}: LogoutModalProps) {
  if (!isOpen) return null;

  const isError = error !== null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl text-center space-y-4 transform transition-all">
        <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
          {isError ? 'Gagal Mengakhiri Sesi' : 'Kamu yakin ingin keluar?'}
        </h3>

        <p className="text-gray-400 text-xs md:text-sm leading-relaxed px-2">
          {isError
            ? error.message
            : 'Sesi Anda akan diakhiri. Anda perlu login kembali untuk mengakses FineXa.'}
        </p>

        {isError && error.code && (
          <code
            role="alert"
            className="inline-block text-[10px] px-2.5 py-1 rounded-md bg-gray-50 border border-gray-200 text-gray-600"
          >
            <span className="text-red-500">●</span> {error.code}
          </code>
        )}

        <div className="flex items-center justify-center gap-3 pt-4">
          {isError ? (
            <>
              <button
                onClick={onConfirm}
                disabled={isLoggingOut}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-semibold text-xs md:text-sm px-6 py-2.5 rounded-full transition-all shadow-sm hover:shadow"
              >
                {isLoggingOut ? 'Mencoba...' : 'Coba Keluar Lagi'}
              </button>
              <button
                onClick={onClose}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold text-xs md:text-sm px-6 py-2.5 rounded-full transition-all shadow-sm hover:shadow"
              >
                Tetap di Sini
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onClose}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs md:text-sm px-6 py-2.5 rounded-full transition-all shadow-sm hover:shadow"
              >
                Tidak, Kembali
              </button>
              <button
                onClick={onConfirm}
                disabled={isLoggingOut}
                className="bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white font-semibold text-xs md:text-sm px-6 py-2.5 rounded-full transition-all shadow-sm hover:shadow"
              >
                {isLoggingOut ? 'Keluar...' : 'Ya, Keluar'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}