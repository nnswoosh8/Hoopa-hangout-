# The Hoopa Hangout: thehoopahangout.com

Direct-booking website for The Hoopa Hangout (Arnold, CA · 4 BR / 3 BA · sleeps 11),
integrated with **OwnerRez** for live availability, quotes and checkout.

It's a plain static site with no build step: `index.html`, `assets/css`, `assets/js`, `assets/img`.

## 1. Connect OwnerRez (booking widget)

1. In OwnerRez: **Settings → Widgets → Create Widget** (under Websites).
   Choose **Booking/Inquiry** (calendar + instant quote + Book Now) for *The Hoopa Hangout* (property ID 360563).
2. In the widget's settings, allow the domains `thehoopahangout.com` and `www.thehoopahangout.com`.
3. Copy the widget's embed code and paste it into `assets/js/config.js` → `bookingWidgetHtml`.
4. Optional: create a **Review** widget and paste it into `reviewsWidgetHtml`, or list reviews manually in `reviews`.
5. Make sure a payment processor (Stripe, etc.) and a rental agreement are set up in OwnerRez so direct bookings can check out.

> The OwnerRez **"WordPress Plugin + Integrated Websites"** premium is currently *off* on this account.
> This site doesn't need it, because widgets are part of the standard plan. Turn it on only if you later want
> listing content or reviews pulled automatically through the API.

## 2. Add content

- **Photos:** put images in `assets/img/` (`hero.jpg`, `living.jpg`, `kitchen.jpg`, `bedroom1.jpg`, `deck.jpg`, `bunk.jpg`),
  or change the list in `config.js → gallery`. Aim for about 2000px wide JPGs under 400 KB each.
- **Copy:** search `index.html` for `TODO`: description, bed types, amenities, local attractions, FAQ policies.
- **Contact:** set `email` / `phone` in `config.js`.

## 3. Host it on thehoopahangout.com (GitHub Pages, free)

1. Merge this branch to `main`.
2. In the GitHub repo: **Settings → Pages → Source: Deploy from branch → `main` / root**.
3. Under **Custom domain**, enter `thehoopahangout.com` (the `CNAME` file already contains it), then tick **Enforce HTTPS** once it's available.
4. At your domain registrar, add these DNS records:

| Type  | Host | Value |
|-------|------|-------|
| A     | @    | 185.199.108.153 |
| A     | @    | 185.199.109.153 |
| A     | @    | 185.199.110.153 |
| A     | @    | 185.199.111.153 |
| CNAME | www  | `<your-github-username>.github.io` |

DNS can take up to 24 hours to propagate. Netlify, Cloudflare Pages or Vercel also work: just point them at the repo root.

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```
