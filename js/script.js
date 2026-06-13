/* ==========================================
   Fainaya Service & Art — Main JavaScript
   ========================================== */

/* ---------- Translations ---------- */
const translations = {
  en: {
    nav_home: "Home",
    nav_services: "Services",
    nav_about: "About",
    nav_contact: "Contact",
    nav_cta: "Get a Quote",
    hero_badge: "IT Solutions & Creative Services",
    hero_title_1: "Where",
    hero_title_2: "Technology",
    hero_title_3: "Meets",
    hero_title_4: "Creativity",
    hero_subtitle: "From computer repairs and networking to digital design and handmade bags, wallets & accessories — we deliver expert solutions for both your tech and creative needs, all under one roof.",
    hero_cta_primary: "Get a Free Quote",
    hero_cta_secondary: "Explore Services",
    trust_1: "Trusted Local Business",
    trust_2: "Quality Guaranteed",
    trust_3: "Fast Turnaround",
    services_badge: "What We Offer",
    services_title_1: "Two Pillars of",
    services_title_2: "Excellence",
    services_subtitle: "We combine technical expertise with creative vision to provide comprehensive solutions for individuals and businesses.",
    it_title: "IT Services & Technical Support",
    it_subtitle: "Reliable tech solutions to keep your systems running smoothly and efficiently.",
    it_1_title: "Computer & Printer Repair",
    it_1_desc: "Hardware diagnostics, component replacement, and full system restoration.",
    it_2_title: "Networking Solutions",
    it_2_desc: "LAN/WAN setup, Wi-Fi optimization, and network security configuration.",
    it_3_title: "System Development",
    it_3_desc: "Custom software, web applications, and database management systems.",
    it_4_title: "Technical Support",
    it_4_desc: "Ongoing IT maintenance, troubleshooting, and remote/onsite assistance.",
    creative_title: "Multimedia & Creative Arts",
    creative_subtitle: "Bring your brand to life with stunning visuals and handcrafted designs.",
    creative_1_title: "Digital Design & Branding",
    creative_1_desc: "Logos, brand identities, social media graphics, and marketing materials.",
    creative_2_title: "Video Editing & Production",
    creative_2_desc: "Professional video editing, motion graphics, and promotional content.",
    creative_3_title: "Custom Creative Projects",
    creative_3_desc: "Tailored creative solutions from concept to final delivery.",
    creative_4_title: "Handmade Bags, Wallets & Accessories",
    creative_4_desc: "Handcrafted bags, wallets, and other unique accessories made with care and creativity.",
    about_badge: "About Us",
    about_title_1: "Your Trusted Local Partner for",
    about_title_2: "Tech & Creativity",
    about_p1: "At Fainaya Service & Art, we believe that technology and creativity go hand in hand. Founded as a local business dedicated to serving our community, we provide end-to-end solutions that span from essential IT support and system development to stunning multimedia design and handcrafted creations.",
    about_p2: "Whether you need a broken computer repaired, a network set up, a brand identity designed, or a custom handmade bag or wallet — our team of skilled technicians and artists is here to deliver quality work with a personal touch.",
    stat_projects: "Projects Done",
    stat_clients: "Happy Clients",
    stat_support: "Support",
    card_tech: "Tech Expertise",
    card_creative: "Creative Vision",
    card_quote: '"Combining the precision of technology with the beauty of art to serve you better."',
    contact_badge: "Get In Touch",
    contact_title_1: "Ready to",
    contact_title_2: "Start?",
    contact_subtitle: "Fill out the form below or reach out directly. We'll get back to you as soon as possible.",
    form_name: "Full Name",
    form_email: "Email Address",
    form_phone: "Phone Number",
    form_service: "Service Needed",
    form_service_default: "Select a service",
    form_message: "Message",
    form_submit: "Send Inquiry",
    placeholder_name: "John Doe",
    placeholder_message: "Tell us about your project or issue...",
    opt_computer_repair: "Computer & Printer Repair",
    opt_networking: "Networking Solutions",
    opt_system_dev: "System Development",
    opt_tech_support: "Technical Support",
    opt_digital_design: "Digital Design & Branding",
    opt_video_editing: "Video Editing & Production",
    opt_creative_projects: "Custom Creative Projects",
    opt_handmade: "Handmade Bags, Wallets & Accessories",
    opt_other: "Other",
    whatsapp_title: "WhatsApp Us",
    whatsapp_desc: "Quick response • Chat now",
    email_title: "Email Us",
    location_title: "Location",
    location_value: "West Java, Indonesia",
    hours_title: "Business Hours",
    hours_weekday: "Monday – Friday",
    hours_saturday: "Saturday",
    hours_sunday: "Sunday",
    hours_closed: "Closed",
    footer_desc: "Your trusted local partner for IT solutions and creative services. Where technology meets creativity.",
    footer_quick_links: "Quick Links",
    footer_about: "About Us",
    footer_services: "Our Services",
    footer_rights: "All rights reserved.",
    alert_submit: "Thank you! Redirecting you to WhatsApp...",
    sec_back: "Back to Home",
    sec_title_1: "Security",
    sec_title_2: "Policy",
    sec_subtitle: "Security Policy — Fainaya Service and Art",
    sec_intro: "Fainaya Service and Art is committed to maintaining the security of information and visitor privacy. This document explains how we manage security on our landing page platform.",
    sec_s1_title: "Data Management",
    sec_s1_h1: "User Privacy",
    sec_s1_d1: "We only collect necessary information through the contact form. Data is managed with due diligence and is not shared with third parties without permission.",
    sec_s1_h2: "Data Security",
    sec_s1_d2: "Information submitted through this platform is processed with adequate security standards to prevent unauthorized access.",
    sec_s2_title: "Technical Standards",
    sec_s2_intro: "We implement the following security measures on our systems:",
    sec_s2_h1: "Encryption",
    sec_s2_d1: "All data traffic on this site is protected using the HTTPS protocol (SSL/TLS) to ensure data encryption between client and server.",
    sec_s2_h2: "Code Maintenance",
    sec_s2_d2: "We perform routine updates on dependencies to close discovered security vulnerabilities.",
    sec_s2_h3: "Development Practices",
    sec_s2_d3: "Our code is managed with best practices to avoid leaking sensitive information (such as API keys or access credentials).",
    sec_s3_title: "Vulnerability Reporting",
    sec_s3_desc: "Security is a shared responsibility. If you find a security vulnerability or privacy issue related to our site, please contact us immediately via:",
    sec_s3_email_label: "Email:",
    sec_s3_subject_label: "Subject:",
    sec_s3_subject_value: "Security Report - Fainaya Service and Art",
    sec_s4_title: "Compliance",
    sec_s4_desc: "We strive to align our operational practices with internationally recognized information security principles to provide trusted services to our clients in the fields of services and arts.",
    sec_last_updated: "This document was last updated on: June 13, 2026",
    sec_nav_title: "Security Policy",
    nav_security: "Security Policy"
  },
  zh: {
    nav_home: "首页",
    nav_services: "服务",
    nav_about: "关于",
    nav_contact: "联系",
    nav_cta: "获取报价",
    hero_badge: "IT解决方案与创意服务",
    hero_title_1: "技术",
    hero_title_2: "与",
    hero_title_3: "创意",
    hero_title_4: "的交汇",
    hero_subtitle: "从电脑维修和网络搭建到数字设计和手工包、钱包及配饰——我们为您的技术和创意需求提供专业解决方案，一站式服务。",
    hero_cta_primary: "免费获取报价",
    hero_cta_secondary: "探索服务",
    trust_1: "值得信赖的本地企业",
    trust_2: "质量保证",
    trust_3: "快速交付",
    services_badge: "我们的服务",
    services_title_1: "卓越的",
    services_title_2: "两大支柱",
    services_subtitle: "我们将技术专长与创意视野相结合，为个人和企业提供全面的解决方案。",
    it_title: "IT服务与技术支持",
    it_subtitle: "可靠的技术解决方案，确保您的系统平稳高效运行。",
    it_1_title: "电脑与打印机维修",
    it_1_desc: "硬件诊断、组件更换和全面系统恢复。",
    it_2_title: "网络解决方案",
    it_2_desc: "局域网/广域网搭建、Wi-Fi优化和网络安全配置。",
    it_3_title: "系统开发",
    it_3_desc: "定制软件、Web应用和数据库管理系统。",
    it_4_title: "技术支持",
    it_4_desc: "持续的IT维护、故障排除和远程/现场协助。",
    creative_title: "多媒体与创意艺术",
    creative_subtitle: "用精美的视觉效果和手工设计为您的品牌注入活力。",
    creative_1_title: "数字设计与品牌",
    creative_1_desc: "Logo、品牌标识、社交媒体图形和营销材料。",
    creative_2_title: "视频编辑与制作",
    creative_2_desc: "专业视频编辑、动态图形和推广内容。",
    creative_3_title: "定制创意项目",
    creative_3_desc: "从概念到最终交付的量身定制创意解决方案。",
    creative_4_title: "手工包、钱包与配饰",
    creative_4_desc: "精心制作的手工包、钱包和其他独特配饰。",
    about_badge: "关于我们",
    about_title_1: "您值得信赖的本地合作伙伴",
    about_title_2: "技术与创意",
    about_p1: "在Fainaya Service & Art，我们相信技术与创意相辅相成。作为一家致力于服务社区的本地企业，我们提供从IT支持和系统开发到多媒体设计和手工创作的全方位解决方案。",
    about_p2: "无论您需要维修损坏的电脑、搭建网络、设计品牌标识，还是定制手工包或钱包——我们经验丰富的技术团队和艺术家团队随时为您提供高质量的个性化服务。",
    stat_projects: "已完成项目",
    stat_clients: "满意客户",
    stat_support: "支持",
    card_tech: "技术专长",
    card_creative: "创意视野",
    card_quote: '"将技术的精准与艺术的美感相结合，为您提供更好的服务。"',
    contact_badge: "联系我们",
    contact_title_1: "准备好",
    contact_title_2: "开始了吗？",
    contact_subtitle: "填写下方表单或直接联系我们，我们将尽快回复您。",
    form_name: "姓名",
    form_email: "电子邮件",
    form_phone: "电话号码",
    form_service: "所需服务",
    form_service_default: "选择服务",
    form_message: "留言",
    form_submit: "发送咨询",
    placeholder_name: "张三",
    placeholder_message: "请告诉我们您的项目或问题...",
    opt_computer_repair: "电脑与打印机维修",
    opt_networking: "网络解决方案",
    opt_system_dev: "系统开发",
    opt_tech_support: "技术支持",
    opt_digital_design: "数字设计与品牌",
    opt_video_editing: "视频编辑与制作",
    opt_creative_projects: "定制创意项目",
    opt_handmade: "手工包、钱包与配饰",
    opt_other: "其他",
    whatsapp_title: "WhatsApp联系",
    whatsapp_desc: "快速回复 • 立即聊天",
    email_title: "邮件联系",
    location_title: "地址",
    location_value: "西爪哇，印度尼西亚",
    hours_title: "营业时间",
    hours_weekday: "周一至周五",
    hours_saturday: "周六",
    hours_sunday: "周日",
    hours_closed: "休息",
    footer_desc: "您值得信赖的本地IT解决方案和创意服务合作伙伴。技术与创意的交汇之处。",
    footer_quick_links: "快速链接",
    footer_about: "关于我们",
    footer_services: "我们的服务",
    footer_rights: "版权所有。",
    alert_submit: "感谢您！正在跳转到WhatsApp...",
    sec_back: "返回首页",
    sec_title_1: "安全",
    sec_title_2: "政策",
    sec_subtitle: "安全政策 — Fainaya Service and Art",
    sec_intro: "Fainaya Service and Art致力于维护信息安全和访客隐私。本文档说明了我们如何管理着陆页平台的安全性。",
    sec_s1_title: "数据管理",
    sec_s1_h1: "用户隐私",
    sec_s1_d1: "我们仅通过联系表单收集必要的信息。数据以谨慎原则管理，未经许可不会与第三方共享。",
    sec_s1_h2: "数据安全",
    sec_s1_d2: "通过本平台提交的信息以充分的安全标准进行处理，以防止未经授权的访问。",
    sec_s2_title: "技术标准",
    sec_s2_intro: "我们在系统上实施以下安全措施：",
    sec_s2_h1: "加密",
    sec_s2_d1: "本站所有数据流量均使用HTTPS协议（SSL/TLS）保护，以确保客户端和服务器之间的数据加密。",
    sec_s2_h2: "代码维护",
    sec_s2_d2: "我们定期更新依赖项，以关闭已发现的安全漏洞。",
    sec_s2_h3: "开发实践",
    sec_s2_d3: "我们的代码以最佳实践管理，以避免泄露敏感信息（如API密钥或访问凭据）。",
    sec_s3_title: "漏洞报告",
    sec_s3_desc: "安全是共同的责任。如果您发现与我们网站相关的安全漏洞或隐私问题，请立即通过以下方式联系我们：",
    sec_s3_email_label: "邮箱：",
    sec_s3_subject_label: "主题：",
    sec_s3_subject_value: "安全报告 - Fainaya Service and Art",
    sec_s4_title: "合规",
    sec_s4_desc: "我们努力使运营实践与国际公认的信息安全原则保持一致，为我们在服务和艺术领域的客户提供可信赖的服务。",
    sec_last_updated: "本文档最后更新于：2026年6月13日",
    sec_nav_title: "安全政策",
    nav_security: "安全政策"
  },
  id: {
    nav_home: "Beranda",
    nav_services: "Layanan",
    nav_about: "Tentang",
    nav_contact: "Kontak",
    nav_cta: "Minta Penawaran",
    hero_badge: "Solusi TI & Layanan Kreatif",
    hero_title_1: "Di Mana",
    hero_title_2: "Teknologi",
    hero_title_3: "Bertemu",
    hero_title_4: "Kreativitas",
    hero_subtitle: "Dari perbaikan komputer dan jaringan hingga desain digital dan tas, dompet & aksesoris buatan tangan — kami memberikan solusi ahli untuk kebutuhan teknologi dan kreatif Anda, semuanya dalam satu atap.",
    hero_cta_primary: "Dapatkan Penawaran Gratis",
    hero_cta_secondary: "Jelajahi Layanan",
    trust_1: "Bisnis Lokal Terpercaya",
    trust_2: "Kualitas Terjamin",
    trust_3: "Pengerjaan Cepat",
    services_badge: "Yang Kami Tawarkan",
    services_title_1: "Dua Pilar",
    services_title_2: "Keunggulan",
    services_subtitle: "Kami menggabungkan keahlian teknis dengan visi kreatif untuk memberikan solusi komprehensif bagi individu dan bisnis.",
    it_title: "Layanan TI & Dukungan Teknis",
    it_subtitle: "Solusi teknologi andal untuk menjaga sistem Anda tetap berjalan lancar dan efisien.",
    it_1_title: "Perbaikan Komputer & Printer",
    it_1_desc: "Diagnostik perangkat keras, penggantian komponen, dan pemulihan sistem penuh.",
    it_2_title: "Solusi Jaringan",
    it_2_desc: "Pengaturan LAN/WAN, optimasi Wi-Fi, dan konfigurasi keamanan jaringan.",
    it_3_title: "Pengembangan Sistem",
    it_3_desc: "Perangkat lunak kustom, aplikasi web, dan sistem manajemen database.",
    it_4_title: "Dukungan Teknis",
    it_4_desc: "Pemeliharaan TI berkelanjutan, pemecahan masalah, dan bantuan remote/on-site.",
    creative_title: "Multimedia & Seni Kreatif",
    creative_subtitle: "Hidupkan merek Anda dengan visual memukau dan desain buatan tangan.",
    creative_1_title: "Desain Digital & Branding",
    creative_1_desc: "Logo, identitas merek, grafis media sosial, dan materi pemasaran.",
    creative_2_title: "Editing & Produksi Video",
    creative_2_desc: "Editing video profesional, motion graphics, dan konten promosi.",
    creative_3_title: "Proyek Kreatif Kustom",
    creative_3_desc: "Solusi kreatif yang disesuaikan dari konsep hingga pengiriman akhir.",
    creative_4_title: "Tas, Dompet & Aksesoris Buatan Tangan",
    creative_4_desc: "Tas, dompet, dan aksesoris unik lainnya yang dibuat dengan penuh keahlian dan kreativitas.",
    about_badge: "Tentang Kami",
    about_title_1: "Mitra Lokal Terpercaya Anda untuk",
    about_title_2: "Teknologi & Kreativitas",
    about_p1: "Di Fainaya Service & Art, kami percaya bahwa teknologi dan kreativitas berjalan beriringan. Didirikan sebagai bisnis lokal yang berkomitmen melayani komunitas kami, kami menyediakan solusi menyeluruh mulai dari dukungan TI dan pengembangan sistem hingga desain multimedia yang memukau dan kerajinan buatan tangan.",
    about_p2: "Apakah Anda perlu memperbaiki komputer yang rusak, mengatur jaringan, mendesain identitas merek, atau tas dan dompet buatan tangan khusus — tim teknisi dan seniman ahli kami siap memberikan pekerjaan berkualitas dengan sentuhan pribadi.",
    stat_projects: "Proyek Selesai",
    stat_clients: "Klien Puas",
    stat_support: "Dukungan",
    card_tech: "Keahlian Teknis",
    card_creative: "Visi Kreatif",
    card_quote: '"Menggabungkan presisi teknologi dengan keindahan seni untuk melayani Anda lebih baik."',
    contact_badge: "Hubungi Kami",
    contact_title_1: "Siap untuk",
    contact_title_2: "Memulai?",
    contact_subtitle: "Isi formulir di bawah ini atau hubungi kami langsung. Kami akan segera merespons.",
    form_name: "Nama Lengkap",
    form_email: "Alamat Email",
    form_phone: "Nomor Telepon",
    form_service: "Layanan yang Dibutuhkan",
    form_service_default: "Pilih layanan",
    form_message: "Pesan",
    form_submit: "Kirim Pertanyaan",
    placeholder_name: "Nama Anda",
    placeholder_message: "Ceritakan tentang proyek atau masalah Anda...",
    opt_computer_repair: "Perbaikan Komputer & Printer",
    opt_networking: "Solusi Jaringan",
    opt_system_dev: "Pengembangan Sistem",
    opt_tech_support: "Dukungan Teknis",
    opt_digital_design: "Desain Digital & Branding",
    opt_video_editing: "Editing & Produksi Video",
    opt_creative_projects: "Proyek Kreatif Kustom",
    opt_handmade: "Tas, Dompet & Aksesoris Buatan Tangan",
    opt_other: "Lainnya",
    whatsapp_title: "Chat WhatsApp",
    whatsapp_desc: "Respons cepat • Chat sekarang",
    email_title: "Email Kami",
    location_title: "Lokasi",
    location_value: "Jawa Barat, Indonesia",
    hours_title: "Jam Kerja",
    hours_weekday: "Senin – Jumat",
    hours_saturday: "Sabtu",
    hours_sunday: "Minggu",
    hours_closed: "Tutup",
    footer_desc: "Mitra lokal terpercaya Anda untuk solusi TI dan layanan kreatif. Di mana teknologi bertemu kreativitas.",
    footer_quick_links: "Tautan Cepat",
    footer_about: "Tentang Kami",
    footer_services: "Layanan Kami",
    footer_rights: "Hak cipta dilindungi.",
    alert_submit: "Terima kasih! Mengarahkan Anda ke WhatsApp...",
    sec_back: "Kembali ke Beranda",
    sec_title_1: "Kebijakan",
    sec_title_2: "Keamanan",
    sec_subtitle: "Kebijakan Keamanan — Fainaya Service and Art",
    sec_intro: "Fainaya Service and Art berkomitmen untuk menjaga keamanan informasi dan privasi pengunjung. Dokumen ini menjelaskan bagaimana kami mengelola keamanan pada platform landing page kami.",
    sec_s1_title: "Pengelolaan Data",
    sec_s1_h1: "Privasi Pengguna",
    sec_s1_d1: "Kami hanya mengumpulkan informasi yang diperlukan melalui formulir kontak. Data tersebut dikelola dengan prinsip kehati-hatian dan tidak dibagikan kepada pihak ketiga tanpa izin.",
    sec_s1_h2: "Keamanan Data",
    sec_s1_d2: "Informasi yang dikirimkan melalui platform ini diproses dengan standar keamanan yang memadai untuk mencegah akses yang tidak sah.",
    sec_s2_title: "Standar Teknis",
    sec_s2_intro: "Kami menerapkan langkah-langkah keamanan berikut pada sistem kami:",
    sec_s2_h1: "Enkripsi",
    sec_s2_d1: "Seluruh lalu lintas data di situs ini dilindungi menggunakan protokol HTTPS (SSL/TLS) untuk memastikan enkripsi data antara klien dan server.",
    sec_s2_h2: "Pemeliharaan Kode",
    sec_s2_d2: "Kami melakukan pembaruan rutin pada dependencies untuk menutup celah keamanan yang ditemukan.",
    sec_s2_h3: "Praktik Pengembangan",
    sec_s2_d3: "Kode kami dikelola dengan praktik terbaik untuk menghindari kebocoran informasi sensitif (seperti API keys atau kredensial akses).",
    sec_s3_title: "Pelaporan Kerentanan",
    sec_s3_desc: "Keamanan adalah tanggung jawab bersama. Jika Anda menemukan kerentanan keamanan atau masalah privasi terkait situs kami, mohon segera hubungi kami melalui:",
    sec_s3_email_label: "Email:",
    sec_s3_subject_label: "Subjek:",
    sec_s3_subject_value: "Laporan Keamanan - Fainaya Service and Art",
    sec_s4_title: "Kepatuhan",
    sec_s4_desc: "Kami berupaya untuk menyelaraskan praktik operasional kami dengan prinsip-prinsip keamanan informasi yang diakui secara internasional untuk memberikan layanan yang tepercaya kepada klien kami di bidang jasa dan seni.",
    sec_last_updated: "Dokumen ini diperbarui terakhir pada: 13 Juni 2026",
    sec_nav_title: "Kebijakan Keamanan",
    nav_security: "Kebijakan Keamanan"
  }
};

