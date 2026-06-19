-- =============================================
-- Migration: Create pelanggan and log_aktivitas tables
-- Date: 2026-06-19
-- =============================================

-- 1. TABLE: pelanggan
CREATE TABLE IF NOT EXISTS pelanggan (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  kode TEXT UNIQUE NOT NULL,
  nama TEXT NOT NULL,
  email TEXT,
  telepon TEXT,
  bergabung DATE DEFAULT CURRENT_DATE,
  status TEXT DEFAULT 'aktif' CHECK (status IN ('aktif', 'nonaktif')),
  total_transaksi INTEGER DEFAULT 0,
  terakhir_aktif TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_pelanggan_updated_at
  BEFORE UPDATE ON pelanggan
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS (Row Level Security)
ALTER TABLE pelanggan ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read/write
CREATE POLICY "Allow authenticated users to read pelanggan"
  ON pelanggan FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert pelanggan"
  ON pelanggan FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update pelanggan"
  ON pelanggan FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete pelanggan"
  ON pelanggan FOR DELETE
  TO authenticated
  USING (true);

-- 2. TABLE: log_aktivitas
CREATE TABLE IF NOT EXISTS log_aktivitas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  kode TEXT UNIQUE NOT NULL,
  pelanggan_id UUID REFERENCES pelanggan(id) ON DELETE CASCADE,
  pelanggan_nama TEXT NOT NULL,
  tipe TEXT NOT NULL CHECK (tipe IN ('kunjungan', 'servis', 'transaksi', 'profil', 'pesanan')),
  deskripsi TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE log_aktivitas ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read/write
CREATE POLICY "Allow authenticated users to read log_aktivitas"
  ON log_aktivitas FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert log_aktivitas"
  ON log_aktivitas FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update log_aktivitas"
  ON log_aktivitas FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete log_aktivitas"
  ON log_aktivitas FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_pelanggan_status ON pelanggan(status);
CREATE INDEX IF NOT EXISTS idx_pelanggan_kode ON pelanggan(kode);
CREATE INDEX IF NOT EXISTS idx_log_aktivitas_pelanggan_id ON log_aktivitas(pelanggan_id);
CREATE INDEX IF NOT EXISTS idx_log_aktivitas_tipe ON log_aktivitas(tipe);
CREATE INDEX IF NOT EXISTS idx_log_aktivitas_timestamp ON log_aktivitas(timestamp DESC);