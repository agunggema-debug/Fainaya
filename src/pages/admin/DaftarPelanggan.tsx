import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { fetchPelanggan } from "../../data/pelanggan";
import type { Pelanggan } from "../../data/pelanggan";
import Sidebar from "../../components/admin/Sidebar";
import TopNav from "../../components/admin/TopNav";

/* ───── Status Badge ───── */
function StatusBadge({ status }: Readonly<{ status: Pelanggan["status"] }>) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
        status === "aktif"
          ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 ring-1 ring-inset ring-green-600/20 dark:ring-green-500/30"
          : "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 ring-1 ring-inset ring-red-600/20 dark:ring-red-500/30"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${status === "aktif" ? "bg-green-500" : "bg-red-500"}`} />
      {status === "aktif" ? "Aktif" : "Nonaktif"}
    </span>
  );
}

/* ───── Stat Card ───── */
function StatCard({
  label,
  value,
  icon,
}: Readonly<{
  label: string;
  value: number | string;
  icon: React.ReactNode;
}>) {
  return (
    <div className="rounded-xl bg-white dark:bg-gray-900 p-5 shadow-sm ring-1 ring-gray-200/60 dark:ring-gray-800">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 ring-1 ring-blue-200/50 dark:ring-blue-800">
          {icon}
        </div>
        <div>
          <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{value.toLocaleString()}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        </div>
      </div>
    </div>
  );
}

export default function DaftarPelanggan() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"semua" | "aktif" | "nonaktif">("semua");
  const [pelanggan, setPelanggan] = useState<Pelanggan[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchPelanggan();
        setPelanggan(data);
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
  const filtered = pelanggan.filter((p) => {
    const matchSearch =
      p.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.telepon.includes(searchQuery) ||
      p.kode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === "semua" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalAktif = pelanggan.filter((p) => p.status === "aktif").length;
  const totalNonaktif = pelanggan.filter((p) => p.status === "nonaktif").length;
  const totalTransaksi = pelanggan.reduce((sum, p) => sum + p.total_transaksi, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex transition-colors duration-200">
      <Sidebar
        activePath="/admin/pelanggan"
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
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            {/* Page Header */}
            <div className="sm:flex sm:items-center sm:justify-between mb-8">
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Daftar Pelanggan</h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Kelola data pelanggan dan klien Fainaya.
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center gap-3">
                <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Tambah Pelanggan
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard
                label="Total Pelanggan"
                value={pelanggan.length}
                icon={
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                }
              />
              <StatCard
                label="Aktif"
                value={totalAktif}
                icon={
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              />
              <StatCard
                label="Nonaktif"
                value={totalNonaktif}
                icon={
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              />
              <StatCard
                label="Total Transaksi"
                value={totalTransaksi}
                icon={
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                  </svg>
                }
              />
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
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
                  placeholder="Cari pelanggan (nama, email, telepon, ID)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm ring-1 ring-gray-200 dark:ring-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
                />
              </div>
              <div className="flex rounded-lg bg-gray-100 dark:bg-gray-800 p-0.5 self-start">
                {(["semua", "aktif", "nonaktif"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                      statusFilter === s
                        ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    }`}
                  >
                    {s === "semua" ? "Semua" : s === "aktif" ? "Aktif" : "Nonaktif"}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="rounded-xl bg-white dark:bg-gray-900 shadow-sm ring-1 ring-gray-200/60 dark:ring-gray-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
                      <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
                      <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nama</th>
                      <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">Email</th>
                      <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">Telepon</th>
                      <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">Bergabung</th>
                      <th className="px-5 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="px-5 py-3.5 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">Transaksi</th>
                      <th className="px-5 py-3.5 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                    {filtered.length > 0 ? (
                      filtered.map((p) => (
                        <tr
                          key={p.id}
                          className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
                        >
                          <td className="px-5 py-4 whitespace-nowrap">
                            <span className="text-xs font-mono font-medium text-gray-500 dark:text-gray-400">{p.kode}</span>
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                                {p.nama.charAt(0)}
                              </div>
                              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{p.nama}</span>
                            </div>
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap hidden sm:table-cell">
                            <span className="text-sm text-gray-600 dark:text-gray-400">{p.email}</span>
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap hidden md:table-cell">
                            <span className="text-sm text-gray-600 dark:text-gray-400">{p.telepon}</span>
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap hidden lg:table-cell">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {new Date(p.bergabung + "T00:00:00").toLocaleDateString("id", { day: "numeric", month: "short", year: "numeric" })}
                            </span>
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap">
                            <StatusBadge status={p.status} />
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap text-right hidden md:table-cell">
                            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{p.total_transaksi}</span>
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap text-right">
                            <button className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors">
                              Detail
                              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="px-5 py-16 text-center">
                          <div className="flex flex-col items-center text-gray-300 dark:text-gray-600">
                            <svg className="h-12 w-12 mb-3" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                            </svg>
                            <p className="text-sm font-medium">Tidak ada pelanggan ditemukan</p>
                            <p className="text-xs mt-1">Coba ubah kata kunci pencarian atau filter</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {/* Table Footer */}
              <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Menampilkan <span className="font-medium text-gray-600 dark:text-gray-300">{filtered.length}</span> dari <span className="font-medium text-gray-600 dark:text-gray-300">{pelanggan.length}</span> pelanggan
                </p>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 text-xs font-medium rounded-md bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 ring-1 ring-gray-200 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50" disabled>
                    Sebelumnya
                  </button>
                  <button className="px-3 py-1.5 text-xs font-medium rounded-md bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 ring-1 ring-gray-200 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50" disabled>
                    Selanjutnya
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <footer className="mt-10 border-t border-gray-200/60 dark:border-gray-800 pt-6 pb-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  <span>Data pelanggan — {pelanggan.length} total terdaftar</span>
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