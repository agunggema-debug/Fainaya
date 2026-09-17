import { supabase } from "./supabase";
import { MENU_ICONS } from "./adminMenu";

/**
 * Data modul admin untuk menu yang belum punya halaman sendiri.
 *
 * Setiap dataset memetakan:
 *  - satu tabel Supabase (lihat supabase/migrations/004_admin_module_tables.sql)
 *  - data sampel sebagai fallback lokal (dipakai bila Supabase kosong/belum siap)
 *  - satu atau beberapa route menu (lihat src/data/adminMenu.ts)
 *
 * Dipakai oleh src/pages/admin/ModulAdmin.tsx.
 */

export type AdminRow = Record<string, string | number>;

export type AdminColumnType = "text" | "number" | "currency" | "date" | "datetime" | "badge";

export type AdminColumn = {
  key: string;
  label: string;
  type?: AdminColumnType;
};

export type AdminDatasetPath = {
  /** route menu (lihat src/data/adminMenu.ts) */
  path: string;
  /** judul window untuk route tersebut */
  label: string;
  /** filter baris: kolom harus bernilai salah satu dari values */
  filter?: { column: string; values: string[] };
};

export type AdminDataset = {
  id: string;
  /** nama tabel Supabase */
  table: string;
  title: string;
  icon: string;
  description: string;
  columns: AdminColumn[];
  /** warna badge per nilai (untuk kolom bertipe badge) */
  badgeColors?: Record<string, string>;
  /** kolom status untuk kartu ringkasan */
  statusColumn?: string;
  paths: AdminDatasetPath[];
  rows: AdminRow[];
};

/* ── Warna badge standar (Tailwind) ── */
const GREEN =
  "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-900/30 dark:text-emerald-300 dark:ring-emerald-500/30";
const BLUE =
  "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20 dark:bg-blue-900/30 dark:text-blue-300 dark:ring-blue-500/30";
const AMBER =
  "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-900/30 dark:text-amber-300 dark:ring-amber-500/30";
const RED =
  "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20 dark:bg-red-900/30 dark:text-red-300 dark:ring-red-500/30";
const PURPLE =
  "bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-600/20 dark:bg-purple-900/30 dark:text-purple-300 dark:ring-purple-500/30";
const SLATE =
  "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-500/20 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-600/40";

/* ═════════════════════════════════════════════
   1. SERVIS & PERBAIKAN (IT Support)
   ══════════════════════════════════════════════ */
const SERVIS_TIKET: AdminDataset = {
  id: "servis_tiket",
  table: "servis_tiket",
  title: "Servis & Perbaikan",
  icon: MENU_ICONS.wrench,
  description: "Tiket servis printer/komputer dari pelanggan beserta status pengerjaannya.",
  statusColumn: "tahap",
  badgeColors: { Antrean: AMBER, Proses: BLUE, Selesai: GREEN, Tinggi: RED, Normal: SLATE, Rendah: SLATE },
  columns: [
    { key: "kode", label: "No. Tiket" },
    { key: "pelanggan", label: "Pelanggan" },
    { key: "perangkat", label: "Perangkat" },
    { key: "keluhan", label: "Keluhan" },
    { key: "prioritas", label: "Prioritas", type: "badge" },
    { key: "teknisi", label: "Teknisi" },
    { key: "tahap", label: "Tahap", type: "badge" },
    { key: "estimasi", label: "Estimasi", type: "date" },
    { key: "biaya", label: "Biaya", type: "currency" },
  ],
  paths: [
    { path: "/admin/servis/antrean", label: "Daftar Antrean", filter: { column: "tahap", values: ["Antrean"] } },
    { path: "/admin/servis/proses", label: "Proses Perbaikan", filter: { column: "tahap", values: ["Proses"] } },
    { path: "/admin/servis/riwayat", label: "Riwayat Servis", filter: { column: "tahap", values: ["Selesai"] } },
  ],
  rows: [
    { kode: "SRV-2026-042", pelanggan: "Budi Santoso", perangkat: "Printer Epson L3110", keluhan: "Lampu tinta berkedip, hasil cetak bergaris", prioritas: "Tinggi", teknisi: "Agung G.", tahap: "Antrean", estimasi: "2026-09-19", biaya: 185000 },
    { kode: "SRV-2026-041", pelanggan: "Siti Nurhaliza", perangkat: "Laptop Asus X441", keluhan: "Keyboard beberapa tombol tidak berfungsi", prioritas: "Normal", teknisi: "Agung G.", tahap: "Antrean", estimasi: "2026-09-20", biaya: 250000 },
    { kode: "SRV-2026-039", pelanggan: "Dewi Lestari", perangkat: "PC Dell Optiplex 3020", keluhan: "Ganti SSD 256GB dan instal ulang sistem", prioritas: "Normal", teknisi: "Rizki A.", tahap: "Proses", estimasi: "2026-09-18", biaya: 720000 },
    { kode: "SRV-2026-038", pelanggan: "Maya Anggraini", perangkat: "Printer Canon G2010", keluhan: "Pembersihan head dan kalibrasi warna", prioritas: "Rendah", teknisi: "Rizki A.", tahap: "Proses", estimasi: "2026-09-18", biaya: 95000 },
    { kode: "SRV-2026-035", pelanggan: "Ahmad Rizki", perangkat: "Monitor LG 19 inci", keluhan: "Layar berkedip, penggantian adaptor", prioritas: "Normal", teknisi: "Agung G.", tahap: "Selesai", estimasi: "2026-09-12", biaya: 140000 },
    { kode: "SRV-2026-033", pelanggan: "Rina Wijaya", perangkat: "Laptop Lenovo Ideapad", keluhan: "Pemasangan RAM 8GB dan pembersihan kipas", prioritas: "Rendah", teknisi: "Rizki A.", tahap: "Selesai", estimasi: "2026-09-08", biaya: 380000 },
  ],
};

