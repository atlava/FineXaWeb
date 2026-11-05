'use client';

import React, { useState, useEffect } from 'react';
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

export default function DashboardAdmin() {
  const [metrics, setMetrics] = useState({ 
    totalUsers: 0, 
    activeSessions: 0, 
    totalFaqs: 0, 
    activeGrowth: 0,
    userGrowth: 0,
    faqGrowth: 0
  });
  const [pieData, setPieData] = useState<any[]>([]);
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [lineData, setLineData] = useState<any[]>([]);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const result = await res.json();

      if (res.ok) {
        setMetrics({
          totalUsers: result.data.metrics.totalUsers,
          activeSessions: result.data.metrics.activeSessions,
          totalFaqs: result.data.metrics.totalFaqs,
          activeGrowth: result.data.metrics.activeGrowth || 0,
          userGrowth: result.data.metrics.userGrowth || 0,
          faqGrowth: result.data.metrics.faqGrowth || 0
        });
        setPieData(result.data.pieData);
        setLineData(result.data.lineData || []);
        
        const formattedRecentUsers = result.data.recentUsers.map((user: any) => {
          const date = new Date(user.joinDate);
          return {
            ...user,
            joinDate: date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
          };
        });
        
        setRecentUsers(formattedRecentUsers);
      }
    } catch (error) {
      console.error("Gagal mengambil data dashboard:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Bagian sticky: Judul + 3 Kartu Metrik */}
      <div className="lg:sticky lg:top-0 lg:z-20 space-y-6 bg-gray-50 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-950 tracking-tight">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Overview sistem dan aktivitas pengguna FineXa</p>
        </div>

        {/* Grid 3 Kartu Metrik Utama */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Total Users (Dinamis) */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                metrics.userGrowth >= 0 ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'
              }`}>
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{metrics.userGrowth >= 0 ? `+${metrics.userGrowth}%` : `${metrics.userGrowth}%`}</span>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-gray-400 font-medium">Total Users</span>
              <h3 className="text-2xl font-extrabold text-gray-900 mt-0.5">{metrics.totalUsers}</h3>
            </div>
          </div>

          {/* Card 2: Active Sessions / Month (Dinamis) */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                metrics.activeGrowth >= 0 ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'
              }`}>
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{metrics.activeGrowth >= 0 ? `+${metrics.activeGrowth}%` : `${metrics.activeGrowth}%`}</span>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-gray-400 font-medium">Active Sessions / Month</span>
              <h3 className="text-2xl font-extrabold text-gray-900 mt-0.5">{metrics.activeSessions}</h3>
            </div>
          </div>

          {/* Card 3: Content Items (Dinamis) */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                metrics.faqGrowth >= 0 ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'
              }`}>
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{metrics.faqGrowth >= 0 ? `+${metrics.faqGrowth}%` : `${metrics.faqGrowth}%`}</span>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-gray-400 font-medium">Content Items</span>
              <h3 className="text-2xl font-extrabold text-gray-900 mt-0.5">{metrics.totalFaqs}</h3>
            </div>
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
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
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
            {pieData.length > 0 ? pieData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="text-gray-900">{item.value}%</span>
              </div>
            )) : <p className="text-xs text-center text-gray-400">Belum ada data profil risiko</p>}
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
                <tr key={user.id} className="hover:bg-gray-50/40 transition-colors">
                  <td className="py-4 px-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold flex-shrink-0">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-bold text-gray-900">{user.name}</span>
                  </td>
                  <td className="py-4 px-6 text-gray-500">{user.email}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold ${
                      user.riskProfile.toLowerCase() === 'moderat' ? 'bg-emerald-50 text-emerald-600' :
                      user.riskProfile.toLowerCase() === 'konservatif' ? 'bg-blue-50 text-blue-600' :
                      user.riskProfile.toLowerCase() === 'agresif' ? 'bg-amber-50 text-amber-600' :
                      'bg-purple-50 text-purple-600'
                    }`}>
                      {user.riskProfile.charAt(0).toUpperCase() + user.riskProfile.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-500">{user.joinDate}</td>
                </tr>
              ))}
              {recentUsers.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-400">Belum ada pengguna terdaftar.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}