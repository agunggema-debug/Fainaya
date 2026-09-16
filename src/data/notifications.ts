/**
 * Contoh notifikasi admin — nantinya diambil dari backend
 * (chat masuk chatbot, servis melewati batas waktu, revisi desain, stok menipis).
 *
 * Dipakai oleh TopNav (layout klasik) dan window "Notifikasi & Chat Masuk"
 * pada Ext JS style web desktop.
 */

export type Notification = {
  id: string;
  title: string;
  description: string;
  time: string;
  unread: boolean;
  type: "chat" | "service" | "design";
  icon: string;
};

export const SAMPLE_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "Chat Masuk",
    description: "Pelanggan menanyakan status servis printer Epson L3110",
    time: "2 menit lalu",
    unread: true,
    type: "chat",
    icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
  },
  {
    id: "2",
    title: "Servis Melewati Batas",
    description: "Servis komputer #SVC-042 sudah 3 hari melewati estimasi",
    time: "15 menit lalu",
    unread: true,
    type: "service",
    icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",
  },
  {
    id: "3",
    title: "Revisi Desain",
    description: "Klien mengirimkan revisi untuk proyek desain logo",
    time: "1 jam lalu",
    unread: false,
    type: "design",
    icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
  },
  {
    id: "4",
    title: "Stok Menipis",
    description: "Tinta printer EPSON T664 sudah tersisa 3 pcs",
    time: "3 jam lalu",
    unread: false,
    type: "service",
    icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  },
];