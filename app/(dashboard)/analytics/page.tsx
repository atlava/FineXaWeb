'use client';

import React, { useState, useEffect } from 'react';
import { Eye, Users, Zap, AlertTriangle, RefreshCw, WifiOff } from 'lucide-react';

interface AnalyticsItem {
  id: number;
  title: string;
  views: string;
  engagement: string;
  progress: string;
}

interface Stats {
  total_views: number;
  active_users: number;
  avg_engagement: string;
  views_growth: number;
  users_growth: number;
  engagement_growth: number;
}

interface ApiErrorState {
  status: number;
  message: string;
}

const EMPTY_STATS: Stats = {
  total_views: 0,
  active_users: 0,
  avg_engagement: '0%',
  views_growth: 0,
  users_growth: 0,
  engagement_growth: 0,
};

const CACHE_KEY = 'analytics_cache';
const ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/analytics`;

export default function AnalyticsAdmin() {
  const [stats, setStats] = useState<Stats>(EMPTY_STATS);
  const [topContent, setTopContent] = useState<AnalyticsItem[]>([]);

  // ===== ERROR STATES =====
  const [error, setError] = useState<ApiErrorState | null>(null);
  const [hasData, setHasData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAnalyticsData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(ENDPOINT, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json().catch(() => ({}));

      if (res.ok && result.data?.stats) {
        const newStats: Stats = {
          total_views: result.data.stats.total_views || 0,
          active_users: result.data.stats.active_users || 0,
          avg_engagement: result.data.stats.avg_engagement || '0%',
          views_growth: result.data.stats.views_growth || 0,
          users_growth: result.data.stats.users_growth || 0,
          engagement_growth: result.data.stats.engagement_growth || 0,
        };
        const newTop: AnalyticsItem[] = result.data.top_content || [];

        setStats(newStats);
        setTopContent(newTop);
        setHasData(true);

        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ stats: newStats, top: newTop }));
        } catch {}
      } else {
        throw { status: res.status, message: result.message };
      }
    } catch (err: any) {
      console.error('Gagal mengambil data analytics:', err);

      setError({
        status: err?.status ?? 0,
        message:
          err?.message ??
          'Gagal terhubung ke data pipeline backend Express.js. Menampilkan data cache lokal terakhir.',
      });

      try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (raw && !hasData) {
          const cached = JSON.parse(raw);
          setStats(cached.stats);
          setTopContent(cached.top || []);
          setHasData(true);
        }
      } catch {}
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasError = error !== null;
  const showPlaceholder = hasError && !hasData;
  const fmt = (n: number) => (showPlaceholder ? '—' : n.toLocaleString('id-ID'));

  const cardBadge = hasError ? (
    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-100">
      {hasData ? 'Data cache' : 'Gagal sinkron'}
    </span>
  ) : null;

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-950 tracking-tight">Analytics</h1>
        <p className="text-gray-500 text-xs md:text-sm mt-1">Insight dan performa platform FineXa</p>
      </div>

      {/* Banner error utama */}
      {hasError && (
        <div
          role="alert"
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-red-200 bg-red-50 p-4"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-red-100 text-red-600 shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-red-800 flex flex-wrap items-center gap-2">
                {hasData ? 'Mode Terputus (Offline Cache)' : 'Gagal Memuat Analytics'}
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/70 border border-red-200">
                  {error.status > 0 ? `Status ${error.status}` : 'Express.js API Offline'}
                </span>
              </p>
              <p className="text-xs text-red-700 mt-0.5">{error.message}</p>
            </div>
          </div>
          <button
            onClick={fetchAnalyticsData}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white text-xs font-semibold shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Memuat...' : 'Perbarui Data'}
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {/* Card 1: Total FAQ Views */}
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between">
              <div className="p-2 md:p-2.5 bg-emerald-50 rounded-xl max-w-max text-emerald-600">
                <Eye className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              {cardBadge}
            </div>
            <p className="text-[11px] md:text-xs font-semibold text-gray-400 mt-4 tracking-wide">Total FAQ Views</p>
            <p className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-1">{fmt(stats.total_views)}</p>
          </div>
          {!showPlaceholder && (
            <span className={`text-[10px] md:text-[11px] font-bold mt-4 flex items-center gap-1 ${
              stats.views_growth >= 0 ? 'text-emerald-500' : 'text-red-500'
            }`}>
              {stats.views_growth >= 0 ? `+${stats.views_growth}%` : `${stats.views_growth}%`} dari minggu lalu
            </span>
          )}
        </div>

        {/* Card 2: Active Users */}
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between">
              <div className="p-2 md:p-2.5 bg-blue-50 rounded-xl max-w-max text-blue-600">
                <Users className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              {cardBadge}
            </div>
            <p className="text-[11px] md:text-xs font-semibold text-gray-400 mt-4 tracking-wide">Active Users</p>
            <p className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-1">{fmt(stats.active_users)}</p>
          </div>
          {!showPlaceholder && (
            <span className={`text-[10px] md:text-[11px] font-bold mt-4 flex items-center gap-1 ${
              stats.users_growth >= 0 ? 'text-emerald-500' : 'text-red-500'
            }`}>
              {stats.users_growth >= 0 ? `+${stats.users_growth}%` : `${stats.users_growth}%`} dari minggu lalu
            </span>
          )}
        </div>

        {/* Card 3: Avg Engagement */}
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between sm:col-span-2 md:col-span-1">
          <div>
            <div className="flex items-start justify-between">
              <div className="p-2 md:p-2.5 bg-emerald-50 rounded-xl max-w-max text-emerald-600">
                <Zap className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              {cardBadge}
            </div>
            <p className="text-[11px] md:text-xs font-semibold text-gray-400 mt-4 tracking-wide">Avg. Engagement</p>
            <p className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-1">
              {showPlaceholder ? '—' : stats.avg_engagement}
            </p>
          </div>
          {!showPlaceholder && (
            <span className={`text-[10px] md:text-[11px] font-bold mt-4 flex items-center gap-1 ${
              stats.engagement_growth >= 0 ? 'text-emerald-500' : 'text-red-500'
            }`}>
              {stats.engagement_growth >= 0 ? `+${stats.engagement_growth}%` : `${stats.engagement_growth}%`} dari minggu lalu
            </span>
          )}
        </div>
      </div>

      {/* Tabel Top Performing Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 md:px-6 py-4 md:py-5 border-b border-gray-100 flex items-center justify-between gap-3">
          <h3 className="font-bold text-base md:text-lg text-gray-800">Top Performing Content</h3>
          {hasError && (
            <span className="text-[10px] font-semibold px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
              Koneksi Database Terputus
            </span>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600 min-w-[600px]">
            <thead className="bg-gray-50 text-gray-400 text-[10px] md:text-xs font-bold border-b border-gray-100 uppercase tracking-wider">
              <tr>
                <th className="px-5 md:px-6 py-3 md:py-4 w-[50%] whitespace-nowrap">Judul</th>
                <th className="px-5 md:px-6 py-3 md:py-4 text-center whitespace-nowrap">Views</th>
                <th className="px-5 md:px-6 py-3 md:py-4 text-center whitespace-nowrap">Engagement</th>
                <th className="px-5 md:px-6 py-3 md:py-4 whitespace-nowrap">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
              {topContent.length > 0 ? (
                topContent.map((data) => (
                  <tr key={data.id} className="hover:bg-gray-50/40 transition">
                    <td className="px-5 md:px-6 py-3 md:py-4 font-bold text-gray-900 text-[11px] md:text-sm max-w-[200px] md:max-w-md truncate">
                      {data.title}
                    </td>
                    <td className="px-5 md:px-6 py-3 md:py-4 text-center text-gray-600 font-semibold text-[11px] md:text-sm">
                      {data.views}
                    </td>
                    <td className="px-5 md:px-6 py-3 md:py-4 text-center text-gray-600 font-semibold text-[11px] md:text-sm">
                      {data.engagement}
                    </td>
                    <td className="px-5 md:px-6 py-3 md:py-4 w-32 md:w-48">
                      <div className="w-full bg-gray-100 h-1.5 md:h-2 rounded-full overflow-hidden">
                        <div className={`bg-emerald-500 h-full rounded-full ${data.progress}`} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : hasError ? (
                <tr>
                  <td colSpan={4} className="py-12 px-6">
                    <div className="flex flex-col items-center text-center max-w-md mx-auto">
                      <div className="w-16 h-16 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-500">
                        <WifiOff className="w-7 h-7" />
                      </div>
                      <h4 className="mt-4 text-base font-bold text-gray-900">
                        Tidak Dapat Memuat Rincian Konten
                      </h4>
                      <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                        Backend analitik sedang mengalami gangguan koneksi atau dalam tahap pemeliharaan
                        server ({error.status > 0 ? `HTTP_${error.status}` : 'ERR_CONN_TIMED_OUT'}).
                      </p>
                      <code className="mt-3 text-[11px] px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-600 break-all">
                        Endpoint: {ENDPOINT}
                      </code>
                      <button
                        onClick={fetchAnalyticsData}
                        disabled={isLoading}
                        className="mt-5 flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-xs font-semibold"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                        {isLoading ? 'Menyinkronkan...' : 'Coba Sinkronkan Ulang'}
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-400 text-sm">
                    {isLoading ? 'Memuat data...' : 'Belum ada data performa FAQ.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}