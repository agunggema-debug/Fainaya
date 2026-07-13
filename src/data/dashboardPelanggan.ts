import { supabase } from "./supabase";
import { getLocalPelanggan } from "./pelanggan";
import type { Pelanggan } from "./pelanggan";

// ──────────────────────────────
// Types
// ──────────────────────────────

export type ActiveUsersSummary = {
  totalPelanggan: number;
  aktif: number;
  nonaktif: number;
  aktifPersen: number;
  nonaktifPersen: number;
  baruBulanIni: number; // pelanggan baru month-to-date
  recentlyActive: Pelanggan[];
};

export type CustomerDemographic = {
  byStatus: { label: string; count: number; color: string }[];
  byJoinMonth: { month: string; count: number }[];
  byTransactionTier: { tier: string; count: number }[];
  topPelanggan: Pelanggan[];
};

// ──────────────────────────────
// Local fallback helpers
// ──────────────────────────────

function computeActiveSummaryLocal(): ActiveUsersSummary {
  const all = getLocalPelanggan();
  const aktif = all.filter((p) => p.status === "aktif");
  const nonaktif = all.filter((p) => p.status === "nonaktif");
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
  const baruBulanIni = all.filter((p) => p.bergabung >= startOfMonth);
  const sorted = [...all].sort(
    (a, b) => new Date(b.terakhir_aktif).getTime() - new Date(a.terakhir_aktif).getTime()
  );
  return {
    totalPelanggan: all.length,
    aktif: aktif.length,
    nonaktif: nonaktif.length,
    aktifPersen: all.length > 0 ? Math.round((aktif.length / all.length) * 100) : 0,
    nonaktifPersen: all.length > 0 ? Math.round((nonaktif.length / all.length) * 100) : 0,
    baruBulanIni: baruBulanIni.length,
    recentlyActive: sorted.slice(0, 5),
  };
}

function computeDemographicLocal(): CustomerDemographic {
  const all = getLocalPelanggan();

  // By status
  const aktifCount = all.filter((p) => p.status === "aktif").length;
  const nonaktifCount = all.filter((p) => p.status === "nonaktif").length;

  // By join month (last 6 months)
  const monthMap = new Map<string, number>();
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    monthMap.set(key, 0);
  }
  for (const p of all) {
    const m = p.bergabung.slice(0, 7);
    if (monthMap.has(m)) monthMap.set(m, (monthMap.get(m) ?? 0) + 1);
  }

  // By transaction tier
  const tier0 = all.filter((p) => p.total_transaksi === 0).length;
  const tier1 = all.filter((p) => p.total_transaksi >= 1 && p.total_transaksi <= 5).length;
  const tier2 = all.filter((p) => p.total_transaksi >= 6 && p.total_transaksi <= 15).length;
  const tier3 = all.filter((p) => p.total_transaksi > 15).length;

  // Top by transaksi
  const sorted = [...all].sort((a, b) => b.total_transaksi - a.total_transaksi).slice(0, 5);

  return {
    byStatus: [
      { label: "Aktif", count: aktifCount, color: "#22c55e" },
      { label: "Nonaktif", count: nonaktifCount, color: "#ef4444" },
    ],
    byJoinMonth: Array.from(monthMap.entries())
      .map(([month, count]) => ({ month, count }))
      .sort((a, b) => a.month.localeCompare(b.month)),
    byTransactionTier: [
      { tier: "0 transaksi", count: tier0 },
      { tier: "1-5 transaksi", count: tier1 },
      { tier: "6-15 transaksi", count: tier2 },
      { tier: ">15 transaksi", count: tier3 },
    ],
    topPelanggan: sorted,
  };
}

// ──────────────────────────────
// Supabase fetchers (primary)
// ──────────────────────────────

export async function fetchActiveUsersSummary(): Promise<ActiveUsersSummary> {
  try {
    // Total, aktif, nonaktif
    const { data: allPelanggan, error: err1 } = await supabase
      .from("pelanggan")
      .select("id, status, bergabung, terakhir_aktif, nama, email, telepon, total_transaksi, kode")
      .order("terakhir_aktif", { ascending: false });

    if (err1) throw err1;
    if (!allPelanggan || allPelanggan.length === 0) {
      return computeActiveSummaryLocal();
    }

    const pelanggan = allPelanggan as Pelanggan[];
    const aktif = pelanggan.filter((p) => p.status === "aktif");
    const nonaktif = pelanggan.filter((p) => p.status === "nonaktif");

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
    const baruBulanIni = pelanggan.filter((p) => p.bergabung >= startOfMonth);

    return {
      totalPelanggan: pelanggan.length,
      aktif: aktif.length,
      nonaktif: nonaktif.length,
      aktifPersen: pelanggan.length > 0 ? Math.round((aktif.length / pelanggan.length) * 100) : 0,
      nonaktifPersen: pelanggan.length > 0 ? Math.round((nonaktif.length / pelanggan.length) * 100) : 0,
      baruBulanIni: baruBulanIni.length,
      recentlyActive: pelanggan.slice(0, 5),
    };
  } catch (err) {
    console.warn("Failed to fetch active users from Supabase, using local:", err);
    return computeActiveSummaryLocal();
  }
}

export async function fetchCustomerDemographics(): Promise<CustomerDemographic> {
  try {
    const { data: allPelanggan, error: err1 } = await supabase
      .from("pelanggan")
      .select("*")
      .order("total_transaksi", { ascending: false });

    if (err1) throw err1;
    if (!allPelanggan || allPelanggan.length === 0) {
      return computeDemographicLocal();
    }

    const pelanggan = allPelanggan as Pelanggan[];

    // By status
    const aktifCount = pelanggan.filter((p) => p.status === "aktif").length;
    const nonaktifCount = pelanggan.filter((p) => p.status === "nonaktif").length;

    // By join month (last 6 months)
    const monthMap = new Map<string, number>();
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      monthMap.set(key, 0);
    }
    for (const p of pelanggan) {
      const m = p.bergabung.slice(0, 7);
      if (monthMap.has(m)) monthMap.set(m, (monthMap.get(m) ?? 0) + 1);
    }

    // By transaction tier
    const tier0 = pelanggan.filter((p) => p.total_transaksi === 0).length;
    const tier1 = pelanggan.filter((p) => p.total_transaksi >= 1 && p.total_transaksi <= 5).length;
    const tier2 = pelanggan.filter((p) => p.total_transaksi >= 6 && p.total_transaksi <= 15).length;
    const tier3 = pelanggan.filter((p) => p.total_transaksi > 15).length;

    return {
      byStatus: [
        { label: "Aktif", count: aktifCount, color: "#22c55e" },
        { label: "Nonaktif", count: nonaktifCount, color: "#ef4444" },
      ],
      byJoinMonth: Array.from(monthMap.entries())
        .map(([month, count]) => ({ month, count }))
        .sort((a, b) => a.month.localeCompare(b.month)),
      byTransactionTier: [
        { tier: "0 transaksi", count: tier0 },
        { tier: "1-5 transaksi", count: tier1 },
        { tier: "6-15 transaksi", count: tier2 },
        { tier: ">15 transaksi", count: tier3 },
      ],
      topPelanggan: pelanggan.slice(0, 5),
    };
  } catch (err) {
    console.warn("Failed to fetch demographics from Supabase, using local:", err);
    return computeDemographicLocal();
  }
}