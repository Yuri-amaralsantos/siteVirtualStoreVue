import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  base: "/", // Use '/' for the root or '/subpath/' for a subdirectory
  build: {
    outDir: "dist",
  },
});