/* ═════════════════════════════════════════════
   2. LOG PERAWATAN (Maintenance)
   ══════════════════════════════════════════════ */
const MAINTENANCE_LOG: AdminDataset = {
  id: "maintenance_log",
  table: "maintenance_log",
  title: "Log Perawatan",
  icon: MENU_ICONS.clipboard,
  description: "Riwayat perawatan rutin infrastruktur, server, dan komputer klien kontrak.",
  statusColumn: "status",
  badgeColors: { Terjadwal: BLUE, Selesai: GREEN, Tertunda: AMBER, Urgent: RED },
  columns: [
    { key: "kode", label: "Kode" },
    { key: "klien", label: "Klien" },
    { key: "perangkat", label: "Perangkat" },
    { key: "jenis", label: "Jenis Perawatan" },
    { key: "teknisi", label: "Teknisi" },
    { key: "jadwal", label: "Jadwal", type: "date" },
    { key: "status", label: "Status", type: "badge" },
    { key: "catatan", label: "Catatan" },
  ],
  paths: [
    { path: "/admin/maintenance/jadwal", label: "Jadwal Perawatan", filter: { column: "status", values: ["Terjadwal", "Tertunda"] } },
    { path: "/admin/maintenance/laporan", label: "Laporan Perawatan", filter: { column: "status", values: ["Selesai"] } },
  ],
  rows: [
    { kode: "MTC-2026-018", klien: "Koperasi Mekar Jaya", perangkat: "Server Ubuntu 22.04", jenis: "Update patch & cek kapasitas disk", teknisi: "Agung G.", jadwal: "2026-09-22", status: "Terjadwal", catatan: "Backup penuh sebelum patch" },
    { kode: "MTC-2026-017", klien: "CV Sinar Abadi", perangkat: "MikroTik RB2011", jenis: "Audit firewall & DHCP", teknisi: "Agung G.", jadwal: "2026-09-24", status: "Terjadwal", catatan: "Tambah rule blokir port 8080" },
    { kode: "MTC-2026-015", klien: "Toko Roti Manis", perangkat: "PC Kasir + Printer Thermal", jenis: "Pembersihan & cek kabel", teknisi: "Rizki A.", jadwal: "2026-09-15", status: "Tertunda", catatan: "Menunggu konfirmasi pemilik toko" },
    { kode: "MTC-2026-012", klien: "Koperasi Mekar Jaya", perangkat: "NAS Synology DS220", jenis: "Cek kesehatan RAID & SMART", teknisi: "Agung G.", jadwal: "2026-08-28", status: "Selesai", catatan: "Disk 2 menunjukkan reallocated sector" },
    { kode: "MTC-2026-010", klien: "CV Sinar Abadi", perangkat: "UPS APC 1500VA", jenis: "Kalibrasi baterai", teknisi: "Rizki A.", jadwal: "2026-08-14", status: "Selesai", catatan: "Kapasitas baterai masih 82 persen" },
    { kode: "MTC-2026-008", klien: "SMP Harapan Bangsa", perangkat: "Lab Komputer (20 unit)", jenis: "Pembersihan & update antivirus", teknisi: "Rizki A.", jadwal: "2026-07-30", status: "Selesai", catatan: "3 unit perlu ganti pasta prosesor" },
  ],
};

/* ═════════════════════════════════════════════
   3. SYSTEM DEVELOPMENT
   ══════════════════════════════════════════════ */
