'use client';

import React, { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp, X } from 'lucide-react';

interface FaqItem {
  id: number;
  category: string;
  question: string;
  answer: string;
  status: 'published' | 'unpublished';
}

export default function FaqManagementAdmin() {
  const [faqs, setFaqs] = useState<FaqItem[]>([
    { id: 1, category: 'Tentang Platform', question: 'Apa itu FineXa?', answer: 'FineXa adalah platform penasihat investasi digital yang membantu Anda mengelola finansial berdasarkan profil risiko pribadi.', status: 'published' },
    { id: 2, category: 'Rekomendasi Investasi', question: 'Bagaimana sistem rekomendasi investasi FineXa bekerja?', answer: 'Sistem kami menganalisis jawaban kuesioner profil risiko Anda lalu mencocokkannya dengan algoritma alokasi aset yang optimal.', status: 'published' },
    { id: 3, category: 'Edukasi Investasi', question: 'Apa saja yang dipelajari di Edukasi Investasi FineXa?', answer: 'Mulai dari dasar-dasar reksa dana, saham, obligasi, hingga manajemen portofolio tingkat lanjut.', status: 'published' },
    { id: 4, category: 'Profil Risiko', question: 'Apa itu Profil Risiko?', answer: 'Profil risiko adalah tingkat toleransi atau kesiapan seorang investor dalam menghadapi kemungkinan penurunan nilai investasi.', status: 'published' },
    { id: 5, category: 'Keamanan Data', question: 'Bagaimana perlindungan data pengguna di FineXa?', answer: 'Semua data pengguna dienkripsi dengan standar bank tingkat tinggi dan diproteksi ketat sesuai regulasi yang berlaku.', status: 'published' },
    { id: 6, category: 'Risiko Investasi', question: 'Memahami Risiko Investasi', answer: 'Setiap investasi memiliki risiko, termasuk risiko pasar, risiko likuiditas, dan risiko inflasi yang wajib dipahami sebelum memulai.', status: 'published' },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);
  const [deleteFaqTarget, setDeleteFaqTarget] = useState<FaqItem | null>(null);

  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [newCategory, setNewCategory] = useState('Tentang Platform');

  const totalKonten = faqs.length;
  const publishedCount = faqs.filter((f) => f.status === 'published').length;
  const unpublishedCount = faqs.filter((f) => f.status === 'unpublished').length;

  const toggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const handleConfirmDelete = () => {
    if (deleteFaqTarget) {
      setFaqs(faqs.filter((f) => f.id !== deleteFaqTarget.id));
      setDeleteFaqTarget(null);
    }
  };

  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion || !newAnswer) return alert('Pertanyaan dan Jawaban wajib diisi!');

    const newFaqItem: FaqItem = {
      id: Date.now(),
      category: newCategory,
      question: newQuestion,
      answer: newAnswer,
      status: isActive ? 'published' : 'unpublished',
    };

    setFaqs([newFaqItem, ...faqs]);
    setNewQuestion('');
    setNewAnswer('');
    setIsActive(false);
    setIsAdding(false);
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-950 tracking-tight">Content Management</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola konten edukasi dan materi pembelajaran</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" /> Tambah FAQ
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-[11px] font-medium text-gray-400">Total Konten</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{totalKonten}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-[11px] font-medium text-gray-400">Published</p>
          <p className="text-3xl font-bold text-emerald-600 mt-2">{publishedCount}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-[11px] font-medium text-gray-400">Unpublished</p>
          <p className="text-3xl font-bold text-amber-500 mt-2">{unpublishedCount}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 font-bold text-gray-800">
          Daftar FAQ ({faqs.length})
        </div>
        <div className="divide-y divide-gray-100">
          {faqs.map((faq) => (
            <div key={faq.id} className="p-5 hover:bg-gray-50/50 transition">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 cursor-pointer" onClick={() => toggleFaq(faq.id)}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium">
                      {faq.category}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        faq.status === 'published' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {faq.status}
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                    {faq.question}
                    {openFaqId === faq.id ? (
                      <ChevronUp className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </h4>
                </div>
                <button
                  onClick={() => setDeleteFaqTarget(faq)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

                <div className={`grid transition-all duration-300 ease-in-out ${
                        openFaqId === faq.id ? 'grid-rows-[1fr] opacity-100 mt-3 pt-3 border-t border-gray-100' : 'grid-rows-[0fr] opacity-0'
                      } overflow-hidden`}
                  >
                <div className="overflow-hidden text-sm text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-lg text-gray-900">Tambah FAQ Baru</h3>
              <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFaq} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Kategori</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full border rounded-xl p-2.5 text-sm focus:outline-none focus:border-emerald-600"
                >
                  <option value="Tentang Platform">Tentang Platform</option>
                  <option value="Rekomendasi Investasi">Rekomendasi Investasi</option>
                  <option value="Edukasi Investasi">Edukasi Investasi</option>
                  <option value="Profil Risiko">Profil Risiko</option>
                  <option value="Keamanan Data">Keamanan Data</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Pertanyaan</label>
                <input
                  type="text"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="Masukkan pertanyaan FAQ..."
                  className="w-full border rounded-xl p-2.5 text-sm focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Jawaban</label>
                <textarea
                  rows={3}
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  placeholder="Masukkan penjelasan/jawaban..."
                  className="w-full border rounded-xl p-2.5 text-sm focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="statusActive"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-600"
                />
                <label htmlFor="statusActive" className="text-sm text-gray-700">
                  Langsung Publish
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 border rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold"
                >
                  Simpan FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteFaqTarget && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl space-y-4 text-center">
            <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Hapus FAQ ini?</h3>
              <p className="text-xs text-gray-500 mt-1">"{deleteFaqTarget.question}" akan dihapus secara permanen.</p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setDeleteFaqTarget(null)}
                className="flex-1 py-2 border rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-semibold"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}