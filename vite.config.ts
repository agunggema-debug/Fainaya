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
          // Ensure all React-related packages (including React Router v7 deps)
          // end up in the same chunk to avoid initialization order issues
          if (
            id.includes("react") ||
            id.includes("scheduler") ||
            id.includes("react-router") ||
            id.includes("@remix-run") ||
            id.includes("react-dom")
          ) {
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
