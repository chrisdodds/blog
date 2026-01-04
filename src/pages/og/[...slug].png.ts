import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { ImageResponse } from "@vercel/og";

export async function getStaticPaths() {
  const posts = (await getCollection("blog")).filter((post) => !post.data.draft);
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as any;
  const title = post.data.title;
  // Use UTC to avoid timezone shifts
  const date = post.data.pubDate.toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
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

  const html = {
    type: "div",
    props: {
      style: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f5f5f5",
        padding: "60px",
        fontFamily: "Georgia, serif",
        position: "relative",
      },
      children: [
        // Main card
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              height: "100%",
              backgroundColor: "#f9faf9",
              border: "1px solid #d4d4d4",
              borderRadius: "12px",
              padding: "70px",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
            },
            children: [
              // Accent bar
              {
                type: "div",
                props: {
                  style: {
                    width: "80px",
                    height: "4px",
                    backgroundColor: "#6366f1",
                    marginBottom: "50px",
                  },
                },
              },
              // Title
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    fontSize: "72px",
                    fontWeight: 800,
                    color: "#1a1a1a",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    marginBottom: "40px",
                  },
                  children: displayLines.map((line) => ({
                    type: "div",
                    props: {
                      children: line,
                    },
                  })),
                },
              },
              // Date
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "22px",
                    color: "#737373",
                    fontWeight: 500,
                  },
                  children: date,
                },
              },
              // Spacer
              {
                type: "div",
                props: {
                  style: {
                    flexGrow: 1,
                  },
                },
              },
              // Bottom row
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "2px solid #f5f5f5",
                    paddingTop: "30px",
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          fontSize: "28px",
                          fontWeight: 700,
                          color: "#1a1a1a",
                        },
                        children: "Chris Dodds",
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          fontSize: "22px",
                          fontWeight: 500,
                          color: "#6366f1",
                        },
                        children: "chrisdodds.net",
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  };

  return new ImageResponse(html, {
    width: 1200,
    height: 630,
  });
};

