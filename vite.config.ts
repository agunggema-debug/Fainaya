import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      tailwindcss: path.resolve(
        __dirname,
        "node_modules/tailwindcss/dist/lib.mjs"
      ),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Memisahkan Supabase ke dalam chunk tersendiri
          if (id.includes("@supabase")) {
            return "supabase";
          }
          // Memisahkan dependencies inti lainnya
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
});