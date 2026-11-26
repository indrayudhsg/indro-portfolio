# indro-portfolio

Personal site of Indrayudh Sengupta: design work, art, teaching and notes. Built with
[Astro](https://astro.build) as a static site. All content is Markdown in `src/content/`.

## Run it

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

## Site structure

| URL | What | Content folder |
| --- | --- | --- |
| `/` | Intro, the two doors (Design, Art), latest 3 notes | |
| `/design/` | Case studies, illustration, branding | `src/content/design/` |
| `/art/` | Works and curatorial projects | `src/content/art/` |
| `/notes/` | Microblog, plus `/notes/rss.xml` | `src/content/notes/` |
| `/teaching/` | Courses and workshops (linked from About and the footer) | `src/content/teaching/` |
| `/about/`, `/de/about/` | Bio and CV in English and German | `src/components/CV.astro` |
| `/work/` | Index of everything by year | generated |
| `/for/<name>/` | Unlisted selection for one application, not indexed | `src/content/selections/` |
| `/impressum/`, `/datenschutz/` | Required in Germany. Still placeholders | |

## Adding things

**A design project:** add `src/content/design/<slug>.md`:

```md
---
title: Project title
year: 2024
client: Who it was for
role: What you did
summary: One or two sentences shown on cards.
kind: case-study        # or illustration, branding
tags: [UX, research]
cover: /media/<slug>/cover.jpg   # image in public/media/<slug>/
order: 3                # lower shows first
draft: true             # hidden on the live site until set to false
---

The case study text.
```

**An art work:** same idea in `src/content/art/`, with `medium`, `dimensions`, `credits` and
`exhibitions` instead of client and role. Use `kind: curatorial` for curatorial projects.

**A note:** add `src/content/notes/YYYY-MM-DD-something.md`:

```md
---
date: 2026-11-26
images:
  - { src: /media/notes/aquarium-01.jpg, alt: Moss on glass tubing }
projects: [through-a-glass-verdant]   # shows this note on that project's page
tags: [aquarium]
---

A few lines.
```

## Open TODOs

Search the code for `TODO` to find them. The main ones before going public: images, contact email,
Impressum and Datenschutz text, the domain in `astro.config.mjs`, and the artist statement.
