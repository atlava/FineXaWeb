'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-3 p-10 text-center">
      <h2 className="text-xl font-bold text-gray-900">Terjadi Kesalahan</h2>
      <p className="text-sm text-gray-500">
        Halaman ini gagal dimuat. Silakan coba lagi.
      </p>
      <button
        onClick={reset}
        className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
      >
        Coba Lagi
      </button>
    </div>
  );
}