type MenuIconProps = {
  /** 24x24 SVG path data */
  path: string;
  /** Tailwind size classes (defaults to w-5 h-5) */
  className?: string;
  strokeWidth?: number;
};

/**
 * Shared outline icon used by the admin sidebar, the Ext style desktop
 * shortcuts, the window title bars and the taskbar.
 */
export default function MenuIcon({ path, className = "w-5 h-5", strokeWidth = 1.8 }: Readonly<MenuIconProps>) {
  return (
    <svg
      className={`${className} shrink-0`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}