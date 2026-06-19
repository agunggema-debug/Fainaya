import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Sidebar from "../../components/admin/Sidebar";
import TopNav from "../../components/admin/TopNav";

type ActivityItem = {
  id: string;
  type: "pageview" | "visitor" | "service" | "project" | "order";
  label: string;
  description: string;
  timestamp: string;
  icon: "eye" | "user" | "wrench" | "brush" | "box";
};

/* ───── Activity Icon ───── */
function ActivityIcon({ icon }: Readonly<{ icon: ActivityItem["icon"] }>) {
  const paths: Record<string, string> = {
    eye: "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    user: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z M4.501 20.118a7.5 7.5 0 0114.998 0",
    wrench: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
    brush: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
    box: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  };

  const colors: Record<string, string> = {
    eye: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    user: "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    wrench: "bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
    brush: "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    box: "bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400",
  };

  return (
    <div className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${colors[icon]}`}>
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d={paths[icon]} />
      </svg>
    </div>
  );
}

/* ───── Generate dummy activities ───── */
function generateActivities(): ActivityItem[] {
  const now = Date.now();
  const activities: ActivityItem[] = [
    { id: "a1", type: "pageview", label: "Halaman Beranda dikunjungi", description: "Pengunjung dari direct source membuka halaman utama", timestamp: new Date(now - 2 * 60000).toISOString(), icon: "eye" },
    { id: "a2", type: "pageview", label: "Layanan IT dilihat", description: "Pengunjung melihat halaman layanan IT support", timestamp: new Date(now - 5 * 60000).toISOString(), icon: "eye" },
    { id: "a3", type: "visitor", label: "Pelanggan baru mendaftar", description: "Budi Santoso — budi@email.com", timestamp: new Date(now - 10 * 60000).toISOString(), icon: "user" },
    { id: "a4", type: "service", label: "Servis baru masuk antrean", description: "Service ID: SRV-2026-042 — Printer Epson L3110 — Error lampu berkedip", timestamp: new Date(now - 20 * 60000).toISOString(), icon: "wrench" },
    { id: "a5", type: "service", label: "Proses perbaikan selesai", description: "Service ID: SRV-2026-039 — PC Dell Optiplex — Ganti SSD berhasil", timestamp: new Date(now - 45 * 60000).toISOString(), icon: "wrench" },
    { id: "a6", type: "project", label: "Brief desain baru masuk", description: "Proyek: Desain Logo UMKM — Klien: Warung Makan Sari Rasa", timestamp: new Date(now - 60 * 60000).toISOString(), icon: "brush" },
    { id: "a7", type: "project", label: "Revisi desain selesai", description: "Proyek: Banner Promosi — Revisi ke-3 telah disetujui klien", timestamp: new Date(now - 90 * 60000).toISOString(), icon: "brush" },
    { id: "a8", type: "order", label: "Pesanan kreasi tangan baru", description: "Item: Gantungan Kunci Custom — Jumlah: 50 pcs — Deadline: 3 hari", timestamp: new Date(now - 120 * 60000).toISOString(), icon: "box" },
    { id: "a9", type: "pageview", label: "Halaman Kontak dikunjungi", description: "Pengunjung dari Google Search membuka halaman kontak", timestamp: new Date(now - 150 * 60000).toISOString(), icon: "eye" },
    { id: "a10", type: "visitor", label: "Pelanggan update profil", description: "Siti Nurhaliza — Mengubah alamat dan nomor telepon", timestamp: new Date(now - 180 * 60000).toISOString(), icon: "user" },
    { id: "a11", type: "service", label: "Sparepart masuk inventaris", description: "Tinta Printer Epson 664 — Qty: 10 pcs — Supplier: PT Sinar Jaya", timestamp: new Date(now - 240 * 60000).toISOString(), icon: "wrench" },
    { id: "a12", type: "pageview", label: "Galeri Portofolio dikunjungi", description: "Calon klien melihat portofolio desain dari halaman galeri", timestamp: new Date(now - 300 * 60000).toISOString(), icon: "eye" },
  ];
  return activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

/* ───── Format timestamp ───── */
function formatTimeAgo(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "Baru saja";
  if (minutes < 60) return `${minutes} menit lalu`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.floor(hours / 24);
  return `${days} hari lalu`;
}

/* ───── Filter Badge ───── */
function FilterBadge({
  label,
  active,
  onClick,
}: Readonly<{ label: string; active: boolean; onClick: () => void }>) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
        active
          ? "bg-blue-600 text-white shadow-sm"
          : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 ring-1 ring-gray-200 dark:ring-gray-700 hover:ring-blue-300 dark:hover:ring-blue-700"
      }`}
    >
      {label}
    </button>
  );
}

