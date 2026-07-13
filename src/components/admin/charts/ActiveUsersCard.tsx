import type { ActiveUsersSummary } from "../../../data/dashboardPelanggan";

type ActiveUsersCardProps = {
  data: ActiveUsersSummary;
};

export default function ActiveUsersCard({ data }: Readonly<ActiveUsersCardProps>) {
  return (
    <div className="rounded-xl bg-white dark:bg-gray-900 p-6 shadow-sm ring-1 ring-gray-200/60 dark:ring-gray-800 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Active Users</h2>
          <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
            Status pelanggan aktif / nonaktif
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/20 ring-1 ring-emerald-200/50 dark:ring-emerald-800">
          <svg className="h-5 w-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
          </svg>
        </div>
      </div>

      {/* Stat cards inline */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="rounded-xl bg-emerald-50 dark:bg-emerald-900/20 p-4 ring-1 ring-emerald-200/50 dark:ring-emerald-800">
          <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{data.aktif}</p>
          <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-1">Aktif</p>
          <div className="mt-2 w-full bg-emerald-200/50 dark:bg-emerald-900/40 rounded-full h-1.5 overflow-hidden">
            <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${data.aktifPersen}%` }} />
          </div>
          <p className="text-[10px] text-emerald-500 dark:text-emerald-500 mt-1">{data.aktifPersen}%</p>
        </div>
        <div className="rounded-xl bg-red-50 dark:bg-red-900/20 p-4 ring-1 ring-red-200/50 dark:ring-red-800">
          <p className="text-2xl font-bold text-red-700 dark:text-red-300">{data.nonaktif}</p>
          <p className="text-xs font-medium text-red-600 dark:text-red-400 mt-1">Nonaktif</p>
          <div className="mt-2 w-full bg-red-200/50 dark:bg-red-900/40 rounded-full h-1.5 overflow-hidden">
            <div className="h-full rounded-full bg-red-500 transition-all" style={{ width: `${data.nonaktifPersen}%` }} />
          </div>
          <p className="text-[10px] text-red-500 dark:text-red-500 mt-1">{data.nonaktifPersen}%</p>
        </div>
      </div>

      {/* Summary strip */}
      <div className="flex items-center justify-between rounded-lg bg-gray-50 dark:bg-gray-800/50 px-4 py-3 mb-5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-blue-400" />
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Pelanggan</span>
        </div>
        <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{data.totalPelanggan}</span>
      </div>
      <div className="flex items-center justify-between rounded-lg bg-indigo-50/60 dark:bg-indigo-900/10 px-4 py-3 mb-5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-indigo-400" />
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Baru bulan ini</span>
        </div>
        <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">+{data.baruBulanIni}</span>
      </div>

      {/* Recently active list */}
      <div>
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
          Terakhir Aktif
        </h3>
        <div className="space-y-2.5">
          {data.recentlyActive.map((p) => (
            <div key={p.id} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={`h-2 w-2 rounded-full shrink-0 ${p.status === "aktif" ? "bg-emerald-400" : "bg-gray-300 dark:bg-gray-600"}`} />
                <span className="font-medium text-gray-700 dark:text-gray-300 truncate">{p.nama}</span>
              </div>
              <span className="text-[11px] text-gray-400 dark:text-gray-500 shrink-0 ml-2">
                {p.terakhir_aktif ? new Date(p.terakhir_aktif).toLocaleDateString("id", { day: "numeric", month: "short" }) : "—"}
              </span>
            </div>
          ))}
          {data.recentlyActive.length === 0 && (
            <p className="text-xs text-gray-400 dark:text-gray-500 text-center py-3">Belum ada data pelanggan.</p>
          )}
        </div>
      </div>
    </div>
  );
}