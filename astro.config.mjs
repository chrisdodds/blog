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
    // Technical posts now live on fishsticklabs.com — bounce old chrisdodds.net URLs there.
    "/blog/paycom-ai-layoffs": "https://fishsticklabs.com/blog/2025-10-01-paycom-ai-layoffs/",
    "/what-i-love-about-sre": "https://fishsticklabs.com/blog/2019-02-03-what-i-love-about-sre/",
    "/do-not-use-wildcard-alternate-domains-in-aws-cloudfront":
      "https://fishsticklabs.com/blog/2020-06-12-do-not-use-wildcard-alternate-domains-in-aws-cloudfront/",
    "/adventures-in-tuning-unicorn-for-kubernetes":
      "https://fishsticklabs.com/blog/2020-02-23-adventures-in-tuning-unicorn-for-kubernetes/",
    "/you-probably-shouldnt-be-using-kubernetes-for-your-new-startup":
      "https://fishsticklabs.com/blog/2019-11-03-you-probably-shouldnt-be-using-kubernetes-for-your-new-startup/",
    "/kubernetes-ec2-autoscaling-for-fun-and-profit":
      "https://fishsticklabs.com/blog/2019-05-01-kubernetes-ec2-autoscaling-for-fun-and-profit/",
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
