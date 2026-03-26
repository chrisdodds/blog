---
title: "Making the Necessary Cuts interactive fragment"
description: "A so-called engineer builds an ambient interactive fiction piece to market his novella"
pubDate: 2026-03-25
tags: ["projects", "writing"]
---

It's one thing to write a book, another thing to [get it published](/blog/2026-02-09-miami-novella-prize), and yet another thing to market it. I am very much out of my depth on the marketing side of things, but I'm trying.

I don't have an audience anymore. The one I had before I quit tech blogging wasn't massive, but it was something. I largely abandoned social media several years ago, so that's dead too. I know that SEO takes a while to come to a boil and there's a whole AI dynamic now that has changed the search landscape. Newsletters are king now along many axes, but I don't have a list anymore. So what to do? Where to start?

1. I put up a marketing site for [Necessary Cuts](https://necessarycuts.com) and cross-linked it across several of the web properties I own. It's a new domain name so that in itself will dampen the SEO juice, but you gotta start somewhere.

2. I wired up a fragment of the book to some low-key visuals and sounds and made an interactive narrative. [Check it out](https://necessarycuts.com/play.html).

Interactive narratives have interested me for a while. I've seen quite a few at this point but haven't really loved that many of them. I usually want them to be more ambiguous than they are. The potential feels like it's there and there are a least a few successful examples. [Kentucky Route Zero](https://kentuckyroutezero.com/) is a good one that comes to mind. I also like [Betwixt](https://apps.apple.com/app/betwixt-the-story-of-you/id1540472983), even though it sits a little closer to a "therapy" app.

This was an opportunity to play around with something basic and get a feel for how I might approach a larger work.

## What I made

I started by pulling three of the more cinematic/vibe-y scenes from the latest manuscript draft and turning them into a basic screenplay. I knew I wanted to keep it simple, so I limited myself to visuals that were CSS-only, no image assets. Initially, I played around with generated audio, but it was too limiting for what I wanted to do, so I pulled some clips from open source audio libraries (water lapping on a shore, a car driving away on gravel, etc.) and wired those to events in the text.

From there it was just a lot of tweaking. Find the pace, fine-tune timing and transitions, smooth out rough edges. I'm pretty happy with the result and it helped solidify what a future project might look like.

The project only uses vanilla JS, CSS, and HTML. The fanciest thing in it is some Web Audio API stuff that shapes the audio experience (looping, fade-ins/outs, dynamic volume, etc.). It's not really a game, per se; there's no real narrative branching or similar. But it *is* immersive, which I think is the main goal for something like this. Drop the user in the world of the book and let them soak up the vibe of it.

## What I learned

1. I actually like this type of design. The constraint of text + CSS means you have no place to hide and that's fun. You have to dial in on the details for it to work and when it does work, it really feels like it lands.
2. Developing something with a very exact "shape" for modern mobile web suuuuuuuucks. I had the desktop experience basically done in an evening. Getting everything dialed in on Mobile Safari took a lot longer.
3. It really feels like there's space for literary-flavored interactive narratives. I'm not sure it's a commercially viable niche, but it should exist as art. There should be more things like this. I would play them.

Will this give me an SEO boost? Will it help me build an email list? Maybe? I like it as art either way though.
