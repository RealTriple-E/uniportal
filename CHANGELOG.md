# Changelog

## 2026-10-07 — UniPortal Education family
- **UniPortal Education** created as a product family: the Products dropdown gains a first-position *Education* group (UniPortal Education → `/solutions/education/`, University/College, School); the two products leave *Institutional Technology*, which keeps HR & Payroll + Combo. Drawer leads with the family hub.
- **URL moves with redirects:** `/products/university-management/` → `/products/education/university-management/` and `/products/school-management/` → `/products/education/school-management/` (120 + 79 references rewritten across all pages + sitemap). Old paths remain as `noindex` meta-refresh stubs.
- `/products/` restructured to **5 tabs** (Education first) — counts stay honest at *11 products / 5 families* (the hub is a solutions page, not a 12th product).
- Reframes: `/solutions/education/` retitled **UniPortal Education** and marked as family hub; `/pricing/` titles/descriptions + "belongs to UniPortal Education" line; solutions index card.

## 2026-10-07 — Kora business line
- New product family **Business** with `Kora`: `/products/kora/` plus 6 industry sub-pages — `/products/kora/{retail,pharmacy,restaurants,salons,car-wash,wholesale}/` (36 routes + `404.html`, was 29 routes).
- Shared chrome updated on every page: Products dropdown gains a *Business* group, mobile drawer and footer link to Kora.
- `/products/` now has 4 tabs and counts *11 products / 4 families*; `/pricing/` lists Kora as scoped (no published price); `request-demo` product interest gains *Kora*.
- Cross-links from home, platform, 404, solutions index and the retail / hospitality / business-ai solution pages.
- Honesty rules held: shipped capability labelled `Working MVP` (`.tag.live`), planned capability labelled `Roadmap` (`.tag.concept`); no prices, no demo URL, no certification claims.
- Fixed: `.sr-only` was used on 8 pages but never defined in `main.css` — now defined.

## 2026-09-23 — Platform redesign v2.0 (unreleased to production)
- Rebuilt as 29-route static site: premium black (`#050505`) + orange (`#FF6A00`) system, Inter, no framework, no build step.
- New: `/platform /architecture /security /products/* /products/uniportal-ai /products/automation /athena /atlas /synthetic-data-studio /atlas-trainer /solutions/* /services /pricing /request-demo /contact /company /resources`, `404.html`, `sitemap.xml`, `robots.txt`, official logo `assets/img/uniportal-logo.png` (also used as favicon).
- Canonical brochure pricing restored (live site had conflicting lower prices — see `CONTENT_AUDIT.md`).
- Removed fabricated hero stats, testimonials, partner logos, discount claims, dead Formspree placeholder action.
- Forms: validated, WhatsApp handoff + mailto fallback (Formspree optional, see `FORMSPREE_SETUP.md`).
- Interactive: architecture explorer, scripted AI demos (badged), intelligence-loop stepper, tabs, accordions.
- Docs: `DESIGN.md`, `PAGES.md`, `CONTENT_AUDIT.md`, `DEPLOYMENT.md`, `QA_REPORT.md` (pending).
