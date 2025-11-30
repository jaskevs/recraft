import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  plugins: [remix()],
  server: {
    port: 4444,
    host: "localhost",
    open: false  // Don't auto-open browser
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./app")
    }
  },
  build: {
    rollupOptions: {
      cache: false  // Disable build cache
    }
  }
});