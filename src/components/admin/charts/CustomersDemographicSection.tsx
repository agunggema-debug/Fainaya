import type { CustomerDemographic } from "../../../data/dashboardPelanggan";

type Props = {
  data: CustomerDemographic;
};

/* ───── Simple horizontal bar ───── */
function SimpleBar({ label, count, max, color }: { label: string; count: number; max: number; color: string }) {
  const pct = max > 0 ? Math.round((count / max) * 100) : 0;
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="w-28 text-right text-gray-600 dark:text-gray-400 truncate text-xs">{label}</span>
      <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="w-8 text-right text-xs font-semibold text-gray-700 dark:text-gray-300">{count}</span>
    </div>
  );
}

/* ───── Donut-like ring (CSS-based) ───── */
function StatusRing({ data }: { data: { label: string; count: number; color: string }[] }) {
  const total = data.reduce((s, d) => s + d.count, 0);
  if (total === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-gray-300 dark:text-gray-600 text-xs">
        No data
      </div>
    );
  }
  // Build conic gradient
  const parts = data.reduce<{ label: string; count: number; color: string; start: number; end: number }[]>((acc, d) => {
    const pct = (d.count / total) * 100;
    const start = acc.length > 0 ? acc[acc.length - 1].end : 0;
    const end = start + pct;
    acc.push({ ...d, start, end });
    return acc;
  }, []);
  const gradient = parts
    .map((p) => `${p.color} ${p.start}% ${p.end}%`)
    .join(", ");

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="h-24 w-24 rounded-full ring-2 ring-gray-200 dark:ring-gray-700"
        style={{ background: `conic-gradient(${gradient})` }}
      />
      <div className="flex gap-4 text-xs">
        {data.map((d) => (
          <div key={d.label} className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
            <span className="text-gray-500 dark:text-gray-400">{d.label}</span>
            <span className="font-semibold text-gray-700 dark:text-gray-300">{d.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CustomersDemographicSection({ data }: Readonly<Props>) {
  const maxTier = Math.max(...data.byTransactionTier.map((t) => t.count), 1);
  const maxMonth = Math.max(...data.byJoinMonth.map((m) => m.count), 1);

  return (
    <div className="rounded-xl bg-white dark:bg-gray-900 p-6 shadow-sm ring-1 ring-gray-200/60 dark:ring-gray-800 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Customers Demographic</h2>
          <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
            Distribusi pelanggan berdasarkan status, pendaftaran & transaksi
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/30 dark:to-violet-800/20 ring-1 ring-violet-200/50 dark:ring-violet-800">
          <svg className="h-5 w-5 text-violet-600 dark:text-violet-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Status ring + Join month */}
        <div className="space-y-6">
          {/* Status ring */}
          <div className="rounded-lg bg-gray-50 dark:bg-gray-800/30 p-4 ring-1 ring-gray-200/50 dark:ring-gray-700">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Status Pelanggan
            </h3>
            <StatusRing data={data.byStatus} />
          </div>

          {/* Join month bars */}
          <div className="rounded-lg bg-gray-50 dark:bg-gray-800/30 p-4 ring-1 ring-gray-200/50 dark:ring-gray-700">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Pendaftaran (6 bulan)
            </h3>
            <div className="space-y-2">
              {data.byJoinMonth.map((m) => {
                // Format month label
                const [year, month] = m.month.split("-");
                const label = new Date(Number(year), Number(month) - 1).toLocaleDateString("id", { month: "short", year: "2-digit" });
                return (
                  <SimpleBar
                    key={m.month}
                    label={label}
                    count={m.count}
                    max={maxMonth}
                    color="#8b5cf6"
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Transaction tier + Top customers */}
        <div className="space-y-6">
          {/* Transaction tier bars */}
          <div className="rounded-lg bg-gray-50 dark:bg-gray-800/30 p-4 ring-1 ring-gray-200/50 dark:ring-gray-700">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Tier Transaksi
            </h3>
            <div className="space-y-2">
              {data.byTransactionTier.map((t) => (
                <SimpleBar
                  key={t.tier}
                  label={t.tier}
                  count={t.count}
                  max={maxTier}
                  color="#f59e0b"
                />
              ))}
            </div>
          </div>

          {/* Top customers */}
          <div className="rounded-lg bg-gray-50 dark:bg-gray-800/30 p-4 ring-1 ring-gray-200/50 dark:ring-gray-700">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Top Pelanggan (by transaksi)
            </h3>
            <div className="space-y-2.5">
              {data.topPelanggan.map((p, idx) => (
                <div key={p.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={`text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                      idx === 0 ? "bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400" :
                      idx === 1 ? "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400" :
                      idx === 2 ? "bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400" :
                      "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500"
                    }`}>
                      {idx + 1}
                    </span>
                    <span className="font-medium text-gray-700 dark:text-gray-300 truncate">{p.nama}</span>
                  </div>
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 shrink-0 ml-2">
                    {p.total_transaksi} tx
                  </span>
                </div>
              ))}
              {data.topPelanggan.length === 0 && (
                <p className="text-xs text-gray-400 dark:text-gray-500 text-center py-3">Belum ada data.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}