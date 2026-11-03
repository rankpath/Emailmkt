# Emailmkt brand

Emailmkt by Adscraft uses the master logo 04 cat. The interface takes its colour from that mark. Poppins is the English face and Noto Sans Thai covers Thai text.

## Palette

| Role | Name | Hex | Use |
| --- | --- | --- | --- |
| Primary | Golden | `#FFB800` | Primary buttons, the active navigation marker, key highlights |
| Primary hover | Golden deep | `#E5A200` | Hover and pressed golden surfaces |
| Soft fill | Cap | `#FFD465` | Chips, badges, soft highlights |
| Section | Cream | `#FFF8E6` | Alternate section backgrounds |
| Surface | White | `#FFFFFF` | Cards and the page header |
| Text | Ink | `#170528` | Headings, body, and text on golden |
| Dark | Navy | `#111633` | Footer, workspace navigation, dark bands |
| Secondary | Purple | `#7646D6` | Links, small icons, the logo heart and “by Adscraft” |
| Tiny accent | Blush | `#FF9AA8` | Reserved for small decoration. Not used as a fill |

Text on golden is always Ink. White on `#FFB800` is about 1.7:1 and fails WCAG. Ink on golden is about 13:1. Purple on white is about 5.9:1, so it is safe for link text. A golden focus ring on white is below the 3:1 non-text requirement, so focus uses a 3px Ink outline with a golden halo.

## Shape

Cards and buttons use 14–20px corners and a soft ink shadow. The tone is friendly and still structured.

## Logo files

- `client/public/brand/logo-lockup.svg` on light surfaces
- `client/public/brand/logo-lockup-dark.svg` on navy
- `client/public/brand/logo-icon.svg` when the lockup does not fit
- `client/public/brand/logo-icon-mono-white.svg` for a single-colour mark
- `client/public/favicon.svg`, `favicon.ico`, `favicon-16.png`, `favicon-32.png`, `favicon-48.png`
- `client/public/apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `icon-512-transparent.png`
- `client/public/og-image.png`

Icon URLs use `?v=2`. The manifest `theme_color` is `#FFB800` so the browser bar matches the logo. Golden is light, so the browser draws dark status icons, which stay readable. `background_color` is `#FFF8E6`.

## Persistence

Projects stay in `localStorage` under `copymail-workspace-v1`.
