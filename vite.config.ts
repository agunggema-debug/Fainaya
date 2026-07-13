import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("@supabase")) {
            return "supabase";
          }
          if (id.includes("recharts")) {
            return "charts";
          }
          if (id.includes("react") || id.includes("scheduler")) {
            return "framework";
          }
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
});