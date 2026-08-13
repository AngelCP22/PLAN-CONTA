import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const base = process.env.ASTRO_BASE ?? "/";
const outDir = process.env.ASTRO_OUT_DIR ?? "./dist";

export default defineConfig({
  site: "https://asesoresmyr.com",
  base,
  outDir,
  trailingSlash: "always",
  integrations: [sitemap()],
});
