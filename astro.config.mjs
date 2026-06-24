import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import remarkSmartypants from "remark-smartypants";

// https://astro.build/config
export default defineConfig({
  site: "https://chrisdodds.net",
  // The post index lives at "/" (homepage = page 1). /blog has no index page of its
  // own (pagination starts at /blog/1), so bounce it — and old Hugo URLs — to "/".
  redirects: {
    "/blog": "/",
    "/super-power-saying-no": "/",
    "/how-to-it-kick-chaos-in-the-face": "/",
    "/admit-your-struggles-help-others": "/",
    "/blog/paycom-ai-layoffs": "/",
  },
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
