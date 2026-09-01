import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Sidebar from "../../components/admin/Sidebar";
import TopNav from "../../components/admin/TopNav";
import {
  fetchBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  slugify,
  BLOG_CATEGORIES,
  uploadBlogImage,
  deleteBlogImageByUrl,
} from "../../data/blog";
import type { BlogPost } from "../../data/blog";

/* ───── Status badge ───── */
function StatusBadge({ status }: Readonly<{ status: BlogPost["status"] }>) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
        status === "published"
          ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 ring-1 ring-inset ring-green-600/20 dark:ring-green-500/30"
          : "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 ring-1 ring-inset ring-amber-600/20 dark:ring-amber-500/30"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${status === "published" ? "bg-green-500" : "bg-amber-500"}`} />
      {status === "published" ? "Published" : "Draft"}
    </span>
  );
}

/* ───── Form state ───── */
type PostForm = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  kategori: string;
  author: string;
  status: "published" | "draft";
};

const EMPTY_FORM: PostForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  cover_image: "",
  kategori: "Umum",
  author: "Fainaya",
  status: "published",
};
/* ───── Modal form (create / edit / delete) ───── */
function BlogModal({
  mode,
  initial,
  onClose,
  onSave,
  onConfirmDelete,
}: Readonly<{
  mode: "create" | "edit" | "delete";
  initial: PostForm | null;
  onClose: () => void;
  onSave: (form: PostForm) => void;
  onConfirmDelete: () => void;
}>) {
  const [form, setForm] = useState<PostForm>(initial ?? EMPTY_FORM);
  const [error, setError] = useState("");

  const set = <K extends keyof PostForm>(key: K, value: PostForm[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const [uploading, setUploading] = useState(false);
  const [uploadingContent, setUploadingContent] = useState(false);

  const handleContentImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("File harus berupa gambar");
      return;
    }
    setUploadingContent(true);
    setError("");
    try {
      const url = await uploadBlogImage(file);
      if (url) {
        const marker = `\n\n[Gambar: ${url}]\n`;
        setForm((f) => ({ ...f, content: f.content.trim() + marker }));
      } else {
        setError("Gagal mengunggah gambar ke Supabase Storage");
      }
    } finally {
      setUploadingContent(false);
      e.target.value = "";
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("File harus berupa gambar");
      return;
    }
    setUploading(true);
    setError("");
    try {
      const url = await uploadBlogImage(file);
      if (url) {
        set("cover_image", url);
      } else {
        setError("Gagal mengunggah gambar ke Supabase Storage");
      }
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleSave = () => {
    if (!form.title.trim()) {
      setError("Judul wajib diisi");
      return;
    }
    if (!form.content.trim()) {
      setError("Konten wajib diisi");
      return;
    }
    setError("");
    const finalSlug = form.slug.trim() || slugify(form.title);
    onSave({ ...form, slug: finalSlug });
  };

  const inputCls =
    "w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500";

  const fieldLabel = (text: string) => (
    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">{text}</label>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-gray-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {mode === "create" ? "Tambah Artikel" : mode === "edit" ? "Edit Artikel" : "Hapus Artikel"}
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            aria-label="Tutup"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {mode === "delete" ? (
          <div className="px-6 py-8 text-center">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 mb-4">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636M18.364 18.364A9 9 0 005.636 5.636" />
              </svg>
            </span>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Yakin ingin menghapus artikel ini?</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 line-clamp-2">{initial?.title}</p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={onClose}
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 ring-1 ring-gray-200 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={onConfirmDelete}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 px-6 py-6">
            {error && (
              <div className="rounded-lg bg-red-50 dark:bg-red-900/30 px-4 py-2.5 text-sm text-red-700 dark:text-red-300">
                {error}
              </div>
            )}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                {fieldLabel("Judul *")}
                <input
                  className={inputCls}
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  placeholder="Judul artikel"
                />
              </div>
<div>
                {fieldLabel("Slug (opsional)")}
                <input
                  className={inputCls}
                  value={form.slug}
                  onChange={(e) => set("slug", e.target.value)}
                  placeholder="auto-dari-judul"
                />
              </div>
              <div>
                {fieldLabel("Penulis")}
                <input
                  className={inputCls}
                  value={form.author}
                  onChange={(e) => set("author", e.target.value)}
                  placeholder="Fainaya"
                />
              </div>
              <div>
                {fieldLabel("Status")}
                <select
                  className={inputCls}
                  value={form.status}
                  onChange={(e) => set("status", e.target.value as PostForm["status"])}
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
              <div>
                {fieldLabel("Kategori")}
                <input
                  className={inputCls}
                  value={form.kategori}
                  onChange={(e) => set("kategori", e.target.value)}
                  placeholder="Pilih / ketik kategori"
                  list="blog-categories"
                />
                <datalist id="blog-categories">
                  {BLOG_CATEGORIES.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </div>
              <div className="sm:col-span-2">
                {fieldLabel("Gambar Cover")}
                <div className="flex flex-col sm:flex-row items-start gap-3">
                  <div className="h-24 w-36 shrink-0 rounded-lg border border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                    {form.cover_image ? (
                      <img src={form.cover_image} alt="Cover" className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-3xl">🖼️</span>
                    )}
                  </div>
                  <div className="flex-1 w-full space-y-2">
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                      </svg>
                      {uploading ? "Mengunggah..." : "Unggah Gambar"}
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                    </label>
                    <input
                      className={inputCls}
                      value={form.cover_image}
                      onChange={(e) => set("cover_image", e.target.value)}
                      placeholder="atau tempel URL gambar"
                    />
                    {form.cover_image && (
                      <button
                        type="button"
                        onClick={() => set("cover_image", "")}
                        className="text-xs font-medium text-red-600 dark:text-red-400 hover:underline"
                      >
                        Hapus gambar
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                {fieldLabel("Ringkasan (excerpt)")}
                <textarea
                  className={inputCls}
                  rows={2}
                  value={form.excerpt}
                  onChange={(e) => set("excerpt", e.target.value)}
                  placeholder="Ringkasan singkat untuk kartu artikel"
                />
              </div>
              <div className="sm:col-span-2">
                {fieldLabel("Konten * (dukung markdown: ## judul, **tebal**, [Gambar: ...])")}
                <label className="mb-1 inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-slate-100 dark:bg-gray-800 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-gray-700 transition-colors">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                  {uploadingContent ? "Mengunggah..." : "Sisipkan Gambar (unggah)"}
                  <input type="file" accept="image/*" className="hidden" onChange={handleContentImageUpload} disabled={uploadingContent} />
                </label>
                <textarea
                  className={inputCls}
                  rows={10}
                  value={form.content}
                  onChange={(e) => set("content", e.target.value)}
                  placeholder="Tulis isi artikel di sini..."
                />
                <p className="mt-1 text-[11px] text-gray-400 dark:text-gray-600">
                  Tips: gambar yang diunggah otomatis disisipkan sebagai [Gambar: &lt;URL&gt;] di akhir konten; atur URL-nya sebagai src gambar.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={onClose}
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 ring-1 ring-gray-200 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
              >
                {mode === "create" ? "Simpan Artikel" : "Perbarui"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
/* ───── Main page ───── */
export default function AdminBlog() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [dataSource, setDataSource] = useState<"supabase" | "local">("local");
  const [searchQuery, setSearchQuery] = useState("");
  const [modal, setModal] = useState<{ mode: "create" | "edit" | "delete"; post: BlogPost | null } | null>(null);
  const [saving, setSaving] = useState(false);

  const loadData = async () => {
    try {
      const data = await fetchBlogPosts(true);
      setPosts(data);
      setDataSource(data.length > 0 && !data[0].id.startsWith("dummy-") ? "supabase" : "local");
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
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

  const handleNavigate = (path: string) => navigate(path);
  const handleSearch = (query: string) => setSearchQuery(query);

  const filtered = posts.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q) ||
      p.author.toLowerCase().includes(q)
    );
  });

  const toForm = (p: BlogPost): PostForm => ({
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    content: p.content,
    cover_image: p.cover_image,
    kategori: p.kategori || "Umum",
    author: p.author,
    status: p.status,
  });

  const handleSave = async (form: PostForm) => {
    if (!modal) return;
    setSaving(true);
    try {
      if (modal.mode === "create") {
        await createBlogPost(form);
      } else if (modal.mode === "edit" && modal.post) {
        await updateBlogPost(modal.post.id, form);
      }
      await loadData();
      setModal(null);
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!modal?.post) return;
    setSaving(true);
    try {
      const ok = await deleteBlogPost(modal.post.id);
      if (ok) {
        // remove uploaded cover from storage if present
        if (modal.post.cover_image) await deleteBlogImageByUrl(modal.post.cover_image);
        await loadData();
        setModal(null);
      }
    } finally {
      setSaving(false);
    }
  };

  const totalPublished = posts.filter((p) => p.status === "published").length;
  const totalDraft = posts.filter((p) => p.status === "draft").length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex transition-colors duration-200">
      <Sidebar
        activePath="/admin/blog"
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
            <div className="sm:flex sm:items-center sm:justify-between mb-8">
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Manajemen Blog</h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Kelola artikel blog Fainaya — tambah, edit, atau hapus konten.
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center gap-3">
                <button
                  onClick={() => setModal({ mode: "create", post: null })}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Tambah Artikel
                </button>
              </div>
            </div>
{/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="rounded-xl bg-white dark:bg-gray-900 p-5 shadow-sm ring-1 ring-gray-200/60 dark:ring-gray-800">
                <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{posts.length}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Artikel</p>
              </div>
              <div className="rounded-xl bg-white dark:bg-gray-900 p-5 shadow-sm ring-1 ring-gray-200/60 dark:ring-gray-800">
                <p className="text-2xl font-semibold text-green-600 dark:text-green-400">{totalPublished}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Published</p>
              </div>
              <div className="rounded-xl bg-white dark:bg-gray-900 p-5 shadow-sm ring-1 ring-gray-200/60 dark:ring-gray-800">
                <p className="text-2xl font-semibold text-amber-600 dark:text-amber-400">{totalDraft}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Draft</p>
              </div>
            </div>

            {/* Table */}
            <div className="rounded-2xl bg-white dark:bg-gray-900 shadow-sm ring-1 ring-gray-200/60 dark:ring-gray-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-800/60">
                    <tr className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      <th className="px-5 py-3 font-semibold">Judul</th>
                      <th className="px-5 py-3 font-semibold hidden sm:table-cell">Slug</th>
                      <th className="px-5 py-3 font-semibold">Status</th>
                      <th className="px-5 py-3 font-semibold">Kategori</th>
                      <th className="px-5 py-3 font-semibold hidden md:table-cell">Penulis</th>
                      <th className="px-5 py-3 font-semibold hidden md:table-cell">Terbit</th>
                      <th className="px-5 py-3 font-semibold text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                    {filtered.length > 0 ? (
                      filtered.map((p) => (
                        <tr key={p.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">📄</span>
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-1">{p.title}</p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 truncate max-w-[240px]">
                                  {p.excerpt || "—"}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-4 hidden sm:table-cell">
                            <span className="text-xs font-mono text-gray-500 dark:text-gray-400">{p.slug}</span>
                          </td>
                          <td className="px-5 py-4">
                            <StatusBadge status={p.status} />
                          </td>
                          <td className="px-5 py-4">
                            <span className="inline-flex rounded-full bg-indigo-50 dark:bg-indigo-900/30 px-2.5 py-0.5 text-xs font-medium text-indigo-700 dark:text-indigo-300">
                              {p.kategori || "Umum"}
                            </span>
                          </td>
                          <td className="px-5 py-4 hidden md:table-cell">
                            <span className="text-sm text-gray-600 dark:text-gray-400">{p.author}</span>
                          </td>
                          <td className="px-5 py-4 hidden md:table-cell">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {new Date(p.published_at).toLocaleDateString("id", { day: "numeric", month: "short", year: "numeric" })}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-right">
                            <div className="inline-flex items-center gap-1">
                              <a
                                href={`/blog/${p.slug}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors"
                                title="Lihat"
                              >
                                Lihat
                              </a>
