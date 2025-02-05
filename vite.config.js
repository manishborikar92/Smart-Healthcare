import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    proxy: {
      "/predict": {
        target: "https://theodinproject-skin-cancer-model-resnet50v2.hf.space",
        changeOrigin: true,
      },
    },
  },
});