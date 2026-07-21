# Momentum — setup notes

Your site is live at `https://pryceyates.github.io/MobileWellness/`. This file covers the two things that still need your input to fully work: email signups and the placeholder footer links.

## Get the email signup working (~5 minutes)

There are two forms on the site that both need the same setup: the newsletter signup on the home page, and the contact form on the Implementation page. Both use the easiest no-code option, **Formspree** (free for up to 50 submissions/month):

1. Go to https://formspree.io and create a free account
2. Create a new form, name it whatever you like (e.g. "Momentum signups")
3. Formspree gives you a unique endpoint URL, something like `https://formspree.io/f/abcd1234`
4. Open `index.html`, find this line (search for `YOUR_FORM_ID`):
   ```html
   <form class="cta-form" id="cta-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
5. Replace `YOUR_FORM_ID` with your real ID from step 3, save, and re-upload `index.html`
6. Repeat for `implementation.html` — search for `YOUR_FORM_ID` there too. You can point both forms at the same Formspree form, or create a second one if you want signups and sales inquiries to land in separate inboxes
7. From then on, every submission lands in your Formspree dashboard, and Formspree emails you a notification for each one

Until you do this, both forms still work visually (no errors for visitors), but show a quiet console warning to anyone checking dev tools, rather than pretending to succeed. That's intentional — better to be honest that it's not connected yet than to fake a confirmation.

**Alternative**: Mailchimp or ConvertKit both offer embeddable signup forms with a similar amount of setup, if you'd rather your list live there instead of Formspree. Say the word and I'll swap the integration.

## Fix the placeholder footer/nav links

"Our products," "Instagram," "TikTok," and the "Shop" button in the nav all currently point to `#` (nowhere). Send me the real URLs for these and I'll drop them in across all 22 pages in one pass.

## What's already wired up

- Favicon and social share image (the preview card that shows up when this link is pasted into Slack, iMessage, etc.) are both in place
- All internal navigation, framework/challenge/study cross-links, and the daily challenge rotation work as-is, no further setup needed
- The Science page links out to real, verifiable studies

## Still worth doing eventually

- A real custom domain (instead of the `github.io` subdomain) — meaningfully changes how legitimate the site feels at first glance, and is about $12–15/year
- A privacy policy / terms page, if you ever collect real emails or run this past just your own team
- Real photography or team presence, if/when you want the site to feel less like an internal tool and more like a public-facing brand