/* ---------- Current Language ---------- */
let currentLang = localStorage.getItem('fainaya-lang') || 'en';

/* ---------- Set Language ---------- */
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('fainaya-lang', lang);

  // Update all data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Update placeholders
  const nameInput = document.getElementById('name');
  const messageInput = document.getElementById('message');
  if (nameInput && translations[lang].placeholder_name) {
    nameInput.placeholder = translations[lang].placeholder_name;
  }
  if (messageInput && translations[lang].placeholder_message) {
    messageInput.placeholder = translations[lang].placeholder_message;
  }

  // Update active state on language buttons (desktop)
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('active');
    btn.classList.add('text-slate-500');
  });

  // Desktop buttons
  const enBtn = document.getElementById('langEn');
  const idBtn = document.getElementById('langId');
  const zhBtn = document.getElementById('langZh');
  if (enBtn) { enBtn.classList.toggle('active', lang === 'en'); enBtn.classList.toggle('text-slate-500', lang !== 'en'); }
  if (idBtn) { idBtn.classList.toggle('active', lang === 'id'); idBtn.classList.toggle('text-slate-500', lang !== 'id'); }
  if (zhBtn) { zhBtn.classList.toggle('active', lang === 'zh'); zhBtn.classList.toggle('text-slate-500', lang !== 'zh'); }

  // Mobile buttons
  const enBtnM = document.getElementById('langEnMobile');
  const idBtnM = document.getElementById('langIdMobile');
  const zhBtnM = document.getElementById('langZhMobile');
  if (enBtnM) { enBtnM.classList.toggle('active', lang === 'en'); enBtnM.classList.toggle('text-slate-500', lang !== 'en'); }
  if (idBtnM) { idBtnM.classList.toggle('active', lang === 'id'); idBtnM.classList.toggle('text-slate-500', lang !== 'id'); }
  if (zhBtnM) { zhBtnM.classList.toggle('active', lang === 'zh'); zhBtnM.classList.toggle('text-slate-500', lang !== 'zh'); }

  // Update HTML lang attribute
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang;
}

