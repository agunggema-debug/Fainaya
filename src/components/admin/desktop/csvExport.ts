/**
 * Helper export CSV sederhana untuk tombol "Export" pada toolbar Ext.
 * Nilai dibungkus kutip ganda dan tanda kutip di-escape agar aman di Excel.
 */
function escapeCell(value: string | number): string {
  const text = String(value ?? "");
  if (/[",\n;]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

export function downloadCsv(
  filename: string,
  headers: string[],
  rows: (string | number)[][],
): void {
  const lines = [headers, ...rows].map((row) => row.map(escapeCell).join(","));
  const csv = `\uFEFF${lines.join("\r\n")}`;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

/** Nama file export dengan tanggal hari ini, mis. fainaya-servis-2026-09-17.csv */
export function datedFilename(prefix: string): string {
  return `fainaya-${prefix}-${new Date().toISOString().slice(0, 10)}.csv`;
}