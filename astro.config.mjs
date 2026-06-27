import { readdirSync } from "node:fs";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import remarkSmartypants from "remark-smartypants";

// Posts live at /blog/YYYY-MM-DD-slug. Bounce the date-stripped /blog/slug to the
// real post so old/shared links without the date prefix don't 404.
// ponytail: on duplicate bare slugs (e.g. two publishing-updates), newest wins —
// readdir is lexically sorted = chronological, so the later file overwrites.
const dateStrippedRedirects = Object.fromEntries(
  readdirSync("./src/content/blog")
    .filter((f) => /\.mdx?$/.test(f))
    .map((f) => f.replace(/\.mdx?$/, ""))
    .filter((slug) => /^\d{4}-\d{2}-\d{2}-/.test(slug))
    .map((slug) => [`/blog/${slug.replace(/^\d{4}-\d{2}-\d{2}-/, "")}`, `/blog/${slug}`]),
);

// https://astro.build/config
export default defineConfig({
  site: "https://chrisdodds.net",
  // The post index lives at "/" (homepage = page 1). /blog has no index page of its
  // own (pagination starts at /blog/1), so bounce it — and old Hugo URLs — to "/".
  redirects: {
    ...dateStrippedRedirects,
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
