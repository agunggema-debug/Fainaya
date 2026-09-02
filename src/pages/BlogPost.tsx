import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useI18n } from "../hooks/useI18n";
import { fetchBlogPostBySlug } from "../data/blog";
import type { BlogPost } from "../data/blog";
import Footer from "../components/Footer";

/* ───── Gambar: resolve caption → file di /img/blog ─────
   Gambar yang sudah disiapkan di folder public/img/blog dipetakan
   berdasarkan kata kunci pada caption, contoh:
     [Gambar: Pemilik UMKM ...]   →  /img/blog/pemilik_umkm.jpg
     [Gambar: Kartun lucu ...]   →  /img/blog/kartun_lucu.jpg
     [Gambar: Pemilik toko ...]   →  /img/blog/pemilik_toko.jpg
*/
const GAMBAR_FILES = ["pemilik_umkm", "kartun_lucu", "pemilik_toko"];

function normalizeKeyword(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function resolveGambarImage(caption: string): string | null {
  const trimmed = caption.trim();
  // Jika caption berupa URL gambar langsung, pakai langsung sebagai berkas gambar.
  if (/^https?:\/\/.+/i.test(trimmed)) return trimmed;
  const normalized = normalizeKeyword(trimmed).replace(/[\s_]/g, "");
  for (const file of GAMBAR_FILES) {
    const keyword = normalizeKeyword(file);
    if (normalized.includes(keyword)) return `/img/blog/${file}.jpg`;
  }
  return null;
}

function GambarFigure({ caption }: Readonly<{ caption: string }>) {
  const src = resolveGambarImage(caption);
  return src ? (
    <figure className="my-6">
      <img src={src} alt={caption} loading="lazy" className="w-full rounded-2xl border border-slate-100 shadow-sm object-cover" />
    </figure>
  ) : (
    <figure className="my-5 rounded-2xl bg-gradient-to-r from-brand-blue/5 to-brand-coral/5 border border-slate-100 p-6 text-sm text-slate-500">🖼️ {caption}</figure>
  );
}

/* ───── Minimal markdown renderer ─────
   Supports: ## headings, **bold**, *italic*, [Gambar: ...] blocks
   Falls back to plain paragraphs. */
function renderInline(text: string) {
  const parts: React.ReactNode[] = [];
  let rest = text;
  let key = 0;
  const imgRe = /\[Gambar:\s*([^\]]+)\]/;
  while (rest) {
    const m = imgRe.exec(rest);
    if (!m) break;
    const before = rest.slice(0, m.index);
    parts.push(before);
    parts.push(<GambarFigure key={`img-${key++}`} caption={m[1]} />);
    rest = rest.slice(m.index + m[0].length);
  }
  if (rest) parts.push(rest);
  return parts;
}

function renderMarkdown(content: string) {
  const lines = content.split(/\r?\n/);
  const blocks: React.ReactNode[] = [];
  let para: string[] = [];
  let key = 0;

  const flushPara = () => {
    if (para.length === 0) return;
    blocks.push(
      <p key={key++} className="text-base leading-relaxed text-slate-600 mb-5">
        {renderInline(para.join(" "))}
      </p>,
    );
    para = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      flushPara();
      continue;
    }
    // Heading
    const h = /^##\s+(.+)$/.exec(line);
    if (h) {
      flushPara();
      blocks.push(
        <h2 key={key++} className="text-2xl font-bold text-slate-900 mt-10 mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-brand-blue rounded-full" />
          {h[1]}
        </h2>,
      );
      continue;
    }
    // Image placeholder line
    const img = /^\[Gambar:\s*([^\]]+)\]$/.exec(line);
    if (img) {
      flushPara();
      blocks.push(<GambarFigure key={key++} caption={img[1]} />);
      continue;
    }
    para.push(line);
  }
  flushPara();
  return blocks;
}
export default function BlogPost() {
  const { t } = useI18n();
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const data = await fetchBlogPostBySlug(slug ?? "");
        if (!active) return;
        if (!data) setNotFound(true);
        else setPost(data);
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <section className="pt-32 pb-20 bg-brand-light min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 w-1/3 rounded bg-slate-200 animate-pulse mb-4" />
          <div className="h-6 w-2/3 rounded bg-slate-200 animate-pulse mb-8" />
          <div className="space-y-4">
            <div className="h-4 rounded bg-slate-200 animate-pulse" />
            <div className="h-4 rounded bg-slate-200 animate-pulse" />
            <div className="h-4 w-2/3 rounded bg-slate-200 animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  if (notFound || !post) {
    return (
      <section className="pt-32 pb-20 bg-brand-light min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-6xl mb-4 block">🔍</span>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Artikel tidak ditemukan</h1>
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:underline">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke Blog
          </Link>
        </div>
      </section>
    );
  }

  const dateStr = new Date(post.published_at).toLocaleDateString("id", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <section className="pt-32 pb-20 bg-brand-light min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-brand-blue transition-colors mb-8 group">
            <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span>Kembali ke Blog</span>
          </Link>

          <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-blue/10 px-3 py-1 font-semibold text-brand-blue">Blog</span>
            <span className="inline-flex rounded-full bg-brand-coral/10 px-2.5 py-0.5 font-semibold text-brand-coral">{post.kategori || "Umum"}</span>
            <span>{post.author || "Fainaya"}</span>
            <span>&middot;</span>
            <span>{dateStr}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-8">{post.title}</h1>

          {post.excerpt && <p className="text-lg text-slate-500 border-l-4 border-brand-blue pl-4 italic mb-8">{post.excerpt}</p>}

          <article className="max-w-none">{renderMarkdown(post.content)}</article>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-brand-blue to-brand-coral p-8 text-white text-center">
            <h2 className="text-xl font-bold mb-2">Butuh bantuan IT untuk usaha kamu?</h2>
            <p className="text-white/90 mb-4 text-sm">Serahkan urusan teknologi ke ahlinya.</p>
            <Link to="/#contact" className="inline-flex items-center gap-2 rounded-full bg-white text-brand-blue px-6 py-2.5 text-sm font-bold shadow-lg hover:shadow-xl transition-all">
              Konsultasi Gratis
            </Link>
          </div>
        </div>
      </section>
      <Footer t={t} />
    </>
  );
}
