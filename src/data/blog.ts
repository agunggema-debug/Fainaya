import { supabase } from "./supabase";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  kategori: string;
  author: string;
  status: "published" | "draft";
  published_at: string;
  created_at?: string;
  updated_at?: string;
};

export const BLOG_CATEGORIES = [
  "Umum",
  "Teknologi",
  "IT Support",
  "Kreativitas",
  "UMKM",
  "Tips",
  "Berita",
] as const;

/* ─────────────────────────────────────────────
   Seed / local fallback for the first blog post
   ───────────────────────────────────────────── */
export function getSeedBlogPosts(): BlogPost[] {
  return [
    {
      id: "dummy-b-001",
      title:
        "Zaman Now Masih Restart Router Buat Solusi Semua Masalah IT? Saatnya UMKM Pindah Lapak ke Jasa IT 2026!",
      slug: "zaman-now-masih-restart-router-solusi-masalah-it",
      excerpt:
        "Saatnya UMKM berhenti mengandalkan jurus \u201ccabut-colok router\u201d dan serahkan urusan teknologi ke jasa IT profesional di 2026.",
      content: `[Gambar: Pemilik UMKM kopi dengan muka panik memegang kabel LAN yang terputus, background kasir macet dan antrean pembeli memanjang]
Bayangin situasi ini: toko lagi rame-ramenya, antrean kasir udah mengular mirip naga barongsai, eh mendadak sistem pembayaran digital mogok. Kasir kamu panik, kamu ikut panik, lalu dengan jurus andalan abad ke-21, kamu cabut kabel router wifi, tunggu sepuluh detik, terus colok lagi sambil berdoa. Kalau beruntung, jalan lagi. Kalau nggak? Ya siap-siap pelanggan pada bubar jalan sambil cemberut.

Selamat datang di tahun 2026! Tahun di mana kecanggihan teknologi udah makin ugal-ugalan, tapi sebagian besar pelaku UMKM masih ngandelin jurus "cabut-colok router" buat nyelesaiin masalah teknis. Padahal, urusan teknologi zaman sekarang tuh udah bukan cuma soal wifi nyala atau mati lagi, tapi udah mencakup sistem AI kasir, keamanan data pembeli, sampai penyimpanan berkas digital yang makin kompleks.

## Kenapa Sok-Sok Jadi Teknisi IT Sendiri Itu Berbahaya?

Banyak pemilik usaha mikro sampai menengah yang mikir, "Ah, ngapain bayar jasa IT? Kan ada tutorial di internet, tinggal searching cara benerinnya." Tapi kenyataannya? Kamu malah ngabisin waktu tiga jam cuma buat nyari tahu kenapa printer kasir nggak mau nge-print nota, padahal tempat usaha lagi riuh-riuhnya. Ujung-ujungnya usaha terbengkalai, jualan keteteran, dan kepala kamu makin pusing melebihi pusingnya mikirin omzet bulanan.

[Gambar: Kartun lucu seorang pengusaha UMKM tertimbun stiker password bertuliskan "admin123" di layar laptopnya]

Belum lagi urusan keamanan data. Di tahun 2026, peretas udah nggak cuma ngincar perusahaan raksasa beromzet miliaran. Toko seblak atau distro pakaian kamu yang catatan keuangannya masih disimpan di file komputer bernama data_keuangan_beneran_final_v2 juga bisa jadi sasaran empuk. Sekali kena serangan virus atau data tersandera, hilang deh semua data transaksi yang udah kamu kumpulin bertahun-tahun. Nyeseknya melebihi diputusin pacar pas lagi sayang-sayangnya!
## Jasa IT Services 2026: Bukan Cuma Buat Perusahaan Besar Lagi!

Untungnya, penyedia jasa IT di tahun 2026 udah makin paham nasib dan dompet anak UMKM. Sekarang jasa IT tuh bentuknya mirip kaya langganan aplikasi streaming film: fleksibel, sesuai kebutuhan, dan harganya nggak bikin kantong bolong.

Kamu nggak perlu sewa satu tim IT penuh yang gajinya belasan juta per bulan. Cukup pakai jasa IT external khusus UMKM. Mereka bakal ngurusin hal-hal krusial seperti:

**Sistem Kasir Pintar:** Biar kamu tahu otomatis stok bahan apa yang mau habis tanpa harus ngitungin bungkus bahan baku satu per satu tiap malam.

**Keamanan Data Tanpa Pusing:** Nggak ada lagi cerita password pakai nama tanggal lahir atau kata kunci "admin123". Jasa IT bakal ngamanin data transaksi pelanggan kamu biar nggak bocor ke mana-mana.

**Penyimpanan Awan yang Rapi:** Biar dokumen penting usaha bisa diakses dari mana aja tanpa takut laptop kamu ketumpahan kopi terus datanya hilang selamanya.

**Bantuan Darurat 24 Jam:** Kalau ada sistem yang error pas jam sibuk, kamu tinggal kontak mereka dan masalah langsung ditangani sama ahlinya, tanpa kamu perlu berubah jadi ahli kabel mendadak.

[Gambar: Pemilik toko tersenyum santai sambil minum kopi, sementara di belakangnya ada tim IT profesional yang sedang merapikan jaringan kabel dan sistem digital]

## Investasi Pintar Biar Kamu Fokus Jualan

Intinya, cuek sama urusan IT di tahun 2026 itu ibarat kamu jualan bakso tapi nggak mau nyediain mangkok. Zaman udah berubah cepat banget. Daripada waktu dan energi kamu habis dipakai buat pusing mikirin kabel yang belitan atau aplikasi kasir yang mendadak macet, mending serahin aja semuanya ke tim IT yang profesional.

Tugas kamu sebagai pemilik UMKM itu mikirin gimana caranya bikin produk makin laku, racikan menu makin enak, atau promosi sosial media makin viral. Biarkan urusan belakang layar dan per-kabelan duniawi diurus sama ahlinya.

Jadi, gimana? Masih mau bertahan sama jurus cabut-colok router tiap ada masalah, atau udah siap bawa usaha kamu naik kelas tanpa pusing di tahun 2026 ini? Yuk, serahin urusan IT kamu ke ahlinya sekarang juga biar jualan makin tenang dan cuan makin lancar!`,
      cover_image: "",
      kategori: "UMKM",
      author: "Fainaya",
      status: "published",
      published_at: new Date().toISOString(),
    },
  ];
}
export function getLocalBlogPosts(): BlogPost[] {
  try {
    const stored = localStorage.getItem("fainaya_blog_posts");
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return getSeedBlogPosts();
}

function saveLocalBlogPosts(posts: BlogPost[]) {
  try {
    localStorage.setItem("fainaya_blog_posts", JSON.stringify(posts));
  } catch {
    // ignore
  }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/* ─────────────────────────────────────────────
   CRUD — Supabase first, local fallback
   ───────────────────────────────────────────── */

/** Fetch blog posts. When includeDrafts is false, only published posts are returned. */
export async function fetchBlogPosts(includeDrafts = false): Promise<BlogPost[]> {
  try {
    let query = supabase.from("blog_posts").select("*");
    if (!includeDrafts) query = query.eq("status", "published");
    query = query.order("published_at", { ascending: false });

    const { data, error } = await query;
    if (error) throw error;
    if (data && data.length > 0) return data as BlogPost[];
    return [];
  } catch (err) {
    console.warn("Failed to fetch blog posts from Supabase, using local fallback:", err);
    const local = getLocalBlogPosts();
    return includeDrafts ? local : local.filter((p) => p.status === "published");
  }
}

/** Fetch a single blog post by slug. */
export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    if (error) throw error;
    return data as BlogPost;
  } catch (err) {
    console.warn("Failed to fetch blog post by slug from Supabase, using local fallback:", err);
    const local = getLocalBlogPosts();
    return local.find((p) => p.slug === slug) ?? null;
  }
}

