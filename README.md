# Faianaya Services&Art - AI-Assisted Development Policy

Proyek ini menggunakan AI *coding assistant* (seperti GitHub Copilot/Cursor/LLM lainnya) sebagai alat bantu produktivitas. Penggunaan alat ini dijalankan sesuai dengan standar internal **Fainaya Service and Art** yang selaras dengan prinsip **ISO 27001 (Information Security Management System)**.

## 🛡️ Kebijakan Penggunaan AI (ISMS Compliance)
Untuk menjaga keamanan data dan integritas kode:
1. **Zero Data Training:** AI assistant diatur dalam mode *Enterprise* yang menjamin input kode tidak digunakan untuk melatih model publik.
2. **Data Sanitization:** Dilarang memasukkan PII (Personally Identifiable Information), API Keys, Secret Tokens, atau rahasia bisnis ke dalam prompt AI.
3. **Manual Verification:** Semua kode yang dihasilkan AI wajib melalui proses *Human-in-the-loop* (review manual oleh pengembang).
4. **Security Scanning:** Kode hasil AI wajib melewati pemindaian *static analysis* (SAST) sebelum masuk ke repositori utama.

## 📋 Checklist Sebelum Menggunakan AI
- [ ] **Data Masking:** Apakah variabel yang berisi data sensitif sudah di-*masking*?
- [ ] **License Check:** Apakah lisensi AI assistant yang digunakan adalah akun resmi perusahaan/bisnis?
- [ ] **No Secrets:** Apakah prompt mengandung *hardcoded password*? (Jika ya, hapus segera).

## 🚀 Alur Kerja Keamanan (Secure SDLC)
```mermaid
graph LR
    A[Input Prompt] --> B{Data Sensitif?}
    B -->|Ya| C[Masking Data]
    B -->|Tidak| D[Generate Code]
    C --> D
    D --> E[Review & Audit Manual]
    E --> F[Security Scanning]
    F --> G[Commit & Deploy]