type FilterType = "all" | "pageview" | "visitor" | "service" | "project" | "order";

const FILTER_OPTIONS: { label: string; value: FilterType }[] = [
  { label: "Semua", value: "all" },
  { label: "Kunjungan", value: "pageview" },
  { label: "Pelanggan", value: "visitor" },
  { label: "Servis", value: "service" },
  { label: "Desain", value: "project" },
  { label: "Pesanan", value: "order" },
];

export default function AktivitasTerkini() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filter, setFilter] = useState<FilterType>("all");
  const [activities, setActivities] = useState<ActivityItem[]>(() => generateActivities());

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 dark:border-gray-700 border-t-gray-600 dark:border-t-gray-300" />
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

  const filteredActivities = filter === "all" ? activities : activities.filter((a) => a.type === filter);

  const activityCounts = {
    all: activities.length,
    pageview: activities.filter((a) => a.type === "pageview").length,
    visitor: activities.filter((a) => a.type === "visitor").length,
    service: activities.filter((a) => a.type === "service").length,
    project: activities.filter((a) => a.type === "project").length,
    order: activities.filter((a) => a.type === "order").length,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex transition-colors duration-200">
      <Sidebar
        activePath="/admin/dashboard/aktivitas"
        onNavigate={handleNavigate}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <TopNav
          userEmail={user.email ?? ""}
          onSearch={handleSearch}
          onLogout={doLogout}
          onNavigate={handleNavigate}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
            {/* Page Header */}
            <div className="sm:flex sm:items-center sm:justify-between mb-8">
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Aktivitas Terkini</h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Pantau semua aktivitas terbaru di seluruh layanan Fainaya.
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <button
                  onClick={() => setActivities(generateActivities())}
                  className="inline-flex items-center gap-2 rounded-lg bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                  </svg>
                  Refresh
                </button>
              </div>
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap gap-2 mb-6">
              {FILTER_OPTIONS.map((opt) => (
                <FilterBadge
                  key={opt.value}
                  label={`${opt.label} (${activityCounts[opt.value]})`}
                  active={filter === opt.value}
                  onClick={() => setFilter(opt.value)}
                />
              ))}
            </div>

            {/* Stat Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
              {FILTER_OPTIONS.map((opt) => (
                <div
                  key={opt.value}
                  className={`rounded-lg p-3 text-center cursor-pointer transition-all ${
                    filter === opt.value
                      ? "bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-500 dark:ring-blue-400"
                      : "bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-gray-800 hover:ring-blue-300 dark:hover:ring-blue-700"
                  }`}
                  onClick={() => setFilter(opt.value)}
                >
                  <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{activityCounts[opt.value]}</p>
                  <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400 mt-0.5 truncate">{opt.label}</p>
                </div>
              ))}
            </div>

            {/* Activity Feed */}
            {filteredActivities.length > 0 ? (
              <div className="space-y-3">
                {filteredActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="group flex items-start gap-4 rounded-xl bg-white dark:bg-gray-900 p-4 shadow-sm ring-1 ring-gray-200/60 dark:ring-gray-800 hover:shadow-md dark:hover:shadow-gray-900/50 transition-all duration-200"
                  >
                    <ActivityIcon icon={activity.icon} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{activity.label}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{activity.description}</p>
                        </div>
                        <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500 whitespace-nowrap shrink-0">
                          {formatTimeAgo(activity.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-gray-300 dark:text-gray-600">
                <svg className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                </svg>
                <p className="text-sm font-medium">Tidak ada aktivitas</p>
                <p className="text-xs mt-1">Belum ada data untuk filter ini</p>
              </div>
            )}

            {/* Footer */}
            <footer className="mt-10 border-t border-gray-200/60 dark:border-gray-800 pt-6 pb-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  <span>Real-time updates — menampilkan 12 aktivitas terbaru</span>
                </div>
                <p className="text-[11px] text-gray-400 dark:text-gray-500">
                  &copy; {new Date().getFullYear()} Fainaya Service & Art. All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}