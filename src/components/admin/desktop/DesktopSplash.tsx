import MenuIcon from "../MenuIcon";
import { MENU_ICONS } from "../../../data/adminMenu";

type DesktopSplashProps = {
  message?: string;
  detail?: string;
};

/** Splash screen bergaya Ext JS 2.0 saat desktop sedang memuat data. */
export default function DesktopSplash({
  message = "Memuat Fainaya Desktop...",
  detail,
}: Readonly<DesktopSplashProps>) {
  return (
    <div className="ext-desktop ext-wallpaper fixed inset-0 flex items-center justify-center p-6">
      <div className="ext-splash w-[380px] max-w-full">
        <div className="ext-titlebar flex h-[26px] items-center gap-1.5 px-1.5">
          <span className="ext-titlebar-icon">
            <MenuIcon path={MENU_ICONS.monitor} className="h-4 w-4" strokeWidth={2} />
          </span>
          <span className="ext-titlebar-text flex-1 truncate">Fainaya Desktop</span>
        </div>
        <div className="ext-window-body flex items-center gap-3 p-4">
          <img src="/img/logo.png" alt="Fainaya" className="h-10 w-10 rounded-md" />
          <div className="min-w-0 flex-1">
            <p className="mb-2 text-[11px] font-bold text-[#15428b] dark:text-gray-200">{message}</p>
            <div className="ext-progress">
              <div className="ext-progress-bar" />
            </div>
            {detail && <p className="mt-2 text-[10px] text-slate-500 dark:text-gray-400">{detail}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}