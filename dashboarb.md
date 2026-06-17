1. Struktur Menu Utama (Sidebar)
   Sidebar sebelah kiri karena jumlah menunya cukup padat dan membutuhkan sub-menu.
   📊 Kelompok 1: Ringkasan & Utama
   • Dashboard / Beranda
   o Fungsi: Menampilkan grafik omset, jumlah servis aktif, status proyek desain, dan notifikasi chatbot terbaru.
   • Pelanggan / Klien
   o Fungsi: Database nama pelanggan, nomor WhatsApp, email, dan riwayat order mereka (terintegrasi dari input chatbot Anda).
   🛠️ Kelompok 2: Manajemen Layanan IT (Tech Support)
   • Servis & Perbaikan (IT Support)
   o Sub-menu:
    Daftar Antrean: Tiket servis printer/komputer yang baru masuk.
    Proses Perbaikan: Status pengerjaan teknis.
    Riwayat Servis: Arsip servis yang sudah selesai dan diambil pelanggan.
   • Log Perawatan (Maintenance Logs) (Sesuai konsep proyek agung_mtc)
   o Fungsi: Catatan riwayat perawatan rutin infrastruktur, server (MikroTik/Ubuntu), atau komputer klien kontrak/perusahaan.
   🎨 Kelompok 3: Manajemen Layanan Kreatif (Art & Multimedia)
   • Proyek Desain (Creative Projects)
   o Sub-menu:
    Brief Masuk: Request desain baru dari klien (misal: desain kartu nama, video editing Filmora, atau mockup PSD).
    Tahap Desain/Revisi: Proyek yang sedang digarap atau sedang ditinjau klien.
    Galeri Portofolio: Arsip karya yang siap di-upload ke website utama.
   • Proyek Kreasi Tangan
   📦 Kelompok 4: Operasional & Logistik
   • Inventaris & Stok
   o Fungsi: Manajemen stok sparepart IT (tinta printer, RAM, SSD) dan bahan kreatif (Filamen 3D printer, kertas ID Card).
   • Keuangan & Kas
   o Sub-menu:
    Tagihan / Invoices: Pembuatan nota digital untuk klien.
    Pengeluaran: Catatan beli sparepart, biaya listrik, atau beli aset digital.
   ⚙️ Kelompok 5: Pengaturan
   • Integrasi Chatbot & Website
   o Fungsi: Pengaturan widget bot (Tidio/Botpress) dan update konten landing page utama.
   • Pengaturan Sistem
   o Fungsi: Profil bisnis, hak akses staf, dan backup database.
2. Struktur Menu Ringkas (Navbar Atas)
   Jika Anda menggunakan Navbar atas (biasanya untuk aksi cepat atau tampilan profil pengguna).
   • Sisi Kiri/Tengah (Aksi Cepat & Navigasi Global):
   o Pencarian Global (Search Bar): Untuk mencari cepat nama klien, nomor nota, atau serial number komputer.
   o Buat Baru (+): Tombol shortcut cepat untuk "Tambah Order Servis" atau "Tambah Proyek Desain".
   • Sisi Kanan (Notifikasi & Akun):
   o Notifikasi (Ikon Lonceng): Pemberitahuan jika ada chat masuk dari bot yang butuh bantuan manusia, atau status servis yang melewati batas waktu.
   o Profil Pengguna (Avatar): Menu Dropdown berisi "Akun Saya", "Log Aktivitas", dan "Keluar (Logout)".
   💡 Tips Implementasi (UX & Desain):
3. Gunakan Ikon Pendukung: Jangan hanya teks. Gunakan library ikon seperti FontAwesome atau Heroicons.
   o Servis & Perbaikan ➡️ Ikon Kunci Pas (fa-wrench) atau Komputer.
   o Proyek Desain ➡️ Ikon Kuas Lukis (fa-paint-brush) atau Palet Warna.
4. Gunakan Pemisah (Section Header): Di sidebar, berikan teks kecil berwarna abu-abu sebagai pemisah kelompok, misalnya menuliskan kata "LAYANAN IT" di atas menu servis, dan "STUDIO KREATIF" di atas menu desain. Ini membuat mata admin tidak pusing saat melihat banyak menu.
