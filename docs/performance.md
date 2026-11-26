# Performance notes

## Audit environment

Lighthouse 13.6.0 ran against the production alias with desktop Chromium from Playwright. Synthetic desktop throttling was used for the comparable iterations. The Windows host showed substantial CPU contention, so paired runs are reported instead of a single crowned score.

## Measured iterations

| Iteration | Performance | LCP | Total blocking time | Speed index |
| --- | ---: | ---: | ---: | ---: |
| Initial production build | 32 | 4.1 s | 3,900 ms | 6.7 s |
| Optional font display, deferred demo, solid header | 43 | 2.5 s | 1,800 ms | 3.7 s |
| Viewport-gated demo | 57 | 1.6 s | 750 ms | 2.7 s |
| Local SVG icons | 58 | 1.5 s | 710 ms | 2.5 s |
| Later paired run A | 32 | 4.2 s | 4,260 ms | 6.2 s |
| Later paired run B | 36 | 3.4 s | 3,510 ms | 4.7 s |

The later pair loaded the same JavaScript assets as the 58-score run. The score change tracked main-thread task time rather than a new network or bundle regression. A provided-throttling control run was also unstable and returned no trustworthy comparison.

Accessibility, best practices, and SEO scored 100 in every completed audit.

## Shipped improvements

- Fonts use `display: optional` to avoid late swaps that delay the headline.
- The interactive landing demo is code-split and mounts only when its table approaches the viewport.
- Primary navigation is server-rendered.
- The header uses a solid background instead of backdrop blur.
- Local SVG icons replace the external icon runtime.
- Public card APIs use shared cache headers while progress stays dynamic.
- The initial page avoids runtime font and catalog network requests.

## Remaining limitation

The 95 performance target from the original brief is not verified. The best local synthetic run reached 58, and later runs were dominated by host CPU contention. A stable PageSpeed Insights or remote Lighthouse run is required before claiming a higher score.

If further performance work is requested, the highest-value next steps are:

1. Run the audit from a stable remote Chromium environment.
2. Convert the 100-card library grid to server-rendered filtering so the cards do not hydrate as one large client tree.
3. Subset the display font to the exact public character set and compare LCP with a metric-adjusted fallback.
4. Re-audit after the host is idle and keep the paired results.
