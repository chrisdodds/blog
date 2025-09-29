# chrisdodds.net

Personal blog built with Astro and deployed to GitHub Pages.

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Writing Posts

Create a new markdown file in `src/content/blog/` with this structure:

```markdown
---
title: "Your Post Title"
description: "Brief description for previews"
pubDate: 2025-09-29
tags: ["tag1", "tag2"]
---

Your content here...
```

## Deployment

This site auto-deploys to GitHub Pages on push to `main`.

### Setup GitHub Pages

1. Go to your repo Settings → Pages
2. Source: "GitHub Actions"
3. Push to `main` branch

### Custom Domain (chrisdodds.net)

1. Add a `CNAME` file to `/public/` with your domain
2. Configure DNS:
   - Add A records pointing to GitHub's IPs
   - Or add CNAME record pointing to `yourusername.github.io`
3. In repo Settings → Pages, add your custom domain

## Tech Stack

- **Astro** - Static site generator
- **Markdown/MDX** - Content format
- **GitHub Pages** - Hosting
- **GitHub Actions** - CI/CD
