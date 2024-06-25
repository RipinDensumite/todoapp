import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  // base: "/todoapp/",
  plugins: [react()],
  preview: {
    port: 8085,
    strictPort: true,
  },
  server: {
    port: 8085,
    strictPort: true,
    host: true,
    origin: "http://localhost:8085",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
