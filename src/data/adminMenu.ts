/**
 * Single source of truth untuk struktur navigasi admin Fainaya.
 *
 * Dipakai oleh:
 *  - `src/components/admin/desktop/StartMenu.tsx` (Ext JS 2.0 style web desktop)
 *  - `src/components/admin/desktop/AdminDesktopPage.tsx` (shortcut area desktop)
 *  - `src/data/adminModules.ts` (ikon dataset modul admin)
 *
 * Catatan: sejak seluruh halaman admin memakai web desktop Ext JS 2.0,
 * `Sidebar.tsx` dan `TopNav.tsx` (layout klasik) tidak lagi dipakai — keduanya
 * disimpan sebagai referensi bila sewaktu-waktu ingin dipakai kembali.
 */

export type MenuItem = {
  label: string;
  icon: string;
  path?: string;
  badge?: string | number;
  submenu?: { label: string; path: string }[];
};

export type MenuGroup = {
  section: string;
  items: MenuItem[];
};

/* ───── SVG icon paths (24x24 outline) ───── */
export const MENU_ICONS = {
  dashboard:
    "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  users:
    "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
  wrench:
    "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
  clipboard:
    "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  paintbrush:
    "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
  cube:
    "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  folder:
    "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z",
  tag:
    "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z",
  cash:
    "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z",
  cog:
    "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
  robot:
    "M12 2a2 2 0 00-2 2v2H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-4V4a2 2 0 00-2-2zM8 10h.01M16 10h.01M10 14h4",
  shield:
    "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  collection:
    "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
  heart:
    "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  chart:
    "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  blog:
    "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
  bell:
    "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
  info:
    "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  monitor:
    "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  refresh:
    "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
  download:
    "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3",
  plus:
    "M12 4.5v15m7.5-7.5h-15",
} as const;

/* ───── Struktur menu (dipakai sidebar & start menu desktop) ───── */
export const MENU_GROUPS: MenuGroup[] = [
  {
    section: "RINGKASAN & UTAMA",
    items: [
      {
        label: "Dashboard / Beranda",
        icon: MENU_ICONS.dashboard,
        submenu: [
          { label: "Ringkasan", path: "/admin/dashboard" },
          { label: "Aktivitas Terkini", path: "/admin/dashboard/aktivitas" },
        ],
      },
      {
        label: "Pelanggan / Klien",
        icon: MENU_ICONS.users,
        submenu: [
          { label: "Daftar Pelanggan", path: "/admin/pelanggan" },
          { label: "Log Aktivitas", path: "/admin/pelanggan/aktivitas" },
        ],
      },
      {
        label: "Blog / Artikel",
        icon: MENU_ICONS.blog,
        path: "/admin/blog",
      },
    ],
  },
  {
    section: "LAYANAN IT",
    items: [
      {
        label: "Servis & Perbaikan",
        icon: MENU_ICONS.wrench,
        submenu: [
          { label: "Daftar Antrean", path: "/admin/servis/antrean" },
          { label: "Proses Perbaikan", path: "/admin/servis/proses" },
          { label: "Riwayat Servis", path: "/admin/servis/riwayat" },
        ],
      },
      {
        label: "Log Perawatan",
        icon: MENU_ICONS.clipboard,
        submenu: [
          { label: "Jadwal Perawatan", path: "/admin/maintenance/jadwal" },
          { label: "Laporan Perawatan", path: "/admin/maintenance/laporan" },
        ],
      },
      {
        label: "System Development",
        icon: MENU_ICONS.cube,
        submenu: [
          { label: "Custom Software", path: "/admin/development/software" },
          { label: "Web Applications", path: "/admin/development/web" },
          { label: "Database Management", path: "/admin/development/database" },
        ],
      },
    ],
  },
  {
    section: "STUDIO KREATIF",
    items: [
      {
        label: "Proyek Desain",
        icon: MENU_ICONS.paintbrush,
        submenu: [
          { label: "Brief Masuk", path: "/admin/desain/brief" },
          { label: "Tahap Desain/Revisi", path: "/admin/desain/proses" },
          { label: "Galeri Portofolio", path: "/admin/desain/portofolio" },
        ],
      },
      {
        label: "Proyek Kreasi Tangan",
        icon: MENU_ICONS.heart,
        submenu: [
          { label: "Pesanan Masuk", path: "/admin/kreasi/pesanan" },
          { label: "Proses Pembuatan", path: "/admin/kreasi/proses" },
        ],
      },
    ],
  },
  {
    section: "OPERASIONAL & LOGISTIK",
    items: [
      {
        label: "Inventaris & Stok",
        icon: MENU_ICONS.collection,
        submenu: [
          { label: "Daftar Stok", path: "/admin/inventaris/daftar" },
          { label: "Mutasi Stok", path: "/admin/inventaris/mutasi" },
        ],
      },
      {
        label: "Keuangan & Kas",
        icon: MENU_ICONS.cash,
        submenu: [
          { label: "Tagihan / Invoices", path: "/admin/keuangan/tagihan" },
          { label: "Pengeluaran", path: "/admin/keuangan/pengeluaran" },
        ],
      },
    ],
  },
  {
    section: "PENGATURAN",
    items: [
      {
        label: "Integrasi Chatbot & Website",
        icon: MENU_ICONS.robot,
        submenu: [
          { label: "Konfigurasi Chatbot", path: "/admin/integrasi/chatbot" },
          { label: "Integrasi Website", path: "/admin/integrasi/website" },
        ],
      },
      {
        label: "Pengaturan Sistem",
        icon: MENU_ICONS.cog,
        submenu: [
          { label: "Pengaturan Umum", path: "/admin/pengaturan/umum" },
          { label: "Keamanan & Akses", path: "/admin/pengaturan/keamanan" },
        ],
      },
    ],
  },
];