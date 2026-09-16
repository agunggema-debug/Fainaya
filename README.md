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
- Dashboard / Beranda — tampilan **Ext JS 2.0 style web desktop** (wallpaper, ikon shortcut, window, Start menu, taskbar)
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

## Tampilan Desktop (Ext JS 2.0 style)

Halaman `/admin/dashboard` dirender sebagai web desktop bergaya Ext JS 2.0:

- **Wallpaper + ikon shortcut** — klik untuk memilih, klik 2x (atau Enter) untuk membuka.
- **Window** — digeser lewat title bar, di-resize dari sudut kanan bawah, minimize/maximize/close lewat tombol di title bar, dan di-fokuskan dengan klik. Window yang diminimize tetap tampil sebagai tombol di taskbar.
- **Start menu** — memuat seluruh struktur menu admin (sumber data sama dengan sidebar klasik) plus tombol logout.
- **Taskbar** — Start button, quick launch, task button untuk window yang terbuka, dan system tray: pencarian global (`Ctrl + K`), notifikasi, pengalih tema terang/gelap, menu akun, serta jam digital.
- **Toolbar window** — tombol Ext style di dalam window (pemilih rentang 7d/14d/30d, Refresh, dan Export CSV).
- **Responsif** — pada layar sempit window otomatis terbuka dalam keadaan maximize, dan halaman admin lainnya tetap memakai layout sidebar klasik.

Komponen desktop berada di `src/components/admin/desktop/`:

```
desktop/
├── DesktopShell.tsx        # Wallpaper, layer window, start menu & taskbar
├── DesktopWindow.tsx       # Window Ext style (drag, resize, minimize, maximize)
├── DesktopShortcut.tsx     # Ikon shortcut desktop
├── StartMenu.tsx           # Start menu (struktur menu admin)
├── Taskbar.tsx             # Start button, task list, system tray & jam
├── DesktopSplash.tsx       # Splash screen saat memuat data
├── useDesktopWindows.ts    # Window manager (z-index, posisi, ukuran, state)
└── types.ts                # Tipe DesktopWindowDef / DesktopShortcutDef
```

Struktur menu admin terpusat di `src/data/adminMenu.ts` dan data notifikasi di
`src/data/notifications.ts` — dipakai bersama oleh desktop dan layout sidebar klasik.

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
├── components/       # Komponen UI (Sidebar, TopNav, chart, desktop, dll)
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