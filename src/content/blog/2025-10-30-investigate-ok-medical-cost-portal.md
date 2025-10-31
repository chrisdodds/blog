---
title: "Investigating Oklahoma's new medical cost transparency site"
description: "Playing with some light data science and figuring out it's all smoke and mirrors."
pubDate: 2025-10-30
tags: ["projects", "learning"]
---

Oklahoma launched a [new portal for medical cost data](https://oklahomahospitalpricefinder.patientrightsadvocate.org/) because the [federal one](https://www.cms.gov/priorities/key-initiatives/hospital-price-transparency) sucks and enforcement has been minimal. Unfortunately, the Oklahoma one also sucks.

The main issue with the federal portal is that it's a raw data dump and the information as served is almost completely un-usable because of formatting inconsistency and missing data.

Oklahoma's is a slight improvement in that it's filtered down to the state level, but it's operating on similar flawed premises.

1. The only real consumer shopping that happens in medicine is for elective procedures, and even that's limited. Most people just go where-ever their insurance tells them they can go. This seems to be a misunderstanding (probably intentionally so) at the legislative level.

2. Even if we all did shop for procedures that way, the portal designs are backwards.

What do I mean by backwards? In most price comparison flows, one would start with the item or service they wanted, then compare a list of vendors with listed prices. Think bankrate.com as an example.

On the OK portal, you start by selecting a hospital or facility, then filter to procedures. You could obviously build your own comparison spreadsheet by manually clicking through several different facilities, but the UX is so user-hostile I can't imagine anyone bothering. And positioning it as a consumer aid feels disingenuous.

That led me to a short investigation of "what would it take to do this properly?"

## A small POC

### 1. Get the data

I tried a few things here. First -  could I get it from the OK portal since that's already filtered to OK. No. Their terms of service don't allow any kind of export, there didn't seem to be an API to talk to, and given their UI, orchestrating some sort of scraping would be painful.

Can I get it from the federal portal? Yes, but it's a vast ocean of garbage. There didn't appear to be any way to pre-filter, so you basically have to slurp down everything and run it through a map reduce cluster or something similar to clean it up. I didn't feel like setting up that infrastructure for this.

So I just went to the websites for Oklahoma's two largest medical providers and downloaded the data directly. That's  where things started getting interesting and explained some of OK portal's design choices.

One thing that stood out immediately - providers split out their data by facility. Why? Because it appears they're just dumping it straight out of their practice management software, which has it split by facility - and because the regulation is around *facility fees*. Hold on to that term because it becomes important later. This tells me that the OK portal's UI is probably driven by the underlying data schema, which no one has inverted.

### 2. Look at the data

The data for two similar-sized/capable hospitals was massively different. One CSV was ~300k. The other was 5GB.

Luckily, it was in the roughly the same format (I think both systems use [Epic](https://www.epic.com/)), so I didn't have to mess with my analysis scripts much.

I picked colonoscopies as a procedure to filter on because there are relatively few variants of it versus some other procedures that have hundreds of related and overlapping CPT codes.

So what does **CPT 45378 - diagnostic screening colonoscopy**, cost if you pay cash at these two providers?

* Provider 1 - $920
* Provider 2 - $1,885

OK, that's helpful, but what's this? The provider with the smaller file and cheaper price actually has more useful data in it than the larger file. It included *provider fee* examples and ranges - these are the fees charged by the person actually performing the procedure. The prices above are just the *facility fees* - what the hospital charges to have the procedure there.

Now we have:

* Provider 1 - $2,364-$8,961
* Provider 2 - $1,885 + some unknown value

So getting full apples to apples is pretty much impossible with this data. You can proxy through the facility cost, but you're not going to know the actual cost outside of that.

The data sets do contain insurance provider negotiated rates, which were also interesting. In this case, just looking at Provider 1:

* BCBS pays $2,267
* Cigna pays $7,695

"So what?" you say. "It doesn't matter because my insurance will cover it." Oh no, my friend. Say you have a decent plan with 20% coinsurance. That's the different between $453 and $1,539 out of pocket cost.

## What did I learn?

1. Medical cost transparency data is probably the best example of malicious compliance I have come across. "We have to publish our pricing data? OK, here's a tome of unsorted hieroglyphics." This data is no where close to usable by the average consumer.

2. "In-network" is just means "we talked and have (waves hand)... some agreement". Negotiated rate is the core factor, and the best rates are going to go to who has the most clout, which is probably going to be the in-state insurers. BCBS is better positioned for this than Cigna/United, I think. This is another area where misaligned incentives cut us though. There's nothing compelling an insurer to negotiate harder as long as they're collecting premiums and their [15-20%](https://www.healthcare.gov/health-care-law-protections/rate-review/) grows in absolute terms.

3. As-is, these transparency laws do very little. They are theatre.

## What I still have questions about

1. What could you do with this data? For elective procedures, I think you could put in a little work and provide some sort of heavily-caveated consumer-friendly data set, but I don't know that it would actually move the needle broadly. Maybe I'm undervaluing electives and individual consumer power.

2. Who could actually use this data? Probably self-insured employers. They hire brokers who should help steer them toward cost-efficent systems, but don't because the incentives aren't aligned. (Most brokers make % of premiums, not savings). But, if you could construct a decent, human consumable data set and put it in front of large employers and they start pushing their employees to lower cost providers, you could probably nudge the big cost needle pretty hard.

3. What's missing from this data? Obviously, provider fees are a big miss. Granted, that would add complexity. It fractures the CPT code maze even further when you add the entropy of different doctor fees. Some providers are figuring out how to do it though. I think one major missing piece is quality ratings. Doug's House of Surgery and Hotdogs might be the lowest cost, but do I really want to go there?

4. Is there potential to do some investigative journalism here? Probably, but "X hospital charges 2x more than Y hospital" seems like a story that would barely register on anyone's radar. "Your insurance company sucks at negotiating because they get paid either way" might be more compelling. More to think on here.

I may pick some of this up again. I think there's lots of interesting data to dig through here and things to learn. I'm not sure what I'll do with the knowledge, but if nothing else maybe I can get through the arc of "this seems fixable" -> "omg, this is irretrievably broken" -> "actually, if we press here and here we might accomplish something."
