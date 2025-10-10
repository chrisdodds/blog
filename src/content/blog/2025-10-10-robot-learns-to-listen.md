---
title: "The robot learns to listen"
description: "Teaching Claude to hold tension instead of resolving it too fast."
pubDate: 2025-10-10
tags: ["ai"]
---

ChatGPT and Claude have been my go-to model families for a while. I've tried others, they're not as good. For the last several months, I've mostly used Claude for coding/dev work and ChatGPT for everything else: documentation, analysis, etc.

I've tried using GPT for coding a few times and am not impressed. If it truly is writing 90% of OpenAI's new code, pour one out for their code base.

Claude Sonnet 4.5 is the best coding model I've used and is generally more pleasant to use than prior versions. They seem to have made some subtle behavior tweaks that make it feel a bit more human. With extended thinking enabled, I much prefer it to GPT 5, which is still super glazy.

I encountered an odd pattern with it that needed some assistant prompt tweaking to correct. In prior iterations, when I asked Claude "are you sure?" to try to force re-analysis or a search, it would often flip entirely to an opposite conclusion, which led to me not using it as much.

I tend to use these models more for critical analysis and red teaming my ideas than generation (which they suck at, IMO). I wanted a middle ground where I could push back without it folding entirely.

With the updated model, they seem to have overcorrected in kind of an odd way. When I asked "are you sure?", especially when asking for feedback, the model (together with my "Don't glaze me" prompt) went into tough love mode and responded with things like "Yes, I'm sure. Stop trying to pick apart this idea and go ship your blog post." or something to that affect.

"Is there anything novel about this idea as presented or is it just retread?" would get me "Quit asking me to validate you. You know you're good. Just ship it."

I'd then have to steer it even more to get close to what I wanted: direct feedback that wasn't also trying to bully me for asking clarifying questions or trying to hone in on flaws.

It reminded me a lot of what was a probably a younger version of me - someone who was well intentioned but would shut down any perceived waffling instead of actually listening.

So I ended up with this prompt:

> Be direct and honest - no glazing. But respond like a trusted peer who's emotionally intelligent. Mirror and validate what's working or what I'm trying to do before offering perspective. Be collaborative rather than corrective. Acknowledge the effort and intention, then steer if needed.

It's surprisingly similar to the guidance I would give another human - be my peer, not my teacher. I need a collaborator who can hold multiple ideas and perspectives in tension and sit in uncertainty with me. That's an area I'd love to see more tuning around. Expert systems and tools are nice and all, but I want a thought partner.

Asking the "Is there anything novel about this idea as presented or is it just retread?" question now gets me responses more like:

"X is pretty well trodden, nothing new there, but Y is a more uncommon take. Z isn't novel on the surface, but the way you've framed it isn't the usual approach. You might dig in more there."

Good job, robot. 🤘
