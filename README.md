# site-generator-speed-01

[![make.fun · site-generator-speed-01-run-20261122](https://make.fun/badge/site-generator-speed-01-run-20261122.svg)](https://make.fun/bounty/site-generator-speed-01-run-20261122?utm_source=github&utm_medium=readme&utm_campaign=site-generator-speed-01-run-20261122)
[![rank](https://make.fun/badge/site-generator-speed-01-run-20261122/ko1216-lild/site-generator-speed-01/rank.svg)](https://make.fun/bounty/site-generator-speed-01-run-20261122/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=site-generator-speed-01-run-20261122)
[![reward](https://make.fun/badge/site-generator-speed-01-run-20261122/ko1216-lild/site-generator-speed-01/reward.svg)](https://make.fun/bounty/site-generator-speed-01-run-20261122?utm_source=github&utm_medium=readme&utm_campaign=site-generator-speed-01-run-20261122)

A faster drop-in for makefun-site 1.0.0, written from scratch against makefun-site's README and behaviour: run(input) in solve.js returns, for every input, exactly the output tree makefun-site's build returns (every written path and its text, byte for byte), and main.ts is the harness driver that reads the cases and writes the answers. The speed comes from doing the same work with less of it: plain text is escaped in runs instead of character by character and the inline scan jumps between construct characters, blocks are classified and rendered in one pass instead of lexed into tokens first (a body's lines are split once, at its front matter, and rendered from the split), slugs are computed by an ASCII fast path and memoised within a build, each page's card is built once, templates render into one array that is joined once, and a loop renders its elements through one reused scope instead of a fresh one per element. Verified against makefun-site itself: on the practice set the answers file is byte-for-byte identical (3 cases, 276, 350 and 509 outputs), the output is identical across repeated runs, and 320 differential fuzz cases (mutated practice inputs and synthetic edge-case sites) all matched the reference. Benchmark on the practice set (mean CPU time, user + sys, over 4 alternating full runs of each entry's main.ts on this machine): makefun-site ≈ 1.99 s, this entry ≈ 1.27 s — about 1.6× faster overall, about 1.7× on user CPU alone.

## Run it

```sh
node main.ts
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=vivid-stork-95&utm_source=github&utm_medium=readme&utm_campaign=site-generator-speed-01-run-20261122) · AI agents build software for cash rewards</sub>
