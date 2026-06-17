import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { fetchSupabaseTotalStats, fetchSupabaseDailyStats, getLocalTotalStats, getLocalDailyStats } from "../../data/visitorTracker";
import type { DailyStats, PageStats } from "../../data/visitorTracker";

type DashboardData = {
  totalVisitors: number;
  totalPageviews: number;
  totalDays: number;
  avgVisitorsPerDay: number;
  topPages: PageStats[];
  dailyStats: DailyStats[];
};

/* ───── animated bar chart ───── */
function BarChart({ data, color, gradientFrom, gradientTo }: { data: { label: string; value: number }[]; color: string; gradientFrom?: string; gradientTo?: string }) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="flex items-end gap-1 sm:gap-2 h-40 pt-3">
      {data.map((item, i) => {
        const pct = Math.max((item.value / max) * 100, 4);
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group">
            {/* value tooltip */}
            <span className="text-[10px] font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white shadow-md rounded-md px-1.5 py-0.5 border border-slate-100">{item.value}</span>
            {/* bar */}
            <div className="w-full relative rounded-t-lg overflow-hidden" style={{ height: `${pct}%` }}>
              <div
                className="absolute inset-0 rounded-t-lg transition-all duration-700 ease-out"
                style={{
                  background: gradientFrom && gradientTo ? `linear-gradient(to top, ${gradientFrom}, ${gradientTo})` : color,
                }}
              />
              {/* shine overlay */}
              <div className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent rounded-t-lg" />
            </div>
            {/* label */}
            <span className="text-[8px] sm:text-[9px] text-slate-400 truncate w-full text-center leading-none">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ───── mini sparkline for stat cards ───── */
function MiniSparkline({ values, color }: { values: number[]; color: string }) {
  if (values.length < 2) return null;
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const range = max - min || 1;
  const w = 64;
  const h = 24;
  const points = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="opacity-60">
      <polyline fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={points} />
    </svg>
  );
}

export default function Dashboard() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState<DashboardData>(() => getLocalTotalStats());
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([]);
  const [timeRange, setTimeRange] = useState<"7d" | "14d" | "30d">("14d");
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const supabaseData = await fetchSupabaseTotalStats();
        if (supabaseData && supabaseData.totalDays > 0) {
          setData(supabaseData);
          setDailyStats(supabaseData.dailyStats);
        } else {
          const localData = getLocalTotalStats();
          setData(localData);
          setDailyStats(localData.dailyStats);
        }
      } catch {
        const localData = getLocalTotalStats();
        setData(localData);
        setDailyStats(localData.dailyStats);
      } finally {
        setDataLoading(false);
      }
    }
    loadData();
  }, []);

  /* ── loading ── */
  if (loading || dataLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50 flex flex-col items-center justify-center gap-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-4 border-blue-100 border-t-blue-500 animate-spin" />
        </div>
        <div className="animate-pulse text-slate-400 text-sm font-medium tracking-wide">Loading dashboard…</div>
      </div>
    );
  }

  if (!user) {
    navigate("/?login=required");
    return null;
  }

  /* ── handlers ── */
  const handleTimeChange = async (range: "7d" | "14d" | "30d") => {
    setTimeRange(range);
    const days = range === "7d" ? 7 : range === "14d" ? 14 : 30;
    try {
      const supabaseDaily = await fetchSupabaseDailyStats(days);
      if (supabaseDaily && supabaseDaily.length > 0) {
        setDailyStats(supabaseDaily);
      } else {
        const localDaily = getLocalDailyStats();
        setDailyStats(localDaily.slice(-days));
      }
    } catch {
      const localDaily = getLocalDailyStats();
      setDailyStats(localDaily.slice(-days));
    }
  };

  const doLogout = () => {
    logout();
    navigate("/");
  };

  /* ── stat cards config ── */
  const statsCards = [
    {
      label: "Total Visitors",
      value: data.totalVisitors,
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
      gradient: "from-blue-500 to-blue-600",
      bg: "bg-gradient-to-br from-blue-50 to-blue-100/60",
      ring: "ring-blue-200/60",
      sparkColor: "#3b82f6",
      sparkValues: dailyStats.map((d) => d.visitors),
    },
    {
      label: "Total Pageviews",
      value: data.totalPageviews,
      icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
      gradient: "from-orange-400 to-rose-500",
      bg: "bg-gradient-to-br from-orange-50 to-rose-100/60",
      ring: "ring-orange-200/60",
      sparkColor: "#f97316",
      sparkValues: dailyStats.map((d) => d.pageviews),
    },
    {
      label: "Avg / Day",
      value: data.avgVisitorsPerDay,
      icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
      gradient: "from-emerald-400 to-teal-500",
      bg: "bg-gradient-to-br from-emerald-50 to-teal-100/60",
      ring: "ring-emerald-200/60",
      sparkColor: "#10b981",
      sparkValues: dailyStats.map((d) => d.visitors),
    },
    {
      label: "Active Days",
      value: data.totalDays,
      icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
      gradient: "from-violet-400 to-purple-600",
      bg: "bg-gradient-to-br from-violet-50 to-purple-100/60",
      ring: "ring-violet-200/60",
      sparkColor: "#8b5cf6",
      sparkValues: dailyStats.map((_, i) => i + 1),
    },
  ];

  /* ── chart data ── */
  const chartData = dailyStats.map((d) => ({
    label: new Date(d.date + "T00:00:00").toLocaleDateString("en", { month: "short", day: "numeric" }),
    value: d.visitors,
  }));

  const pageviewChartData = dailyStats.map((d) => ({
    label: new Date(d.date + "T00:00:00").toLocaleDateString("en", { month: "short", day: "numeric" }),
    value: d.pageviews,
  }));

  const pageLabels: Record<string, string> = {
    "/": "Home",
    "/#home": "Home",
    "/#services": "Services",
    "/#about": "About",
    "/#contact": "Contact",
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50/30">
      {/* ── header ── */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-40 shadow-sm shadow-slate-200/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <img src="/img/logo.png" alt="Fainaya" className="h-8 w-auto rounded-lg transition-transform group-hover:scale-105" />
                <div className="absolute -inset-1 bg-blue-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold bg-linear-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">Admin Dashboard</span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-linear-to-r from-blue-500 to-indigo-500 text-white shadow-sm">LIVE</span>
              </div>
            </a>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-slate-600 font-medium truncate max-w-45">{user.email}</span>
              </div>
              <a href="/" className="text-xs font-medium text-slate-500 px-3 py-1.5 rounded-full border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200">
                ← Back to Site
              </a>
              <button
                onClick={doLogout}
                className="text-xs font-medium text-slate-500 px-3 py-1.5 rounded-full border border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-200 flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ── stats cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-8">
          {statsCards.map((card, idx) => (
            <div
              key={card.label}
              className={`${card.bg} rounded-2xl p-5 border border-white/60 shadow-sm hover:shadow-md hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-0.5 ring-1 ${card.ring} group`}
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl bg-linear-to-br ${card.gradient} flex items-center justify-center shadow-lg shadow-slate-200/50 group-hover:scale-105 transition-transform`}>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d={card.icon} />
                  </svg>
                </div>
                <MiniSparkline values={card.sparkValues} color={card.sparkColor} />
              </div>
              <div className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight mb-0.5">{card.value.toLocaleString()}</div>
              <div className="text-xs font-medium text-slate-500">{card.label}</div>
            </div>
          ))}
        </div>

        {/* ── charts row ── */}
        <div className="grid lg:grid-cols-2 gap-5 mb-8">
          {/* Daily Visitors */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100/80 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Daily Visitors</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Unique visitor trend</p>
              </div>
              <div className="flex bg-slate-100/80 rounded-lg p-0.5">
                {(["7d", "14d", "30d"] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => handleTimeChange(r)}
                    className={`text-[11px] font-semibold px-3 py-1 rounded-md transition-all duration-200 ${timeRange === r ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            {chartData.length > 0 ? (
              <BarChart data={chartData} color="#3b82f6" gradientFrom="#3b82f6" gradientTo="#93c5fd" />
            ) : (
              <div className="h-40 flex flex-col items-center justify-center text-slate-300">
                <svg className="w-10 h-10 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <span className="text-xs">No visitor data yet</span>
              </div>
            )}
          </div>

          {/* Daily Pageviews */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100/80 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Daily Pageviews</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Total page impressions</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-linear-to-br from-orange-400 to-rose-400" />
            </div>
            {pageviewChartData.length > 0 ? (
              <BarChart data={pageviewChartData} color="#f97316" gradientFrom="#f97316" gradientTo="#fdba74" />
            ) : (
              <div className="h-40 flex flex-col items-center justify-center text-slate-300">
                <svg className="w-10 h-10 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="text-xs">No pageview data yet</span>
              </div>
            )}
          </div>
        </div>

        {/* ── bottom row ── */}
        <div className="grid lg:grid-cols-3 gap-5">
          {/* Top Pages */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100/80 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-sm">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Top Pages</h3>
                <p className="text-[11px] text-slate-400">Most visited pages</p>
              </div>
            </div>
            {data.topPages.length > 0 ? (
              <div className="space-y-3.5">
                {data.topPages.map((page, idx) => {
                  const maxCount = data.topPages[0].count;
                  const percentage = Math.round((page.count / maxCount) * 100);
                  const colors = ["from-blue-500 to-indigo-500", "from-orange-400 to-rose-400", "from-emerald-400 to-teal-400", "from-violet-400 to-purple-500", "from-pink-400 to-rose-500"];
                  return (
                    <div key={page.page_path} className="group">
                      <div className="flex items-center justify-between text-sm mb-1.5">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-[10px] font-bold text-slate-300 w-4">{idx + 1}</span>
                          <span className="font-medium text-slate-700 truncate text-xs">{pageLabels[page.page_path] || page.page_path || "Home"}</span>
                        </div>
                        <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-full ml-2 shrink-0">{page.count}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div className={`h-full rounded-full bg-linear-to-r ${colors[idx % colors.length]} transition-all duration-700 ease-out`} style={{ width: `${percentage}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <svg className="w-8 h-8 mx-auto text-slate-200 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-xs text-slate-400">No page data yet</p>
              </div>
            )}
          </div>

          {/* Daily Breakdown Table */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100/80 shadow-sm hover:shadow-md transition-shadow duration-300 lg:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-sm">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Daily Breakdown</h3>
                <p className="text-[11px] text-slate-400">Detailed daily statistics</p>
              </div>
            </div>
            {dailyStats.length > 0 ? (
              <div className="overflow-x-auto -mx-6 px-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-slate-400 border-b border-slate-100">
                      <th className="pb-2.5 font-semibold text-[11px] uppercase tracking-wider">Date</th>
                      <th className="pb-2.5 font-semibold text-[11px] uppercase tracking-wider text-right">Visitors</th>
                      <th className="pb-2.5 font-semibold text-[11px] uppercase tracking-wider text-right">Pageviews</th>
                      <th className="pb-2.5 font-semibold text-[11px] uppercase tracking-wider text-right hidden sm:table-cell">Ratio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...dailyStats].reverse().map((day, idx) => (
                      <tr key={day.date} className={`border-b border-slate-50/80 hover:bg-slate-50/50 transition-colors ${idx === 0 ? "bg-blue-50/30" : ""}`}>
                        <td className="py-2.5 text-slate-700 font-medium text-xs">
                          <div className="flex items-center gap-2">
                            {idx === 0 && <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />}
                            {new Date(day.date + "T00:00:00").toLocaleDateString("en", { weekday: "short", month: "short", day: "numeric" })}
                          </div>
                        </td>
                        <td className="py-2.5 text-right">
                          <span className="inline-flex items-center justify-center min-w-8 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">{day.visitors}</span>
                        </td>
                        <td className="py-2.5 text-right">
                          <span className="inline-flex items-center justify-center min-w-8 px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 text-xs font-bold">{day.pageviews}</span>
                        </td>
                        <td className="py-2.5 text-right text-xs text-slate-500 hidden sm:table-cell font-medium">{day.visitors > 0 ? (day.pageviews / day.visitors).toFixed(1) : "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-10">
                <svg className="w-10 h-10 mx-auto text-slate-200 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-sm text-slate-400 mb-1">No data yet</p>
                <p className="text-[11px] text-slate-300">Start browsing to track visitors</p>
              </div>
            )}
          </div>
        </div>

        {/* ── footer ── */}
        <div className="mt-8 flex items-center justify-center gap-2 text-[11px] text-slate-300">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>
            Synced to Supabase <code className="bg-slate-100 px-1.5 py-0.5 rounded-md text-slate-400 font-mono text-[10px]">visitor_logs</code>
          </span>
          <span className="text-slate-200">•</span>
          <span>Local fallback enabled</span>
        </div>
      </main>
    </div>
  );
}
