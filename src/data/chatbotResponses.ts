export interface ChatbotResponses {
  en: Record<string, string>;
  id: Record<string, string>;
  zh: Record<string, string>;
}

const chatbotResponses: ChatbotResponses = {
  en: {
    "it services": "We offer computer & printer repair, networking solutions, system development, and ongoing technical support. All services are handled by experienced technicians. Would you like a quote?",
    "creative services": "Our creative team handles digital design & branding, video editing & production, custom creative projects, and handmade bags, wallets & accessories. What interests you?",
    pricing: "Pricing varies by project scope. We offer competitive rates and free consultations. Would you like to get a free quote? You can fill out our contact form or chat with us on WhatsApp!",
    contact: "You can reach us via:\n• WhatsApp: +62 813-9892-0798\n• Email: fainaya.service.art@gmail.com\n• Location: West Java, Indonesia\n\nOr fill out the contact form on our website!",
    hello: "Hello! 👋 Welcome to Fainaya Service & Art. How can I help you today?",
    hi: "Hi there! 👋 How can I assist you?",
    thanks: "You're welcome! 😊 Feel free to ask if you have more questions.",
    "thank you": "You're welcome! 😊 Feel free to ask if you have more questions.",
  },
  zh: {
    "it services": "我们提供电脑和打印机维修、网络解决方案、系统开发以及持续的技术支持。所有服务由经验丰富的技术人员提供。您需要报价吗？",
    "creative services": "我们的创意团队负责数字设计与品牌、视频编辑与制作、定制创意项目以及手工包、钱包和配饰。您对什么感兴趣？",
    pricing: "价格因项目范围而异。我们提供有竞争力的价格和免费咨询。您想获取免费报价吗？您可以填写我们的联系表单或在WhatsApp上与我们聊天！",
    contact: "您可以通过以下方式联系我们：\n• WhatsApp: +62 813-9892-0798\n• 邮箱: fainaya.service.art@gmail.com\n• 地址: 西爪哇，印度尼西亚\n\n或填写我们网站上的联系表单！",
    hello: "您好！👋 欢迎来到Fainaya Service & Art。今天我能帮您什么？",
    hi: "您好！👋 有什么可以帮您的？",
    thanks: "不客气！😊 如果有更多问题，随时提问。",
    "thank you": "不客气！😊 如果有更多问题，随时提问。",
  },
  id: {
    "it services": "Kami menawarkan perbaikan komputer & printer, solusi jaringan, pengembangan sistem, dan dukungan teknis berkelanjutan. Semua layanan ditangani oleh teknisi berpengalaman. Apakah Anda ingin penawaran?",
    "creative services": "Tim kreatif kami menangani desain digital & branding, editing & produksi video, proyek kreatif kustom, serta tas, dompet & aksesoris buatan tangan. Apa yang menarik bagi Anda?",
    pricing: "Harga bervariasi berdasarkan cakupan proyek. Kami menawarkan tarif kompetitif dan konsultasi gratis. Apakah Anda ingin penawaran gratis? Isi formulir kontak atau chat kami di WhatsApp!",
    contact: "Anda bisa menghubungi kami melalui:\n• WhatsApp: +62 813-9892-0798\n• Email: fainaya.service.art@gmail.com\n• Lokasi: Jawa Barat, Indonesia\n\nAtau isi formulir kontak di website kami!",
    hello: "Halo! 👋 Selamat datang di Fainaya Service & Art. Ada yang bisa saya bantu hari ini?",
    hi: "Hai! 👋 Ada yang bisa saya bantu?",
    thanks: "Sama-sama! 😊 Jangan ragu untuk bertanya lagi jika ada yang perlu.",
    "thank you": "Sama-sama! 😊 Jangan ragu untuk bertanya lagi jika ada yang perlu.",
  },
};

export function getBotResponse(input: string, lang: string): string {
  const lower = input.toLowerCase().trim();
  const responses = (chatbotResponses as unknown as Record<string, Record<string, string>>)[lang] || chatbotResponses.en;

  for (const [key, value] of Object.entries(responses)) {
    if (lower.includes(key)) return value as string;
  }

  if (lang === 'zh') return "感谢您的留言！如需更多信息，请通过WhatsApp +62 813-9892-0798联系我们，或填写网站上的联系表单。";
  if (lang === 'id') return "Terima kasih atas pesannya! Untuk informasi lebih lanjut, silakan hubungi kami via WhatsApp di +62 813-9892-0798 atau isi formulir kontak di website.";
  return "Thank you for your message! For more information, please contact us via WhatsApp at +62 813-9892-0798 or fill out the contact form on our website.";
}