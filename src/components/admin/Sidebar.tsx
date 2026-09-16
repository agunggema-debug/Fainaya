import { useState } from "react";
import { MENU_GROUPS } from "../../data/adminMenu";
import type { MenuItem } from "../../data/adminMenu";
import MenuIcon from "./MenuIcon";

/* Struktur menu admin dipindahkan ke src/data/adminMenu.ts agar dipakai bersama
   oleh sidebar klasik dan start menu pada Ext JS style web desktop. */

/* Icon component dipindahkan ke src/components/admin/MenuIcon.tsx (dipakai
   sidebar, desktop shortcut, title bar window, dan taskbar). */

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
            ? "text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30"
            : "text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-800"
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

  /* When collapsed, clicking navigates to first submenu page */
  const handleClick = collapsed && submenu.length > 0
    ? () => onNavigate(submenu[0].path)
    : onToggle;

  return (
    <div>
      <button
        onClick={handleClick}
        className={`w-full flex items-center justify-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
          collapsed ? "px-0" : ""
        } ${
          isParentActive
            ? "text-blue-700 dark:text-blue-400 bg-blue-50/70 dark:bg-blue-900/20"
            : "text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-800"
        }`}
        title={collapsed ? item.label : undefined}
      >
        <span className={`${isParentActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-gray-500"}`}>
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
        <ul className="mt-0.5 ml-9 space-y-0.5 border-l-2 border-slate-100 dark:border-gray-800 pl-3">
          {submenu.map((sub) => (
            <SubmenuItem key={sub.path} sub={sub} activePath={activePath} onNavigate={onNavigate} />
          ))}
        </ul>
      )}
    </div>
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
      } bg-white dark:bg-gray-900 border-r border-slate-200/70 dark:border-gray-800 flex flex-col h-screen sticky top-0 z-30 transition-all duration-300 shadow-sm shrink-0`}
    >
      {/* ── Logo ── */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-100 dark:border-gray-800 shrink-0">
        {!collapsed && (
          <a href="/admin/dashboard" className="flex items-center gap-2.5 group">
            <div className="relative">
              <img src="/img/logo.png" alt="Fainaya" className="h-7 w-auto rounded-md" />
              <div className="absolute -inset-1 bg-blue-500/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-sm font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
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
          className="p-1.5 rounded-lg text-slate-400 dark:text-gray-500 hover:text-slate-600 dark:hover:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-800 transition-all"
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
                <span className="text-[10px] font-semibold tracking-[0.12em] text-slate-400 dark:text-gray-500 uppercase">
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
                      <button
                        onClick={() => item.path && onNavigate(item.path)}
                        className={`w-full flex items-center justify-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                          collapsed ? "px-0" : ""
                        } ${
                          activePath === (item.path ?? "")
                            ? "text-blue-700 dark:text-blue-400 bg-blue-50/70 dark:bg-blue-900/20 shadow-sm"
                            : "text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-800"
                        }`}
                        title={collapsed ? item.label : undefined}
                      >
                        <span className={`${activePath === (item.path ?? "") ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-gray-500"}`}>
                          <MenuIcon path={item.icon} />
                        </span>
                        {!collapsed && <span className="truncate">{item.label}</span>}
                        {!collapsed && item.badge && (
                          <span className="ml-auto inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                            {item.badge}
                          </span>
                        )}
                      </button>
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
        <div className="px-4 py-3 border-t border-slate-100 dark:border-gray-800 shrink-0">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
              F
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-700 dark:text-gray-200 truncate">Fainaya Admin</p>
              <p className="text-[10px] text-slate-400 dark:text-gray-500">v1.0.0</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}