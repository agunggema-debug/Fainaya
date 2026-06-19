import { supabase } from "./supabase";

export type Pelanggan = {
  id: string;
  kode: string;
  nama: string;
  email: string;
  telepon: string;
  bergabung: string;
  status: "aktif" | "nonaktif";
  total_transaksi: number;
  terakhir_aktif: string;
  created_at?: string;
  updated_at?: string;
};

export type LogAktivitas = {
  id: string;
  kode: string;
  pelanggan_id: string;
  pelanggan_nama: string;
  tipe: "kunjungan" | "servis" | "transaksi" | "profil" | "pesanan";
  deskripsi: string;
  timestamp: string;
  created_at?: string;
};

// ---------- LOCAL STORAGE (fallback) ---------- //

export function getLocalPelanggan(): Pelanggan[] {
  try {
    const stored = localStorage.getItem("fainaya_pelanggan");
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return generateDummyPelanggan();
}

export function getLocalLogAktivitas(): LogAktivitas[] {
  try {
    const stored = localStorage.getItem("fainaya_log_aktivitas");
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return generateDummyLogAktivitas();
}

function generateDummyPelanggan(): Pelanggan[] {
  return [
    { id: "dummy-p-001", kode: "P-001", nama: "Budi Santoso", email: "budi@email.com", telepon: "0812-3456-7890", bergabung: "2025-11-15", status: "aktif", total_transaksi: 12, terakhir_aktif: "2026-06-19T08:00:00+07:00" },
    { id: "dummy-p-002", kode: "P-002", nama: "Siti Nurhaliza", email: "siti@email.com", telepon: "0856-7890-1234", bergabung: "2026-01-20", status: "aktif", total_transaksi: 8, terakhir_aktif: "2026-06-18T10:30:00+07:00" },
    { id: "dummy-p-003", kode: "P-003", nama: "Ahmad Rizki", email: "ahmad@email.com", telepon: "0878-9012-3456", bergabung: "2026-03-05", status: "aktif", total_transaksi: 5, terakhir_aktif: "2026-06-17T14:15:00+07:00" },
    { id: "dummy-p-004", kode: "P-004", nama: "Dewi Lestari", email: "dewi@email.com", telepon: "0821-3456-7890", bergabung: "2025-09-10", status: "aktif", total_transaksi: 20, terakhir_aktif: "2026-06-19T09:45:00+07:00" },
    { id: "dummy-p-005", kode: "P-005", nama: "Rudi Hartono", email: "rudi@email.com", telepon: "0813-5678-9012", bergabung: "2026-04-12", status: "nonaktif", total_transaksi: 2, terakhir_aktif: "2026-05-01T11:00:00+07:00" },
    { id: "dummy-p-006", kode: "P-006", nama: "Maya Anggraini", email: "maya@email.com", telepon: "0857-8901-2345", bergabung: "2025-12-01", status: "aktif", total_transaksi: 15, terakhir_aktif: "2026-06-18T16:20:00+07:00" },
    { id: "dummy-p-007", kode: "P-007", nama: "Doni Prasetyo", email: "doni@email.com", telepon: "0877-1234-5678", bergabung: "2026-02-14", status: "aktif", total_transaksi: 7, terakhir_aktif: "2026-06-16T13:10:00+07:00" },
    { id: "dummy-p-008", kode: "P-008", nama: "Rina Wijaya", email: "rina@email.com", telepon: "0819-2345-6789", bergabung: "2026-05-20", status: "aktif", total_transaksi: 3, terakhir_aktif: "2026-06-15T10:00:00+07:00" },
    { id: "dummy-p-009", kode: "P-009", nama: "Agus Setiawan", email: "agus@email.com", telepon: "0855-6789-0123", bergabung: "2025-08-25", status: "nonaktif", total_transaksi: 1, terakhir_aktif: "2026-04-20T09:30:00+07:00" },
    { id: "dummy-p-010", kode: "P-010", nama: "Fitri Handayani", email: "fitri@email.com", telepon: "0823-4567-8901", bergabung: "2026-06-01", status: "aktif", total_transaksi: 1, terakhir_aktif: "2026-06-19T07:50:00+07:00" },
  ];
}

function generateDummyLogAktivitas(): LogAktivitas[] {
  const now = Date.now();
  return [
    { id: "dummy-l-001", kode: "L-001", pelanggan_id: "dummy-p-001", pelanggan_nama: "Budi Santoso", tipe: "kunjungan", deskripsi: "Mengunjungi halaman layanan IT", timestamp: new Date(now - 5 * 60000).toISOString() },
    { id: "dummy-l-002", kode: "L-002", pelanggan_id: "dummy-p-004", pelanggan_nama: "Dewi Lestari", tipe: "servis", deskripsi: "Mendaftarkan servis printer Epson L3110", timestamp: new Date(now - 15 * 60000).toISOString() },
    { id: "dummy-l-003", kode: "L-003", pelanggan_id: "dummy-p-001", pelanggan_nama: "Budi Santoso", tipe: "transaksi", deskripsi: "Melakukan pembayaran servis SRV-2026-042", timestamp: new Date(now - 30 * 60000).toISOString() },
    { id: "dummy-l-004", kode: "L-004", pelanggan_id: "dummy-p-006", pelanggan_nama: "Maya Anggraini", tipe: "profil", deskripsi: "Memperbarui alamat dan nomor telepon", timestamp: new Date(now - 60 * 60000).toISOString() },
    { id: "dummy-l-005", kode: "L-005", pelanggan_id: "dummy-p-002", pelanggan_nama: "Siti Nurhaliza", tipe: "pesanan", deskripsi: "Memesan gantungan kunci custom 50 pcs", timestamp: new Date(now - 90 * 60000).toISOString() },
    { id: "dummy-l-006", kode: "L-006", pelanggan_id: "dummy-p-003", pelanggan_nama: "Ahmad Rizki", tipe: "kunjungan", deskripsi: "Melihat portofolio desain grafis", timestamp: new Date(now - 120 * 60000).toISOString() },
    { id: "dummy-l-007", kode: "L-007", pelanggan_id: "dummy-p-007", pelanggan_nama: "Doni Prasetyo", tipe: "servis", deskripsi: "Konsultasi perbaikan PC", timestamp: new Date(now - 180 * 60000).toISOString() },
    { id: "dummy-l-008", kode: "L-008", pelanggan_id: "dummy-p-004", pelanggan_nama: "Dewi Lestari", tipe: "transaksi", deskripsi: "Pembelian tinta printer Epson 664", timestamp: new Date(now - 240 * 60000).toISOString() },
    { id: "dummy-l-009", kode: "L-009", pelanggan_id: "dummy-p-008", pelanggan_nama: "Rina Wijaya", tipe: "profil", deskripsi: "Mendaftar sebagai pelanggan baru", timestamp: new Date(now - 300 * 60000).toISOString() },
    { id: "dummy-l-010", kode: "L-010", pelanggan_id: "dummy-p-002", pelanggan_nama: "Siti Nurhaliza", tipe: "kunjungan", deskripsi: "Mengunjungi halaman studio kreatif", timestamp: new Date(now - 360 * 60000).toISOString() },
    { id: "dummy-l-011", kode: "L-011", pelanggan_id: "dummy-p-006", pelanggan_nama: "Maya Anggraini", tipe: "pesanan", deskripsi: "Pesanan banner promosi masuk revisi ke-2", timestamp: new Date(now - 420 * 60000).toISOString() },
    { id: "dummy-l-012", kode: "L-012", pelanggan_id: "dummy-p-001", pelanggan_nama: "Budi Santoso", tipe: "servis", deskripsi: "Mengambil unit PC setelah perbaikan", timestamp: new Date(now - 480 * 60000).toISOString() },
    { id: "dummy-l-013", kode: "L-013", pelanggan_id: "dummy-p-005", pelanggan_nama: "Rudi Hartono", tipe: "kunjungan", deskripsi: "Melihat halaman kontak", timestamp: new Date(now - 600 * 60000).toISOString() },
    { id: "dummy-l-014", kode: "L-014", pelanggan_id: "dummy-p-010", pelanggan_nama: "Fitri Handayani", tipe: "transaksi", deskripsi: "Pembayaran desain logo UMKM", timestamp: new Date(now - 720 * 60000).toISOString() },
    { id: "dummy-l-015", kode: "L-015", pelanggan_id: "dummy-p-003", pelanggan_nama: "Ahmad Rizki", tipe: "profil", deskripsi: "Mengganti foto profil", timestamp: new Date(now - 900 * 60000).toISOString() },
  ];
}

// ---------- SUPABASE (primary) ---------- //

/** Fetch all pelanggan from Supabase, fallback to dummy data */
export async function fetchPelanggan(): Promise<Pelanggan[]> {
  try {
    const { data, error } = await supabase
      .from("pelanggan")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    if (data && data.length > 0) return data as Pelanggan[];
    return [];
  } catch (err) {
    console.warn("Failed to fetch pelanggan from Supabase, using local fallback:", err);
    return getLocalPelanggan();
  }
}

/** Fetch a single pelanggan by ID */
export async function fetchPelangganById(id: string): Promise<Pelanggan | null> {
  try {
    const { data, error } = await supabase
      .from("pelanggan")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data as Pelanggan;
  } catch (err) {
    console.warn("Failed to fetch pelanggan by ID from Supabase, using local fallback:", err);
    const local = getLocalPelanggan();
    return local.find((p) => p.id === id || p.kode === id) ?? null;
  }
}

/** Create a new pelanggan */
export async function createPelanggan(data: Omit<Pelanggan, "id" | "kode" | "created_at" | "updated_at">): Promise<Pelanggan | null> {
  try {
    // Generate kode
    const { count } = await supabase.from("pelanggan").select("*", { count: "exact", head: true });
    const nextNumber = (count ?? 0) + 1;
    const kode = `P-${String(nextNumber).padStart(3, "0")}`;

    const { data: result, error } = await supabase
      .from("pelanggan")
      .insert({ ...data, kode })
      .select()
      .single();

    if (error) throw error;
    return result as Pelanggan;
  } catch (err) {
    console.warn("Failed to create pelanggan in Supabase:", err);
    return null;
  }
}

/** Update a pelanggan */
export async function updatePelanggan(id: string, data: Partial<Pelanggan>): Promise<Pelanggan | null> {
  try {
    const { data: result, error } = await supabase
      .from("pelanggan")
      .update(data)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return result as Pelanggan;
  } catch (err) {
    console.warn("Failed to update pelanggan in Supabase:", err);
    return null;
  }
}

/** Delete a pelanggan */
export async function deletePelanggan(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from("pelanggan").delete().eq("id", id);
    if (error) throw error;
    return true;
  } catch (err) {
    console.warn("Failed to delete pelanggan from Supabase:", err);
    return false;
  }
}

// ---------- LOG AKTIVITAS ---------- //

/** Fetch all log aktivitas from Supabase, fallback to dummy data */
export async function fetchLogAktivitas(): Promise<LogAktivitas[]> {
  try {
    const { data, error } = await supabase
      .from("log_aktivitas")
      .select("*")
      .order("timestamp", { ascending: false });

    if (error) throw error;
    if (data && data.length > 0) return data as LogAktivitas[];
    return [];
  } catch (err) {
    console.warn("Failed to fetch log aktivitas from Supabase, using local fallback:", err);
    return getLocalLogAktivitas();
  }
}

/** Create a new log aktivitas */
export async function createLogAktivitas(data: Omit<LogAktivitas, "id" | "kode" | "created_at">): Promise<LogAktivitas | null> {
  try {
    // Generate kode
    const { count } = await supabase.from("log_aktivitas").select("*", { count: "exact", head: true });
    const nextNumber = (count ?? 0) + 1;
    const kode = `L-${String(nextNumber).padStart(3, "0")}`;

    const { data: result, error } = await supabase
      .from("log_aktivitas")
      .insert({ ...data, kode })
      .select()
      .single();

    if (error) throw error;
    return result as LogAktivitas;
  } catch (err) {
    console.warn("Failed to create log aktivitas in Supabase:", err);
    return null;
  }
}