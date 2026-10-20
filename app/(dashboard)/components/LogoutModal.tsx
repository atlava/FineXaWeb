'use client';

import React from 'react';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  if (!isOpen) return null;

  return (
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
            onClick={onClose}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs md:text-sm px-6 py-2.5 rounded-full transition-all shadow-sm hover:shadow"
          >
            Tidak, Kembali
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold text-xs md:text-sm px-6 py-2.5 rounded-full transition-all shadow-sm hover:shadow"
          >
            Ya, Keluar
          </button>
        </div>
      </div>
    </div>
  );
}