const DEV_PROYEK: AdminDataset = {
  id: "dev_proyek",
  table: "dev_proyek",
  title: "System Development",
  icon: MENU_ICONS.cube,
  description: "Proyek pengembangan software, web application, dan pengelolaan database klien.",
  statusColumn: "status",
  badgeColors: { Perencanaan: SLATE, Development: BLUE, Testing: AMBER, Selesai: GREEN },
  columns: [
    { key: "kode", label: "Kode" },
    { key: "klien", label: "Klien" },
    { key: "proyek", label: "Nama Proyek" },
    { key: "jenis", label: "Jenis", type: "badge" },
    { key: "teknologi", label: "Teknologi" },
    { key: "progres", label: "Progres (%)", type: "number" },
    { key: "tenggat", label: "Tenggat", type: "date" },
    { key: "status", label: "Status", type: "badge" },
  ],
  paths: [
    { path: "/admin/development/software", label: "Custom Software", filter: { column: "jenis", values: ["Custom Software"] } },
    { path: "/admin/development/web", label: "Web Applications", filter: { column: "jenis", values: ["Web Application"] } },
    { path: "/admin/development/database", label: "Database Management", filter: { column: "jenis", values: ["Database"] } },
  ],
  rows: [
    { kode: "DEV-2026-014", klien: "Koperasi Mekar Jaya", proyek: "Aplikasi Simpan Pinjam", jenis: "Custom Software", teknologi: "React + Supabase", progres: 72, tenggat: "2026-10-15", status: "Development" },
    { kode: "DEV-2026-013", klien: "CV Sinar Abadi", proyek: "Website Company Profile", jenis: "Web Application", teknologi: "React + Tailwind", progres: 90, tenggat: "2026-09-28", status: "Testing" },
    { kode: "DEV-2026-012", klien: "Toko Roti Manis", proyek: "Aplikasi Kasir Toko", jenis: "Custom Software", teknologi: "React Native", progres: 45, tenggat: "2026-11-05", status: "Development" },
    { kode: "DEV-2026-011", klien: "SMP Harapan Bangsa", proyek: "Sistem Informasi Nilai", jenis: "Web Application", teknologi: "React + PostgreSQL", progres: 100, tenggat: "2026-08-20", status: "Selesai" },
    { kode: "DEV-2026-010", klien: "Koperasi Mekar Jaya", proyek: "Migrasi Database ke Supabase", jenis: "Database", teknologi: "PostgreSQL", progres: 60, tenggat: "2026-10-02", status: "Development" },
    { kode: "DEV-2026-009", klien: "CV Sinar Abadi", proyek: "Optimasi Query Laporan Penjualan", jenis: "Database", teknologi: "PostgreSQL", progres: 100, tenggat: "2026-07-18", status: "Selesai" },
    { kode: "DEV-2026-008", klien: "Bumdes Sejahtera", proyek: "Landing Page Promo", jenis: "Web Application", teknologi: "React + Vite", progres: 20, tenggat: "2026-12-01", status: "Perencanaan" },
  ],
};

/* ═════════════════════════════════════════════
   4. PROYEK DESAIN (Studio Kreatif)
   ══════════════════════════════════════════════ */
const DESAIN_BRIEF: AdminDataset = {
  id: "desain_brief",
  table: "desain_brief",
  title: "Proyek Desain",
  icon: MENU_ICONS.paintbrush,
  description: "Brief desain masuk dari klien, tahap pengerjaan/revisi, dan arsip portofolio.",
  statusColumn: "status",
  badgeColors: { "Brief Masuk": AMBER, Desain: BLUE, Revisi: PURPLE, Selesai: GREEN },
  columns: [
    { key: "kode", label: "Kode" },
    { key: "klien", label: "Klien" },
    { key: "brief", label: "Brief" },
    { key: "jenis", label: "Jenis" },
    { key: "desainer", label: "Desainer" },
    { key: "masuk", label: "Masuk", type: "date" },
    { key: "tenggat", label: "Tenggat", type: "date" },
    { key: "status", label: "Status", type: "badge" },
  ],
  paths: [
    { path: "/admin/desain/brief", label: "Brief Masuk", filter: { column: "status", values: ["Brief Masuk"] } },
    { path: "/admin/desain/proses", label: "Tahap Desain/Revisi", filter: { column: "status", values: ["Desain", "Revisi"] } },
    { path: "/admin/desain/portofolio", label: "Galeri Portofolio", filter: { column: "status", values: ["Selesai"] } },
  ],
  rows: [
    { kode: "DSN-2026-031", klien: "Toko Roti Manis", brief: "Desain kartu nama & stiker kemasan", jenis: "Print", desainer: "Fainaya", masuk: "2026-09-16", tenggat: "2026-09-20", status: "Brief Masuk" },
    { kode: "DSN-2026-030", klien: "CV Sinar Abadi", brief: "Logo perusahaan versi baru", jenis: "Logo", desainer: "Fainaya", masuk: "2026-09-15", tenggat: "2026-09-22", status: "Brief Masuk" },
    { kode: "DSN-2026-027", klien: "Koperasi Mekar Jaya", brief: "Banner promosi simpan pinjam", jenis: "Banner", desainer: "Fainaya", masuk: "2026-09-10", tenggat: "2026-09-17", status: "Desain" },
    { kode: "DSN-2026-026", klien: "SMP Harapan Bangsa", brief: "Video profil sekolah 3 menit", jenis: "Video", desainer: "Fainaya", masuk: "2026-09-08", tenggat: "2026-09-25", status: "Revisi" },
    { kode: "DSN-2026-024", klien: "Bumdes Sejahtera", brief: "Mockup kanopi & papan nama", jenis: "Mockup", desainer: "Fainaya", masuk: "2026-08-28", tenggat: "2026-09-05", status: "Selesai" },
    { kode: "DSN-2026-021", klien: "Toko Roti Manis", brief: "Desain feed Instagram 9 konten", jenis: "Social Media", desainer: "Fainaya", masuk: "2026-08-20", tenggat: "2026-08-30", status: "Selesai" },
  ],
};

/* ═════════════════════════════════════════════
   5. PROYEK KREASI TANGAN
   ══════════════════════════════════════════════ */
