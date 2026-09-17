-- =============================================
-- Migration: Seed data sampel modul admin
-- Date: 2026-09-17
-- Deskripsi: data sampel awal untuk tabel modul admin (lihat 004).
--            Semua INSERT memakai ON CONFLICT DO NOTHING supaya aman diulang.
-- =============================================

-- 1. servis_tiket
INSERT INTO servis_tiket (kode, pelanggan, perangkat, keluhan, prioritas, teknisi, tahap, estimasi, biaya) VALUES
  ('SRV-2026-042', 'Budi Santoso', 'Printer Epson L3110', 'Lampu tinta berkedip, hasil cetak bergaris', 'Tinggi', 'Agung G.', 'Antrean', '2026-09-19', 185000),
  ('SRV-2026-041', 'Siti Nurhaliza', 'Laptop Asus X441', 'Keyboard beberapa tombol tidak berfungsi', 'Normal', 'Agung G.', 'Antrean', '2026-09-20', 250000),
  ('SRV-2026-039', 'Dewi Lestari', 'PC Dell Optiplex 3020', 'Ganti SSD 256GB dan instal ulang sistem', 'Normal', 'Rizki A.', 'Proses', '2026-09-18', 720000),
  ('SRV-2026-038', 'Maya Anggraini', 'Printer Canon G2010', 'Pembersihan head dan kalibrasi warna', 'Rendah', 'Rizki A.', 'Proses', '2026-09-18', 95000),
  ('SRV-2026-035', 'Ahmad Rizki', 'Monitor LG 19 inci', 'Layar berkedip, penggantian adaptor', 'Normal', 'Agung G.', 'Selesai', '2026-09-12', 140000),
  ('SRV-2026-033', 'Rina Wijaya', 'Laptop Lenovo Ideapad', 'Pemasangan RAM 8GB dan pembersihan kipas', 'Rendah', 'Rizki A.', 'Selesai', '2026-09-08', 380000)
ON CONFLICT (kode) DO NOTHING;

-- 2. maintenance_log
INSERT INTO maintenance_log (kode, klien, perangkat, jenis, teknisi, jadwal, status, catatan) VALUES
  ('MTC-2026-018', 'Koperasi Mekar Jaya', 'Server Ubuntu 22.04', 'Update patch & cek kapasitas disk', 'Agung G.', '2026-09-22', 'Terjadwal', 'Backup penuh sebelum patch'),
  ('MTC-2026-017', 'CV Sinar Abadi', 'MikroTik RB2011', 'Audit firewall & DHCP', 'Agung G.', '2026-09-24', 'Terjadwal', 'Tambah rule blokir port 8080'),
  ('MTC-2026-015', 'Toko Roti Manis', 'PC Kasir + Printer Thermal', 'Pembersihan & cek kabel', 'Rizki A.', '2026-09-15', 'Tertunda', 'Menunggu konfirmasi pemilik toko'),
  ('MTC-2026-012', 'Koperasi Mekar Jaya', 'NAS Synology DS220', 'Cek kesehatan RAID & SMART', 'Agung G.', '2026-08-28', 'Selesai', 'Disk 2 menunjukkan reallocated sector'),
  ('MTC-2026-010', 'CV Sinar Abadi', 'UPS APC 1500VA', 'Kalibrasi baterai', 'Rizki A.', '2026-08-14', 'Selesai', 'Kapasitas baterai masih 82 persen'),
  ('MTC-2026-008', 'SMP Harapan Bangsa', 'Lab Komputer (20 unit)', 'Pembersihan & update antivirus', 'Rizki A.', '2026-07-30', 'Selesai', '3 unit perlu ganti pasta prosesor')
ON CONFLICT (kode) DO NOTHING;

