import { useEffect, useRef, useState } from "react";
import MenuIcon from "../MenuIcon";
import { MENU_ICONS } from "../../../data/adminMenu";
import { TASKBAR_HEIGHT } from "./useDesktopWindows";

export type TaskbarTask = { id: string; title: string; icon: string };
export type TaskbarQuickItem = { id: string; label: string; icon: string };

type TaskbarProps = {
  tasks: TaskbarTask[];
  quickItems: TaskbarQuickItem[];
  activeId: string | null;
  startOpen: boolean;
  onToggleStart: () => void;
  onTaskClick: (id: string) => void;
  onQuickClick: (id: string) => void;
  onNotifications: () => void;
  userEmail: string;
  onSearch: (query: string) => void;
  onNavigate: (path: string) => void;
  onLogout: () => void;
};

function TrayClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="ext-clock select-none px-2 leading-tight">
      <div>{now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</div>
      <div className="opacity-80">
        {now.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })}
      </div>
    </div>
  );
}

/**
 * Taskbar ala Ext JS 2.0 Desktop: Start button, quick launch, tombol window yang
 * terbuka (task buttons) dan system tray (search, notifikasi, tema, akun, jam).
 */
export default function Taskbar({
  tasks,
  quickItems,
  activeId,
  startOpen,
  onToggleStart,
  onTaskClick,
  onQuickClick,
  onNotifications,
  userEmail,
  onSearch,
  onNavigate,
  onLogout,
}: Readonly<TaskbarProps>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => document.documentElement.classList.contains("dark"));

  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }
    function handleShortcut(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleShortcut);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  const submitSearch = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const sanitized = searchQuery.replace(/<[^>]*>/g, "").trim().slice(0, 100);
    if (sanitized) onSearch(sanitized);
  };

  const trayMenuClass = "ext-menu-item w-full text-left";

  return (
    <div className="ext-desktop ext-taskbar flex flex-none items-stretch gap-1 px-1" style={{ height: TASKBAR_HEIGHT }}>
      {/* ── Start button ── */}
      <button
        type="button"
        className={`ext-start-btn my-0.5 ${startOpen ? "ext-start-btn-open" : ""}`}
        onClick={onToggleStart}
        aria-expanded={startOpen}
        title="Fainaya Desktop — menu utama"
      >
        <img src="/img/logo.png" alt="" className="h-4 w-4 rounded" />
        <span>Start</span>
      </button>

      {/* ── Quick launch ── */}
      {quickItems.length > 0 && (
        <div className="flex items-center gap-1 px-1">
          {quickItems.map((item) => (
            <button
              key={item.id}
              type="button"
              title={item.label}
              aria-label={item.label}
              className="ext-quicklaunch"
              onClick={() => onQuickClick(item.id)}
            >
              <MenuIcon path={item.icon} className="h-4 w-4" strokeWidth={2} />
            </button>
          ))}
        </div>
      )}

      <span className="ext-taskbar-divider my-1" />

      {/* ── Task buttons (window yang sedang terbuka) ── */}
      <div className="flex flex-1 items-center gap-1 overflow-hidden">
        {tasks.map((task) => (
          <button
            key={task.id}
            type="button"
            title={task.title}
            className={`ext-task-btn my-0.5 ${activeId === task.id ? "ext-task-btn-active" : ""}`}
            onClick={() => onTaskClick(task.id)}
          >
            <MenuIcon path={task.icon} className="h-3.5 w-3.5" strokeWidth={2} />
            <span className="truncate">{task.title}</span>
          </button>
        ))}
      </div>

      {/* ── System tray ── */}
      <div className="ext-tray flex items-center gap-1 pl-2">
        <form onSubmit={submitSearch} className="flex items-center gap-1 pr-1">
          <svg className="h-3.5 w-3.5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={searchRef}
            type="search"
            value={searchQuery}
            maxLength={100}
            placeholder="Cari klien / nota / serial..."
            aria-label="Pencarian global"
            className="ext-tray-input w-32 lg:w-44"
            onChange={(event) => setSearchQuery(event.target.value.slice(0, 100))}
          />
        </form>

        <button type="button" className="ext-tray-btn" title="Notifikasi" onClick={onNotifications}>
          <MenuIcon path={MENU_ICONS.bell} className="h-4 w-4" strokeWidth={1.9} />
        </button>

        <button
          type="button"
          className="ext-tray-btn"
          title={darkMode ? "Ganti ke mode terang" : "Ganti ke mode gelap"}
          onClick={() => setDarkMode((prev) => !prev)}
        >
          {darkMode ? (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </button>

        <div className="relative" ref={profileRef}>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded px-1.5 py-0.5 hover:bg-white/15"
            onClick={() => setProfileOpen((prev) => !prev)}
            aria-label="Menu pengguna"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-sky-300 to-blue-600 text-[10px] font-bold text-white">
              {userEmail.charAt(0).toUpperCase() || "F"}
            </span>
            <span className="hidden max-w-24 truncate md:inline">{userEmail || "admin"}</span>
          </button>

          {profileOpen && (
            <div className="ext-desktop absolute right-0 bottom-[26px] z-[9600] w-52 overflow-hidden rounded border border-[#3b6da5] bg-white py-1 shadow-[0_-6px_24px_rgba(3,16,30,0.5)] dark:border-gray-700 dark:bg-gray-900">
              <p className="border-b border-[#dbe3ee] px-3 py-2 text-[10px] text-slate-500 dark:border-gray-700 dark:text-gray-400">
                Masuk sebagai
                <span className="mt-0.5 block truncate text-[11px] font-bold text-[#15428b] dark:text-gray-200">
                  {userEmail || "Administrator"}
                </span>
              </p>
              <button
                type="button"
                className={trayMenuClass}
                onClick={() => {
                  setProfileOpen(false);
                  onNavigate("/admin/akun");
                }}
              >
                <MenuIcon path={MENU_ICONS.users} className="h-4 w-4" strokeWidth={1.9} />
                Akun Saya
              </button>
              <button
                type="button"
                className={trayMenuClass}
                onClick={() => {
                  setProfileOpen(false);
                  onNavigate("/admin/log-aktivitas");
                }}
              >
                <MenuIcon path={MENU_ICONS.clipboard} className="h-4 w-4" strokeWidth={1.9} />
                Log Aktivitas
              </button>
              <button
                type="button"
                className={trayMenuClass}
                onClick={() => {
                  setProfileOpen(false);
                  onLogout();
                }}
              >
                <MenuIcon path={MENU_ICONS.shield} className="h-4 w-4" strokeWidth={1.9} />
                Keluar (Logout)
              </button>
            </div>
          )}
        </div>

        <TrayClock />
      </div>
    </div>
  );
}