const KREASI_PROYEK: AdminDataset = {
  id: "kreasi_proyek",
  table: "kreasi_proyek",
  title: "Proyek Kreasi Tangan",
  icon: MENU_ICONS.heart,
  description: "Pesanan handmade (gantungan kunci, aksesoris, souvenir) dan progres pembuatannya.",
  statusColumn: "status",
  badgeColors: { "Pesanan Masuk": AMBER, Produksi: BLUE, Selesai: GREEN },
  columns: [
    { key: "kode", label: "Kode" },
    { key: "klien", label: "Klien" },
    { key: "produk", label: "Produk" },
    { key: "jumlah", label: "Jumlah", type: "number" },
    { key: "bahan", label: "Bahan" },
    { key: "pengrajin", label: "Pengrajin" },
    { key: "tenggat", label: "Tenggat", type: "date" },
    { key: "status", label: "Status", type: "badge" },
  ],
  paths: [
    { path: "/admin/kreasi/pesanan", label: "Pesanan Masuk", filter: { column: "status", values: ["Pesanan Masuk"] } },
    { path: "/admin/kreasi/proses", label: "Proses Pembuatan", filter: { column: "status", values: ["Produksi", "Selesai"] } },
  ],
  rows: [
    { kode: "KRS-2026-022", klien: "SMP Harapan Bangsa", produk: "Gantungan kunci akrilik", jumlah: 150, bahan: "Akrilik 3mm", pengrajin: "Fainaya", tenggat: "2026-09-30", status: "Pesanan Masuk" },
    { kode: "KRS-2026-021", klien: "Toko Roti Manis", produk: "Bros rajut custom", jumlah: 60, bahan: "Benang katun", pengrajin: "Fainaya", tenggat: "2026-09-26", status: "Pesanan Masuk" },
    { kode: "KRS-2026-019", klien: "Koperasi Mekar Jaya", produk: "Souvenir seminar (pin + lanyard)", jumlah: 200, bahan: "Kain satin", pengrajin: "Fainaya", tenggat: "2026-09-24", status: "Produksi" },
    { kode: "KRS-2026-018", klien: "Bumdes Sejahtera", produk: "Tempat kartu nama kulit sintetis", jumlah: 40, bahan: "Kulit sintetis", pengrajin: "Fainaya", tenggat: "2026-09-21", status: "Produksi" },
    { kode: "KRS-2026-015", klien: "CV Sinar Abadi", produk: "Plakat akrilik penghargaan", jumlah: 12, bahan: "Akrilik 5mm", pengrajin: "Fainaya", tenggat: "2026-09-02", status: "Selesai" },
    { kode: "KRS-2026-013", klien: "Toko Roti Manis", produk: "Gantungan kunci resin bentuk roti", jumlah: 80, bahan: "Resin bening", pengrajin: "Fainaya", tenggat: "2026-08-18", status: "Selesai" },
  ],
};

/* ═════════════════════════════════════════════
   6. INVENTARIS & STOK
   ══════════════════════════════════════════════ */
const INVENTARIS_BARANG: AdminDataset = {
  id: "inventaris_barang",
  table: "inventaris_barang",
  title: "Inventaris & Stok",
  icon: MENU_ICONS.collection,
  description: "Stok sparepart IT (tinta, RAM, SSD) dan bahan kreatif (filamen 3D, kertas ID card).",
  statusColumn: "status",
  badgeColors: { Tersedia: GREEN, Menipis: AMBER, Habis: RED },
  columns: [
    { key: "kode", label: "Kode" },
    { key: "nama", label: "Nama Barang" },
    { key: "kategori", label: "Kategori" },
    { key: "satuan", label: "Satuan" },
    { key: "stok", label: "Stok", type: "number" },
    { key: "stok_min", label: "Stok Min.", type: "number" },
    { key: "harga_beli", label: "Harga Beli", type: "currency" },
    { key: "lokasi", label: "Lokasi" },
    { key: "status", label: "Status", type: "badge" },
  ],
  paths: [{ path: "/admin/inventaris/daftar", label: "Daftar Stok" }],
  rows: [
    { kode: "INV-001", nama: "Tinta Epson T664 Black", kategori: "Sparepart IT", satuan: "botol", stok: 24, stok_min: 10, harga_beli: 62000, lokasi: "Rak A1", status: "Tersedia" },
    { kode: "INV-002", nama: "Tinta Epson T664 Color Set", kategori: "Sparepart IT", satuan: "set", stok: 3, stok_min: 5, harga_beli: 185000, lokasi: "Rak A1", status: "Menipis" },
    { kode: "INV-003", nama: "SSD SATA 256GB", kategori: "Sparepart IT", satuan: "pcs", stok: 8, stok_min: 4, harga_beli: 385000, lokasi: "Rak B2", status: "Tersedia" },
    { kode: "INV-004", nama: "RAM DDR4 8GB Notebook", kategori: "Sparepart IT", satuan: "pcs", stok: 0, stok_min: 3, harga_beli: 430000, lokasi: "Rak B2", status: "Habis" },
    { kode: "INV-005", nama: "Filamen PLA 1.75mm Hitam", kategori: "Bahan Kreatif", satuan: "roll", stok: 6, stok_min: 4, harga_beli: 165000, lokasi: "Rak C1", status: "Tersedia" },
    { kode: "INV-006", nama: "Kertas ID Card PVC Blank", kategori: "Bahan Kreatif", satuan: "pack", stok: 2, stok_min: 5, harga_beli: 95000, lokasi: "Rak C2", status: "Menipis" },
    { kode: "INV-007", nama: "Akrilik 3mm Bening", kategori: "Bahan Kreatif", satuan: "lembar", stok: 11, stok_min: 6, harga_beli: 78000, lokasi: "Rak C3", status: "Tersedia" },
  ],
};

