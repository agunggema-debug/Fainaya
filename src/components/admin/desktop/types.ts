import type { ReactNode } from "react";

/** Ukuran area desktop yang tersedia (viewport dikurangi taskbar). */
export type DesktopBounds = { width: number; height: number };

/** Posisi & ukuran sebuah window di dalam area desktop. */
export type WindowGeometry = { x: number; y: number; width: number; height: number };

/** State runtime (dikelola oleh useDesktopWindows) untuk satu window. */
export type WindowRuntime = {
  geometry: WindowGeometry;
  minimized: boolean;
  maximized: boolean;
};

/**
 * Definisi sebuah window desktop (Ext JS 2.0 style panel yang bisa digeser,
 * di-resize, di-minimize dan di-maximize).
 */
export type DesktopWindowDef = {
  /** id unik window */
  id: string;
  /** judul pada title bar & taskbar */
  title: string;
  /** path SVG 24x24 untuk glyph title bar, taskbar dan shortcut */
  icon: string;
  /** isi window (body) */
  content: ReactNode;
  /** toolbar Ext di bawah title bar (opsional, tidak ikut ter-scroll) */
  toolbar?: ReactNode;
  /**
   * Route yang diwakili window ini. Shortcut / start menu dengan path yang sama
   * akan mem-fokuskan window ini dibanding melakukan navigasi penuh.
   */
  path?: string;
  defaultSize?: { width: number; height: number };
  minSize?: { width: number; height: number };
  /** window langsung terbuka saat desktop di-load */
  openByDefault?: boolean;
  /** tampil sebagai ikon quick launch di taskbar */
  quickLaunch?: boolean;
  /** teks pada status bar window */
  statusText?: string;
};

/** Ikon di area desktop (shortcut). */
export type DesktopShortcutDef = {
  id: string;
  label: string;
  icon: string;
  /** buka / fokus window desktop */
  windowId?: string;
  /** atau navigasi ke route */
  path?: string;
};