/* ---------- Smooth Scroll ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.pageYOffset - 80,
        behavior: 'smooth'
      });
    }
  });
});

/* ---------- Contact Form ---------- */
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const { name, email, phone, service, message } = Object.fromEntries(new FormData(this));

  let msg = `Hello Fainaya! I'm ${name}.%0AEmail: ${email}%0A`;
  if (phone) msg += `Phone: ${phone}%0A`;
  msg += `Service: ${service}%0AMessage: ${message}`;

  window.open(`https://wa.me/6281398920798?text=${msg}`, '_blank');
  this.reset();
  alert(translations[currentLang].alert_submit);
});

/* ---------- AI Chatbot ---------- */
const chatbotResponses = {
  en: {
    'it services': "We offer computer & printer repair, networking solutions, system development, and ongoing technical support. All services are handled by experienced technicians. Would you like a quote?",
    'creative services': "Our creative team handles digital design & branding, video editing & production, custom creative projects, and handmade bags, wallets & accessories. What interests you?",
    'pricing': "Pricing varies by project scope. We offer competitive rates and free consultations. Would you like to get a free quote? You can fill out our contact form or chat with us on WhatsApp!",
    'contact': "You can reach us via:\n• WhatsApp: +62 813-9892-0798\n• Email: fainaya.service.art@gmail.com\n• Location: West Java, Indonesia\n\nOr fill out the contact form on our website!",
    'hello': "Hello! 👋 Welcome to Fainaya Service & Art. How can I help you today?",
    'hi': "Hi there! 👋 How can I assist you?",
    'thanks': "You're welcome! 😊 Feel free to ask if you have more questions.",
    'thank you': "You're welcome! 😊 Feel free to ask if you have more questions."
  },
  zh: {
    'it services': "我们提供电脑和打印机维修、网络解决方案、系统开发以及持续的技术支持。所有服务由经验丰富的技术人员提供。您需要报价吗？",
    'creative services': "我们的创意团队负责数字设计与品牌、视频编辑与制作、定制创意项目以及手工包、钱包和配饰。您对什么感兴趣？",
    'pricing': "价格因项目范围而异。我们提供有竞争力的价格和免费咨询。您想获取免费报价吗？您可以填写我们的联系表单或在WhatsApp上与我们聊天！",
    'contact': "您可以通过以下方式联系我们：\n• WhatsApp: +62 813-9892-0798\n• 邮箱: fainaya.service.art@gmail.com\n• 地址: 西爪哇，印度尼西亚\n\n或填写我们网站上的联系表单！",
    'hello': "您好！👋 欢迎来到Fainaya Service & Art。今天我能帮您什么？",
    'hi': "您好！👋 有什么可以帮您的？",
    'thanks': "不客气！😊 如果有更多问题，随时提问。",
    'thank you': "不客气！😊 如果有更多问题，随时提问。"
  },
  id: {
    'it services': "Kami menawarkan perbaikan komputer & printer, solusi jaringan, pengembangan sistem, dan dukungan teknis berkelanjutan. Semua layanan ditangani oleh teknisi berpengalaman. Apakah Anda ingin penawaran?",
    'creative services': "Tim kreatif kami menangani desain digital & branding, editing & produksi video, proyek kreatif kustom, serta tas, dompet & aksesoris buatan tangan. Apa yang menarik bagi Anda?",
    'pricing': "Harga bervariasi berdasarkan cakupan proyek. Kami menawarkan tarif kompetitif dan konsultasi gratis. Apakah Anda ingin penawaran gratis? Isi formulir kontak atau chat kami di WhatsApp!",
    'contact': "Anda bisa menghubungi kami melalui:\n• WhatsApp: +62 813-9892-0798\n• Email: fainaya.service.art@gmail.com\n• Lokasi: Jawa Barat, Indonesia\n\nAtau isi formulir kontak di website kami!",
    'hello': "Halo! 👋 Selamat datang di Fainaya Service & Art. Ada yang bisa saya bantu hari ini?",
    'hi': "Hai! 👋 Ada yang bisa saya bantu?",
    'thanks': "Sama-sama! 😊 Jangan ragu untuk bertanya lagi jika ada yang perlu.",
    'thank you': "Sama-sama! 😊 Jangan ragu untuk bertanya lagi jika ada yang perlu."
  }
};

