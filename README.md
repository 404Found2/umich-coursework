# UMich Coursework

The University of Michigan EECS Honor Code strictly prohibits the public publication of course project source code, direct implementation details, or private instructional materials. In compliance with these academic integrity policies, this website hosts strictly conceptual notes, structural overviews, and high-level lessons learned. No source code repositories, private test suites, or proprietary project specifications are made public here. For prospective employers or recruiters seeking to verify technical competencies, conceptual design discussions and high-level architectural retrospectives are available throughout these pages, while code access remains private.

**Live site:** [404found2.github.io/umich-coursework](https://404found2.github.io/umich-coursework/)

## Features

- **Markdown-driven:** every page is a `.md` file. Add a file and a new page appears, with no code changes.
- **Auto-generated navigation:** courses and projects show up in the sidebar and as project cards on each course page.
- **GitHub-style Markdown:** tables, task lists, code blocks, images, `<details>`, and links between notes.
- **Table of contents:** an "On this page" outline that highlights the section you're reading.
- **Light and dark mode:** your choice is remembered between visits.
- **Responsive:** a pinned sidebar on desktop, and a top bar with a slide-out menu on mobile.
- **Draft pages:** mark unfinished write-ups with `draft: true` to show a notice and a badge on the card.
- **LLM templates:** ready-made templates for generating new course and project pages.

## Tech Stack

[React](https://react.dev/) · [Vite](https://vite.dev/) · [React Router](https://reactrouter.com/) ·
[react-markdown](https://github.com/remarkjs/react-markdown) (remark-gfm, rehype) ·
[front-matter](https://github.com/jxson/front-matter) · [gh-pages](https://github.com/tschaub/gh-pages) ·
[Oxlint](https://oxc.rs/)

## Getting Started

```bash
git clone https://github.com/404found2/umich-coursework.git
cd umich-coursework
npm install
npm run dev
```

Then open [http://localhost:5173/umich-coursework/](http://localhost:5173/umich-coursework/).

| Script | Description |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Build the production site into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Lint the code with Oxlint |
| `npm run deploy` | Build and publish `dist/` to the `gh-pages` branch |

## Adding Content

All content lives in `src/assets/courses/`. The folder structure becomes the site's URLs:

```
src/assets/courses/
├── main.md                  →  /                  (home page)
└── eecs485/
    ├── main.md              →  /eecs485           (course overview)
    ├── chat485.md           →  /eecs485/chat485   (project page)
    └── images/              →  images used by this course's pages
```

### Add a course

Create `src/assets/courses/<course-id>/main.md`:

```markdown
---
title: EECS 485
name: Web Systems
semester: Fall 2026
description: Full-stack web development, from static sites to distributed search engines.
order: 485
---

# EECS 485: Web Systems

Course overview...

## Projects

<!-- projects -->
```

The `<!-- projects -->` comment marks where the project cards appear.

### Add a project

Add any other `.md` file to the course folder:

```markdown
---
title: Chat Application
description: Real-time chat server and React client with WebSocket messaging.
tags: [python, flask, react]
order: 1
draft: true
---

# Chat Application

Project write-up...
```

### Link between pages and add images

```markdown
[Course overview](./main.md)
[Another course](../eecs281/main.md)
![Architecture diagram](./images/architecture.png)
```

### Generate pages with an LLM

[`src/assets/template-main.md`](src/assets/template-main.md) and
[`src/assets/template-project.md`](src/assets/template-project.md) contain instructions and
skeletons for an LLM. For example:

> Using `template-project.md`, write a project page for my EECS 485 search engine. Here are my notes: …

> [!IMPORTANT]
> Following the University of Michigan Engineering Honor Code, these pages describe concepts,
> design, and lessons learned. They do not include project solution code.

## Project Structure

```
src/
├── assets/courses/   Markdown content and images
├── content/          Loads and indexes the Markdown and resolves links
├── components/       Layout, navigation, Markdown renderer, cards, TOC, toast
├── pages/            Home, course, project, and 404 pages
├── styles/           Design tokens, layout, and Markdown styles
└── theme.js          Light and dark theme state
```

See [`architecture.md`](architecture.md) for the full architecture and design system.

## Deployment

The site is hosted on GitHub Pages from the `gh-pages` branch:

**Live site:** [404found2.github.io/umich-coursework](https://404found2.github.io/umich-coursework/)

*Last Updated: Oct. 20, 2026*