'use client';

import React from 'react';
import { X, Mail, Briefcase, AlertCircle, Trash2 } from 'lucide-react';

interface UserTarget {
  id: number;
  name: string;
  email: string;
  role: string;
  balance?: string;
}

interface Props {
  user: UserTarget | null;
  error: string | null;
  isDeleting: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function DeleteUserModal({ user, error, isDeleting, onConfirm, onClose }: Props) {
  if (!user) return null;

  const isError = error !== null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-sm w-full p-6 shadow-xl">
        <button
          onClick={onClose}
          aria-label="Tutup"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto bg-red-100 text-red-500">
            {isError ? <AlertCircle className="w-6 h-6" /> : <Trash2 className="w-6 h-6" />}
          </div>
          <h3 className="mt-3 text-xl font-bold text-gray-900">
            {isError ? 'Gagal Menghapus User' : 'Hapus User?'}
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            {isError
              ? 'Operasi tidak dapat diproses oleh sistem'
              : 'User akan dihapus secara permanen'}
          </p>
        </div>

        {isError && (
          <div
            role="alert"
            className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700 leading-relaxed"
          >
            {error}
          </div>
        )}

        <div className="mt-4 rounded-2xl border border-gray-100 bg-gray-50 p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-200 shrink-0" />
            <div>
              <p className="font-bold text-gray-900">{user.name}</p>
              <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">
                {user.role}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-white border border-gray-100 p-3">
            <Mail className="w-4 h-4 text-gray-400" />
            <span className="text-xs font-semibold text-gray-700">{user.email}</span>
          </div>

          {user.balance && (
            <div className="flex items-center gap-3 rounded-xl bg-white border border-gray-100 p-3">
              <Briefcase className="w-4 h-4 text-gray-400" />
              <span className="text-xs font-semibold text-gray-700">{user.balance}</span>
            </div>
          )}
        </div>

        <div className="mt-5 space-y-2">
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 disabled:opacity-60 text-white text-sm font-bold"
          >
            {isDeleting ? 'Menghapus...' : isError ? 'Coba Lagi' : 'Ya, Hapus'}
          </button>
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl border border-gray-900 text-gray-900 text-sm font-bold hover:bg-gray-50"
          >
            Batalkan
          </button>
        </div>
      </div>
    </div>
  );
}