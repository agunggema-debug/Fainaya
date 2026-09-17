import { SAMPLE_NOTIFICATIONS } from "../../../data/notifications";

/**
 * Daftar notifikasi admin (chat masuk, servis melewati batas, revisi desain,
 * stok menipis). Dipakai oleh window desktop pada halaman-halaman admin.
 */
export default function NotificationList() {
  return (
    <div className="space-y-3">
      {SAMPLE_NOTIFICATIONS.map((notif) => {
        const iconColor =
          notif.type === "chat"
            ? "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300"
            : notif.type === "service"
              ? "bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-300"
              : "bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-300";
        return (
          <div
            key={notif.id}
            className={`flex items-start gap-3 rounded-lg border p-3 ${
              notif.unread
                ? "border-blue-200 bg-blue-50/60 dark:border-blue-900/60 dark:bg-blue-900/20"
                : "border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
            }`}
          >
            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${iconColor}`}>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d={notif.icon} />
              </svg>
            </span>
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5 text-xs font-bold text-gray-800 dark:text-gray-200">
                {notif.title}
                {notif.unread && <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />}
              </p>
              <p className="mt-0.5 text-[11px] leading-relaxed text-gray-500 dark:text-gray-400">
                {notif.description}
              </p>
              <p className="mt-1 text-[10px] text-gray-400 dark:text-gray-500">{notif.time}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}