function toggleChat() {
  const chatWindow = document.getElementById('chatWindow');
  const chatIcon = document.getElementById('chatIcon');
  const chatCloseIcon = document.getElementById('chatCloseIcon');
  const isOpen = !chatWindow.classList.contains('hidden');

  chatWindow.classList.toggle('hidden', isOpen);
  chatIcon.classList.toggle('hidden', !isOpen);
  chatCloseIcon.classList.toggle('hidden', isOpen);
}

function addBotMessage(text) {
  const messages = document.getElementById('chatMessages');
  const msgDiv = document.createElement('div');
  msgDiv.className = 'chatbot-msg bot';
  msgDiv.innerHTML = `
    <div class="chatbot-avatar">
      <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
    </div>
    <div class="chatbot-bubble"><p>${text.replace(/\n/g, '</p><p>')}</p></div>
  `;
  messages.appendChild(msgDiv);
  messages.scrollTop = messages.scrollHeight;
}

function addUserMessage(text) {
  const messages = document.getElementById('chatMessages');
  const msgDiv = document.createElement('div');
  msgDiv.className = 'chatbot-msg user';
  msgDiv.innerHTML = `
    <div class="chatbot-avatar">
      <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
    </div>
    <div class="chatbot-bubble"><p>${text}</p></div>
  `;
  messages.appendChild(msgDiv);
  messages.scrollTop = messages.scrollHeight;
}

