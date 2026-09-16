import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { fetchSupabaseTotalStats, fetchSupabaseDailyStats, getLocalTotalStats, getLocalDailyStats } from "../../data/visitorTracker";
import type { DailyStats, PageStats } from "../../data/visitorTracker";
import { MENU_ICONS } from "../../data/adminMenu";
import { SAMPLE_NOTIFICATIONS } from "../../data/notifications";
import { DesktopShell, DesktopSplash } from "../../components/admin/desktop";
import type { DesktopShortcutDef, DesktopWindowDef } from "../../components/admin/desktop";
import { VisitorAreaChart, DailyBarChart, ActiveUsersCard, CustomersDemographicSection } from "../../components/admin/charts";
import { fetchActiveUsersSummary, fetchCustomerDemographics } from "../../data/dashboardPelanggan";
import type { ActiveUsersSummary, CustomerDemographic } from "../../data/dashboardPelanggan";

type DashboardData = {
  totalVisitors: number;
  totalPageviews: number;
  totalDays: number;
  avgVisitorsPerDay: number;
  topPages: PageStats[];
  dailyStats: DailyStats[];
};

type TimeRange = "7d" | "14d" | "30d";

function getRankBadgeClass(idx: number): string {
  if (idx === 0) return "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400";
  if (idx === 1) return "bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400";
  if (idx === 2) return "bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400";
  return "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400";
}

function getProgressBarClass(idx: number): string {
  if (idx === 0) return "bg-gradient-to-r from-indigo-500 to-indigo-400";
  if (idx === 1) return "bg-gradient-to-r from-sky-500 to-sky-400";
  if (idx === 2) return "bg-gradient-to-r from-amber-500 to-amber-400";
  return "bg-gradient-to-r from-gray-400 to-gray-300 dark:from-gray-600 dark:to-gray-500";
}

