import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import preact from "@preact/preset-vite";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  plugins: [tailwindcss(), preact()],
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  build: {
    assetsInlineLimit: 0,
  },
});
