import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  AdminDesktopPage,
  DesktopSplash,
  ExtButton,
  ExtIcon,
  ExtToolbar,
  ExtToolbarInfo,
  datedFilename,
  downloadCsv,
} from "../../components/admin/desktop";
import { MENU_ICONS } from "../../data/adminMenu";
import { fetchAdminRows, findDatasetByPath } from "../../data/adminModules";
import type { AdminColumnType, AdminDataset, AdminDatasetPath, AdminRow } from "../../data/adminModules";

type ModulAdminProps = {
  /** route aktif, harus salah satu paths pada ADMIN_DATASETS */
  path: string;
};

/** Format nilai sel sesuai tipe kolom. */
function formatValue(value: string | number, type?: AdminColumnType): string {
  if (value === null || value === undefined || value === "") return "-";
  switch (type) {
    case "currency":
      return `Rp ${Number(value).toLocaleString("id-ID")}`;
    case "number":
      return Number(value).toLocaleString("id-ID");
    case "date": {
      const date = new Date(String(value));
      if (Number.isNaN(date.getTime())) return String(value);
      return date.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
    }
    case "datetime": {
      const date = new Date(String(value));
      if (Number.isNaN(date.getTime())) return String(value);
      return date.toLocaleString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    default:
      return String(value);
  }
}

/** Hitung jumlah baris per nilai kolom status (untuk kartu ringkasan). */
function summarize(rows: AdminRow[], statusColumn?: string): { label: string; count: number }[] {
  if (!statusColumn) return [];
  const counts = new Map<string, number>();
  for (const row of rows) {
    const key = String(row[statusColumn] ?? "-");
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return [...counts.entries()].map(([label, count]) => ({ label, count }));
}

/** Terapkan filter dataset (mis. tahap = Antrean) + pencarian global. */
function applyFilters(rows: AdminRow[], datasetPath: AdminDatasetPath, search: string): AdminRow[] {
  const query = search.trim().toLowerCase();
  return rows.filter((row) => {
    if (datasetPath.filter && !datasetPath.filter.values.includes(String(row[datasetPath.filter.column] ?? ""))) {
      return false;
    }
    if (!query) return true;
    return Object.values(row).some((value) => String(value ?? "").toLowerCase().includes(query));
  });
}

function Badge({ value, dataset }: Readonly<{ value: string | number; dataset: AdminDataset }>) {
  const colorClass =
    dataset.badgeColors?.[String(value)] ??
    "bg-gray-100 text-gray-600 ring-1 ring-inset ring-gray-400/20 dark:bg-gray-800 dark:text-gray-300";
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ${colorClass}`}
    >
      {String(value)}
    </span>
  );
}

/**
 * Halaman admin generik untuk modul yang belum punya UI khusus
 * (servis, maintenance, development, desain, kreasi, inventaris, keuangan,
 * integrasi, pengaturan, admin, log sistem, notifikasi).
 *
 * Data diambil dari tabel Supabase terkait; bila tabel kosong/belum siap,
 * dipakai data sampel dari src/data/adminModules.ts.
 */
export default function ModulAdmin({ path }: Readonly<ModulAdminProps>) {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const found = useMemo(() => findDatasetByPath(path), [path]);
  const dataset = found?.dataset;
  const datasetPath = found?.datasetPath;
  const datasetId = dataset?.id;

  const [rows, setRows] = useState<AdminRow[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [dataSource, setDataSource] = useState<"supabase" | "local">("local");
  const [search, setSearch] = useState("");

  const loadData = useCallback(async () => {
    if (!datasetId) {
      setDataLoading(false);
      return;
    }
    const result = await fetchAdminRows(datasetId);
    setRows(result.rows);
    setDataSource(result.source);
    setDataLoading(false);
  }, [datasetId]);

  useEffect(() => {
    async function loadAll() {
      await loadData();
    }
    loadAll();
  }, [loadData]);

  const filtered = useMemo(
    () => (dataset && datasetPath ? applyFilters(rows, datasetPath, search) : []),
    [rows, dataset, datasetPath, search],
  );
  const summary = useMemo(() => summarize(filtered, dataset?.statusColumn), [filtered, dataset]);

  if (loading || dataLoading) {
    return <DesktopSplash detail={dataset ? `Memuat data tabel ${dataset.table}...` : "Menyiapkan modul..."} />;
  }

  if (!user) {
    navigate("/?login=required");
    return null;
  }

  const doLogout = () => {
    logout();
    navigate("/");
  };

  const handleNavigate = (target: string) => navigate(target);

  const handleSearch = (query: string) => setSearch(query);

  if (!dataset || !datasetPath) {
    return (
      <AdminDesktopPage
        userEmail={user.email ?? ""}
        activePath="/admin/notifikasi"
        title="Modul tidak ditemukan"
        icon={MENU_ICONS.info}
        statusText={`Route ${path} belum terdaftar pada ADMIN_DATASETS`}
        onNavigate={handleNavigate}
        onSearch={handleSearch}
        onLogout={doLogout}
      >
        <div className="mx-auto max-w-xl py-10 text-center">
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            Modul untuk route <code className="font-mono">{path}</code> belum terdaftar.
          </p>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Tambahkan dataset baru di <code className="font-mono">src/data/adminModules.ts</code> lalu daftarkan
            route-nya di <code className="font-mono">src/App.tsx</code>.
          </p>
        </div>
      </AdminDesktopPage>
    );
  }

  /* ── Toolbar window (Ext style) ── */
  const pageToolbar = (
    <ExtToolbar>
      <ExtButton onClick={loadData} title="Muat ulang data">
        <ExtIcon path={MENU_ICONS.refresh} />
        Refresh
      </ExtButton>
      <span className="ext-toolbar-divider h-5" />
      <ExtButton
        onClick={() =>
          downloadCsv(
            datedFilename(dataset.id),
            dataset.columns.map((column) => column.key),
            filtered.map((row) => dataset.columns.map((column) => row[column.key] ?? "")),
          )
        }
      >
        <ExtIcon path={MENU_ICONS.download} />
        Export CSV
      </ExtButton>
      <ExtToolbarInfo>
        {filtered.length} dari {rows.length} baris · {dataSource === "supabase" ? "Supabase" : "data sampel"} ·
        tabel {dataset.table}
      </ExtToolbarInfo>
    </ExtToolbar>
  );

  return (
    <AdminDesktopPage
      userEmail={user.email ?? ""}
      activePath={path}
      title={`${dataset.title} — ${datasetPath.label}`}
      icon={dataset.icon}
      toolbar={pageToolbar}
      statusText={`${rows.length} baris · ${dataSource === "supabase" ? "Supabase" : "data sampel lokal"} · tabel ${dataset.table}`}
      defaultSize={{ width: 1180, height: 620 }}
      onNavigate={handleNavigate}
      onSearch={handleSearch}
      onLogout={doLogout}
    >
      <div className="mx-auto max-w-7xl">
        {/* Header modul */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{datasetPath.label}</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{dataset.description}</p>
          </div>
          <input
            type="search"
            value={search}
            maxLength={100}
            placeholder="Cari data..."
            aria-label="Cari data modul"
            className="ext-tray-input h-8 w-full sm:w-64"
            onChange={(event) => setSearch(event.target.value.slice(0, 100))}
          />
        </div>

        {/* Kartu ringkasan status */}
        {summary.length > 0 && (
          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-200/60 dark:bg-gray-900 dark:ring-gray-800">
              <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">{filtered.length}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total baris</p>
            </div>
            {summary.map((item) => (
              <div
                key={item.label}
                className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-200/60 dark:bg-gray-900 dark:ring-gray-800"
              >
                <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">{item.count}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tabel data */}
        <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200/60 dark:bg-gray-900 dark:ring-gray-800">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-800">
              <thead className="bg-gray-50/80 dark:bg-gray-800/60">
                <tr>
                  {dataset.columns.map((column) => (
                    <th
                      key={column.key}
                      scope="col"
                      className="whitespace-nowrap px-4 py-3 text-left text-[11px] font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400"
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filtered.length > 0 ? (
                  filtered.map((row, index) => (
                    <tr
                      key={String(row.id ?? `${dataset.id}-${index}`)}
                      className="hover:bg-gray-50/70 dark:hover:bg-gray-800/50"
                    >
                      {dataset.columns.map((column) => (
                        <td key={column.key} className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                          {column.type === "badge" ? (
                            <Badge value={row[column.key]} dataset={dataset} />
                          ) : (
                            formatValue(row[column.key], column.type)
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={dataset.columns.length}
                      className="px-4 py-16 text-center text-sm text-gray-400 dark:text-gray-500"
                    >
                      Tidak ada data yang cocok dengan pencarian atau filter ini.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-100 px-5 py-3 sm:flex-row dark:border-gray-800">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Menampilkan{" "}
              <span className="font-medium text-gray-600 dark:text-gray-300">{filtered.length}</span> dari{" "}
              <span className="font-medium text-gray-600 dark:text-gray-300">{rows.length}</span> baris
            </p>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs text-gray-400 shadow-sm ring-1 ring-gray-200/60 dark:bg-gray-900 dark:text-gray-500 dark:ring-gray-800">
              <span
                className={`h-1.5 w-1.5 rounded-full ${dataSource === "supabase" ? "bg-green-400" : "bg-yellow-400"}`}
              />
              <span>{dataSource === "supabase" ? "Terhubung ke Supabase" : "Data sampel lokal"}</span>
              <span className="text-gray-300 dark:text-gray-600">·</span>
              <span>
                tabel <code className="font-mono">{dataset.table}</code>
              </span>
            </div>
          </div>
        </div>
      </div>
    </AdminDesktopPage>
  );
}