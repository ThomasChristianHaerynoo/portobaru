# Thomas Christian — Portfolio

Static, production-ready portfolio site. Plain HTML, CSS and JavaScript — **no build step, no dependencies to install.**

## Run it

Just open `index.html` in a browser, or serve the folder with any static server:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

Then visit `http://localhost:8000`.

## Deploy

Upload the entire folder to any static host — Netlify, Vercel, GitHub Pages, Cloudflare Pages, S3, or plain shared hosting. `index.html` is the entry point.

## Structure

```
index.html            Homepage (hero, project index, about)
sun-event.html        Case study — SUN Event
temudoc.html          Case study — TemuDoc
jobshunt.html         Case study — JobsHunt
vms.html              Case study — VMS (Visitor Management System)
edu-go.html           Case study — Edu-Go
iihs.html             Case study — IIHS
rs-teksolutions.html  Case study — RS TekSolutions
uvcell-solars.html    Case study — UVCell Solars
adibot.html           Case study — AdiBot
business-travel.html  Case study — Business Travel (Perjalanan Dinas)
css/main.css          Shared styles
js/main.js            Shared interactions (scroll reveal, counters, parallax)
img/                  All images
```

## Notes

- **Fonts** (Poppins, Space Grotesk, Manrope, JetBrains Mono) load from Google Fonts over the network. For a fully offline build, self-host them and update the `<link>` tags in each page's `<head>`.
- All pages share `css/main.css` and `js/main.js`; page-specific accents live in an inline `<style>` block in each file's `<head>`.
- No cookies, tracking, or third-party scripts beyond Google Fonts.
