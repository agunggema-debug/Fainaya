import { useState } from "react";

type MenuItem = {
  label: string;
  icon: string;
  path?: string;
  badge?: string | number;
  submenu?: { label: string; path: string }[];
};

/* ───── SVG icon path helper ───── */
const ICONS = {
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
};

/* ───── Define menu structure from dashboarb.md ───── */
const MENU_GROUPS: {
  section: string;
  items: MenuItem[];
}[] = [
  {
    section: "RINGKASAN & UTAMA",
    items: [
      {
        label: "Dashboard / Beranda",
        icon: ICONS.dashboard,
        path: "/admin/dashboard",
      },
      {
        label: "Pelanggan / Klien",
        icon: ICONS.users,
        path: "/admin/pelanggan",
      },
    ],
  },
  {
    section: "LAYANAN IT",
    items: [
      {
        label: "Servis & Perbaikan",
        icon: ICONS.wrench,
        submenu: [
          { label: "Daftar Antrean", path: "/admin/servis/antrean" },
          { label: "Proses Perbaikan", path: "/admin/servis/proses" },
          { label: "Riwayat Servis", path: "/admin/servis/riwayat" },
        ],
      },
      {
        label: "Log Perawatan",
        icon: ICONS.clipboard,
        path: "/admin/maintenance",
      },
    ],
  },
  {
    section: "STUDIO KREATIF",
    items: [
      {
        label: "Proyek Desain",
        icon: ICONS.paintbrush,
        submenu: [
          { label: "Brief Masuk", path: "/admin/desain/brief" },
          { label: "Tahap Desain/Revisi", path: "/admin/desain/proses" },
          { label: "Galeri Portofolio", path: "/admin/desain/portofolio" },
        ],
      },
      {
        label: "Proyek Kreasi Tangan",
        icon: ICONS.heart,
        path: "/admin/kreasi",
      },
    ],
  },
  {
    section: "OPERASIONAL & LOGISTIK",
    items: [
      {
        label: "Inventaris & Stok",
        icon: ICONS.collection,
        path: "/admin/inventaris",
      },
      {
        label: "Keuangan & Kas",
        icon: ICONS.cash,
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
        icon: ICONS.robot,
        path: "/admin/integrasi",
      },
      {
        label: "Pengaturan Sistem",
        icon: ICONS.cog,
        path: "/admin/pengaturan",
      },
    ],
  },
];

/* ───── Icon component ───── */
function MenuIcon({ path }: Readonly<{ path: string }>) {
  return (
    <svg
      className="w-4.5 h-4.5 shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={path} />
    </svg>
  );
}

/* ───── Submenu arrow ───── */
function ChevronDown({ open }: Readonly<{ open: boolean }>) {
  return (
    <svg
      className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="2.5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

type SidebarProps = {
  activePath: string;
  onNavigate: (path: string) => void;
  collapsed?: boolean;
  onToggle?: () => void;
};

/* ───── Submenu item button ───── */
function SubmenuItem({
  sub,
  activePath,
  onNavigate,
}: Readonly<{
  sub: { label: string; path: string };
  activePath: string;
  onNavigate: (path: string) => void;
}>) {
  const isActive = activePath === sub.path;
  return (
    <li key={sub.path}>
      <button
        onClick={() => onNavigate(sub.path)}
        className={`w-full text-left px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 ${
          isActive
            ? "text-blue-700 bg-blue-50"
            : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
        }`}
      >
        {sub.label}
      </button>
    </li>
  );
}

/* ───── Menu item with submenu ───── */
function MenuItemWithSubmenu({
  item,
  activePath,
  collapsed,
  expanded,
  onToggle,
  onNavigate,
}: Readonly<{
  item: MenuItem;
  activePath: string;
  collapsed: boolean;
  expanded: boolean;
  onToggle: () => void;
  onNavigate: (path: string) => void;
}>) {
  const submenu = item.submenu ?? [];
  const isParentActive = submenu.some((s) => s.path === activePath);

  return (
    <div>
      <button
        onClick={onToggle}
        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
          isParentActive
            ? "text-blue-700 bg-blue-50/70"
            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
        }`}
        title={collapsed ? item.label : undefined}
      >
        <span className={`${isParentActive ? "text-blue-600" : "text-slate-400"}`}>
          <MenuIcon path={item.icon} />
        </span>
        {!collapsed && (
          <>
            <span className="flex-1 text-left truncate">{item.label}</span>
            <ChevronDown open={expanded} />
          </>
        )}
      </button>
      {!collapsed && expanded && (
        <ul className="mt-0.5 ml-9 space-y-0.5 border-l-2 border-slate-100 pl-3">
          {submenu.map((sub) => (
            <SubmenuItem key={sub.path} sub={sub} activePath={activePath} onNavigate={onNavigate} />
          ))}
        </ul>
      )}
    </div>
  );
}

/* ───── Menu item without submenu ───── */
function MenuItemPlain({
  item,
  activePath,
  collapsed,
  onNavigate,
}: Readonly<{
  item: MenuItem;
  activePath: string;
  collapsed: boolean;
  onNavigate: (path: string) => void;
}>) {
  return (
    <button
      onClick={() => item.path && onNavigate(item.path)}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
        activePath === (item.path ?? "")
          ? "text-blue-700 bg-blue-50/70 shadow-sm"
          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
      }`}
      title={collapsed ? item.label : undefined}
    >
      <span className={`${activePath === (item.path ?? "") ? "text-blue-600" : "text-slate-400"}`}>
        <MenuIcon path={item.icon} />
      </span>
      {!collapsed && <span className="truncate">{item.label}</span>}
      {!collapsed && item.badge && (
        <span className="ml-auto inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">
          {item.badge}
        </span>
      )}
    </button>
  );
}

