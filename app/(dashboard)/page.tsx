'use client';

import React from 'react';
import { Users, Activity, FileText, TrendingUp } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Data Grafik Pertumbuhan Pengguna
const lineData = [
  { month: 'Jan', users: 3200 },
  { month: 'Feb', users: 3700 },
  { month: 'Mar', users: 4100 },
  { month: 'Apr', users: 4500 },
  { month: 'May', users: 4800 },
  { month: 'Jun', users: 5247 },
];

// Data Donut Chart Distribusi Profil Risiko
const pieData = [
  { name: 'Konservatif', value: 35, color: '#3B82F6' },
  { name: 'Moderat', value: 45, color: '#10B981' },
  { name: 'Agresif', value: 20, color: '#F59E0B' },
];

// Data Tabel Pengguna Terbaru
const recentUsers = [
  {
    id: 1,
    name: 'Budi Santoso',
    email: 'budi@email.com',
    riskProfile: 'Moderat',
    joinDate: '8/4/2026',
  },
  {
    id: 2,
    name: 'Siti Aminah',
    email: 'siti@email.com',
    riskProfile: 'Konservatif',
    joinDate: '7/4/2026',
  },
  {
    id: 3,
    name: 'Ahmad Rizki',
    email: 'ahmad@email.com',
    riskProfile: 'Agresif',
    joinDate: '6/4/2026',
  },
  {
    id: 4,
    name: 'Dewi Lestari',
    email: 'dewi@email.com',
    riskProfile: 'Moderat',
    joinDate: '5/4/2026',
  },
];

export default function DashboardAdmin() {
  return (
    <div className="space-y-6">
      {/* Header Judul Halaman */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
        <p className="text-xs md:text-sm text-gray-400 mt-1">
          Overview sistem dan aktivitas pengguna FineXa
        </p>
      </div>

      {/* Grid 3 Kartu Metrik Utama */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Total Users */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full text-xs font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+12.5%</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-xs text-gray-400 font-medium">Total Users</span>
            <h3 className="text-2xl font-extrabold text-gray-900 mt-0.5">5,247</h3>
          </div>
        </div>

        {/* Card 2: Active Sessions / Month */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full text-xs font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+8.2%</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-xs text-gray-400 font-medium">Active Sessions / Month</span>
            <h3 className="text-2xl font-extrabold text-gray-900 mt-0.5">892</h3>
          </div>
        </div>

        {/* Card 3: Content Items */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full text-xs font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+24</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-xs text-gray-400 font-medium">Content Items</span>
            <h3 className="text-2xl font-extrabold text-gray-900 mt-0.5">9,700</h3>
          </div>
        </div>
      </div>

      {/* Grid Grafik: Pertumbuhan & Distribusi Profil Risiko */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Line Chart - Pertumbuhan Pengguna */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-base font-bold text-gray-900 mb-6">Pertumbuhan Pengguna</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                <YAxis domain={[0, 6000]} ticks={[0, 1500, 3000, 4500, 6000]} tickLine={false} axisLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#0F3D32" strokeWidth={2.5} dot={{ fill: '#0F3D32', r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart - Distribusi Profil Risiko */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <h2 className="text-base font-bold text-gray-900 mb-2">Distribusi Profil Risiko</h2>
          <div className="h-48 w-full flex items-center justify-center my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={75} paddingAngle={2} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legenda Persentase */}
          <div className="space-y-2 pt-2 border-t border-gray-50">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="text-gray-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabel Pengguna Terbaru */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900">Pengguna Terbaru</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="py-3.5 px-6">Nama</th>
                <th className="py-3.5 px-6">Email</th>
                <th className="py-3.5 px-6">Profil Risiko</th>
                <th className="py-3.5 px-6">Tanggal Daftar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-700">
              {recentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
                    <span className="font-bold text-gray-900">{user.name}</span>
                  </td>
                  <td className="py-4 px-6 text-gray-500">{user.email}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold ${
                      user.riskProfile === 'Moderat' ? 'bg-emerald-50 text-emerald-600' :
                      user.riskProfile === 'Konservatif' ? 'bg-blue-50 text-blue-600' :
                      'bg-amber-50 text-amber-600'
                    }`}>
                      {user.riskProfile}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-500">{user.joinDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}