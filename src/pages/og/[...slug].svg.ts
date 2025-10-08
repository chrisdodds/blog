import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

export async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as any;
  const title = post.data.title;
  const date = post.data.pubDate.toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Wrap text to fit in the card
  const maxCharsPerLine = 30;
  const words = title.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    if ((currentLine + word).length > maxCharsPerLine) {
      lines.push(currentLine.trim());
      currentLine = word + " ";
    } else {
      currentLine += word + " ";
    }
  }
  if (currentLine.trim()) {
    lines.push(currentLine.trim());
  }

  // Limit to 3 lines
  const displayLines = lines.slice(0, 3);
  if (lines.length > 3) {
    displayLines[2] = displayLines[2].substring(0, maxCharsPerLine - 3) + "...";
  }

  const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&amp;display=swap');
    </style>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="#fafafa"/>

  <!-- Border -->
  <rect x="0" y="0" width="1200" height="630" fill="none" stroke="#e5e5e5" stroke-width="2"/>

  <!-- Content container -->
  <g transform="translate(80, 0)">
    <!-- Title -->
    ${displayLines
      .map(
        (line, i) => `
    <text
      x="0"
      y="${240 + i * 70}"
      font-family="Inter, -apple-system, sans-serif"
      font-size="56"
      font-weight="700"
      fill="#1a1a1a"
      letter-spacing="-0.02em"
    >${escapeXml(line)}</text>`
      )
      .join("")}

    <!-- Date -->
    <text
      x="0"
      y="${240 + displayLines.length * 70 + 60}"
      font-family="Inter, -apple-system, sans-serif"
      font-size="28"
      fill="#737373"
    >${escapeXml(date)}</text>

    <!-- Author name -->
    <text
      x="0"
      y="570"
      font-family="Inter, -apple-system, sans-serif"
      font-size="32"
      font-weight="600"
      fill="#404040"
    >Chris Dodds</text>

    <!-- Site URL -->
    <text
      x="1040"
      y="570"
      font-family="Inter, -apple-system, sans-serif"
      font-size="24"
      fill="#a3a3a3"
      text-anchor="end"
    >chrisdodds.net</text>
  </g>
</svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
