# Fainaya — Admin Dashboard & Business Management Platform

Platform manajemen bisnis terpadu berbasis web untuk Fainaya, mencakup layanan IT support, studio kreatif, manajemen inventaris, keuangan, dan integrasi chatbot.

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite 6
- **Styling:** Tailwind CSS 3
- **Routing:** React Router v7
- **Backend & Auth:** Supabase
- **Build Tool:** Vite

## Fitur Utama

### Ringkasan & Utama
- Dashboard / Beranda — ringkasan aktivitas dan metrik bisnis
- Manajemen Pelanggan / Klien

### Layanan IT
- Servis & Perbaikan — antrean, proses, dan riwayat servis
- Log Perawatan — jadwal dan laporan perawatan

### Studio Kreatif
- Proyek Desain — brief, tahap desain/revisi, galeri portofolio
- Proyek Kreasi Tangan — pesanan dan proses pembuatan

### Operasional & Logistik
- Inventaris & Stok — daftar stok dan mutasi barang
- Keuangan & Kas — tagihan/invoices dan pengeluaran

### Pengaturan
- Integrasi Chatbot & Website
- Pengaturan Sistem — pengaturan umum dan keamanan akses

## Memulai

```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev

# Build production
npm run build

# Preview production build
npm run preview
```

## Struktur Direktori

```
src/
├── components/       # Komponen UI (Sidebar, TopNav, dll)
├── data/             # Data layer & konfigurasi Supabase
├── hooks/            # Custom React hooks
├── pages/            # Halaman aplikasi
├── App.tsx           # Root component
├── main.tsx          # Entry point
└── index.css         # Global styles & Tailwind directives
```

## Keamanan & Kepatuhan

Proyek ini dikembangkan dengan prinsip keamanan sebagai berikut:

### A. Perlindungan Data (Data Privacy)
- Tidak ada database schema asli, kunci API, credentials, atau data sensitif klien yang dimasukkan ke dalam prompt AI.
- Data sensitif diganti dengan data dummy atau masking sebelum diproses.

### B. Konfigurasi Alat
- Menggunakan akun dengan kebijakan **No-Training** — data tidak digunakan untuk melatih model publik.
- Telemetry dinonaktifkan sesuai kebijakan privasi klien.

### C. Validasi Kode (Human-in-the-Loop)
- Seluruh kode output AI diperiksa untuk celah keamanan menggunakan linter/SAST sebelum di-commit.
- Setiap kode melewati review untuk kesesuaian logika bisnis.
- Pengembang memikul tanggung jawab penuh atas kode yang di-commit ke repositori.

## Lisensi

Hak cipta © 2026 Fainaya. Seluruh hak cipta dilindungi.