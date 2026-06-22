import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import remarkSmartypants from "remark-smartypants";

// https://astro.build/config
export default defineConfig({
  site: "https://chrisdodds.net",
  // Old Hugo URLs with no equivalent on the new site — bounce to /blog instead of 404ing.
  redirects: {
    "/super-power-saying-no": "/blog",
    "/how-to-it-kick-chaos-in-the-face": "/blog",
    "/admit-your-struggles-help-others": "/blog",
    "/blog/paycom-ai-layoffs": "/blog",
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
