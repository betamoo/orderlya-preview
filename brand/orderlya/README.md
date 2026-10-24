# Orderlya — brand assets

The platform is now **Orderlya** (orderlya.com). These are the drop-in logo + theme assets for the
landing page and, later, the platform UI. **SVGs are the source of truth** — the wordmark letters are
outlined vectors (from IBM Plex / Familjen Grotesk), so the logo renders identically everywhere with no
font install. PNGs are provided only where SVG isn't accepted (favicons, social).

## The idea (one line)
Orderlya = **order + ‑lya (ليّا, "for me")** = *"order for me."* The **"O" is a round table**, the
**chairs arrange themselves around it** (the signature animation) — order, done for you.

## Files

| File | Use |
|------|-----|
| `orderlya-wordmark.svg` / `-white.svg` | **Primary logo** — the O-table set into the word (two-tone: *order* ink, *lya* amber). `-white` for dark backgrounds. |
| `orderlya-wordmark-clean.svg` / `-white.svg` | Small-size wordmark — the "o" is a plain ring (chairs dropped) so it stays legible ≤ ~24px tall. |
| `orderlya-mark.svg` / `-white.svg` | The **O-table mark** alone (table + chairs). Logo icon, standalone. |
| `orderlya-lockup-ar.svg` / `-white.svg` | **Arabic** lockup — أوردرليا with the O-table as the leading (RTL) mark, "ليا" in amber. |
| `orderlya-app-icon.svg` | White O-table on an ink tile. App / launcher / social avatar. |
| `orderlya-favicon.svg` | Bolder version for small favicons. |
| `favicon-32.png` · `apple-touch-icon-180.png` · `icon-512.png` | Raster icons for `<head>` / manifest. |
| `orderlya-wordmark-1200.png` · `orderlya-mark-256.png` | Rasters for social / slides. |
| `orderlya-logo.js` | Reusable animator for the arranging chairs (ES module). |
| `orderlya-mark-animated.html` | Self-contained working example of the animated mark — lift the markup + `<script>`. |
| `tokens.css` / `tokens.json` | Design tokens (colour + fonts). |

## The three sizes (one idea)
- **Chaired O-in-word** (`orderlya-wordmark.svg`) — expressive primary: headers, hero, packaging.
- **Clean ring-o** (`orderlya-wordmark-clean.svg`) — small UI / body, where chairs would get noisy.
- **Standalone O-table** (`orderlya-mark.svg` / app icon) — plus the loading/hero animation.

## Colours
| Token | Hex | Role |
|-------|-----|------|
| Ink | `#171512` | text, ring, chairs |
| Amber | `#E9A23A` | accent — chairs pattern, "lya", CTAs (use `#8A5E12` for amber **text** on light) |
| Wood | `#A6713F` | the tabletop tone |
| Paper | `#FFFFFF` | light ground |
| Night | `#100F0E` | dark ground |

**Contrast is a hard rule:** ink on white/night — never dark text on a warm/brown fill.

## Type
- **Latin — Familjen Grotesk** (SemiBold display, lowercase, tight). The logo files are outlined, so you
  only need the webfont for surrounding UI copy.
- **Arabic — IBM Plex Sans Arabic** (Cairo as a warmer alternate).

## Web usage
```html
<link rel="icon" type="image/svg+xml" href="/brand/orderlya/orderlya-favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/brand/orderlya/favicon-32.png">
<link rel="apple-touch-icon" sizes="180x180" href="/brand/orderlya/apple-touch-icon-180.png">
```
```html
<!-- logo -->
<img src="/brand/orderlya/orderlya-wordmark.svg" alt="Orderlya" style="height:44px;width:auto">
<!-- on a dark header -->
<img src="/brand/orderlya/orderlya-wordmark-white.svg" alt="Orderlya" style="height:44px">
<!-- Arabic / RTL -->
<img src="/brand/orderlya/orderlya-lockup-ar.svg" alt="أوردرليا" style="height:48px">
```

### Animated mark (hero / splash / loading)
See `orderlya-mark-animated.html`. In short: keep the ring static, let `orderlya-logo.js` build + animate the chairs.
```html
<svg id="mark" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="24" fill="#A6713F"></circle>
  <circle cx="50" cy="50" r="24" fill="none" stroke="#171512" stroke-width="7"></circle>
  <g class="orderlya-chairs"></g>
</svg>
<script type="module">
  import { animateOrderlyaMark } from '/brand/orderlya/orderlya-logo.js';
  animateOrderlyaMark(document.getElementById('mark'));
</script>
```
The chairs gather, rotate into place (deterministic, ~1.7s, ease-out, staggered), then hold with a slow idle
turn. Respects `prefers-reduced-motion` (renders the settled state).

## Don'ts
Don't recolour the accent arbitrarily · don't put dark text on brown · don't use random scatter or bouncy
easing · don't add plates/cutlery/checkmark/chat-bubble · at small sizes drop to the clean ring-o.

---
*Name/domain still pending formal trademark clearance (EGYPO · SAIP · EUIPO, classes 9 & 42). Full design brief:*
*https://claude.ai/code/artifact/6e3d2388-2d8b-4c37-b8e5-801fd47d8b57*