function showTyping() {
  const messages = document.getElementById('chatMessages');
  const typing = document.createElement('div');
  typing.className = 'chatbot-msg bot';
  typing.id = 'chatTyping';
  typing.innerHTML = `
    <div class="chatbot-avatar">
      <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
    </div>
    <div class="chatbot-typing"><span></span><span></span><span></span></div>
  `;
  messages.appendChild(typing);
  messages.scrollTop = messages.scrollHeight;
}

function removeTyping() {
  const typing = document.getElementById('chatTyping');
  if (typing) typing.remove();
}

function getBotResponse(input) {
  const lang = currentLang;
  const lower = input.toLowerCase().trim();
  const responses = chatbotResponses[lang] || chatbotResponses.en;

  for (const [key, value] of Object.entries(responses)) {
    if (lower.includes(key)) return value;
  }

  if (lang === 'zh') return "感谢您的留言！如需更多信息，请通过WhatsApp +62 813-9892-0798联系我们，或填写网站上的联系表单。";
  if (lang === 'id') return "Terima kasih atas pesannya! Untuk informasi lebih lanjut, silakan hubungi kami via WhatsApp di +62 813-9892-0798 atau isi formulir kontak di website.";
  return "Thank you for your message! For more information, please contact us via WhatsApp at +62 813-9892-0798 or fill out the contact form on our website.";
}

function sendChatMessage() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;

  addUserMessage(text);
  input.value = '';

  showTyping();

  setTimeout(() => {
    removeTyping();
    addBotMessage(getBotResponse(text));
  }, 800 + Math.random() * 600);
}

function sendQuickMessage(text) {
  addUserMessage(text);

  showTyping();

  setTimeout(() => {
    removeTyping();
    addBotMessage(getBotResponse(text));
  }, 800 + Math.random() * 600);
}

function handleChatKeypress(e) {
  if (e.key === 'Enter') sendChatMessage();
}

// Close button inside chat window
document.getElementById('chatClose').addEventListener('click', toggleChat);

/* ---------- Init ---------- */
setLanguage(currentLang);
