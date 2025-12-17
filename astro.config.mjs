import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import remarkSmartypants from "remark-smartypants";

// https://astro.build/config
export default defineConfig({
  site: "https://chrisdodds.net",
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: "github-dark",
      wrap: true,
    },
    // Practical Typography: Enable smart quotes (curly quotes) and proper dashes
    remarkPlugins: [remarkSmartypants],
  },
});
