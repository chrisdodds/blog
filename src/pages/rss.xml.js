import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { loadRenderers } from "astro:container";
import { getContainerRenderer as getMDXRenderer } from "@astrojs/mdx";
import { SITE_TAGLINE } from "../config";

export async function GET(context) {
  const posts = (await getCollection("blog"))
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
  const renderers = await loadRenderers([getMDXRenderer()]);
  const container = await AstroContainer.create({ renderers });

  const items = await Promise.all(
    posts.map(async (post) => {
      const { Content } = await post.render();
      // Absolutize root-relative links/images so email clients (Buttondown) resolve them.
      const html = (await container.renderToString(Content)).replace(
        /(href|src)="\/(?!\/)/g,
        `$1="${context.site}`,
      );

      return {
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `/blog/${post.slug}/`,
        content: html,
      };
    })
  );

  return rss({
    title: "Chris Dodds",
    description: SITE_TAGLINE,
    site: context.site,
    items,
    customData: `<language>en-us</language>`,
  });
}