const INVENTARIS_MUTASI: AdminDataset = {
  id: "inventaris_mutasi",
  table: "inventaris_mutasi",
  title: "Mutasi Stok",
  icon: MENU_ICONS.collection,
  description: "Catatan barang masuk dan keluar dari gudang, termasuk referensi tiket servis atau pesanan.",
  badgeColors: { Masuk: GREEN, Keluar: AMBER },
  columns: [
    { key: "kode", label: "Kode" },
    { key: "tanggal", label: "Tanggal", type: "date" },
    { key: "barang", label: "Barang" },
    { key: "tipe", label: "Tipe", type: "badge" },
    { key: "jumlah", label: "Jumlah", type: "number" },
    { key: "referensi", label: "Referensi" },
    { key: "petugas", label: "Petugas" },
    { key: "catatan", label: "Catatan" },
  ],
  paths: [{ path: "/admin/inventaris/mutasi", label: "Mutasi Stok" }],
  rows: [
    { kode: "MUT-2026-051", tanggal: "2026-09-16", barang: "SSD SATA 256GB", tipe: "Masuk", jumlah: 5, referensi: "PO-2026-018", petugas: "Agung G.", catatan: "Pembelian dari supplier Mitra Komputer" },
    { kode: "MUT-2026-050", tanggal: "2026-09-15", barang: "Tinta Epson T664 Black", tipe: "Keluar", jumlah: 2, referensi: "SRV-2026-038", petugas: "Rizki A.", catatan: "Pemakaian servis printer pelanggan" },
    { kode: "MUT-2026-049", tanggal: "2026-09-14", barang: "Kertas ID Card PVC Blank", tipe: "Keluar", jumlah: 3, referensi: "KRS-2026-019", petugas: "Fainaya", catatan: "Produksi souvenir seminar" },
    { kode: "MUT-2026-048", tanggal: "2026-09-12", barang: "Filamen PLA 1.75mm Hitam", tipe: "Masuk", jumlah: 4, referensi: "PO-2026-017", petugas: "Fainaya", catatan: "Restok bahan cetak 3D" },
    { kode: "MUT-2026-047", tanggal: "2026-09-10", barang: "RAM DDR4 8GB Notebook", tipe: "Keluar", jumlah: 3, referensi: "SRV-2026-033", petugas: "Rizki A.", catatan: "Pemasangan RAM pelanggan" },
    { kode: "MUT-2026-046", tanggal: "2026-09-08", barang: "Akrilik 3mm Bening", tipe: "Masuk", jumlah: 6, referensi: "PO-2026-016", petugas: "Fainaya", catatan: "Stok untuk plakat dan gantungan kunci" },
  ],
};

/* ═════════════════════════════════════════════
   7. KEUANGAN & KAS
   ═════════════════════════════════════════════ */
const KEUANGAN_TAGIHAN: AdminDataset = {
  id: "keuangan_tagihan",
  table: "keuangan_tagihan",
  title: "Tagihan / Invoices",
  icon: MENU_ICONS.cash,
  description: "Nota digital untuk klien: servis, proyek desain, dan pengembangan sistem.",
  statusColumn: "status",
  badgeColors: { Lunas: GREEN, "Belum Dibayar": AMBER, "Jatuh Tempo": RED },
  columns: [
    { key: "nomor", label: "No. Invoice" },
    { key: "klien", label: "Klien" },
    { key: "deskripsi", label: "Deskripsi" },
    { key: "tanggal", label: "Tanggal", type: "date" },
    { key: "jatuh_tempo", label: "Jatuh Tempo", type: "date" },
    { key: "total", label: "Total", type: "currency" },
    { key: "status", label: "Status", type: "badge" },
  ],
  paths: [{ path: "/admin/keuangan/tagihan", label: "Tagihan / Invoices" }],
  rows: [
    { nomor: "INV-2026-092", klien: "Koperasi Mekar Jaya", deskripsi: "Banner promosi simpan pinjam", tanggal: "2026-09-15", jatuh_tempo: "2026-09-22", total: 850000, status: "Belum Dibayar" },
    { nomor: "INV-2026-091", klien: "CV Sinar Abadi", deskripsi: "Website company profile (tahap 2)", tanggal: "2026-09-12", jatuh_tempo: "2026-09-19", total: 3500000, status: "Belum Dibayar" },
    { nomor: "INV-2026-089", klien: "Dewi Lestari", deskripsi: "Servis PC Dell - ganti SSD 256GB", tanggal: "2026-09-05", jatuh_tempo: "2026-09-12", total: 720000, status: "Jatuh Tempo" },
    { nomor: "INV-2026-086", klien: "SMP Harapan Bangsa", deskripsi: "Souvenir seminar 200 pcs", tanggal: "2026-08-30", jatuh_tempo: "2026-09-06", total: 4200000, status: "Lunas" },
    { nomor: "INV-2026-083", klien: "Budi Santoso", deskripsi: "Pembelian tinta Epson T664 set", tanggal: "2026-08-24", jatuh_tempo: "2026-08-31", total: 185000, status: "Lunas" },
    { nomor: "INV-2026-080", klien: "Toko Roti Manis", deskripsi: "Desain feed Instagram 9 konten", tanggal: "2026-08-18", jatuh_tempo: "2026-08-25", total: 1350000, status: "Lunas" },
  ],
};

