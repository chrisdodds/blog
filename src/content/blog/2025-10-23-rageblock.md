---
title: "RageBlock"
description: "A Firefox extension for blocking rage inducing mainstream media"
pubDate: 2025-10-21
tags: ["projects", "mental health"]
---

I built a Firefox extension that blocks mainstream news sites while keeping investigative journalism and wire services accessible. It's called [RageBlock](https://github.com/chrisdodds/rageblock).

I wanted it for myself.

I noticed that checking news sites made me feel worse without making me better informed. I'd feel anxious and angry, but I wouldn't actually know anything more useful than I did before. The information-to-anxiety ratio was terrible.

Cable news sites and major papers have optimized for clicks and engagement - and profit. That optimization twists facts toward grievance and keeps you in a constant state of low-grade anxiety. At least it does for me. Breaking news alerts. Live updates. The 24/7 outrage cycle.

Meanwhile, places like [ProPublica](https://www.propublica.org/) and [The Intercept](https://theintercept.com/) still do deep investigative reporting that actually matters. And the [AP](https://apnews.com/) and [Reuters](https://www.reuters.com/) still do a pretty good job of reporting facts. There is still plenty to be mad about, but less outright manipulation. They're not trying to keep you glued to the screen refreshing every five minutes.

I still want to stay informed. I still want to read long-form investigative pieces that actually dig into how things work and why. I just want to skip the outrage porn.

I looked for existing tools. There are content blockers that get reasonably close, but they require you to build your own list or block things in big chunks. Apple's parental and screen time controls are clunky. Nothing felt right.

So I vibe coded something closer to what I want: a curated list, some behavioral nudging, and some insight into my own patterns.

<div style="text-align: center;">
  <img src="/images/rageblock/blocked.png" alt="Blocked page view" style="max-width: 100%; height: auto;" />
</div>

<div style="text-align: center;">
  <img src="/images/rageblock/popup.png" alt="Extension popup" style="max-width: 100%; height: auto;" />
</div>

RageBlock has an opinionated blocklist by default. It blocks 60+ sites: CNN, Fox News, MSNBC, NYT, WaPo, Reddit, Twitter, Facebook, Instagram, TikTok, and most news aggregators. Full domains, including all subdomains.

When you hit a blocked site, you see a message with alternatives. You can bypass for 5 minutes or until midnight if you need to check something specific. But the default is blocked.

The extension tracks your blocks and bypasses from the past week. If you're bypassing too often, it shows reflection prompts. Gentle reminders to check in with yourself about why you're doing this.

When your bypass expires, instead of letting you scroll endlessly, an overlay appears. You have to actively choose to extend the bypass.

You can customize everything. Add your own blocked or allowed sites. Remove sites you don't want blocked. The allowed list takes precedence. Table stakes stuff.

## Building it

This was my first Firefox extension in a while. It's mostly web dev as long as you're not doing anything too crazy.

My initial attempt was to make it cross-browser, but I quickly discovered that the WebExtensions standard is a lie. Different APIs, different behaviors, different permissions models. So I punted and went Firefox-only since that's my browser anyway.

Vibe coding worked reasonably well for this. Most of it is boring scaffolding. I had to steer a few things: DRY this up, stop making this so complex, write tests that actually test the code instead of mocking the entire implementation.

The initial block list is pretty basic. I'll grow it over time as I figure out more things that make sense to block by default.

I debated adding local news sites. They're generally terrible and subject to the same click-optimization as the major sites. Still deciding what I want to do there.

## You might want this too

RageBlock is open source and available on [GitHub](https://github.com/chrisdodds/rageblock). It's MIT licensed. Do whatever you want with it.

It's also on the [Firefox AddOns](https://addons.mozilla.org/en-US/firefox/addon/rageblock/) store.

If you use Chrome, you'll have to port it yourself. I'm not dealing with Manifest V3 right now.

And if you think the default blocklist is wrong, PRs are welcome, or fork it and make your own. That's the point. Make the tools that work for you.