<button
                                onClick={() => setModal({ mode: "edit", post: p })}
                                className="inline-flex items-center rounded-lg px-2.5 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => setModal({ mode: "delete", post: p })}
                                className="inline-flex items-center rounded-lg px-2.5 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                              >
                                Hapus
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="px-5 py-16 text-center">
                          <div className="flex flex-col items-center text-gray-300 dark:text-gray-600">
                            <span className="text-5xl mb-3">📝</span>
                            <p className="text-sm font-medium">Tidak ada artikel</p>
                            <p className="text-xs mt-1">Tambahkan artikel baru dengan klik "Tambah Artikel".</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <footer className="mt-2 border-t border-gray-200/60 dark:border-gray-800 px-5 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                  <span className={`h-1.5 w-1.5 rounded-full ${dataSource === "supabase" ? "bg-green-400" : "bg-yellow-400"}`} />
                  <span>
                    {dataSource === "supabase" ? "Terhubung ke Supabase" : "Data lokal (fallback)"} &middot; tabel{" "}
                    <code className="font-mono">blog_posts</code>
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 dark:text-gray-500">
                  Menampilkan {filtered.length} dari {posts.length} artikel
                </p>
              </footer>
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
      {modal && (
        <BlogModal
          mode={modal.mode}
          initial={modal.post ? toForm(modal.post) : EMPTY_FORM}
          onClose={() => (saving ? undefined : setModal(null))}
          onSave={handleSave}
          onConfirmDelete={handleConfirmDelete}
        />
      )}
    </div>
  );
}