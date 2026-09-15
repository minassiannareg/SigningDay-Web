# Signing Day Advisors — logo files

Served from the site, so these have public URLs you can paste into an email
signature or hand to a printer:
`https://signingdayadvisors.com/brand/<filename>`

## Which file

| Use | File |
|---|---|
| Email signature, letterhead, anything on white | `sda-logo-horizontal-on-light-640.png` |
| Anything on navy or a dark photo | `sda-logo-horizontal-on-dark-640.png` |
| Square-ish space — social post, flyer, sponsor board | `sda-logo-stacked-on-light-*.png` / `-on-dark-*.png` |
| Profile picture, avatar, app icon | `sda-mark-on-navy-512.png` |
| Print, large format, or any resizing | the matching `.svg` |

PNGs come in several widths (`-640`, `-1280`, `-1920`). Pick one about twice
the size you will display it at, so it stays sharp on high-resolution screens.

## Email signature

Use the 640px file and set the display width to about 280px:

```html
<img src="https://signingdayadvisors.com/brand/sda-logo-horizontal-on-light-640.png"
     width="280" alt="Signing Day Advisors">
```

Set `width` and let the height follow; don't set both, or the logo will
stretch. Gmail, Outlook and Apple Mail all handle this the same way.

## Why the PNGs have a background

They are not transparent, deliberately. A transparent logo with navy type
vanishes in a dark-mode mail client, so the light version carries a white
plate and the dark version a navy one. The `.svg` files have no background
at all — use those wherever you control the surface.

## Clear space and minimum size

Keep space equal to the height of the feather on every side. Don't set the
horizontal lockup below about 180px wide, or the wordmark closes up — use
the stacked version or the mark on its own instead.

## Don't

Recolour it, add a shadow, stretch it, set it on a busy photograph, or
rebuild the lockup by placing the mark next to typed-out text — the ink
stroke runs under the wordmark at a fixed relationship and retyping it will
not match.

## Type

The wordmark is Fraunces 500, the same face as the site headings. The
outlines are embedded in the `.svg` files, so they render correctly on a
machine that doesn't have the font installed. Fraunces is licensed under the
SIL Open Font License, which permits this.
