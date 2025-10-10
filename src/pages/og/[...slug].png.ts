import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { ImageResponse } from "@vercel/og";

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
        background: "linear-gradient(to bottom right, #ffffff 0%, #f5f5f5 100%)",
        padding: "0px",
        fontFamily: "Inter, -apple-system, sans-serif",
        position: "relative",
      },
      children: [
        // Geometric accent shapes
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: "-80px",
              right: "-80px",
              width: "300px",
              height: "300px",
              border: "40px solid #1a1a1a",
              borderRadius: "50%",
              opacity: 0.04,
            },
          },
        },
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              bottom: "-100px",
              left: "-100px",
              width: "250px",
              height: "250px",
              backgroundColor: "#1a1a1a",
              opacity: 0.03,
              transform: "rotate(45deg)",
            },
          },
        },
        // Content wrapper
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              height: "100%",
              position: "relative",
              zIndex: 1,
              padding: "80px",
            },
            children: [
              // Small label
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "20px",
                    fontWeight: 600,
                    color: "#737373",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    marginBottom: "60px",
                  },
                  children: "Blog Post",
                },
              },
              // Title with emphasis
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    fontSize: "84px",
                    fontWeight: 900,
                    color: "#1a1a1a",
                    letterSpacing: "-0.05em",
                    lineHeight: 0.92,
                    marginBottom: "50px",
                  },
                  children: displayLines.map((line) => ({
                    type: "div",
                    props: {
                      children: line,
                    },
                  })),
                },
              },
              // Date with box
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    fontSize: "24px",
                    color: "#1a1a1a",
                    fontWeight: 600,
                    backgroundColor: "#fafafa",
                    padding: "12px 24px",
                    border: "2px solid #e5e5e5",
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
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          fontSize: "34px",
                          fontWeight: 900,
                          color: "#1a1a1a",
                        },
                        children: "Chris Dodds",
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          fontSize: "24px",
                          fontWeight: 500,
                          color: "#737373",
                          backgroundColor: "#ffffff",
                          padding: "8px 16px",
                          border: "1px solid #e5e5e5",
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

