-- =============================================
-- Seed Data: pelanggan and log_aktivitas
-- Execute this AFTER running 001_create_tables.sql
-- =============================================

-- Insert pelanggan (customers)
INSERT INTO pelanggan (kode, nama, email, telepon, bergabung, status, total_transaksi, terakhir_aktif) VALUES
  ('P-001', 'Budi Santoso', 'budi@email.com', '0812-3456-7890', '2025-11-15', 'aktif', 12, '2026-06-19T08:00:00+07:00'),
  ('P-002', 'Siti Nurhaliza', 'siti@email.com', '0856-7890-1234', '2026-01-20', 'aktif', 8, '2026-06-18T10:30:00+07:00'),
  ('P-003', 'Ahmad Rizki', 'ahmad@email.com', '0878-9012-3456', '2026-03-05', 'aktif', 5, '2026-06-17T14:15:00+07:00'),
  ('P-004', 'Dewi Lestari', 'dewi@email.com', '0821-3456-7890', '2025-09-10', 'aktif', 20, '2026-06-19T09:45:00+07:00'),
  ('P-005', 'Rudi Hartono', 'rudi@email.com', '0813-5678-9012', '2026-04-12', 'nonaktif', 2, '2026-05-01T11:00:00+07:00'),
  ('P-006', 'Maya Anggraini', 'maya@email.com', '0857-8901-2345', '2025-12-01', 'aktif', 15, '2026-06-18T16:20:00+07:00'),
  ('P-007', 'Doni Prasetyo', 'doni@email.com', '0877-1234-5678', '2026-02-14', 'aktif', 7, '2026-06-16T13:10:00+07:00'),
  ('P-008', 'Rina Wijaya', 'rina@email.com', '0819-2345-6789', '2026-05-20', 'aktif', 3, '2026-06-15T10:00:00+07:00'),
  ('P-009', 'Agus Setiawan', 'agus@email.com', '0855-6789-0123', '2025-08-25', 'nonaktif', 1, '2026-04-20T09:30:00+07:00'),
  ('P-010', 'Fitri Handayani', 'fitri@email.com', '0823-4567-8901', '2026-06-01', 'aktif', 1, '2026-06-19T07:50:00+07:00')
ON CONFLICT (kode) DO NOTHING;

-- Insert log_aktivitas (activity logs)
-- Note: Using subquery to get correct UUID from pelanggan by kode
-- Timestamps are relative to execution time using NOW() - interval
INSERT INTO log_aktivitas (kode, pelanggan_id, pelanggan_nama, tipe, deskripsi, timestamp) VALUES
  ('L-001', (SELECT id FROM pelanggan WHERE kode = 'P-001'), 'Budi Santoso', 'kunjungan', 'Mengunjungi halaman layanan IT', NOW() - INTERVAL '5 minutes'),
  ('L-002', (SELECT id FROM pelanggan WHERE kode = 'P-004'), 'Dewi Lestari', 'servis', 'Mendaftarkan servis printer Epson L3110', NOW() - INTERVAL '15 minutes'),
  ('L-003', (SELECT id FROM pelanggan WHERE kode = 'P-001'), 'Budi Santoso', 'transaksi', 'Melakukan pembayaran servis SRV-2026-042', NOW() - INTERVAL '30 minutes'),
  ('L-004', (SELECT id FROM pelanggan WHERE kode = 'P-006'), 'Maya Anggraini', 'profil', 'Memperbarui alamat dan nomor telepon', NOW() - INTERVAL '60 minutes'),
  ('L-005', (SELECT id FROM pelanggan WHERE kode = 'P-002'), 'Siti Nurhaliza', 'pesanan', 'Memesan gantungan kunci custom 50 pcs', NOW() - INTERVAL '90 minutes'),
  ('L-006', (SELECT id FROM pelanggan WHERE kode = 'P-003'), 'Ahmad Rizki', 'kunjungan', 'Melihat portofolio desain grafis', NOW() - INTERVAL '120 minutes'),
  ('L-007', (SELECT id FROM pelanggan WHERE kode = 'P-007'), 'Doni Prasetyo', 'servis', 'Konsultasi perbaikan PC', NOW() - INTERVAL '180 minutes'),
  ('L-008', (SELECT id FROM pelanggan WHERE kode = 'P-004'), 'Dewi Lestari', 'transaksi', 'Pembelian tinta printer Epson 664', NOW() - INTERVAL '240 minutes'),
  ('L-009', (SELECT id FROM pelanggan WHERE kode = 'P-008'), 'Rina Wijaya', 'profil', 'Mendaftar sebagai pelanggan baru', NOW() - INTERVAL '300 minutes'),
  ('L-010', (SELECT id FROM pelanggan WHERE kode = 'P-002'), 'Siti Nurhaliza', 'kunjungan', 'Mengunjungi halaman studio kreatif', NOW() - INTERVAL '360 minutes'),
  ('L-011', (SELECT id FROM pelanggan WHERE kode = 'P-006'), 'Maya Anggraini', 'pesanan', 'Pesanan banner promosi masuk revisi ke-2', NOW() - INTERVAL '420 minutes'),
  ('L-012', (SELECT id FROM pelanggan WHERE kode = 'P-001'), 'Budi Santoso', 'servis', 'Mengambil unit PC setelah perbaikan', NOW() - INTERVAL '480 minutes'),
  ('L-013', (SELECT id FROM pelanggan WHERE kode = 'P-005'), 'Rudi Hartono', 'kunjungan', 'Melihat halaman kontak', NOW() - INTERVAL '600 minutes'),
  ('L-014', (SELECT id FROM pelanggan WHERE kode = 'P-010'), 'Fitri Handayani', 'transaksi', 'Pembayaran desain logo UMKM', NOW() - INTERVAL '720 minutes'),
  ('L-015', (SELECT id FROM pelanggan WHERE kode = 'P-003'), 'Ahmad Rizki', 'profil', 'Mengganti foto profil', NOW() - INTERVAL '900 minutes')
ON CONFLICT (kode) DO NOTHING;