/** Create a new blog post. */
export async function createBlogPost(
  data: Omit<BlogPost, "id" | "published_at" | "created_at" | "updated_at">
): Promise<BlogPost | null> {
  const payload = {
    title: data.title,
    slug: data.slug || slugify(data.title),
    excerpt: data.excerpt ?? "",
    content: data.content,
    cover_image: data.cover_image ?? "",
    kategori: data.kategori || "Umum",
    author: data.author || "Fainaya",
    status: data.status,
    published_at: new Date().toISOString(),
  };

  try {
    const { data: result, error } = await supabase
      .from("blog_posts")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;
    return result as BlogPost;
  } catch (err) {
    console.warn("Failed to create blog post in Supabase, using local fallback:", err);
    const local = getLocalBlogPosts();
    const newPost: BlogPost = {
      id: `dummy-b-${Date.now()}`,
      ...payload,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    saveLocalBlogPosts([newPost, ...local]);
    return newPost;
  }
}

/** Update an existing blog post. */
export async function updateBlogPost(id: string, data: Partial<BlogPost>): Promise<BlogPost | null> {
  const payload: Record<string, unknown> = { ...data, updated_at: new Date().toISOString() };
  if (data.title && !data.slug) payload.slug = slugify(data.title);

  try {
    const { data: result, error } = await supabase
      .from("blog_posts")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return result as BlogPost;
  } catch (err) {
    console.warn("Failed to update blog post in Supabase, using local fallback:", err);
    const local = getLocalBlogPosts();
    const idx = local.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    const updated = { ...local[idx], ...payload } as BlogPost;
    local[idx] = updated;
    saveLocalBlogPosts(local);
    return updated;
  }
}

/** Delete a blog post. */
export async function deleteBlogPost(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) throw error;
    return true;
  } catch (err) {
    console.warn("Failed to delete blog post from Supabase, using local fallback:", err);
    const local = getLocalBlogPosts();
    const filtered = local.filter((p) => p.id !== id);
    saveLocalBlogPosts(filtered);
    return filtered.length < local.length;
  }
}

