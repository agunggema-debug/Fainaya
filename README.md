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

Seluruh halaman **`/admin/*`** dirender sebagai web desktop bergaya Ext JS 2.0:

- **Wallpaper + ikon shortcut** — klik untuk memilih, klik 2x (atau Enter) untuk membuka.
- **Window** — digeser lewat title bar, di-resize dari sudut kanan bawah, minimize/maximize/close lewat tombol di title bar, dan di-fokuskan dengan klik. Window yang diminimize tetap tampil sebagai tombol di taskbar.
- **Start menu** — memuat seluruh struktur menu admin (sumber data sama dengan sidebar klasik) plus tombol logout.
- **Taskbar** — Start button, quick launch, task button untuk window yang terbuka, dan system tray: pencarian global (`Ctrl + K`), notifikasi, pengalih tema terang/gelap, menu akun, serta jam digital.
- **Toolbar window** — tombol Ext style di dalam window (Refresh, Export CSV, filter status, dsb.).
- **Responsif** — pada layar sempit window otomatis terbuka dalam keadaan maximize.

Setiap halaman admin membuka satu window utama (berisi konten halaman) plus window
**Notifikasi & Chat Masuk**, dan tetap menyediakan shortcut ke halaman admin lain.

Komponen desktop berada di `src/components/admin/desktop/`:

```
desktop/
├── DesktopShell.tsx        # Wallpaper, layer window, start menu & taskbar
├── DesktopWindow.tsx       # Window Ext style (drag, resize, minimize, maximize)
├── DesktopShortcut.tsx     # Ikon shortcut desktop
├── StartMenu.tsx           # Start menu (struktur menu admin)
├── Taskbar.tsx             # Start button, task list, system tray & jam
├── AdminDesktopPage.tsx    # Kerangka halaman admin desktop (dipakai semua halaman admin)
├── NotificationList.tsx    # Daftar notifikasi (dipakai TopNav & window desktop)
├── ExtToolbar.tsx          # Tombol/toolbar bergaya Ext (ExtButton, ExtToolbar, ...)
├── csvExport.ts            # Helper export CSV untuk tombol toolbar
├── DesktopSplash.tsx       # Splash screen saat memuat data
├── useDesktopWindows.ts    # Window manager (z-index, posisi, ukuran, state)
└── types.ts                # Tipe DesktopWindowDef / DesktopShortcutDef
```

Data yang dipakai bersama desktop & sidebar klasik:

- `src/data/adminMenu.ts` — struktur menu admin + ikon SVG
- `src/data/notifications.ts` — data notifikasi

## Modul Admin (data sampel & tabel database)

Menu admin yang sebelumnya belum punya halaman kini diisi oleh satu halaman generik
`src/pages/admin/ModulAdmin.tsx` dengan UI ala Ext (kartu ringkasan status, tabel data,
pencarian, filter, Export CSV, indikator sumber data).

Definisi modul (tabel, kolom, filter per sub-menu, data sampel) ada di
`src/data/adminModules.ts`:

| Route | Tabel Supabase |
| --- | --- |
| `/admin/servis/antrean`, `/admin/servis/proses`, `/admin/servis/riwayat` | `servis_tiket` |
| `/admin/maintenance/jadwal`, `/admin/maintenance/laporan` | `maintenance_log` |
| `/admin/development/software`, `/admin/development/web`, `/admin/development/database` | `dev_proyek` |
| `/admin/desain/brief`, `/admin/desain/proses`, `/admin/desain/portofolio` | `desain_brief` |
| `/admin/kreasi/pesanan`, `/admin/kreasi/proses` | `kreasi_proyek` |
| `/admin/inventaris/daftar` | `inventaris_barang` |
| `/admin/inventaris/mutasi` | `inventaris_mutasi` |
| `/admin/keuangan/tagihan` | `keuangan_tagihan` |
| `/admin/keuangan/pengeluaran` | `keuangan_pengeluaran` |
| `/admin/integrasi/chatbot`, `/admin/integrasi/website` | `integrasi_config` |
| `/admin/pengaturan/umum`, `/admin/pengaturan/keamanan` | `pengaturan_sistem` |
| `/admin/akun` | `admin_users` |
| `/admin/log-sistem`, `/admin/log-aktivitas` | `log_sistem` |
| `/admin/notifikasi` | `notifikasi` |

Perilaku data: baris diambil dari tabel Supabase terkait; bila tabel belum dibuat/kosong
(tombol tampil “Data sampel lokal”), halaman otomatis memakai **data sampel** dari
`adminModules.ts` sehingga tidak ada lagi halaman kosong.

### Menambah modul baru

1. Tambahkan dataset (`table`, `columns`, `paths`, `rows`) di `src/data/adminModules.ts`
   dan daftarkan pada `ADMIN_DATASETS`.
2. Tambahkan sub-menu di `src/data/adminMenu.ts`.
3. Route otomatis terdaftar (dibuat dari `ADMIN_MODUL_ROUTES` di `src/App.tsx`) — tidak perlu edit `App.tsx`.

## Database (Supabase)

Migrasi tersedia di `supabase/migrations/`:

- `001_create_tables.sql` — tabel `pelanggan` & `log_aktivitas`
- `002_create_blog_posts.sql` — tabel `blog_posts`
- `003_add_blog_category_and_storage.sql` — kolom kategori & storage gambar blog
- `004_admin_module_tables.sql` — 14 tabel modul admin di atas + RLS + index (dibuat dengan helper `enable_admin_rls()`)
- `005_seed_admin_module_data.sql` — data sampel awal untuk seluruh tabel modul admin (aman diulang, memakai `ON CONFLICT DO NOTHING`)

Cara menjalankan: buka **Supabase Dashboard → SQL Editor** lalu jalankan isi file migrasi
secara berurutan, atau gunakan CLI Supabase:

```bash
supabase db push
```

Setelah migrasi dijalankan, halaman modul otomatis menampilkan data dari tabel
(indikator berubah menjadi “Terhubung ke Supabase”).

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