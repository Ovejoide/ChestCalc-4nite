# ChestCalc 4nite

**Know your real odds. A free, browser-based calculator for Fortnite Treasure Hunt chest rewards.**

Fortnite does not tell you how many chests you have opened, and it definitely does not tell you how unlucky (or lucky) you are. ChestCalc 4nite does: log your chests by type and instantly see the probability that you should have found each reward by now, and how many more chests it takes to reach 50% or 90%.

**Live site:** https://YOUR-USERNAME.github.io/chestcalc-4nite/

---

## Features

- **Chest log by type.** Track Treasure, Rare and Spirit chests, or add your own custom types. Each type has separate counters for normal matches and Treasure Hours.
- **Count toggle.** Untick any chest type that should not count toward the odds.
- **Cumulative probability for every reward.** From Pirate Shop Access down to the Gizmo, based on the total number of chests you have opened.
- **Progress to 50%.** Pick the reward you are after and watch a progress bar fill up toward a 50% chance.
- **What-if projection.** See how your odds change if you open more chests, in normal matches or during Treasure Hours, and how many games that takes at your chests-per-game average.
- **Chests still needed.** How many more chests until you reach 50% and 90% for every reward.
- **Reference table.** Odds after 500, 2,000 and 10,000 chests, plus the number of chests needed for a 50% chance.
- **Editable drop rates.** If Epic changes the rates or runs a special boost, update the rates and Treasure Hours multipliers in the "Adjust rates" panel. Everything recalculates instantly.
- **English and Spanish.** English by default, Spanish one click away.
- **Private and offline friendly.** No account, no tracking, no backend. Your data is saved only in your own browser.

## How it works

The chance of getting a reward at least once after `N` chests is:

    P = 1 - (1 - 1/rate)^N

Every chest has the same chance as the first one, so opening more chests raises your cumulative odds but never makes the next chest "due". Chests opened during Treasure Hours use the boosted rate, and mixed totals are combined correctly. The math runs on logarithms, so it stays accurate even with hundreds of thousands of chests.

## Default drop rates

Per chest opened in a normal match, as published by Epic Games:

| Reward | Chance per chest | Treasure Hours boost |
| --- | --- | --- |
| Pirate Shop Access (Pirate Token) | 1 in 137,500 | x1.5 |
| Gold Outfit | 1 in 1,562,500 | x7.5 |
| Vehicle & Decal | 1 in 7,813 | x10 |
| Pickaxe or Back Bling | 1 in 568 | none |
| Jam Track | 1 in 391 | none |
| Loading Screen | 1 in 272 | none |
| Gizmo | 1 in 127 | none |

Epic can change these numbers or run special boosts at any time. Use the "Adjust rates" panel to match the current values.

## Usage

1. Open the site.
2. In **Chests opened**, enter how many chests you have opened of each type, in normal matches and in Treasure Hours. Use the + and - buttons or type the number.
3. Read your odds in **Your probability** and in the **Probability by reward** table.
4. Use **Chests you would open later** to project future odds.

By default every chest type uses the same drop rates. If a type has different rates, untick **Count** for it.

## Run it locally

No build step and no dependencies.

1. Download or clone this repository.
2. Open `index.html` in any modern browser.

## Project structure

```
index.html   page structure
styles.css   styling
app.js       calculations, translations and saved state
```

## Notes and limitations

- Odds are statistical, not a guarantee. Reaching 50% does not mean a reward is about to drop.
- Data is stored in your browser, so it is not shared between devices or browsers.
- The calculator assumes all counted chest types share the same drop rates.

## Disclaimer

ChestCalc 4nite is an unofficial fan project. It is not affiliated with, endorsed by or sponsored by Epic Games. Fortnite is a trademark of Epic Games, Inc.

## Credits

Drop rates come from the odds published by Epic Games for the Treasure Hunt event. Inspired by the Fortnite Chest Tracker guides.