/* ─────────────────────────────────────────────
   Storage — upload blog cover images
   ───────────────────────────────────────────── */

export const BLOG_STORAGE_BUCKET = "blog";

/** Build a public URL for a file in the blog bucket. */
export function getBlogImageUrl(path: string): string {
  const { data } = supabase.storage.from(BLOG_STORAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Upload an image file to Supabase Storage in the "blog" bucket and return its
 * public URL. Returns null on failure.
 */
export async function uploadBlogImage(file: File): Promise<string | null> {
  // Sanitize + unique-ify the filename
  const safeName = file.name
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]/g, "-")
    .replace(/-+/g, "-");
  const ext = safeName.includes(".") ? safeName.split(".").pop() : "jpg";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  try {
    const { data, error } = await supabase.storage
      .from(BLOG_STORAGE_BUCKET)
      .upload(path, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type || "image/jpeg",
      });

    if (error) throw error;
    if (!data?.path) return null;
    return getBlogImageUrl(data.path);
  } catch (err) {
    console.warn("Failed to upload blog image to Supabase Storage:", err);
    return null;
  }
}

/** Delete an image from the blog bucket (e.g. when a post is deleted). */
export async function deleteBlogImageByUrl(url: string): Promise<boolean> {
  if (!url || !url.includes("/storage/v1/object/public/blog/")) return false;
  try {
    const segments = url.split("blog/");
    const path = segments[segments.length - 1].split("?")[0];
    if (!path) return false;
    const { error } = await supabase.storage.from(BLOG_STORAGE_BUCKET).remove([path]);
    return !error;
  } catch (err) {
    console.warn("Failed to delete blog image:", err);
    return false;
  }
}