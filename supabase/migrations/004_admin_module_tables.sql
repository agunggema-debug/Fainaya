-- =============================================
-- Migration: Tabel modul admin (Ext JS style web desktop)
-- Date: 2026-09-17
-- Deskripsi: tabel untuk halaman admin yang sebelumnya masih kosong
--            (servis, maintenance, development, desain, kreasi, inventaris,
--             keuangan, integrasi, pengaturan, admin, notifikasi).
-- =============================================

-- Helper: aktifkan RLS + policy CRUD untuk user terautentikasi
CREATE OR REPLACE FUNCTION enable_admin_rls(target_table TEXT)
RETURNS VOID AS $$
BEGIN
  EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', target_table);
  EXECUTE format('CREATE POLICY "Allow authenticated users to read %s" ON %I FOR SELECT TO authenticated USING (true)', target_table, target_table);
  EXECUTE format('CREATE POLICY "Allow authenticated users to insert %s" ON %I FOR INSERT TO authenticated WITH CHECK (true)', target_table, target_table);
  EXECUTE format('CREATE POLICY "Allow authenticated users to update %s" ON %I FOR UPDATE TO authenticated USING (true) WITH CHECK (true)', target_table, target_table);
  EXECUTE format('CREATE POLICY "Allow authenticated users to delete %s" ON %I FOR DELETE TO authenticated USING (true)', target_table, target_table);
END;
$$ LANGUAGE plpgsql;

