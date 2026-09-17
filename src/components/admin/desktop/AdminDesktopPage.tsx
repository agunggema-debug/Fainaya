import type { ReactNode } from "react";
import DesktopShell from "./DesktopShell";
import NotificationList from "./NotificationList";
import type { DesktopShortcutDef, DesktopWindowDef } from "./types";
import { MENU_ICONS } from "../../../data/adminMenu";

type AdminDesktopPageProps = {
  userEmail: string;
  /** route halaman aktif (dipakai start menu & taskbar) */
  activePath: string;
  /** judul window halaman */
  title: string;
  /** path SVG 24x24 untuk ikon window */
  icon: string;
  statusText?: string;
  /** toolbar Ext di dalam window */
  toolbar?: ReactNode;
  defaultSize?: { width: number; height: number };
  /** shortcut tambahan di area desktop */
  extraShortcuts?: DesktopShortcutDef[];
  /** window tambahan (mis. daftar terkait) */
  extraWindows?: DesktopWindowDef[];
  onNavigate: (path: string) => void;
  onSearch: (query: string) => void;
  onLogout: () => void;
  children: ReactNode;
};

/** Shortcut standar yang muncul di desktop semua halaman admin. */
const BASE_SHORTCUTS: DesktopShortcutDef[] = [
  { id: "sc-dashboard", label: "Dashboard", icon: MENU_ICONS.chart, path: "/admin/dashboard" },
  { id: "sc-pelanggan", label: "Daftar Pelanggan", icon: MENU_ICONS.users, path: "/admin/pelanggan" },
  {
    id: "sc-aktivitas",
    label: "Aktivitas Terkini",
    icon: MENU_ICONS.clipboard,
    path: "/admin/dashboard/aktivitas",
  },
  { id: "sc-log", label: "Log Aktivitas", icon: MENU_ICONS.collection, path: "/admin/pelanggan/aktivitas" },
  { id: "sc-blog", label: "Blog / Artikel", icon: MENU_ICONS.blog, path: "/admin/blog" },
  { id: "sc-servis", label: "Servis & Perbaikan", icon: MENU_ICONS.wrench, path: "/admin/servis/antrean" },
  { id: "sc-desain", label: "Proyek Desain", icon: MENU_ICONS.paintbrush, path: "/admin/desain/brief" },
];

/**
 * Kerangka halaman admin bergaya Ext JS 2.0 Web Desktop: halaman dibungkus
 * satu window desktop (terbuka otomatis) + window notifikasi, lengkap dengan
 * start menu, taskbar, dan system tray. Dipakai oleh seluruh halaman admin
 * selain dashboard.
 */
export default function AdminDesktopPage({
  userEmail,
  activePath,
  title,
  icon,
  statusText,
  toolbar,
  defaultSize,
  extraShortcuts,
  extraWindows,
  onNavigate,
  onSearch,
  onLogout,
  children,
}: Readonly<AdminDesktopPageProps>) {
  const windows: DesktopWindowDef[] = [
    {
      id: "page",
      title,
      icon,
      path: activePath,
      openByDefault: true,
      quickLaunch: true,
      toolbar,
      statusText,
      defaultSize: defaultSize ?? { width: 1100, height: 600 },
      minSize: { width: 400, height: 260 },
      content: children,
    },
    {
      id: "notifikasi",
      title: "Notifikasi & Chat Masuk",
      icon: MENU_ICONS.bell,
      path: "/admin/notifikasi",
      defaultSize: { width: 540, height: 440 },
      minSize: { width: 340, height: 220 },
      statusText: "Chat masuk, servis melewati batas, revisi desain & stok menipis",
      content: <NotificationList />,
    },
  ];

  if (extraWindows) windows.push(...extraWindows);

  const shortcuts: DesktopShortcutDef[] = [
    { id: "sc-current", label: title, icon, windowId: "page" },
    { id: "sc-notifikasi", label: "Notifikasi", icon: MENU_ICONS.bell, windowId: "notifikasi" },
    ...BASE_SHORTCUTS,
    ...(extraShortcuts ?? []),
  ];

  return (
    <DesktopShell
      userEmail={userEmail}
      activePath={activePath}
      shortcuts={shortcuts}
      windows={windows}
      onNavigate={onNavigate}
      onSearch={onSearch}
      onLogout={onLogout}
    />
  );
}