const KEUANGAN_PENGELUARAN: AdminDataset = {
  id: "keuangan_pengeluaran",
  table: "keuangan_pengeluaran",
  title: "Pengeluaran",
  icon: MENU_ICONS.cash,
  description: "Catatan pembelian sparepart, biaya operasional, dan pembelian aset digital.",
  badgeColors: { Kas: BLUE, Transfer: PURPLE },
  columns: [
    { key: "kode", label: "Kode" },
    { key: "tanggal", label: "Tanggal", type: "date" },
    { key: "kategori", label: "Kategori" },
    { key: "deskripsi", label: "Deskripsi" },
    { key: "jumlah", label: "Jumlah", type: "currency" },
    { key: "metode", label: "Metode", type: "badge" },
    { key: "pencatat", label: "Pencatat" },
  ],
  paths: [{ path: "/admin/keuangan/pengeluaran", label: "Pengeluaran" }],
  rows: [
    { kode: "EXP-2026-071", tanggal: "2026-09-16", kategori: "Pembelian Sparepart", deskripsi: "5 unit SSD SATA 256GB", jumlah: 1925000, metode: "Transfer", pencatat: "Agung G." },
    { kode: "EXP-2026-070", tanggal: "2026-09-14", kategori: "Pembelian Sparepart", deskripsi: "Tinta Epson T664 color set 3 pcs", jumlah: 555000, metode: "Transfer", pencatat: "Rizki A." },
    { kode: "EXP-2026-069", tanggal: "2026-09-12", kategori: "Bahan Kreatif", deskripsi: "Filamen PLA 4 roll", jumlah: 660000, metode: "Transfer", pencatat: "Fainaya" },
    { kode: "EXP-2026-068", tanggal: "2026-09-10", kategori: "Operasional", deskripsi: "Listrik & internet studio", jumlah: 785000, metode: "Transfer", pencatat: "Fainaya" },
    { kode: "EXP-2026-067", tanggal: "2026-09-05", kategori: "Aset Digital", deskripsi: "Langganan tools desain 1 bulan", jumlah: 320000, metode: "Transfer", pencatat: "Fainaya" },
    { kode: "EXP-2026-066", tanggal: "2026-09-02", kategori: "Operasional", deskripsi: "Bensin & biaya kunjungan klien", jumlah: 250000, metode: "Kas", pencatat: "Agung G." },
  ],
};

/* ═════════════════════════════════════════════
   8. INTEGRASI CHATBOT & WEBSITE
   ═════════════════════════════════════════════ */
const INTEGRASI_CONFIG: AdminDataset = {
  id: "integrasi_config",
  table: "integrasi_config",
  title: "Integrasi Chatbot & Website",
  icon: MENU_ICONS.robot,
  description: "Konfigurasi widget bot (Botpress/Tidio) dan integrasi konten landing page utama.",
  statusColumn: "status",
  badgeColors: { Aktif: GREEN, Nonaktif: SLATE, "Perlu Review": AMBER },
  columns: [
    { key: "nama", label: "Nama Integrasi" },
    { key: "jenis", label: "Jenis", type: "badge" },
    { key: "status", label: "Status", type: "badge" },
    { key: "nilai", label: "Endpoint / ID" },
    { key: "keterangan", label: "Keterangan" },
  ],
  paths: [
    { path: "/admin/integrasi/chatbot", label: "Konfigurasi Chatbot", filter: { column: "jenis", values: ["Chatbot"] } },
    { path: "/admin/integrasi/website", label: "Integrasi Website", filter: { column: "jenis", values: ["Website"] } },
  ],
  rows: [
    { nama: "Chatbot Widget (Botpress)", jenis: "Chatbot", status: "Aktif", nilai: "webchat-v1", keterangan: "Widget aktif di landing page utama" },
    { nama: "Tidio Live Chat", jenis: "Chatbot", status: "Nonaktif", nilai: "-", keterangan: "Menunggu evaluasi biaya bulanan" },
    { nama: "Webhook Order Servis", jenis: "Chatbot", status: "Perlu Review", nilai: "/hooks/servis", keterangan: "Perlu validasi format payload dari bot" },
    { nama: "WhatsApp Business API", jenis: "Chatbot", status: "Nonaktif", nilai: "-", keterangan: "Rencana integrasi kuartal keempat 2026" },
    { nama: "Google Analytics 4", jenis: "Website", status: "Aktif", nilai: "G-FAINAYA26", keterangan: "Tracking kunjungan landing page" },
    { nama: "Form Kontak Landing Page", jenis: "Website", status: "Aktif", nilai: "kontak@fainaya.id", keterangan: "Terhubung ke notifikasi email admin" },
    { nama: "Sitemap & SEO Meta", jenis: "Website", status: "Aktif", nilai: "/sitemap.xml", keterangan: "Diperbarui otomatis setiap publish blog" },
    { nama: "Halaman Portofolio Publik", jenis: "Website", status: "Perlu Review", nilai: "/blog", keterangan: "Perlu sinkronisasi dengan galeri portofolio" },
  ],
};

/* ═════════════════════════════════════════════
   9. PENGATURAN SISTEM
   ═════════════════════════════════════════════ */
