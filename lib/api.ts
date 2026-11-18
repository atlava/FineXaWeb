export class ApiError extends Error {
  constructor(public status: number, message: string, public code?: string) {
    super(message);
  }
}

export async function api<T>(url: string, init?: RequestInit): Promise<T> {
  try {
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      ...init,
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new ApiError(res.status, body.message ?? "Terjadi kesalahan", body.code);
    }
    return res.json();
  } catch (e) {
    if (e instanceof ApiError) throw e;
    // fetch gagal total (server mati, timeout, dll)
    throw new ApiError(0, "Tidak dapat terhubung ke server", "ERR_NETWORK");
  }
}