---
title: "Fish Stick: Stateless Incident Management"
description: "Built an incident management bot for Slack. No database, no complexity, just what you need."
pubDate: 2025-10-25
tags: ["projects", "work"]
---

I released [Fish Stick](https://github.com/chrisdodds/fishstick), a stateless incident management bot for Slack. Written it up over at [Fishstick Labs](https://fishsticklabs.com/blog/2025-10-25-fishstick-stateless-incident-management/).

This is the sixth or seventh time I've built this bot at different jobs. Figured it was time to stop reinventing the wheel and ship something I could reuse (and that others could use too). I've actually had a multi-tenant version of this sitting in a folder for several years, but decided to rip all that stuff out and lean into simplicity and OSS.

Most incident management tools are either too basic (Slack workflows that can't do enough) or way too complex (enterprise platforms with a thousand knobs you'll never touch). Fish Stick sits in the sweet spot - does what you actually need without making you wade through (and pay for) features you don't.

The interesting technical bit: it's completely stateless. No database, no web UI, no OAuth dance. Slack _is_ the database. Channel properties hold metadata, messages are the timeline, pinned messages are the summary. You can restart the bot whenever and lose nothing. Obviously there are some data durability and keeping-up-with-Slack-API tradeoffs there, but I think it works for this niche and use case. Design constraints for the win.

Check out the [full writeup](https://fishsticklabs.com/blog/2025-10-25-fishstick-stateless-incident-management/) for details on features, architecture decisions, and setup. It's MIT licensed on [GitHub](https://github.com/chrisdodds/fishstick).