const PENGATURAN_SISTEM: AdminDataset = {
  id: "pengaturan_sistem",
  table: "pengaturan_sistem",
  title: "Pengaturan Sistem",
  icon: MENU_ICONS.cog,
  description: "Profil bisnis, jam operasional, backup database, dan kebijakan keamanan panel admin.",
  statusColumn: "kategori",
  badgeColors: { Umum: BLUE, Keamanan: PURPLE },
  columns: [
    { key: "kunci", label: "Kunci" },
    { key: "kategori", label: "Kategori", type: "badge" },
    { key: "nilai", label: "Nilai" },
    { key: "keterangan", label: "Keterangan" },
  ],
  paths: [
    { path: "/admin/pengaturan/umum", label: "Pengaturan Umum", filter: { column: "kategori", values: ["Umum"] } },
    { path: "/admin/pengaturan/keamanan", label: "Keamanan & Akses", filter: { column: "kategori", values: ["Keamanan"] } },
  ],
  rows: [
    { kunci: "nama_bisnis", kategori: "Umum", nilai: "Fainaya Service & Art", keterangan: "Nama yang tampil di invoice dan website" },
    { kunci: "alamat", kategori: "Umum", nilai: "West Java, Indonesia", keterangan: "Alamat operasional untuk dokumen resmi" },
    { kunci: "jam_operasional", kategori: "Umum", nilai: "Sen-Jum 16.00-20.00, Sab-Min 14.00-20.00", keterangan: "Ditampilkan di halaman kontak" },
    { kunci: "mata_uang", kategori: "Umum", nilai: "IDR", keterangan: "Format mata uang pada invoice dan kas" },
    { kunci: "backup_otomatis", kategori: "Keamanan", nilai: "Harian 02.00 WIB", keterangan: "Backup database Supabase terjadwal" },
    { kunci: "sesi_login", kategori: "Keamanan", nilai: "8 jam", keterangan: "Batas waktu sesi admin sebelum logout otomatis" },
    { kunci: "wajib_2fa", kategori: "Keamanan", nilai: "Nonaktif", keterangan: "Rencana aktivasi untuk seluruh staf" },
    { kunci: "ip_allowlist", kategori: "Keamanan", nilai: "Belum diatur", keterangan: "Pembatasan alamat IP akses panel admin" },
  ],
};

/* ════════════════════════════════════════════
   10. AKUN & HAK AKSES STAF
   ═════════════════════════════════════════════ */
const ADMIN_USERS: AdminDataset = {
  id: "admin_users",
  table: "admin_users",
  title: "Akun & Hak Akses",
  icon: MENU_ICONS.shield,
  description: "Daftar staf yang bisa mengakses panel admin beserta peran dan status akunnya.",
  statusColumn: "peran",
  badgeColors: {
    Administrator: PURPLE,
    Teknisi: BLUE,
    Desainer: AMBER,
    Staf: SLATE,
    Aktif: GREEN,
    Nonaktif: SLATE,
  },
  columns: [
    { key: "nama", label: "Nama" },
    { key: "email", label: "Email" },
    { key: "peran", label: "Peran", type: "badge" },
    { key: "status", label: "Status", type: "badge" },
    { key: "terakhir_masuk", label: "Terakhir Masuk", type: "datetime" },
  ],
  paths: [{ path: "/admin/akun", label: "Akun & Hak Akses" }],
  rows: [
    { nama: "Agung Gema", email: "agunggema@fainaya.id", peran: "Administrator", status: "Aktif", terakhir_masuk: new Date(Date.now() - 10 * 60000).toISOString() },
    { nama: "Rizki Ardian", email: "rizki@fainaya.id", peran: "Teknisi", status: "Aktif", terakhir_masuk: new Date(Date.now() - 3 * 3600000).toISOString() },
    { nama: "Fainaya Putri", email: "fainaya@fainaya.id", peran: "Desainer", status: "Aktif", terakhir_masuk: new Date(Date.now() - 26 * 3600000).toISOString() },
    { nama: "Sari Melati", email: "sari@fainaya.id", peran: "Staf", status: "Nonaktif", terakhir_masuk: new Date(Date.now() - 21 * 24 * 3600000).toISOString() },
  ],
};

/* ═════════════════════════════════════════════
   11. LOG SISTEM
   ═════════════════════════════════════════════ */
const LOG_SISTEM: AdminDataset = {
  id: "log_sistem",
  table: "log_sistem",
  title: "Log Sistem",
  icon: MENU_ICONS.monitor,
  description: "Catatan aktivitas sistem: sinkronisasi data, backup, chatbot, dan peringatan stok/invoice.",
  statusColumn: "level",
  badgeColors: { INFO: SLATE, WARNING: AMBER, ERROR: RED },
  columns: [
    { key: "waktu", label: "Waktu", type: "datetime" },
    { key: "level", label: "Level", type: "badge" },
    { key: "sumber", label: "Sumber" },
    { key: "pesan", label: "Pesan" },
    { key: "detail", label: "Detail" },
  ],
  paths: [
    { path: "/admin/log-sistem", label: "Log Sistem" },
    { path: "/admin/log-aktivitas", label: "Log Aktivitas Sistem" },
  ],
  rows: [
    { waktu: new Date(Date.now() - 5 * 60000).toISOString(), level: "INFO", sumber: "visitor-tracker", pesan: "Menyimpan 128 kunjungan harian ke visitor_logs", detail: "Sumber data: Supabase" },
    { waktu: new Date(Date.now() - 40 * 60000).toISOString(), level: "WARNING", sumber: "inventaris", pesan: "Stok tinta EPSON T664 color set tersisa 3 pcs", detail: "Batas minimum 5 pcs" },
    { waktu: new Date(Date.now() - 2 * 3600000).toISOString(), level: "INFO", sumber: "backup", pesan: "Backup harian database berhasil", detail: "Ukuran 24 MB" },
    { waktu: new Date(Date.now() - 6 * 3600000).toISOString(), level: "ERROR", sumber: "chatbot", pesan: "Webhook order servis gagal diproses", detail: "Payload tidak sesuai skema" },
    { waktu: new Date(Date.now() - 24 * 3600000).toISOString(), level: "INFO", sumber: "auth", pesan: "Login admin berhasil", detail: "agunggema@fainaya.id" },
    { waktu: new Date(Date.now() - 48 * 3600000).toISOString(), level: "WARNING", sumber: "keuangan", pesan: "Invoice INV-2026-089 melewati jatuh tempo", detail: "Nominal Rp 720.000" },
  ],
};