-- 3. dev_proyek
INSERT INTO dev_proyek (kode, klien, proyek, jenis, teknologi, progres, tenggat, status) VALUES
  ('DEV-2026-014', 'Koperasi Mekar Jaya', 'Aplikasi Simpan Pinjam', 'Custom Software', 'React + Supabase', 72, '2026-10-15', 'Development'),
  ('DEV-2026-013', 'CV Sinar Abadi', 'Website Company Profile', 'Web Application', 'React + Tailwind', 90, '2026-09-28', 'Testing'),
  ('DEV-2026-012', 'Toko Roti Manis', 'Aplikasi Kasir Toko', 'Custom Software', 'React Native', 45, '2026-11-05', 'Development'),
  ('DEV-2026-011', 'SMP Harapan Bangsa', 'Sistem Informasi Nilai', 'Web Application', 'React + PostgreSQL', 100, '2026-08-20', 'Selesai'),
  ('DEV-2026-010', 'Koperasi Mekar Jaya', 'Migrasi Database ke Supabase', 'Database', 'PostgreSQL', 60, '2026-10-02', 'Development'),
  ('DEV-2026-009', 'CV Sinar Abadi', 'Optimasi Query Laporan Penjualan', 'Database', 'PostgreSQL', 100, '2026-07-18', 'Selesai'),
  ('DEV-2026-008', 'Bumdes Sejahtera', 'Landing Page Promo', 'Web Application', 'React + Vite', 20, '2026-12-01', 'Perencanaan')
ON CONFLICT (kode) DO NOTHING;

-- 4. desain_brief
INSERT INTO desain_brief (kode, klien, brief, jenis, desainer, masuk, tenggat, status) VALUES
  ('DSN-2026-031', 'Toko Roti Manis', 'Desain kartu nama & stiker kemasan', 'Print', 'Fainaya', '2026-09-16', '2026-09-20', 'Brief Masuk'),
  ('DSN-2026-030', 'CV Sinar Abadi', 'Logo perusahaan versi baru', 'Logo', 'Fainaya', '2026-09-15', '2026-09-22', 'Brief Masuk'),
  ('DSN-2026-027', 'Koperasi Mekar Jaya', 'Banner promosi simpan pinjam', 'Banner', 'Fainaya', '2026-09-10', '2026-09-17', 'Desain'),
  ('DSN-2026-026', 'SMP Harapan Bangsa', 'Video profil sekolah 3 menit', 'Video', 'Fainaya', '2026-09-08', '2026-09-25', 'Revisi'),
  ('DSN-2026-024', 'Bumdes Sejahtera', 'Mockup kanopi & papan nama', 'Mockup', 'Fainaya', '2026-08-28', '2026-09-05', 'Selesai'),
  ('DSN-2026-021', 'Toko Roti Manis', 'Desain feed Instagram 9 konten', 'Social Media', 'Fainaya', '2026-08-20', '2026-08-30', 'Selesai')
ON CONFLICT (kode) DO NOTHING;

-- 5. kreasi_proyek
INSERT INTO kreasi_proyek (kode, klien, produk, jumlah, bahan, pengrajin, tenggat, status) VALUES
  ('KRS-2026-022', 'SMP Harapan Bangsa', 'Gantungan kunci akrilik', 150, 'Akrilik 3mm', 'Fainaya', '2026-09-30', 'Pesanan Masuk'),
  ('KRS-2026-021', 'Toko Roti Manis', 'Bros rajut custom', 60, 'Benang katun', 'Fainaya', '2026-09-26', 'Pesanan Masuk'),
  ('KRS-2026-019', 'Koperasi Mekar Jaya', 'Souvenir seminar (pin + lanyard)', 200, 'Kain satin', 'Fainaya', '2026-09-24', 'Produksi'),
  ('KRS-2026-018', 'Bumdes Sejahtera', 'Tempat kartu nama kulit sintetis', 40, 'Kulit sintetis', 'Fainaya', '2026-09-21', 'Produksi'),
  ('KRS-2026-015', 'CV Sinar Abadi', 'Plakat akrilik penghargaan', 12, 'Akrilik 5mm', 'Fainaya', '2026-09-02', 'Selesai'),
  ('KRS-2026-013', 'Toko Roti Manis', 'Gantungan kunci resin bentuk roti', 80, 'Resin bening', 'Fainaya', '2026-08-18', 'Selesai')
