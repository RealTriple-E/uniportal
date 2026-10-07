# Deployment — UniPortal website (GitHub Pages)

**Repo:** `RealTriple-E/uniportal` · **Branch:** `main` · **Workflow:** `.github/workflows/static.yml` (uploads repo root, deploys on push to `main`) · **Live:** `https://uniportal.dpdns.org/`

## What this redesign changes in the repo

The entire static site lives at the repo root (no build step — the workflow uploads raw files):

| This workspace (`site/`) | Repo destination |
|---|---|
| `index.html` | `index.html` (replace) |
| `*/index.html` (28 route dirs) | same paths (new) |
| `404.html` | `404.html` (new) |
| `assets/` | `assets/` (new) |
| `sitemap.xml`, `robots.txt` | repo root (new) |
| `FORMSPREE_SETUP.md` | repo root (docs only, not served as a page) |

Retire from the repo: `css/`, `js/`, `lib/`, `scss/`, `img/`, `*.md` duplicates (`README copy.md`, old DEPLOYMENT/FORMSPREE/IMAGES notes). Keep: `.github/workflows/static.yml` (untouched), `.nojekyll` (required — preserves `/assets/` paths; do NOT delete).

## Deploy steps (owner)

```bash
git clone https://github.com/RealTriple-E/uniportal
cd uniportal
# copy workspace site/ contents over repo root, remove retired dirs (see table)
git add -A && git commit -m "UniPortal platform redesign: premium black + orange, 29 routes" && git push origin main
```

Push triggers the Pages workflow (~1–2 min). Then verify `https://uniportal.dpdns.org/` + `/athena` + `/request-demo` + one pricing page, and confirm the custom domain is still attached in repo Settings → Pages (no CNAME file is used — domain lives in settings; do not add one).

## Rollback

Previous site is one commit: `git revert` the redesign commit and push. Keep a backup branch (`pre-redesign`) before replacing files.