/* ═════════════════════════════════════════════
   12. NOTIFIKASI (chat masuk, servis, desain)
   ═════════════════════════════════════════════ */
const NOTIFIKASI: AdminDataset = {
  id: "notifikasi",
  table: "notifikasi",
  title: "Notifikasi & Chat Masuk",
  icon: MENU_ICONS.bell,
  description: "Pemberitahuan chat masuk dari bot, servis melewati batas waktu, revisi desain, dan stok menipis.",
  badgeColors: { chat: BLUE, service: AMBER, design: PURPLE },
  columns: [
    { key: "judul", label: "Judul" },
    { key: "deskripsi", label: "Deskripsi" },
    { key: "tipe", label: "Tipe", type: "badge" },
    { key: "dibaca", label: "Status" },
    { key: "dibuat_pada", label: "Waktu", type: "datetime" },
  ],
  paths: [{ path: "/admin/notifikasi", label: "Notifikasi & Chat Masuk" }],
  rows: [
    { judul: "Chat Masuk", deskripsi: "Pelanggan menanyakan status servis printer Epson L3110", tipe: "chat", dibaca: "Belum dibaca", dibuat_pada: new Date(Date.now() - 2 * 60000).toISOString() },
    { judul: "Servis Melewati Batas", deskripsi: "Servis komputer #SVC-042 sudah 3 hari melewati estimasi", tipe: "service", dibaca: "Belum dibaca", dibuat_pada: new Date(Date.now() - 15 * 60000).toISOString() },
    { judul: "Revisi Desain", deskripsi: "Klien mengirimkan revisi untuk proyek desain logo", tipe: "design", dibaca: "Sudah dibaca", dibuat_pada: new Date(Date.now() - 3600000).toISOString() },
    { judul: "Stok Menipis", deskripsi: "Tinta printer EPSON T664 color set tersisa 3 pcs", tipe: "service", dibaca: "Sudah dibaca", dibuat_pada: new Date(Date.now() - 3 * 3600000).toISOString() },
  ],
};

/* ═════════════════════════════════════════════
   REGISTRY: dataset + route modul admin
   ════════════════════════════════════════════ */
export const ADMIN_DATASETS: AdminDataset[] = [
  SERVIS_TIKET,
  MAINTENANCE_LOG,
  DEV_PROYEK,
  DESAIN_BRIEF,
  KREASI_PROYEK,
  INVENTARIS_BARANG,
  INVENTARIS_MUTASI,
  KEUANGAN_TAGIHAN,
  KEUANGAN_PENGELUARAN,
  INTEGRASI_CONFIG,
  PENGATURAN_SISTEM,
  ADMIN_USERS,
  LOG_SISTEM,
  NOTIFIKASI,
];

/** Seluruh route modul admin (dipakai untuk generate <Route> di App.tsx). */
export const ADMIN_MODUL_ROUTES: { path: string; label: string; datasetId: string }[] = ADMIN_DATASETS.flatMap(
  (dataset) =>
    dataset.paths.map((datasetPath) => ({
      path: datasetPath.path,
      label: datasetPath.label,
      datasetId: dataset.id,
    })),
);

/** Cari dataset beserta metadata route berdasarkan path route. */
export function findDatasetByPath(path: string): { dataset: AdminDataset; datasetPath: AdminDatasetPath } | null {
  for (const dataset of ADMIN_DATASETS) {
    const datasetPath = dataset.paths.find((entry) => entry.path === path);
    if (datasetPath) return { dataset, datasetPath };
  }
  return null;
}

/* ═════════════════════════════════════════════
   FETCH: Supabase (primary) -> data sampel (fallback)
   ═════════════════════════════════════════════ */
export type AdminRowsResult = {
  rows: AdminRow[];
  source: "supabase" | "local";
};

/**
 * Ambil baris dari tabel Supabase terkait dataset.
 * Bila tabel belum ada/kosong/gagal diakses, dipakai data sampel lokal
 * supaya halaman tetap terisi.
 */
export async function fetchAdminRows(datasetId: string): Promise<AdminRowsResult> {
  const dataset = ADMIN_DATASETS.find((entry) => entry.id === datasetId);
  if (!dataset) return { rows: [], source: "local" };

  try {
    const { data, error } = await supabase.from(dataset.table).select("*").limit(500);
    if (error) throw error;
    if (data && data.length > 0) return { rows: data as AdminRow[], source: "supabase" };
  } catch (err) {
    console.warn(`Gagal memuat tabel ${dataset.table} dari Supabase, memakai data sampel:`, err);
  }

  return { rows: dataset.rows, source: "local" };
}