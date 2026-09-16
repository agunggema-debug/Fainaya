import { useState } from "react";
import MenuIcon from "../MenuIcon";
import { MENU_GROUPS, MENU_ICONS } from "../../../data/adminMenu";

type StartMenuProps = {
  userEmail: string;
  activePath: string;
  onOpenPath: (path: string) => void;
  onClose: () => void;
  onLogout: () => void;
};

/**
 * Start menu ala Ext JS 2.0 Desktop — berisi seluruh struktur menu admin
 * (sumber data sama dengan sidebar klasik: src/data/adminMenu.ts).
 */
export default function StartMenu({
  userEmail,
  activePath,
  onOpenPath,
  onClose,
  onLogout,
}: Readonly<StartMenuProps>) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const group of MENU_GROUPS) {
      for (const item of group.items) {
        if ((item.submenu ?? []).some((sub) => sub.path === activePath)) {
          initial[item.label] = true;
        }
      }
    }
    return initial;
  });

  const toggle = (label: string) => setExpanded((prev) => ({ ...prev, [label]: !prev[label] }));

  const openPath = (path: string) => {
    onOpenPath(path);
    onClose();
  };

  return (
    <div
      className="ext-desktop ext-startmenu absolute left-0 z-[9500] flex w-[292px] max-w-[calc(100vw-16px)] flex-col"
      style={{ bottom: 0, maxHeight: "calc(100% - 12px)" }}
    >
      {/* ── Banner ── */}
      <div className="ext-startmenu-header flex flex-none items-center gap-2 px-3 py-2">
        <img src="/img/logo.png" alt="Fainaya" className="h-7 w-7 rounded-md bg-white/90 p-0.5" />
        <div className="min-w-0">
          <p className="truncate text-[11px] font-bold">Fainaya Service &amp; Art</p>
          <p className="truncate text-[10px] font-normal opacity-90">{userEmail || "Administrator"}</p>
        </div>
      </div>

      {/* ── Daftar program ── */}
      <div className="ext-startmenu-body flex-1 overflow-y-auto px-1.5 py-2">
        {MENU_GROUPS.map((group) => (
          <div key={group.section} className="mb-2 last:mb-0">
            <p className="ext-startmenu-section px-2 py-1">{group.section}</p>
            {group.items.map((item) => {
              const submenu = item.submenu ?? [];
              const hasSubmenu = submenu.length > 0;
              const isActive = item.path === activePath || submenu.some((sub) => sub.path === activePath);
              const isExpanded = expanded[item.label] ?? false;
              return (
                <div key={item.label}>
                  <button
                    type="button"
                    className={`ext-menu-item ${isActive ? "ext-menu-item-active" : ""}`}
                    onClick={() => (hasSubmenu ? toggle(item.label) : item.path && openPath(item.path))}
                  >
                    <span className="ext-menu-item-icon">
                      <MenuIcon path={item.icon} className="h-4 w-4" strokeWidth={1.9} />
                    </span>
                    <span className="flex-1 truncate">{item.label}</span>
                    {hasSubmenu && (
                      <svg
                        viewBox="0 0 12 12"
                        className={`h-3 w-3 shrink-0 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                        aria-hidden="true"
                      >
                        <path d="M4 2l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    )}
                  </button>
                  {hasSubmenu && isExpanded && (
                    <ul className="ml-4 border-l border-[#c3daf9] pl-2 dark:border-gray-700">
                      {submenu.map((sub) => (
                        <li key={sub.path}>
                          <button
                            type="button"
                            className={`ext-menu-subitem ${sub.path === activePath ? "ext-menu-subitem-active" : ""}`}
                            onClick={() => openPath(sub.path)}
                          >
                            {sub.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* ── Footer ── */}
      <div className="ext-startmenu-footer flex flex-none items-center justify-between gap-2 px-2 py-1.5">
        <button type="button" className="ext-menu-item w-auto" onClick={() => openPath("/")}>
          <MenuIcon path={MENU_ICONS.monitor} className="h-4 w-4" strokeWidth={1.9} />
          <span>Website Utama</span>
        </button>
        <button type="button" className="ext-btn" onClick={onLogout}>
          Keluar
        </button>
      </div>
    </div>
  );
}