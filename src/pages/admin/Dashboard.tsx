import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { fetchSupabaseTotalStats, fetchSupabaseDailyStats, getLocalTotalStats, getLocalDailyStats } from "../../data/visitorTracker";
import type { DailyStats, PageStats } from "../../data/visitorTracker";
import Sidebar from "../../components/admin/Sidebar";
import TopNav from "../../components/admin/TopNav";
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [dataSource, setDataSource] = useState<"supabase" | "local">("local");
  const [activeUsers, setActiveUsers] = useState<ActiveUsersSummary | null>(null);
  const [customerDemographic, setCustomerDemographic] = useState<CustomerDemographic | null>(null);
  const [pelangganLoading, setPelangganLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
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
    }
    loadData();

    // Load pelanggan dashboard data (active users & demographics)
    async function loadPelangganData() {
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
    }
    loadPelangganData();
  }, []);

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
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-gray-200 dark:border-gray-700 border-t-indigo-500 dark:border-t-indigo-400" />
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Loading dashboard...</p>
      </div>
    );
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex transition-colors duration-200">
      {/* Sidebar */}
      <Sidebar
        activePath="/admin/dashboard"
        onNavigate={handleNavigate}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopNav
          userEmail={user.email ?? ""}
          onSearch={handleSearch}
          onLogout={doLogout}
          onNavigate={handleNavigate}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">

            {/* Page Header */}
            <div className="sm:flex sm:items-center sm:justify-between mb-8">
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Dashboard</h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Visitor analytics mencakup data dari seluruh pengunjung website, baik yang sudah login maupun belum.
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center gap-3">
                <div className="flex rounded-lg bg-gray-100 dark:bg-gray-800 p-0.5 ring-1 ring-gray-200/50 dark:ring-gray-700">
                  {(["7d", "14d", "30d"] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => handleTimeChange(r)}
                      className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                        timeRange === r
                          ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
                          : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
                <button className="inline-flex items-center gap-2 rounded-lg bg-gray-900 dark:bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 dark:hover:bg-blue-700 transition-colors">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Export
                </button>
              </div>
            </div>

            {renderStatsGrid()}

            {/* Charts: Visitor Analytics & Daily Comparison */}
            {renderCharts()}

            {/* Bottom Grid: Top Pages + Daily Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {renderTopPages()}
              {renderDailyBreakdown()}
            </div>

            {/* ── Active Users & Customers Demographic ── */}
            {pelangganLoading ? (
              <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="rounded-xl bg-white dark:bg-gray-900 p-6 shadow-sm ring-1 ring-gray-200/60 dark:ring-gray-800 animate-pulse">
                  <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
                  <div className="h-3 w-44 bg-gray-200 dark:bg-gray-700 rounded mb-5" />
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="h-24 bg-gray-100 dark:bg-gray-800 rounded-xl" />
                    <div className="h-24 bg-gray-100 dark:bg-gray-800 rounded-xl" />
                  </div>
                  <div className="h-10 bg-gray-100 dark:bg-gray-800 rounded-lg mb-5" />
                  <div className="h-10 bg-gray-100 dark:bg-gray-800 rounded-lg mb-5" />
                  <div className="space-y-2">
                    {[1,2,3,4,5].map(i => <div key={i} className="h-5 bg-gray-100 dark:bg-gray-800 rounded" />)}
                  </div>
                </div>
                <div className="rounded-xl bg-white dark:bg-gray-900 p-6 shadow-sm ring-1 ring-gray-200/60 dark:ring-gray-800 animate-pulse">
                  <div className="h-4 w-36 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
                  <div className="h-3 w-52 bg-gray-200 dark:bg-gray-700 rounded mb-5" />
                  <div className="h-28 bg-gray-100 dark:bg-gray-800 rounded-lg mb-5" />
                  <div className="h-28 bg-gray-100 dark:bg-gray-800 rounded-lg" />
                </div>
              </div>
            ) : (
              activeUsers && customerDemographic && (
                <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <ActiveUsersCard data={activeUsers} />
                  <CustomersDemographicSection data={customerDemographic} />
                </div>
              )
            )}

            {/* Footer */}
            {renderFooter()}
          </div>
        </main>
      </div>
    </div>
  );
}