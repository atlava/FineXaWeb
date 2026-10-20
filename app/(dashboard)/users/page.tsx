'use client';

import React, { useState } from 'react';
import { Search, Eye, Trash2, X, Mail, Wallet, Calendar } from 'lucide-react';

interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
  joinDate: string;
  lastActive: string;
  roleColor: string;
}

export default function UserManagementAdmin() {
  const [users, setUsers] = useState<UserData[]>([
    { id: 1, name: 'Budi Santoso', email: 'budi@email.com', role: 'Moderat', joinDate: '10 Jan 2025', lastActive: '8 Apr 2026', roleColor: 'bg-emerald-50 text-emerald-600' },
    { id: 2, name: 'Siti Aminah', email: 'siti@email.com', role: 'Konservatif', joinDate: '15 Feb 2025', lastActive: '7 Apr 2026', roleColor: 'bg-blue-50 text-blue-600' },
    { id: 3, name: 'Ahmad Rizki', email: 'ahmad@email.com', role: 'Agresif', joinDate: '20 Nov 2024', lastActive: '15 Mar 2026', roleColor: 'bg-amber-50 text-amber-600' },
    { id: 4, name: 'Dewi Lestari', email: 'dewi@email.com', role: 'Moderat', joinDate: '5 Mar 2025', lastActive: '6 Apr 2026', roleColor: 'bg-emerald-50 text-emerald-600' },
    { id: 5, name: 'Linda Wijaya', email: 'linda@email.com', role: 'Konservatif', joinDate: '1 Apr 2025', lastActive: '8 Apr 2026', roleColor: 'bg-blue-50 text-blue-600' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [deleteUserTarget, setDeleteUserTarget] = useState<UserData | null>(null);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleConfirmDelete = () => {
    if (deleteUserTarget) {
      setUsers(users.filter((u) => u.id !== deleteUserTarget.id));
      setDeleteUserTarget(null);
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-950 tracking-tight">User Management</h1>
        <p className="text-gray-500 text-xs md:text-sm mt-1">Kelola pengguna dan akses platform FineXa</p>
      </div>

      <div className="bg-white p-3 md:p-4 rounded-xl border border-gray-100 shadow-sm relative">
        <div className="relative">
          <Search className="absolute left-3 md:left-4 top-3.5 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari nama atau email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 md:pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs md:text-sm text-gray-900 font-medium focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600 min-w-[800px]">
            <thead className="bg-gray-50 text-gray-500 text-[10px] md:text-xs font-semibold uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th className="px-4 md:px-6 py-3 md:py-4.5 whitespace-nowrap">User</th>
                <th className="px-4 md:px-6 py-3 md:py-4.5 whitespace-nowrap">Profil Risiko</th>
                <th className="px-4 md:px-6 py-3 md:py-4.5 whitespace-nowrap">Join Date</th>
                <th className="px-4 md:px-6 py-3 md:py-4.5 whitespace-nowrap">Last Active</th>
                <th className="px-4 md:px-6 py-3 md:py-4.5 text-center whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition">
                    <td className="px-4 md:px-6 py-3 md:py-4.5 flex items-center gap-2 md:gap-3 whitespace-nowrap">
                      <div className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-gray-200 flex-shrink-0" />
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-900 leading-tight text-xs md:text-sm">{user.name}</span>
                        <span className="text-[10px] md:text-xs text-gray-400 mt-0.5">{user.email}</span>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4.5 whitespace-nowrap">
                      <span className={`px-2 md:px-2.5 py-1 rounded-full text-[10px] md:text-xs font-bold ${user.roleColor}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4.5 text-gray-500 text-[10px] md:text-xs whitespace-nowrap">
                      {user.joinDate}
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4.5 text-gray-500 text-[10px] md:text-xs whitespace-nowrap">
                      {user.lastActive}
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4.5 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1 md:gap-2">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="p-1.5 md:p-2 bg-blue-50 text-blue-500 rounded-lg md:rounded-xl hover:bg-blue-100 transition-colors shadow-sm"
                        >
                          <Eye className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteUserTarget(user)}
                          className="p-1.5 md:p-2 bg-red-50 text-red-500 rounded-lg md:rounded-xl hover:bg-red-100 transition-colors shadow-sm"
                        >
                          <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-400 text-sm">
                    Data user tidak ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedUser && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl md:rounded-3xl w-full max-w-[380px] p-5 md:p-6 shadow-2xl relative border border-gray-50">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute right-4 md:right-5 top-4 md:top-5 p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            <h3 className="text-lg md:text-xl font-bold text-gray-900">Detail User</h3>
            <p className="text-gray-400 text-[10px] md:text-xs mt-0.5">Informasi lengkap mengenai User</p>

            <div className="flex items-center gap-3 md:gap-4 my-5 md:my-6">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gray-200 flex-shrink-0" />
              <div className="flex flex-col">
                <span className="text-base md:text-lg font-bold text-gray-900">{selectedUser.name}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] md:text-[11px] font-bold mt-1 max-w-max ${selectedUser.roleColor}`}>
                  {selectedUser.role}
                </span>
              </div>
            </div>

            <div className="space-y-2 md:space-y-3">
              <div className="flex items-center gap-3 p-3 md:p-3.5 bg-gray-50 rounded-xl md:rounded-2xl border border-gray-100">
                <Mail className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400 flex-shrink-0" />
                <span className="text-[11px] md:text-xs text-gray-700 font-medium truncate">{selectedUser.email}</span>
              </div>
              <div className="flex items-center gap-3 p-3 md:p-3.5 bg-gray-50 rounded-xl md:rounded-2xl border border-gray-100">
                <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400 flex-shrink-0" />
                <span className="text-[11px] md:text-xs text-gray-700 font-medium truncate">{selectedUser.joinDate}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteUserTarget && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-[320px] p-5 md:p-6 shadow-2xl relative text-center">
            <button
              onClick={() => setDeleteUserTarget(null)}
              className="absolute right-3 md:right-4 top-3 md:top-4 p-1 rounded-full hover:bg-gray-100 text-gray-400 transition"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-sm md:text-base font-bold text-gray-900 mt-2 px-2 md:px-4">
              Yakin untuk Menghapus User ini?
            </h3>
            <p className="text-gray-400 text-[10px] md:text-xs mt-1 px-2 md:px-4 truncate font-medium">({deleteUserTarget.name})</p>

            <div className="mt-5 md:mt-6 flex flex-col gap-2">
              <button
                onClick={handleConfirmDelete}
                className="w-full py-2 md:py-2.5 bg-red-500 hover:bg-red-600 rounded-lg md:rounded-xl text-[11px] md:text-xs font-bold text-white shadow-sm transition-all"
              >
                Ya, Hapus
              </button>
              <button
                onClick={() => setDeleteUserTarget(null)}
                className="w-full py-2 md:py-2.5 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg md:rounded-xl text-[11px] md:text-xs font-bold text-gray-700 shadow-sm transition-all"
              >
                Batalkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}