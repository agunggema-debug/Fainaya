import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { fetchLogAktivitas } from "../../../data/pelanggan";
import type { LogAktivitas } from "../../../data/pelanggan";
import Sidebar from "../../../components/admin/Sidebar";
import TopNav from "../../../components/admin/TopNav";

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

/* ───── Tipe Badge ───── */
function TipeBadge({ tipe }: Readonly<{ tipe: LogAktivitas["tipe"] }>) {
  const config: Record<string, { bg: string; text: string; label: string }> = {
    kunjungan: { bg: "bg-blue-50 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-300", label: "Kunjungan" },
    servis: { bg: "bg-amber-50 dark:bg-amber-900/30", text: "text-amber-700 dark:text-amber-300", label: "Servis" },
    transaksi: { bg: "bg-green-50 dark:bg-green-900/30", text: "text-green-700 dark:text-green-300", label: "Transaksi" },
    profil: { bg: "bg-purple-50 dark:bg-purple-900/30", text: "text-purple-700 dark:text-purple-300", label: "Profil" },
    pesanan: { bg: "bg-rose-50 dark:bg-rose-900/30", text: "text-rose-700 dark:text-rose-300", label: "Pesanan" },
  };
  const c = config[tipe];
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${c.bg} ${c.text} ring-1 ring-inset ring-current/10`}>
      {c.label}
    </span>
  );
}

/* ───── Tipe Icon ───── */
function TipeIcon({ tipe }: Readonly<{ tipe: LogAktivitas["tipe"] }>) {
  const paths: Record<string, string> = {
    kunjungan: "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    servis: "M11.42 15.17l-5.58 5.58a2 2 0 01-2.83 0l-.75-.75a2 2 0 010-2.83l5.58-5.58M13.5 2.5l5.58 5.58a2 2 0 010 2.83l-5.58 5.58M7.5 7.5l9 9",
    transaksi: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75",
    profil: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z M4.501 20.118a7.5 7.5 0 0114.998 0",
    pesanan: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  };
  const colors: Record<string, string> = {
    kunjungan: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    servis: "bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
    transaksi: "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    profil: "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    pesanan: "bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400",
  };
  return (
    <div className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${colors[tipe]}`}>
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d={paths[tipe]} />
      </svg>
    </div>
  );
}

type FilterTipe = "semua" | "kunjungan" | "servis" | "transaksi" | "profil" | "pesanan";

const FILTER_OPTIONS: { label: string; value: FilterTipe }[] = [
  { label: "Semua", value: "semua" },
  { label: "Kunjungan", value: "kunjungan" },
  { label: "Servis", value: "servis" },
  { label: "Transaksi", value: "transaksi" },
  { label: "Profil", value: "profil" },
  { label: "Pesanan", value: "pesanan" },
];

export default function LogAktivitas() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filter, setFilter] = useState<FilterTipe>("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [logs, setLogs] = useState<LogAktivitas[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [dataSource, setDataSource] = useState<"supabase" | "local">("local");

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchLogAktivitas();
        setLogs(data);
        setDataSource(data.length > 0 && !data[0].id.startsWith("dummy-") ? "supabase" : "local");
      } finally {
        setDataLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading || dataLoading) {
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

  /* ── Filtering ── */
  const filtered = logs.filter((log) => {
    const matchTipe = filter === "semua" || log.tipe === filter;
    const matchSearch =
      log.pelanggan_nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.deskripsi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.kode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTipe && matchSearch;
  });

  const logCounts = {
    semua: logs.length,
    kunjungan: logs.filter((l) => l.tipe === "kunjungan").length,
    servis: logs.filter((l) => l.tipe === "servis").length,
    transaksi: logs.filter((l) => l.tipe === "transaksi").length,
    profil: logs.filter((l) => l.tipe === "profil").length,
    pesanan: logs.filter((l) => l.tipe === "pesanan").length,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex transition-colors duration-200">
      <Sidebar
        activePath="/admin/pelanggan/aktivitas"
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
                <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Log Aktivitas Pelanggan</h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Riwayat aktivitas yang dilakukan oleh pelanggan dan klien.
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center gap-3">
                <button className="inline-flex items-center gap-2 rounded-lg bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12" />
                  </svg>
                  Export Log
                </button>
              </div>
            </div>

            {/* Stat Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
              {FILTER_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={`rounded-lg p-3 text-center cursor-pointer transition-all ${
                    filter === opt.value
                      ? "bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-500 dark:ring-blue-400"
                      : "bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-gray-800 hover:ring-blue-300 dark:hover:ring-blue-700"
                  }`}
                  onClick={() => setFilter(opt.value)}
                >
                  <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{logCounts[opt.value]}</p>
                  <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400 mt-0.5 truncate">{opt.label}</p>
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                type="text"
                placeholder="Cari berdasarkan nama pelanggan, deskripsi, atau ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm ring-1 ring-gray-200 dark:ring-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
              />
            </div>

            {/* Log Feed */}
            {filtered.length > 0 ? (
              <div className="space-y-3">
                {filtered.map((log) => (
                  <div
                    key={log.id}
                    className="group flex items-start gap-4 rounded-xl bg-white dark:bg-gray-900 p-4 shadow-sm ring-1 ring-gray-200/60 dark:ring-gray-800 hover:shadow-md dark:hover:shadow-gray-900/50 transition-all duration-200"
                  >
                    <TipeIcon tipe={log.tipe} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{log.deskripsi}</p>
                            <TipeBadge tipe={log.tipe} />
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                              {log.pelanggan_nama}
                            </span>
                            <span className="text-[10px] text-gray-400 dark:text-gray-500">
                              {log.kode}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500 whitespace-nowrap shrink-0">
                          {formatTimeAgo(log.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-gray-300 dark:text-gray-600">
                <svg className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm font-medium">Tidak ada log aktivitas</p>
                <p className="text-xs mt-1">Belum ada data untuk filter atau pencarian ini</p>
              </div>
            )}

            {/* Footer */}
            <footer className="mt-10 border-t border-gray-200/60 dark:border-gray-800 pt-6 pb-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                  <span className={`h-1.5 w-1.5 rounded-full ${dataSource === "supabase" ? "bg-green-400" : "bg-yellow-400"}`} />
                  <span>Log aktivitas — {logs.length} total catatan</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-gray-900 px-4 py-2 shadow-sm ring-1 ring-gray-200/60 dark:ring-gray-800 text-xs text-gray-400 dark:text-gray-500">
                  <span className={`h-1.5 w-1.5 rounded-full ${dataSource === "supabase" ? "bg-green-400" : "bg-yellow-400"}`} />
                  <span>{dataSource === "supabase" ? "Terhubung ke Supabase" : "Data lokal (fallback)"}</span>
                  <span className="text-gray-300 dark:text-gray-600">&middot;</span>
                  <span>tabel <code className="font-mono text-gray-500 dark:text-gray-400">log_aktivitas</code></span>
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