function buildInitialExpanded(activePath: string): Record<string, boolean> {
  const initial: Record<string, boolean> = {};
  for (const group of MENU_GROUPS) {
    for (const item of group.items) {
      const submenu = item.submenu ?? [];
      if (submenu.some((sub) => sub.path === activePath)) {
        initial[item.label] = true;
      }
    }
  }
  return initial;
}

export default function Sidebar({ activePath, onNavigate, collapsed = false, onToggle }: Readonly<SidebarProps>) {
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>(() => buildInitialExpanded(activePath));

  const toggleSubmenu = (label: string) => {
    setExpandedMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <aside
      className={`${
        collapsed ? "w-16" : "w-64"
      } bg-white border-r border-slate-200/70 flex flex-col h-screen sticky top-0 z-30 transition-all duration-300 shadow-sm shrink-0`}
    >
      {/* ── Logo ── */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-100 shrink-0">
        {!collapsed && (
          <a href="/admin/dashboard" className="flex items-center gap-2.5 group">
            <div className="relative">
              <img src="/img/logo.png" alt="Fainaya" className="h-7 w-auto rounded-md" />
              <div className="absolute -inset-1 bg-blue-500/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-sm font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
              Fainaya
            </span>
          </a>
        )}
        {collapsed && (
          <a href="/admin/dashboard" className="mx-auto">
            <img src="/img/logo.png" alt="Fainaya" className="h-7 w-auto rounded-md" />
          </a>
        )}
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d={collapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"} />
          </svg>
        </button>
      </div>

      {/* ── Scrollable menu area ── */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-4 scrollbar-thin">
        {MENU_GROUPS.map((group) => (
          <div key={group.section} className="mb-5 last:mb-0">
            {!collapsed && (
              <div className="px-3 mb-2 mt-1">
                <span className="text-[10px] font-semibold tracking-[0.12em] text-slate-400 uppercase">
                  {group.section}
                </span>
              </div>
            )}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const hasSubmenu = item.submenu && item.submenu.length > 0;
                return (
                  <li key={item.label}>
                    {hasSubmenu ? (
                      <MenuItemWithSubmenu
                        item={item}
                        activePath={activePath}
                        collapsed={collapsed}
                        expanded={expandedMenus[item.label] ?? false}
                        onToggle={() => toggleSubmenu(item.label)}
                        onNavigate={onNavigate}
                      />
                    ) : (
                      <MenuItemPlain
                        item={item}
                        activePath={activePath}
                        collapsed={collapsed}
                        onNavigate={onNavigate}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* ── Sidebar footer ── */}
      {!collapsed && (
        <div className="px-4 py-3 border-t border-slate-100 shrink-0">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
              F
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-700 truncate">Fainaya Admin</p>
              <p className="text-[10px] text-slate-400">v1.0.0</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}