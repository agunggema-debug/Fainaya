import type { ReactNode } from "react";

type ExtButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  /** tombol aktif/tertekan (mis. pilihan rentang waktu) */
  active?: boolean;
  disabled?: boolean;
  title?: string;
};

/** Tombol bergaya Ext JS 2.0 (gradient biru + border tipis). */
export function ExtButton({ children, onClick, active, disabled, title }: Readonly<ExtButtonProps>) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={`ext-btn ${active ? "ext-btn-active" : ""} ${disabled ? "cursor-default opacity-60" : ""}`}
    >
      {children}
    </button>
  );
}

/** Container toolbar Ext (deretan tombol di bawah title bar window). */
export function ExtToolbar({ children }: Readonly<{ children: ReactNode }>) {
  return <div className="flex flex-wrap items-center gap-1.5">{children}</div>;
}

/** Garis pemisah antar kelompok tombol toolbar. */
export function ExtToolbarDivider() {
  return <span className="ext-toolbar-divider h-5" />;
}

/** Label/informasi di ujung kanan toolbar. */
export function ExtToolbarInfo({ children }: Readonly<{ children: ReactNode }>) {
  return <span className="ml-auto text-[10px] text-[#5d7ea6] dark:text-gray-400">{children}</span>;
}

/** Ikon kecil untuk tombol toolbar (ukuran 3.5). */
export function ExtIcon({ path }: Readonly<{ path: string }>) {
  return (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}