ON CONFLICT (kode) DO NOTHING;

-- 6. inventaris_barang
INSERT INTO inventaris_barang (kode, nama, kategori, satuan, stok, stok_min, harga_beli, lokasi, status) VALUES
  ('INV-001', 'Tinta Epson T664 Black', 'Sparepart IT', 'botol', 24, 10, 62000, 'Rak A1', 'Tersedia'),
  ('INV-002', 'Tinta Epson T664 Color Set', 'Sparepart IT', 'set', 3, 5, 185000, 'Rak A1', 'Menipis'),
  ('INV-003', 'SSD SATA 256GB', 'Sparepart IT', 'pcs', 8, 4, 385000, 'Rak B2', 'Tersedia'),
  ('INV-004', 'RAM DDR4 8GB Notebook', 'Sparepart IT', 'pcs', 0, 3, 430000, 'Rak B2', 'Habis'),
  ('INV-005', 'Filamen PLA 1.75mm Hitam', 'Bahan Kreatif', 'roll', 6, 4, 165000, 'Rak C1', 'Tersedia'),
  ('INV-006', 'Kertas ID Card PVC Blank', 'Bahan Kreatif', 'pack', 2, 5, 95000, 'Rak C2', 'Menipis'),
  ('INV-007', 'Akrilik 3mm Bening', 'Bahan Kreatif', 'lembar', 11, 6, 78000, 'Rak C3', 'Tersedia')
ON CONFLICT (kode) DO NOTHING;

-- 7. inventaris_mutasi
INSERT INTO inventaris_mutasi (kode, tanggal, barang, tipe, jumlah, referensi, petugas, catatan) VALUES
  ('MUT-2026-051', '2026-09-16', 'SSD SATA 256GB', 'Masuk', 5, 'PO-2026-018', 'Agung G.', 'Pembelian dari supplier Mitra Komputer'),
  ('MUT-2026-050', '2026-09-15', 'Tinta Epson T664 Black', 'Keluar', 2, 'SRV-2026-038', 'Rizki A.', 'Pemakaian servis printer pelanggan'),
  ('MUT-2026-049', '2026-09-14', 'Kertas ID Card PVC Blank', 'Keluar', 3, 'KRS-2026-019', 'Fainaya', 'Produksi souvenir seminar'),
  ('MUT-2026-048', '2026-09-12', 'Filamen PLA 1.75mm Hitam', 'Masuk', 4, 'PO-2026-017', 'Fainaya', 'Restok bahan cetak 3D'),
  ('MUT-2026-047', '2026-09-10', 'RAM DDR4 8GB Notebook', 'Keluar', 3, 'SRV-2026-033', 'Rizki A.', 'Pemasangan RAM pelanggan'),
  ('MUT-2026-046', '2026-09-08', 'Akrilik 3mm Bening', 'Masuk', 6, 'PO-2026-016', 'Fainaya', 'Stok untuk plakat dan gantungan kunci')
ON CONFLICT (kode) DO NOTHING;

