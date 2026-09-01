import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../hooks/useI18n";
import { fetchBlogPosts } from "../data/blog";
import type { BlogPost } from "../data/blog";
import Footer from "../components/Footer";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/* ───── Blog card ───── */
function BlogCard({ post }: Readonly<{ post: BlogPost }>) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex flex-col rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden card-hover"
    >
      {/* Cover / placeholder */}
      <div className="h-44 bg-gradient-to-br from-brand-blue to-brand-coral relative flex items-center justify-center overflow-hidden">
        {post.cover_image ? (
          <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-5xl">📄</span>
        )}
        <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider bg-white/90 text-brand-blue px-2.5 py-1 rounded-full">
          Blog
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
          <span className="inline-flex rounded-full bg-brand-blue/10 px-2.5 py-0.5 font-semibold text-brand-blue">
            {post.kategori || "Umum"}
          </span>
          <span>{post.author || "Fainaya"}</span>
          <span>&middot;</span>
          <span>{formatDate(post.published_at)}</span>
        </div>
        <h2 className="text-lg font-bold text-slate-900 leading-snug mb-2 group-hover:text-brand-blue transition-colors line-clamp-3">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
        )}
        <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue">
          Baca selengkapnya
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
/* ───── Page ───── */
export default function Blog() {
  const { t } = useI18n();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const data = await fetchBlogPosts(false);
        if (active) setPosts(data);
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <section className="pt-32 pb-20 bg-brand-light min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-brand-blue transition-colors mb-6 group"
            >
              <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              <span>{t("sec_back")}</span>
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              <span className="gradient-text">Blog</span> &amp; Artikel
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl">
              Tips, wawasan, dan kabar terbaru dari dunia teknologi, kreativitas, dan UMKM dari Fainaya Service &amp; Art.
            </p>
          </div>

          {/* List */}
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-80 rounded-2xl bg-white border border-slate-100 animate-pulse" />
              ))}
            </div>
          ) : posts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-slate-400">
              <span className="text-6xl mb-4">📝</span>
              <p className="text-sm font-medium">Belum ada artikel</p>
              <p className="text-xs mt-1">Artikel blog akan tampil di sini.</p>
            </div>
          )}
        </div>
      </section>
      <Footer t={t} />
    </>
  );
}