-- Trigger updated_at (fungsi dibuat ulang agar migration ini berdiri sendiri)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 1. TABLE: servis_tiket (Servis & Perbaikan / IT Support)
CREATE TABLE IF NOT EXISTS servis_tiket (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  kode TEXT UNIQUE NOT NULL,
  pelanggan TEXT NOT NULL,
  perangkat TEXT,
  keluhan TEXT,
  prioritas TEXT DEFAULT 'Normal' CHECK (prioritas IN ('Tinggi', 'Normal', 'Rendah')),
  teknisi TEXT,
  tahap TEXT DEFAULT 'Antrean' CHECK (tahap IN ('Antrean', 'Proses', 'Selesai')),
  estimasi DATE,
  biaya NUMERIC(12, 2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
SELECT enable_admin_rls('servis_tiket');

-- 2. TABLE: maintenance_log (Log Perawatan)
CREATE TABLE IF NOT EXISTS maintenance_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  kode TEXT UNIQUE NOT NULL,
  klien TEXT NOT NULL,
  perangkat TEXT,
  jenis TEXT,
  teknisi TEXT,
  jadwal DATE,
  status TEXT DEFAULT 'Terjadwal' CHECK (status IN ('Terjadwal', 'Selesai', 'Tertunda', 'Urgent')),
  catatan TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
SELECT enable_admin_rls('maintenance_log');

-- 3. TABLE: dev_proyek (System Development)
CREATE TABLE IF NOT EXISTS dev_proyek (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  kode TEXT UNIQUE NOT NULL,
  klien TEXT NOT NULL,
  proyek TEXT NOT NULL,
  jenis TEXT DEFAULT 'Web Application'
    CHECK (jenis IN ('Custom Software', 'Web Application', 'Database')),
  teknologi TEXT,
  progres INTEGER DEFAULT 0 CHECK (progres BETWEEN 0 AND 100),
  tenggat DATE,
  status TEXT DEFAULT 'Perencanaan'
    CHECK (status IN ('Perencanaan', 'Development', 'Testing', 'Selesai')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
SELECT enable_admin_rls('dev_proyek');

-- 4. TABLE: desain_brief (Proyek Desain / Studio Kreatif)
CREATE TABLE IF NOT EXISTS desain_brief (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  kode TEXT UNIQUE NOT NULL,
  klien TEXT NOT NULL,
  brief TEXT NOT NULL,
  jenis TEXT,
  desainer TEXT,
  masuk DATE DEFAULT CURRENT_DATE,
  tenggat DATE,
  status TEXT DEFAULT 'Brief Masuk'
    CHECK (status IN ('Brief Masuk', 'Desain', 'Revisi', 'Selesai')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
SELECT enable_admin_rls('desain_brief');

-- Trigger updated_at untuk tabel di atas
DO $$
DECLARE t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY['servis_tiket', 'maintenance_log', 'dev_proyek', 'desain_brief'] LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS set_%1$s_updated_at ON %1$I', t);
    EXECUTE format(
      'CREATE TRIGGER set_%1$s_updated_at BEFORE UPDATE ON %1$I FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()',
      t
    );
  END LOOP;
END $$;

-- 5. TABLE: kreasi_proyek (Proyek Kreasi Tangan)
CREATE TABLE IF NOT EXISTS kreasi_proyek (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  kode TEXT UNIQUE NOT NULL,
  klien TEXT NOT NULL,
  produk TEXT NOT NULL,
  jumlah INTEGER DEFAULT 1,
  bahan TEXT,
  pengrajin TEXT,
  tenggat DATE,
  status TEXT DEFAULT 'Pesanan Masuk'
    CHECK (status IN ('Pesanan Masuk', 'Produksi', 'Selesai')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
SELECT enable_admin_rls('kreasi_proyek');

-- 6. TABLE: inventaris_barang (Inventaris & Stok)
CREATE TABLE IF NOT EXISTS inventaris_barang (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  kode TEXT UNIQUE NOT NULL,
  nama TEXT NOT NULL,
  kategori TEXT DEFAULT 'Sparepart IT',
  satuan TEXT DEFAULT 'pcs',
  stok INTEGER DEFAULT 0,
  stok_min INTEGER DEFAULT 0,
  harga_beli NUMERIC(12, 2) DEFAULT 0,
  lokasi TEXT,
  status TEXT DEFAULT 'Tersedia' CHECK (status IN ('Tersedia', 'Menipis', 'Habis')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
SELECT enable_admin_rls('inventaris_barang');

-- 7. TABLE: inventaris_mutasi (Mutasi Stok)
CREATE TABLE IF NOT EXISTS inventaris_mutasi (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  kode TEXT UNIQUE NOT NULL,
  tanggal DATE DEFAULT CURRENT_DATE,
  barang TEXT NOT NULL,
  tipe TEXT DEFAULT 'Masuk' CHECK (tipe IN ('Masuk', 'Keluar')),
  jumlah INTEGER DEFAULT 1,
  referensi TEXT,
  petugas TEXT,
  catatan TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
SELECT enable_admin_rls('inventaris_mutasi');

-- 8. TABLE: keuangan_tagihan (Tagihan / Invoices)
CREATE TABLE IF NOT EXISTS keuangan_tagihan (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nomor TEXT UNIQUE NOT NULL,
  klien TEXT NOT NULL,
  deskripsi TEXT,
  tanggal DATE DEFAULT CURRENT_DATE,
  jatuh_tempo DATE,
  total NUMERIC(12, 2) DEFAULT 0,
  status TEXT DEFAULT 'Belum Dibayar'
    CHECK (status IN ('Lunas', 'Belum Dibayar', 'Jatuh Tempo')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
SELECT enable_admin_rls('keuangan_tagihan');

-- 9. TABLE: keuangan_pengeluaran (Pengeluaran)
CREATE TABLE IF NOT EXISTS keuangan_pengeluaran (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  kode TEXT UNIQUE NOT NULL,
  tanggal DATE DEFAULT CURRENT_DATE,
  kategori TEXT,
  deskripsi TEXT NOT NULL,
  jumlah NUMERIC(12, 2) DEFAULT 0,
  metode TEXT DEFAULT 'Kas' CHECK (metode IN ('Kas', 'Transfer')),
  pencatat TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
SELECT enable_admin_rls('keuangan_pengeluaran');

-- 10. TABLE: integrasi_config (Integrasi Chatbot & Website)
CREATE TABLE IF NOT EXISTS integrasi_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nama TEXT UNIQUE NOT NULL,
  jenis TEXT DEFAULT 'Chatbot' CHECK (jenis IN ('Chatbot', 'Website')),
  status TEXT DEFAULT 'Nonaktif' CHECK (status IN ('Aktif', 'Nonaktif', 'Perlu Review')),
  nilai TEXT,
  keterangan TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
SELECT enable_admin_rls('integrasi_config');

-- 11. TABLE: pengaturan_sistem
CREATE TABLE IF NOT EXISTS pengaturan_sistem (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  kunci TEXT UNIQUE NOT NULL,
  kategori TEXT DEFAULT 'Umum' CHECK (kategori IN ('Umum', 'Keamanan')),
  nilai TEXT,
  keterangan TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
SELECT enable_admin_rls('pengaturan_sistem');

-- 12. TABLE: admin_users (hak akses staf)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nama TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  peran TEXT DEFAULT 'Staf' CHECK (peran IN ('Administrator', 'Teknisi', 'Desainer', 'Staf')),
  status TEXT DEFAULT 'Aktif' CHECK (status IN ('Aktif', 'Nonaktif')),
  terakhir_masuk TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
SELECT enable_admin_rls('admin_users');

-- 13. TABLE: notifikasi (chat masuk, servis melewati batas, revisi desain, stok menipis)
CREATE TABLE IF NOT EXISTS notifikasi (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  judul TEXT UNIQUE NOT NULL,
  deskripsi TEXT,
  tipe TEXT DEFAULT 'chat' CHECK (tipe IN ('chat', 'service', 'design')),
  dibaca BOOLEAN DEFAULT FALSE,
  dibuat_pada TIMESTAMPTZ DEFAULT NOW()
);
SELECT enable_admin_rls('notifikasi');

-- 14. TABLE: log_sistem (log backend/sistem)
CREATE TABLE IF NOT EXISTS log_sistem (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  waktu TIMESTAMPTZ DEFAULT NOW(),
  level TEXT DEFAULT 'INFO' CHECK (level IN ('INFO', 'WARNING', 'ERROR')),
  sumber TEXT,
  pesan TEXT NOT NULL,
  detail TEXT
);
SELECT enable_admin_rls('log_sistem');

-- Indexes untuk kolom yang sering difilter
CREATE INDEX IF NOT EXISTS idx_servis_tiket_tahap ON servis_tiket(tahap);
CREATE INDEX IF NOT EXISTS idx_maintenance_log_status ON maintenance_log(status);
CREATE INDEX IF NOT EXISTS idx_dev_proyek_jenis ON dev_proyek(jenis);
CREATE INDEX IF NOT EXISTS idx_desain_brief_status ON desain_brief(status);
CREATE INDEX IF NOT EXISTS idx_kreasi_proyek_status ON kreasi_proyek(status);
CREATE INDEX IF NOT EXISTS idx_inventaris_barang_status ON inventaris_barang(status);
CREATE INDEX IF NOT EXISTS idx_keuangan_tagihan_status ON keuangan_tagihan(status);
CREATE INDEX IF NOT EXISTS idx_notifikasi_dibaca ON notifikasi(dibaca);