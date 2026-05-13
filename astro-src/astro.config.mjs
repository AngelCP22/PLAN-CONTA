import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://angelcp22.github.io",
  base: "/PLAN-CONTA/astro-preview",
  outDir: "../astro-preview",
  trailingSlash: "always",
  integrations: [sitemap()],
});
