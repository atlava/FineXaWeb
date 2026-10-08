import { Eye, Users, Zap } from 'lucide-react';

interface AnalyticsItem {
  id: number;
  title: string;
  views: string;
  engagement: string;
  progress: string;
}

export default function AnalyticsAdmin() {
  const analyticsData: AnalyticsItem[] = [
    { id: 1, title: 'Apa itu FineXa?', views: '3,200', engagement: '85%', progress: 'w-[85%]' },
    { id: 2, title: 'Bagaimana sistem rekomendasi investasi FineXa bekerja?', views: '2,100', engagement: '78%', progress: 'w-[78%]' },
    { id: 3, title: 'Apa saja yang dipelajari di Edukasi Investasi FineXa?', views: '1,560', engagement: '72%', progress: 'w-[72%]' },
    { id: 4, title: 'Apa itu Profil Risiko?', views: '1,250', engagement: '68%', progress: 'w-[68%]' },
    { id: 5, title: 'Bagaimana perlindungan data pengguna di FineXa?', views: '890', engagement: '65%', progress: 'w-[65%]' },
    { id: 6, title: 'Memahami Risiko Investasi', views: '700', engagement: '70%', progress: 'w-[70%]' },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-950 tracking-tight">Analytics</h1>
        <p className="text-gray-500 text-xs md:text-sm mt-1">Insight dan performa platform FineXa</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="p-2 md:p-2.5 bg-emerald-50 rounded-xl max-w-max text-emerald-600">
              <Eye className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <p className="text-[11px] md:text-xs font-semibold text-gray-400 mt-4 tracking-wide">Total FAQ Views</p>
            <p className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-1">9,700</p>
          </div>
          <span className="text-[10px] md:text-[11px] font-bold text-emerald-500 mt-4 flex items-center gap-1">
            +12.5% dari minggu lalu
          </span>
        </div>

        <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="p-2 md:p-2.5 bg-blue-50 rounded-xl max-w-max text-blue-600">
              <Users className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <p className="text-[11px] md:text-xs font-semibold text-gray-400 mt-4 tracking-wide">Active Users</p>
            <p className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-1">3,130</p>
          </div>
          <span className="text-[10px] md:text-[11px] font-bold text-emerald-500 mt-4 flex items-center gap-1">
            +8.2% dari minggu lalu
          </span>
        </div>

        <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between sm:col-span-2 md:col-span-1">
          <div>
            <div className="p-2 md:p-2.5 bg-emerald-50 rounded-xl max-w-max text-emerald-600">
              <Zap className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <p className="text-[11px] md:text-xs font-semibold text-gray-400 mt-4 tracking-wide">Avg. Engagement</p>
            <p className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-1">73.5%</p>
          </div>
          <span className="text-[10px] md:text-[11px] font-bold text-red-500 mt-4 flex items-center gap-1">
            -2.3% dari minggu lalu
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 md:px-6 py-4 md:py-5 border-b border-gray-100">
          <h3 className="font-bold text-base md:text-lg text-gray-800">Top Performing Content</h3>
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
              {analyticsData.map((data) => (
                <tr key={data.id} className="hover:bg-gray-50/40 transition">
                  <td className="px-5 md:px-6 py-3 md:py-4 font-bold text-gray-900 text-[11px] md:text-sm max-w-[200px] md:max-w-md truncate">
                    {data.title}
                  </td>
                  <td className="px-5 md:px-6 py-3 md:py-4 text-center text-gray-600 font-semibold text-[11px] md:text-sm">{data.views}</td>
                  <td className="px-5 md:px-6 py-3 md:py-4 text-center text-gray-600 font-semibold text-[11px] md:text-sm">{data.engagement}</td>
                  <td className="px-5 md:px-6 py-3 md:py-4 w-32 md:w-48">
                    <div className="w-full bg-gray-100 h-1.5 md:h-2 rounded-full overflow-hidden">
                      <div className={`bg-emerald-500 h-full rounded-full ${data.progress}`} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}