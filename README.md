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
| `/` | Name, searchable index, selected work, about, latest notes | |
| `/design/` | Case studies, illustration, branding | `src/content/design/` |
| `/art/` | Works and curatorial projects | `src/content/art/` |
| `/art/studio/` | Gallery of etchings, prints, watercolours and crafts, filterable by medium | `src/content/studio/` |
| `/notes/` | Microblog, plus `/notes/rss.xml` | `src/content/notes/` |
| `/teaching/` | Courses and workshops (linked from About and the footer) | `src/content/teaching/` |
| `/about/`, `/de/about/` | Bio and CV in English and German | `src/components/CV.astro` |
| `/work/` | Index of everything by year | generated |
| `/for/<name>/` | Unlisted selection for one application, not indexed | `src/content/selections/` |
| `/impressum/`, `/datenschutz/` | Required in Germany. Still placeholders | |

## Managing content

Every page comes from a Markdown file in `src/content/`, and images live in `public/media/`.
There are two ways to edit them, and both end up as the same files in this repository.

**1. In a browser or on your phone, with Pages CMS.** Go to https://app.pagescms.org, sign in
with GitHub and open `indro-portfolio`. You get forms for Notes, Studio, Design, Art and
Teaching, with image upload. Each save is a commit, so the site rebuilds by itself once hosting
is connected. The forms are defined in `.pages.yml`; if you add a field to
`src/content.config.ts`, add it there too. Unlisted `/for/` selections are Markdown only.

**2. In Markdown, on your computer.** Add or edit the files below, put images in
`public/media/<slug>/`, and check with `npm run dev` before committing. Setting `draft: true`
hides an entry on the live site but keeps it visible in `npm run dev`.

## Adding things in Markdown

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

**A studio piece** (etching, print, watercolour, drawing, craft): add `src/content/studio/<slug>.md`
with `title`, `year`, `medium` (one of etching, print, watercolour, drawing, digital, craft, other),
optional `technique` and `dimensions`, and `images`. Process photos go in a note with
`projects: [<slug>]`.

**A note:** add `src/content/notes/YYYY-MM-DD-something.md`:

```md
---
title: moss on tubing        # short label, used in the file name and RSS
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
