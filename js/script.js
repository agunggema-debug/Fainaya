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
    alert_submit: "Thank you! Redirecting you to WhatsApp..."
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
    alert_submit: "Terima kasih! Mengarahkan Anda ke WhatsApp..."
  }
};

/* ---------- Language System ---------- */
let currentLang = localStorage.getItem('fainaya-lang') || 'en';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('fainaya-lang', lang);
  document.documentElement.lang = lang === 'id' ? 'id' : 'en';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) el.textContent = translations[lang][key];
  });

  const nameInput = document.getElementById('name');
  const msgInput = document.getElementById('message');
  if (nameInput) nameInput.placeholder = translations[lang].placeholder_name;
  if (msgInput) msgInput.placeholder = translations[lang].placeholder_message;

  updateLangButtons(lang);
}

function updateLangButtons(lang) {
  const allBtns = [
    document.getElementById('langEn'),
    document.getElementById('langId'),
    document.getElementById('langEnMobile'),
    document.getElementById('langIdMobile')
  ].filter(Boolean);

  allBtns.forEach(btn => {
    btn.classList.remove('active');
    btn.classList.add('text-slate-500');
  });

  const activeBtns = lang === 'en'
    ? [document.getElementById('langEn'), document.getElementById('langEnMobile')]
    : [document.getElementById('langId'), document.getElementById('langIdMobile')];

  activeBtns.filter(Boolean).forEach(btn => {
    btn.classList.add('active');
    btn.classList.remove('text-slate-500');
  });
}

/* ---------- Mobile Menu ---------- */
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

mobileMenuBtn.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('hidden', !menuOpen);
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.add('hidden');
  });
});

/* ---------- Navbar Scroll ---------- */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('shadow-lg', window.scrollY > 50);
});

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

  return lang === 'id'
    ? "Terima kasih atas pesannya! Untuk informasi lebih lanjut, silakan hubungi kami via WhatsApp di +62 813-9892-0798 atau isi formulir kontak di website."
    : "Thank you for your message! For more information, please contact us via WhatsApp at +62 813-9892-0798 or fill out the contact form on our website.";
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