-- 8. keuangan_tagihan
INSERT INTO keuangan_tagihan (nomor, klien, deskripsi, tanggal, jatuh_tempo, total, status) VALUES
  ('INV-2026-092', 'Koperasi Mekar Jaya', 'Banner promosi simpan pinjam', '2026-09-15', '2026-09-22', 850000, 'Belum Dibayar'),
  ('INV-2026-091', 'CV Sinar Abadi', 'Website company profile (tahap 2)', '2026-09-12', '2026-09-19', 3500000, 'Belum Dibayar'),
  ('INV-2026-089', 'Dewi Lestari', 'Servis PC Dell - ganti SSD 256GB', '2026-09-05', '2026-09-12', 720000, 'Jatuh Tempo'),
  ('INV-2026-086', 'SMP Harapan Bangsa', 'Souvenir seminar 200 pcs', '2026-08-30', '2026-09-06', 4200000, 'Lunas'),
  ('INV-2026-083', 'Budi Santoso', 'Pembelian tinta Epson T664 set', '2026-08-24', '2026-08-31', 185000, 'Lunas'),
  ('INV-2026-080', 'Toko Roti Manis', 'Desain feed Instagram 9 konten', '2026-08-18', '2026-08-25', 1350000, 'Lunas')
ON CONFLICT (nomor) DO NOTHING;

-- 9. keuangan_pengeluaran
INSERT INTO keuangan_pengeluaran (kode, tanggal, kategori, deskripsi, jumlah, metode, pencatat) VALUES
  ('EXP-2026-071', '2026-09-16', 'Pembelian Sparepart', '5 unit SSD SATA 256GB', 1925000, 'Transfer', 'Agung G.'),
  ('EXP-2026-070', '2026-09-14', 'Pembelian Sparepart', 'Tinta Epson T664 color set 3 pcs', 555000, 'Transfer', 'Rizki A.'),
  ('EXP-2026-069', '2026-09-12', 'Bahan Kreatif', 'Filamen PLA 4 roll', 660000, 'Transfer', 'Fainaya'),
  ('EXP-2026-068', '2026-09-10', 'Operasional', 'Listrik & internet studio', 785000, 'Transfer', 'Fainaya'),
  ('EXP-2026-067', '2026-09-05', 'Aset Digital', 'Langganan tools desain 1 bulan', 320000, 'Transfer', 'Fainaya'),
  ('EXP-2026-066', '2026-09-02', 'Operasional', 'Bensin & biaya kunjungan klien', 250000, 'Kas', 'Agung G.')
ON CONFLICT (kode) DO NOTHING;

-- 10. integrasi_config
INSERT INTO integrasi_config (nama, jenis, status, nilai, keterangan) VALUES
  ('Chatbot Widget (Botpress)', 'Chatbot', 'Aktif', 'webchat-v1', 'Widget aktif di landing page utama'),
  ('Tidio Live Chat', 'Chatbot', 'Nonaktif', '-', 'Menunggu evaluasi biaya bulanan'),
  ('Webhook Order Servis', 'Chatbot', 'Perlu Review', '/hooks/servis', 'Perlu validasi format payload dari bot'),
  ('WhatsApp Business API', 'Chatbot', 'Nonaktif', '-', 'Rencana integrasi kuartal keempat 2026'),
  ('Google Analytics 4', 'Website', 'Aktif', 'G-FAINAYA26', 'Tracking kunjungan landing page'),
  ('Form Kontak Landing Page', 'Website', 'Aktif', 'kontak@fainaya.id', 'Terhubung ke notifikasi email admin'),
  ('Sitemap & SEO Meta', 'Website', 'Aktif', '/sitemap.xml', 'Diperbarui otomatis setiap publish blog'),
  ('Halaman Portofolio Publik', 'Website', 'Perlu Review', '/blog', 'Perlu sinkronisasi dengan galeri portofolio')
ON CONFLICT (nama) DO NOTHING;

-- 11. pengaturan_sistem
INSERT INTO pengaturan_sistem (kunci, kategori, nilai, keterangan) VALUES
  ('nama_bisnis', 'Umum', 'Fainaya Service & Art', 'Nama yang tampil di invoice dan website'),
  ('alamat', 'Umum', 'West Java, Indonesia', 'Alamat operasional untuk dokumen resmi'),
  ('jam_operasional', 'Umum', 'Sen-Jum 16.00-20.00, Sab-Min 14.00-20.00', 'Ditampilkan di halaman kontak'),
  ('mata_uang', 'Umum', 'IDR', 'Format mata uang pada invoice dan kas'),
  ('backup_otomatis', 'Keamanan', 'Harian 02.00 WIB', 'Backup database Supabase terjadwal'),
  ('sesi_login', 'Keamanan', '8 jam', 'Batas waktu sesi admin sebelum logout otomatis'),
  ('wajib_2fa', 'Keamanan', 'Nonaktif', 'Rencana aktivasi untuk seluruh staf'),
  ('ip_allowlist', 'Keamanan', 'Belum diatur', 'Pembatasan alamat IP akses panel admin')
