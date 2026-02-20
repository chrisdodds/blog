---
title: "Prediction markets are casinos (I checked)"
description: "Techbros claim they're printing money on Kalshi. I built a weather-trading bot, poked at the markets, and confirmed: it's a casino."
pubDate: 2026-02-19
tags: ["projects", "learning"]
draft: false
---

I kept seeing people talk about making bank on [Kalshi](https://kalshi.com). It's a prediction market: you buy contracts on whether something will happen (temperature, TSA numbers, whatever). "I'm just trading on information," etc. I wanted to see what was actually there, so I had Claude Code build a bot. It also helped with a good deal of the math because I had a football coach for a high school math teacher.

## What do?

First, weather, which for the record is a really stupid thing to bet on. Kalshi has temperature markets. Will NYC hit 45°F or above tomorrow, will Austin stay below 85°F, that kind of thing. I pulled [GFS](https://nomads.ncep.noaa.gov/) (NOAA's Global Forecast System, via NCEP) weather model runs, bias-corrected against [NWS](https://www.weather.gov) (National Weather Service) history per city, turned that into probabilities for each temperature range, and compared to what the market was charging. When the market overpriced "it will hit this range" (YES) I bought "it won't" (NO). Pay 40–60¢, collect $1 if the temperature stays outside that range.

First live run was a bloodbath. I (accidentally) had YES and NO both enabled. Twenty trades. 17 YES, 3 NO. The YES trades all lost. The NO trades won. Portfolio went $50 → $16. I turned off YES and re-ran a backtest on 678 past days where we know what actually happened. YES win rate was 12–25% no matter how I set the "minimum edge" cutoff. NO on the same data: 86% win rate, which was too good to be true (can't trust backtest), but was at least a signal. The model doesn't predict *which* bracket will hit but it's decent at spotting brackets the market overprices. So the only viable strategy was NO-only.

Even then the margins are thin. I added filters:

* No same-day trading. By then the forecast is stale and you're betting against thermometers that already know the answer. Win rate was ~80% same-day vs 88% day-ahead.
* Skip temperature ranges within 3°F of where the model says the high will land (model is worst there)
* Blacklist cities where the ensemble is garbage. LA marine layer, Miami highs (weird cloud stuff, I think)

When NWS forecast and GFS disagreed by more than 5°F I skipped the trade. With all that I'm currently at 60% win rate live on NO, a few bucks a week on a $50 bankroll. The filters are the edge. More conservative = more profitable per trade.

## TSA any better?

While the weather bot was collecting data, I kicked off an investigation of TSA checkpoint volumes, because that is yet another stupid thing you can bet on. Will average daily passengers be above 2.2M, 2.3M, etc. I scraped [TSA.gov](https://www.tsa.gov/travel/passenger-volumes) (daily checkpoint numbers) and built a model with:

* weighted same-day-of-week rolling average
* year-over-year anchor
* holiday filtering

I also added an LLM layer to check for near-term events, but it can only *widen* uncertainty, never shift the mean. I didn't play around with it a ton once I realized that the only reasonable trades were going to happen after most of the week's passenger numbers were reported, and that would be expensive, because everyone would buy at the same time (when those numbers hit).

The other TSA bot guy ([Ferraiolo](https://ferraijv.github.io/kalshi_tsa_trading_bot_overview/)) was pretty pessimistic about this market and that proved out. Not enough people on the other side of the trade. You can only put maybe $20/week in before you're moving the market. Same structural stuff everywhere: cheap "lottery ticket" contracts lose, pricier ones do a bit better; posting your own price (maker) beats taking someone else's (taker); fees eat longshots alive.

## The house always wins

I looked at other Kalshi categories too. Gas, CPI (consumer price index), whatever. There's a [University College Dublin analysis](https://karlwhelan.com/sports-betting-kalshi-prediction-market/) (Whelan et al., 300K+ contracts) that finds the same thing everywhere. Cheap contracts (under 10¢) lose 60%+ of invested money on average (i.e. capital loss, not just loss rate per trade). Contracts above 50¢ earn small positive returns. So the "edge" isn't magic. It's betting on the likely outcome, posting your price and waiting, and not chasing lottery tickets.

The dangerous part is the framing. Prediction markets get sold as information aggregation, "put your money where your mouth is," sounding rational and humble about uncertainty. That makes it sound like the smart or well-informed win. They don't. The structure wins. The people buying cheap YES contracts (the longshots, the "maybe this time" bets) are the ones losing 60%+ of their money to fees and stacked odds. People most at risk are those who think they have an edge because they follow the news or did some research. Even my little experiment here probably has an expiration date. I'm no quant, but neither are the people posting about their "earnings." Unless they got in super early while the market was still flapping around, it's just survivorship bias.

Because it's dressed up as trading or forecasting instead of gambling, people who'd never sit down at a blackjack table (a well-played hand has better odds than this) will sink money in thinking they're doing something rational. It's a casino with a think-tank aesthetic.

I got the weather bot profitable-ish by turning off half the strategy, blacklisting cities, and adding a pile of filters. It'll probably make a little money at a glacial pace. If you're buying YES on the cheap longshot contracts, that's just straight-up gambling. It *was* fun to build though and I learned some stat and weather stuff.