/* ───── Stat Card ───── */
function StatCard({
  label,
  value,
  icon,
  trend,
  trendUp,
  accent,
}: Readonly<{
  label: string;
  value: number;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  accent?: string;
}>) {
  const gradientClass = accent
    ? `from-${accent}-50 to-${accent}-100 dark:from-${accent}-900/30 dark:to-${accent}-800/20`
    : "from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700";

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-sm ring-1 ring-gray-200/60 dark:ring-gray-800 hover:shadow-lg dark:hover:shadow-gray-900/40 hover:ring-gray-300 dark:hover:ring-gray-700 transition-all duration-300 group">
      {/* accent gradient bar at top */}
      {accent && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent opacity-20" style={{ color: accent }} />
      )}
      <div className="flex items-center justify-between">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradientClass} ring-1 ring-gray-200/50 dark:ring-gray-700 group-hover:scale-110 transition-transform duration-300`}
          style={accent ? { background: `linear-gradient(135deg, ${accent}15, ${accent}08)` } : {}}>
          <div className="text-gray-600 dark:text-gray-300 group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        </div>
        {trend && (
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
              trendUp ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-200/50 dark:ring-emerald-800" : "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 ring-1 ring-red-200/50 dark:ring-red-800"
            }`}
          >
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d={trendUp ? "M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" : "M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181"} />
            </svg>
            {trend}
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">{value.toLocaleString()}</p>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{label}</p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState<DashboardData>(() => getLocalTotalStats());
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([]);
  const [timeRange, setTimeRange] = useState<TimeRange>("14d");
  const [dataLoading, setDataLoading] = useState(true);
  const [dataSource, setDataSource] = useState<"supabase" | "local">("local");
  const [activeUsers, setActiveUsers] = useState<ActiveUsersSummary | null>(null);
  const [customerDemographic, setCustomerDemographic] = useState<CustomerDemographic | null>(null);
  const [pelangganLoading, setPelangganLoading] = useState(true);

  /* ── Data loader visitor: dipakai saat mount & tombol Refresh di toolbar window ── */
  const loadVisitorData = useCallback(async () => {
    try {
      const supabaseData = await fetchSupabaseTotalStats();
      if (supabaseData && supabaseData.totalDays > 0) {
        setData(supabaseData);
        setDailyStats(supabaseData.dailyStats);
        setDataSource("supabase");
      } else {
        const localData = getLocalTotalStats();
        setData(localData);
        setDailyStats(localData.dailyStats);
        setDataSource("local");
      }
    } catch {
      const localData = getLocalTotalStats();
      setData(localData);
      setDailyStats(localData.dailyStats);
      setDataSource("local");
    }

    setDataLoading(false);
  }, []);

  /* ── Data loader pelanggan: active users & demografi ── */
  const loadPelangganData = useCallback(async () => {
    try {
      const [active, demo] = await Promise.all([
        fetchActiveUsersSummary(),
        fetchCustomerDemographics(),
      ]);
      setActiveUsers(active);
      setCustomerDemographic(demo);
    } catch {
      // fallback already handled inside fetch functions
    }
    setPelangganLoading(false);
  }, []);

  useEffect(() => {
    async function loadAll() {
      await loadVisitorData();
      await loadPelangganData();
    }
    loadAll();
  }, [loadVisitorData, loadPelangganData]);

  const getDaysFromRange = (range: TimeRange): number => {
    if (range === "7d") return 7;
    if (range === "14d") return 14;
    return 30;
  };

  const handleTimeChange = async (range: TimeRange) => {
    setTimeRange(range);
    const days = getDaysFromRange(range);
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

  if (loading || dataLoading) {
    return <DesktopSplash detail="Menyiapkan window, taskbar, dan data visitor..." />;
  }

  if (!user) {
    navigate("/?login=required");
    return null;
  }

  const doLogout = () => {
    logout();
    navigate("/");
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleSearch = (query: string) => {
    console.log("Search:", query);
  };

  /* Tombol Refresh pada toolbar window (Ext style) */
  const handleRefresh = () => {
    loadVisitorData();
    loadPelangganData();
  };

  /* Tombol Export pada toolbar window: unduh data harian sebagai CSV */
  const handleExport = () => {
    if (dailyStats.length === 0) return;
    const rows = [
      ["date", "visitors", "pageviews"],
      ...dailyStats.map((day) => [day.date, String(day.visitors), String(day.pageviews)]),
    ];
    const csv = rows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `fainaya-visitor-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const totalVisitorsTrend = dailyStats.length >= 7
    ? ((dailyStats.slice(-7).reduce((a, b) => a + b.visitors, 0) / 7).toFixed(1))
    : null;

  const pageLabels: Record<string, string> = {
    "/": "Homepage",
    "/#home": "Homepage",
    "/#services": "Services",
    "/#about": "About",
    "/#contact": "Contact",
  };

  function renderStatsGrid() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard
          label="Total Visitors"
          value={data.totalVisitors}
          trend={totalVisitorsTrend ? `+${totalVisitorsTrend}/day` : undefined}
          trendUp={true}
          accent="#6366f1"
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
          }
        />
        <StatCard
          label="Total Pageviews"
          value={data.totalPageviews}
          trend="+12.3%"
          trendUp={true}
          accent="#f97316"
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
        />
        <StatCard
          label="Avg / Day"
          value={data.avgVisitorsPerDay}
          accent="#8b5cf6"
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
          }
        />
        <StatCard
          label="Active Days"
          value={data.totalDays}
          accent="#06b6d4"
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
          }
        />
      </div>
    );
  }

  function renderCharts() {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Area Chart: Visitors & Pageviews over time */}
        <div className="rounded-xl bg-white dark:bg-gray-900 p-6 shadow-sm ring-1 ring-gray-200/60 dark:ring-gray-800 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Visitor Analytics</h2>
              <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">Visitors & Pageviews over time</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-indigo-500" />
              <span>Visitors</span>
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-orange-500 ml-2" />
              <span>Pageviews</span>
            </div>
          </div>
          <VisitorAreaChart data={dailyStats} />
        </div>

        {/* Bar Chart: Daily comparison */}
        <div className="rounded-xl bg-white dark:bg-gray-900 p-6 shadow-sm ring-1 ring-gray-200/60 dark:ring-gray-800 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Daily Comparison</h2>
              <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">Bar chart per-day breakdown</p>
            </div>
          </div>
          <DailyBarChart data={dailyStats} />
        </div>
      </div>
    );
  }

  function renderTopPages() {
    return (
      <div className="lg:col-span-1">
        <div className="rounded-xl bg-white dark:bg-gray-900 p-6 shadow-sm ring-1 ring-gray-200/60 dark:ring-gray-800 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Top Pages</h2>
            <span className="rounded-full bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:text-gray-400">
              {data.topPages.length} pages
            </span>
          </div>
          {data.topPages.length > 0 ? (
            <div className="space-y-4">
              {data.topPages.slice(0, 5).map((page, idx) => {
                const maxCount = data.topPages[0].count;
                const percentage = Math.round((page.count / maxCount) * 100);
                const rankBadgeClass = getRankBadgeClass(idx);
                const progressBarClass = getProgressBarClass(idx);
                return (
                  <div key={page.page_path}>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={`text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center ${rankBadgeClass}`}>
                          {idx + 1}
                        </span>
                        <span className="font-medium text-gray-700 dark:text-gray-300 truncate">{pageLabels[page.page_path] || page.page_path || "Home"}</span>
                      </div>
                      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{page.count}</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ease-out ${progressBarClass}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center py-8 text-gray-300 dark:text-gray-600">
              <svg className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <p className="text-xs font-medium">No pages yet</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  function renderDailyBreakdown() {
    return (
      <div className="lg:col-span-2">
        <div className="rounded-xl bg-white dark:bg-gray-900 shadow-sm ring-1 ring-gray-200/60 dark:ring-gray-800">
          <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800">
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">Daily Breakdown</h2>
            <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">Detailed daily visitor statistics</p>
          </div>
          {dailyStats.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-50 dark:border-gray-800/50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Visitors</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Pageviews</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">Ratio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                  {[...dailyStats].reverse().slice(0, 10).map((day, idx) => (
                    <tr key={day.date} className={`hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors ${idx === 0 ? "bg-indigo-50/20 dark:bg-indigo-900/10" : ""}`}>
                      <td className="px-6 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {idx === 0 && <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />}
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {new Date(day.date + "T00:00:00").toLocaleDateString("en", { weekday: "short", month: "short", day: "numeric" })}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-3.5 whitespace-nowrap text-right">
                        <span className="inline-flex items-center rounded-full bg-indigo-50 dark:bg-indigo-900/30 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300 ring-1 ring-inset ring-indigo-700/10 dark:ring-indigo-700/30">
                          {day.visitors}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 whitespace-nowrap text-right">
                        <span className="inline-flex items-center rounded-full bg-orange-50 dark:bg-orange-900/30 px-2.5 py-0.5 text-xs font-semibold text-orange-700 dark:text-orange-300 ring-1 ring-inset ring-orange-700/10 dark:ring-orange-700/30">
                          {day.pageviews}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400 hidden sm:table-cell">
                        {day.visitors > 0 ? (day.pageviews / day.visitors).toFixed(1) : "\u2014"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center py-12 text-gray-300 dark:text-gray-600">
              <svg className="h-10 w-10 mb-3" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
              </svg>
              <p className="text-sm font-medium">No data yet</p>
              <p className="text-xs mt-1">Start browsing to track visitors</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  function renderFooter() {
    const currentYear = new Date().getFullYear();
    return (
      <footer className="mt-10 border-t border-gray-200/60 dark:border-gray-800 pt-6 pb-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* System Status */}
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/20 ring-1 ring-indigo-200/50 dark:ring-indigo-800">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-400/10 to-transparent dark:from-indigo-600/10" />
              <svg className="h-5 w-5 text-indigo-600 dark:text-indigo-400 relative" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">System Status</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                <p className="text-[11px] text-gray-400 dark:text-gray-500">All systems operational</p>
              </div>
            </div>
          </div>

          {/* Data Source */}
          <div className="inline-flex items-center gap-2.5 rounded-xl bg-white dark:bg-gray-900 px-5 py-2.5 shadow-sm ring-1 ring-gray-200/60 dark:ring-gray-800">
            <div className={`h-2 w-2 rounded-full ${dataSource === "supabase" ? "bg-emerald-400" : "bg-amber-400"} shadow-sm`} />
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              {dataSource === "supabase" ? "Connected to Supabase" : "Using local fallback"}
            </span>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <code className="text-[11px] font-mono text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800 px-1.5 py-0.5 rounded">visitor_logs</code>
          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-400 dark:text-gray-500">
            &copy; {currentYear} Fainaya Service & Art. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }

  /* ── Toolbar window "Visitor Analytics" (tombol Ext style) ── */
  const analyticsToolbar = (
    <>
      <div className="flex items-center gap-1">
        <span className="mr-1 text-[10px] tracking-wide text-[#5b7597] uppercase dark:text-gray-400">
          Rentang
        </span>
        {(["7d", "14d", "30d"] as const).map((range) => (
          <button
            key={range}
            type="button"
            className={`ext-btn ${timeRange === range ? "ext-btn-active" : ""}`}
            onClick={() => handleTimeChange(range)}
          >
            {range}
          </button>
        ))}
      </div>
      <span className="ext-toolbar-divider h-5" />
      <button type="button" className="ext-btn" onClick={handleRefresh}>
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d={MENU_ICONS.refresh} />
        </svg>
        Refresh
      </button>
      <button type="button" className="ext-btn" onClick={handleExport}>
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d={MENU_ICONS.download} />
        </svg>
        Export CSV
      </button>
      <span className="ml-auto text-[10px] text-[#5d7ea6] dark:text-gray-400">
        {dataSource === "supabase" ? "Sumber: Supabase (visitor_logs)" : "Sumber: data lokal (fallback)"}
      </span>
    </>
  );

  /* ── Isi window "Visitor Analytics" ── */
  const analyticsContent = (
    <>
      <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        Visitor analytics mencakup data dari seluruh pengunjung website, baik yang sudah login maupun belum
        {" "}(rentang {timeRange}).
      </p>
      {renderStatsGrid()}
      {renderCharts()}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {renderTopPages()}
        {renderDailyBreakdown()}
      </div>

      {/* Footer: status sistem, sumber data & copyright */}
      {renderFooter()}
    </>
  );

/* ── Isi window "Pelanggan & Demografi" ── */
  const pelangganContent = pelangganLoading ? (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
      <div className="animate-pulse rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200/60 dark:bg-gray-900 dark:ring-gray-800">
        <div className="mb-4 h-4 w-28 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="mb-5 h-3 w-44 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="mb-5 grid grid-cols-2 gap-4">
          <div className="h-24 rounded-xl bg-gray-100 dark:bg-gray-800" />
          <div className="h-24 rounded-xl bg-gray-100 dark:bg-gray-800" />
        </div>
        <div className="mb-5 h-10 rounded-lg bg-gray-100 dark:bg-gray-800" />
        <div className="mb-5 h-10 rounded-lg bg-gray-100 dark:bg-gray-800" />
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-5 rounded bg-gray-100 dark:bg-gray-800" />
          ))}
        </div>
      </div>
      <div className="animate-pulse rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200/60 dark:bg-gray-900 dark:ring-gray-800">
        <div className="mb-4 h-4 w-36 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="mb-5 h-3 w-52 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="mb-5 h-28 rounded-lg bg-gray-100 dark:bg-gray-800" />
        <div className="h-28 rounded-lg bg-gray-100 dark:bg-gray-800" />
      </div>
    </div>
  ) : activeUsers && customerDemographic ? (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
      <ActiveUsersCard data={activeUsers} />
      <CustomersDemographicSection data={customerDemographic} />
    </div>
  ) : null;

  /* ── Isi window "Notifikasi & Chat Masuk" ── */
  const notificationsContent = (
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

  /* ── Definisi window desktop ── */
  const desktopWindows: DesktopWindowDef[] = [
    {
      id: "analytics",
      title: "Fainaya Dashboard — Visitor Analytics",
      icon: MENU_ICONS.dashboard,
      path: "/admin/dashboard",
      openByDefault: true,
      quickLaunch: true,
      defaultSize: { width: 1120, height: 620 },
      minSize: { width: 420, height: 260 },
      toolbar: analyticsToolbar,
      statusText: `${dataSource === "supabase" ? "Connected to Supabase" : "Using local fallback"} · visitor_logs`,
      content: analyticsContent,
    },
    {
      id: "pelanggan",
      title: "Pelanggan & Demografi",
      icon: MENU_ICONS.users,
      quickLaunch: true,
      defaultSize: { width: 900, height: 560 },
      minSize: { width: 380, height: 240 },
      statusText: pelangganLoading ? "Memuat data pelanggan..." : "Active users & demografi pelanggan",
      content: pelangganContent,
    },
    {
      id: "notifikasi",
      title: "Notifikasi & Chat Masuk",
      icon: MENU_ICONS.bell,
      path: "/admin/notifikasi",
      defaultSize: { width: 540, height: 440 },
      minSize: { width: 340, height: 220 },
      statusText: `${SAMPLE_NOTIFICATIONS.filter((notif) => notif.unread).length} notifikasi belum dibaca`,
      content: notificationsContent,
    },
  ];

  /* ── Ikon shortcut di area desktop (klik 2x untuk membuka) ── */
  const desktopShortcuts: DesktopShortcutDef[] = [
    { id: "shortcut-analytics", label: "Visitor Analytics", icon: MENU_ICONS.chart, windowId: "analytics" },
    { id: "shortcut-pelanggan", label: "Pelanggan", icon: MENU_ICONS.users, windowId: "pelanggan" },
    { id: "shortcut-notifikasi", label: "Notifikasi", icon: MENU_ICONS.bell, windowId: "notifikasi" },
    {
      id: "shortcut-aktivitas",
      label: "Aktivitas Terkini",
      icon: MENU_ICONS.clipboard,
      path: "/admin/dashboard/aktivitas",
    },
    {
      id: "shortcut-daftar-pelanggan",
      label: "Daftar Pelanggan",
      icon: MENU_ICONS.collection,
      path: "/admin/pelanggan",
    },
    { id: "shortcut-blog", label: "Blog / Artikel", icon: MENU_ICONS.blog, path: "/admin/blog" },
    {
      id: "shortcut-servis",
      label: "Servis & Perbaikan",
      icon: MENU_ICONS.wrench,
      path: "/admin/servis/antrean",
    },
    { id: "shortcut-desain", label: "Proyek Desain", icon: MENU_ICONS.paintbrush, path: "/admin/desain/brief" },
  ];

  return (
    <DesktopShell
      userEmail={user.email ?? ""}
      activePath="/admin/dashboard"
      shortcuts={desktopShortcuts}
      windows={desktopWindows}
      onNavigate={handleNavigate}
      onSearch={handleSearch}
      onLogout={doLogout}
    />
  );
}