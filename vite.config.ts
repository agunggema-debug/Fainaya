import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      external: ["tailwindcss"],
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
