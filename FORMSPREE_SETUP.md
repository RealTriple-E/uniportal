# Formspree Setup (optional email backend)

**Status:** NOT configured. The request-demo and contact forms work today via WhatsApp handoff (+260 973 981 779) and `mailto:` fallback — no backend required.

To also receive submissions by email through Formspree:

1. Create a free account at `https://formspree.io` with destination `uniportal.hq@gmail.com`.
2. Create a form endpoint; copy the form ID (the `xxxx` in `https://formspree.io/f/xxxx`).
3. In `request-demo/index.html` and `contact/index.html`, find the `data-lead-form` element and add the endpoint as `data-formspree="xxxx"`.
4. In `assets/js/main.js`, inside the submit handler after validation, POST the field data as JSON to `https://formspree.io/f/xxxx` with `fetch` (fire-and-forget; the WhatsApp success panel still shows).

**Security rules (never break these):**
- The Formspree ID is public by design (it is a write-only endpoint key). No other secret ever goes in frontend code.
- Keep the honeypot field. Add Formspree's built-in spam filtering in the Formspree dashboard.
- Test end-to-end: submit → confirm email arrives at uniportal.hq@gmail.com → WhatsApp handoff still works.