ON CONFLICT (kunci) DO NOTHING;

-- 12. admin_users (staf & hak akses)
INSERT INTO admin_users (nama, email, peran, status, terakhir_masuk) VALUES
  ('Agung Gema', 'agunggema@fainaya.id', 'Administrator', 'Aktif', NOW() - INTERVAL '10 minutes'),
  ('Rizki Ardian', 'rizki@fainaya.id', 'Teknisi', 'Aktif', NOW() - INTERVAL '3 hours'),
  ('Fainaya Putri', 'fainaya@fainaya.id', 'Desainer', 'Aktif', NOW() - INTERVAL '1 day'),
  ('Sari Melati', 'sari@fainaya.id', 'Staf', 'Nonaktif', NOW() - INTERVAL '21 days')
ON CONFLICT (email) DO NOTHING;

-- 13. notifikasi
INSERT INTO notifikasi (judul, deskripsi, tipe, dibaca, dibuat_pada) VALUES
  ('Chat Masuk', 'Pelanggan menanyakan status servis printer Epson L3110', 'chat', FALSE, NOW() - INTERVAL '2 minutes'),
  ('Servis Melewati Batas', 'Servis komputer #SVC-042 sudah 3 hari melewati estimasi', 'service', FALSE, NOW() - INTERVAL '15 minutes'),
  ('Revisi Desain', 'Klien mengirimkan revisi untuk proyek desain logo', 'design', TRUE, NOW() - INTERVAL '1 hour'),
  ('Stok Menipis', 'Tinta printer EPSON T664 color set tersisa 3 pcs', 'service', TRUE, NOW() - INTERVAL '3 hours')
ON CONFLICT (judul) DO NOTHING;

-- 14. log_sistem (hanya diisi bila tabel masih kosong)
INSERT INTO log_sistem (waktu, level, sumber, pesan, detail)
SELECT *
FROM (VALUES
  (NOW() - INTERVAL '5 minutes', 'INFO', 'visitor-tracker', 'Menyimpan 128 kunjungan harian ke visitor_logs', 'Sumber data: Supabase'),
  (NOW() - INTERVAL '40 minutes', 'WARNING', 'inventaris', 'Stok tinta EPSON T664 color set tersisa 3 pcs', 'Batas minimum 5 pcs'),
  (NOW() - INTERVAL '2 hours', 'INFO', 'backup', 'Backup harian database berhasil', 'Ukuran 24 MB'),
  (NOW() - INTERVAL '6 hours', 'ERROR', 'chatbot', 'Webhook order servis gagal diproses', 'Payload tidak sesuai skema'),
  (NOW() - INTERVAL '1 day', 'INFO', 'auth', 'Login admin berhasil', 'agunggema@fainaya.id'),
  (NOW() - INTERVAL '2 days', 'WARNING', 'keuangan', 'Invoice INV-2026-089 melewati jatuh tempo', 'Nominal Rp 720.000')
) AS seed(waktu, level, sumber, pesan, detail)
WHERE NOT EXISTS (SELECT 1 FROM log_sistem);

-- 15. Sinkronisasi status inventaris dengan stok minimum
UPDATE inventaris_barang
SET status = CASE
  WHEN stok <= 0 THEN 'Habis'
  WHEN stok <= stok_min THEN 'Menipis'
  ELSE 'Tersedia'
END;