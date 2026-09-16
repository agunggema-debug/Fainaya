import { useEffect, useRef, useState } from "react";
import DesktopShortcut from "./DesktopShortcut";
import DesktopWindow from "./DesktopWindow";
import StartMenu from "./StartMenu";
import Taskbar from "./Taskbar";
import { TASKBAR_HEIGHT, useDesktopWindows } from "./useDesktopWindows";
import type { DesktopBounds, DesktopShortcutDef, DesktopWindowDef } from "./types";

type DesktopShellProps = {
  userEmail: string;
  activePath: string;
  /** ikon di area desktop */
  shortcuts: DesktopShortcutDef[];
  /** window yang bisa dibuka dari desktop / start menu / taskbar */
  windows: DesktopWindowDef[];
  onNavigate: (path: string) => void;
  onSearch: (query: string) => void;
  onLogout: () => void;
};

/** z-index dasar untuk window (taskbar & start menu berada di atasnya). */
const Z_BASE = 100;

/**
 * Desktop shell bergaya Ext JS 2.0 Web Desktop:
 * wallpaper + ikon shortcut, window yang bisa digeser/di-resize/minimize/maximize,
 * start menu (struktur menu admin) dan taskbar dengan system tray.
 */
export default function DesktopShell({
  userEmail,
  activePath,
  shortcuts,
  windows,
  onNavigate,
  onSearch,
  onLogout,
}: Readonly<DesktopShellProps>) {
  const desktopRef = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState<DesktopBounds>(() => ({
    width: typeof window === "undefined" ? 1280 : window.innerWidth,
    height: (typeof window === "undefined" ? 800 : window.innerHeight) - TASKBAR_HEIGHT,
  }));
  const [startOpen, setStartOpen] = useState(false);
  const [selectedShortcut, setSelectedShortcut] = useState<string | null>(null);

  const desktop = useDesktopWindows(windows, bounds);

  /** Ukur area desktop (viewport dikurangi taskbar). */
  useEffect(() => {
    const element = desktopRef.current;
    if (!element) return;
    const measure = () => {
      const width = Math.round(element.clientWidth);
      const height = Math.round(element.clientHeight);
      setBounds((prev) => (prev.width === width && prev.height === height ? prev : { width, height }));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  /** Escape menutup start menu. */
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setStartOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  /**
   * Route yang punya window di desktop akan memfokuskan window tersebut,
   * route lain diteruskan ke react-router.
   */
  const openPath = (path: string) => {
    const target = windows.find((win) => win.path === path);
    if (target) desktop.open(target.id);
    else onNavigate(path);
  };

  const openShortcut = (shortcut: DesktopShortcutDef) => {
    if (shortcut.windowId) desktop.open(shortcut.windowId);
    else if (shortcut.path) openPath(shortcut.path);
  };

  const tasks = desktop.order
    .map((id) => windows.find((win) => win.id === id))
    .filter((win): win is DesktopWindowDef => Boolean(win))
    .map((win) => ({ id: win.id, title: win.title, icon: win.icon }));

  const quickItems = windows
    .filter((win) => win.quickLaunch)
    .map((win) => ({ id: win.id, label: win.title, icon: win.icon }));

  return (
    <div className="ext-desktop ext-wallpaper fixed inset-0 flex flex-col overflow-hidden">
      {/* ── Area desktop ── */}
      <div ref={desktopRef} className="relative flex-1 overflow-hidden">
        {/* Shortcut / ikon desktop */}
        <div
          className="absolute inset-0 flex flex-col flex-wrap content-start gap-1 p-3"
          onMouseDown={(event) => {
            if ((event.target as HTMLElement).closest("button")) return;
            setSelectedShortcut(null);
            setStartOpen(false);
          }}
        >
          {shortcuts.map((shortcut) => (
            <DesktopShortcut
              key={shortcut.id}
              label={shortcut.label}
              icon={shortcut.icon}
              selected={selectedShortcut === shortcut.id}
              onSelect={() => setSelectedShortcut(shortcut.id)}
              onOpen={() => openShortcut(shortcut)}
            />
          ))}
        </div>

        {/* Window desktop */}
        {windows.map((def) => {
          const runtime = desktop.runtimes[def.id];
          if (!runtime) return null;
          return (
            <DesktopWindow
              key={def.id}
              def={def}
              runtime={runtime}
              bounds={bounds}
              active={desktop.activeId === def.id && !runtime.minimized}
              zIndex={Z_BASE + desktop.order.indexOf(def.id)}
              onFocus={() => desktop.focus(def.id)}
              onClose={() => desktop.close(def.id)}
              onMinimize={() => desktop.minimize(def.id)}
              onToggleMaximize={() => desktop.toggleMaximize(def.id)}
              onMove={(x, y) => desktop.move(def.id, x, y)}
              onResize={(width, height) => desktop.resize(def.id, width, height)}
            />
          );
        })}

        {/* Start menu */}
        {startOpen && (
          <StartMenu
            userEmail={userEmail}
            activePath={activePath}
            onOpenPath={openPath}
            onClose={() => setStartOpen(false)}
            onLogout={onLogout}
          />
        )}
      </div>

      {/* ── Taskbar ── */}
      <Taskbar
        tasks={tasks}
        quickItems={quickItems}
        activeId={desktop.activeId}
        startOpen={startOpen}
        onToggleStart={() => setStartOpen((prev) => !prev)}
        onTaskClick={(id) => {
          const runtime = desktop.runtimes[id];
          if (runtime && desktop.activeId === id && !runtime.minimized) desktop.minimize(id);
          else desktop.restore(id);
        }}
        onQuickClick={(id) => desktop.open(id)}
        onNotifications={() => openPath("/admin/notifikasi")}
        userEmail={userEmail}
        onSearch={onSearch}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />
    </div>
  );
}