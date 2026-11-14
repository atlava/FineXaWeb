'use client';

import React, { useState, useEffect } from 'react';
import { Search, Eye, Trash2, X, Mail, Wallet, Calendar } from 'lucide-react';

interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
  joinDate: string;
  lastActive: string;
  roleColor: string;
  no_telepon?: string;     
  lokasi?: string;         
  tanggal_lahir?: string;  
}

export default function UserManagementAdmin() {
  // Kosongkan data dummy
  const [users, setUsers] = useState<UserData[]>([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [deleteUserTarget, setDeleteUserTarget] = useState<UserData | null>(null);

  // Fungsi pencarian (berjalan otomatis di sisi frontend)
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fungsi pembaca data (Read) dari Express
  // 2. Fungsi pembaca data (Read) dari Express
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const result = await res.json();
      
      if (res.ok) {
        // Menerjemahkan data MySQL 
        const formattedData = result.data.map((item: any) => {
          // Menentukan warna badge berdasarkan role/profil risiko
          const userRole = item.role || item.profil_risiko || 'User';
          let badgeColor = 'bg-gray-50 text-gray-600';
          
          if (userRole.toLowerCase().includes('moderat')) badgeColor = 'bg-emerald-50 text-emerald-600';
          else if (userRole.toLowerCase().includes('konservatif')) badgeColor = 'bg-blue-50 text-blue-600';
          else if (userRole.toLowerCase().includes('agresif')) badgeColor = 'bg-amber-50 text-amber-600';
          else if (userRole.toLowerCase() === 'admin') badgeColor = 'bg-purple-50 text-purple-600';

          
          // Fungsi memformat tanggal MySQL
          const formatDate = (dateString: string) => {
            if (!dateString) return '-';
            const date = new Date(dateString);
            return isNaN(date.getTime()) ? '-' : date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
          };

          return {
            id: item.id_user,                     
            name: item.nama_lengkap,              
            email: item.email,
            role: userRole,
            // Mengambil dari created_at, jika kosong ambil createdat atau '-'
            joinDate: formatDate(item.created_at || item.createdat), 
            // Mengambil dari last_login_at atau updated_at
            lastActive: formatDate(item.last_login_at || item.updated_at),
            roleColor: badgeColor,
            no_telepon: item.no_telepon,
            lokasi: item.lokasi,
            tanggal_lahir: item.tanggal_lahir
          };
        });
        
        setUsers(formattedData);
      }
    } catch (error) {
      console.error("Gagal mengambil data user:", error);
    }
  };

  // Panggil data otomatis saat halaman dimuat
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fungsi Hapus Data (Delete)
  const handleConfirmDelete = async () => {
    if (!deleteUserTarget) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${deleteUserTarget.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        // Hapus user dari layar tanpa perlu refresh halaman
        setUsers(users.filter((u) => u.id !== deleteUserTarget.id));
        setDeleteUserTarget(null);
      } else {
        alert("Gagal menghapus user. Pastikan Anda memiliki izin.");
      }
    } catch (error) {
      console.error("Error menghapus user:", error);
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
            className="w-full pl-10 md:pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs md:text-sm text-gray-900 font-medium focus:outline-none focus:border-emerald-600 focus:bg-white transition-all placeholder-gray-400"
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
                      <div className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold flex-shrink-0">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
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
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-400 text-sm">
                    Data user tidak ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

{/* Modal Detail User */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl md:rounded-3xl w-full max-w-[400px] p-5 md:p-6 shadow-2xl relative border border-gray-50 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute right-4 md:right-5 top-4 md:top-5 p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            <h3 className="text-lg md:text-xl font-bold text-gray-900">Detail User</h3>
            <p className="text-gray-400 text-[10px] md:text-xs mt-0.5">Informasi lengkap mengenai User</p>

            <div className="flex items-center gap-3 md:gap-4 my-4 md:my-5">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl font-bold flex-shrink-0">
                {selectedUser.name.charAt(0).toUpperCase()}
              </div>
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
                <div className="flex flex-col truncate">
                  <span className="text-[10px] text-gray-400 font-semibold">Email</span>
                  <span className="text-[11px] md:text-xs text-gray-900 font-medium truncate">{selectedUser.email}</span>
                </div>
              </div>

              {/* Tambahan Nomor Telepon */}
              <div className="flex items-center gap-3 p-3 md:p-3.5 bg-gray-50 rounded-xl md:rounded-2xl border border-gray-100">
                <Wallet className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400 flex-shrink-0" />
                <div className="flex flex-col truncate">
                  <span className="text-[10px] text-gray-400 font-semibold">Nomor Telepon</span>
                  <span className="text-[11px] md:text-xs text-gray-900 font-medium truncate">
                    {/* @ts-ignore */}
                    {selectedUser.no_telepon || 'Belum diatur'}
                  </span>
                </div>
              </div>

              {/* Tambahan Lokasi */}
              <div className="flex items-center gap-3 p-3 md:p-3.5 bg-gray-50 rounded-xl md:rounded-2xl border border-gray-100">
                <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400 flex-shrink-0" />
                <div className="flex flex-col truncate">
                  <span className="text-[10px] text-gray-400 font-semibold">Lokasi</span>
                  <span className="text-[11px] md:text-xs text-gray-900 font-medium truncate">
                    {/* @ts-ignore */}
                    {selectedUser.lokasi || 'Belum diatur'}
                  </span>
                </div>
              </div>

              {/* Tambahan Tanggal Lahir */}
              <div className="flex items-center gap-3 p-3 md:p-3.5 bg-gray-50 rounded-xl md:rounded-2xl border border-gray-100">
                <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400 flex-shrink-0" />
                <div className="flex flex-col truncate">
                  <span className="text-[10px] text-gray-400 font-semibold">Tanggal Lahir</span>
                  <span className="text-[11px] md:text-xs text-gray-900 font-medium truncate">
                    {/* @ts-ignore */}
                    {selectedUser.tanggal_lahir || 'Belum diatur'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 md:p-3.5 bg-gray-50 rounded-xl md:rounded-2xl border border-gray-100">
                <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400 flex-shrink-0" />
                <div className="flex flex-col truncate">
                  <span className="text-[10px] text-gray-400 font-semibold">Bergabung</span>
                  <span className="text-[11px] md:text-xs text-gray-900 font-medium truncate">{selectedUser.joinDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {deleteUserTarget && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-[320px] p-5 md:p-6 shadow-2xl relative text-center">
            <button
              onClick={() => setDeleteUserTarget(null)}
              className="absolute right-3 md:right-4 top-3 md:top-4 p-1 rounded-full hover:bg-gray-100 text-gray-400 transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6" />
            </div>

            <h3 className="text-sm md:text-base font-bold text-gray-900 px-2 md:px-4">
              Yakin untuk Menghapus User ini?
            </h3>
            <p className="text-gray-500 text-[10px] md:text-xs mt-1 px-2 md:px-4 truncate font-medium">({deleteUserTarget.name})</p>

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