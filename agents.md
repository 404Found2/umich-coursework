# UMich Coursework: Architecture Plan

A multi-page website that renders the Markdown files in `src/assets/courses/` as HTML pages.
Built with the existing Vite + React setup as a **single-page app** with client-side routing,
deployed to **GitHub Pages** (project repo) with clean URLs.

> **v2 restyle planned:** see [§13](#13-v2-portfolio-style-restyle). It replaces the visual
> design in §5 (Layout & Components) and §6 (Theme). The content model, rendering, routing, and
> deployment (§2–§4, §8) are unchanged.

---

## 1. Decisions

| Topic | Decision |
|---|---|
| Rendering | SPA with React Router (no prerendering) |
| Hosting | GitHub Pages, project repo: `username.github.io/umich-coursework/` |
| URLs | Clean URLs (`/eecs485/chat485`) using the `404.html` fallback trick |
| Deploy | Manual `npm run deploy` with the `gh-pages` package |
| Content style | GitHub README style: GFM, images, tables, links. No executable/interactive content |
| Metadata | YAML frontmatter at the top of each `.md` |
| Images | Stored next to the markdown, e.g. `eecs485/images/diagram.png` |
| Project tables | Auto-generated on each course page (columns: Project, Description, Tags) |
| Navigation | Desktop: persistent left sidebar. Mobile and home page: hamburger slide-out drawer |
| TOC | Right-hand sticky column on desktop, collapsible block at top on mobile |
| Theme | Custom palette, light by default, dark mode toggle |
| Font | System font stack |
| Drafts | `draft: true` shows a "This is a draft" toast on the page |

---

## 2. Content Model

### 2.1 Folder → route mapping

```
src/assets/courses/
  main.md                 → /                    (home page)
  eecs485/
    main.md               → /eecs485             (course page)
    chat485.md            → /eecs485/chat485     (project page)
    images/...            → referenced from eecs485/*.md
  eecs281/
    main.md               → /eecs281
```

Rules:
- `courses/main.md` is the **home page**.
- Each folder directly under `courses/` is a **course**. Its `main.md` is the **course page**.
- **Every other `.md` file in a course folder is a project page.** The slug is the filename without `.md`.
- Only one level of course folders is supported. Deeper nested `.md` files are ignored.
- Adding a course or a project is just adding a file or folder. No code changes are needed.

### 2.2 Frontmatter schema

**Home (`courses/main.md`)**: optional `title` (used for the browser tab).

**Course page (`<course>/main.md`)**
```yaml
---
title: EECS 485            # short code shown in nav/sidebar
name: Web Systems          # full course name
semester: Fall 2026
description: One-line summary of the course
order: 1                   # optional, sorts courses in nav
---
```

**Project page (`<course>/<slug>.md`)**
```yaml
---
title: Chat Application
description: Real-time chat server built for P5
tags: [python, flask, websockets]
order: 2                   # optional, sorts rows in the project table
draft: true                # optional, shows the draft toast
---
```

Fallbacks when a field is missing:
- `title` uses the first `# Heading`, then the filename or folder name (e.g. `chat485`, `EECS485`).
- `description` and `tags` render as empty cells.
- `order`: items without it are sorted alphabetically after the ordered ones.

### 2.3 Content index (`src/content/courses.js`)

The single source of truth for the whole site, built once when the app loads:
1. Uses `import.meta.glob('../assets/courses/**/*.md', { query: '?raw', import: 'default', eager: true })`
   so Vite bundles every markdown file as a string at build time.
2. Uses a second `import.meta.glob` over `../assets/courses/**/*.{png,jpg,jpeg,gif,svg,webp}`
   with `?url` to build a lookup of **image path → hashed build URL**.
3. Parses frontmatter from each file with the `front-matter` package (browser-safe; avoid `gray-matter`, which needs Node's `Buffer`).
4. Exposes:
   - `home`: `{ meta, body }`
   - `courses`: a sorted list of `{ id, route, meta, body, projects[] }`
   - `projects`: each one is `{ courseId, slug, route, meta, body }`
   - helper lookups: `getCourse(id)`, `getProject(courseId, slug)`, `resolveAsset(fromFile, relPath)`, `resolveMdLink(fromFile, relPath)`

---

## 3. Markdown Rendering

A single `MarkdownRenderer` component wraps `react-markdown` with the following plugins:

| Plugin | Purpose |
|---|---|
| `remark-gfm` | Tables, task lists, strikethrough, autolinks (GitHub README parity) |
| `rehype-raw` | Allows inline HTML commonly used in READMEs (`<img width>`, `<details>`, `<br>`) |
| `rehype-slug` | Adds `id`s to headings for anchors and the TOC |
| `rehype-autolink-headings` | Adds a clickable `#` anchor on hover next to each heading |

Custom element overrides:
- **`a`**
  - Links to other `.md` files (`./chat485.md`, `../eecs281/main.md`, `main.md#setup`) become React Router `<Link>`s pointing at the right route, and any `#hash` is kept.
  - Same-page `#anchor` links scroll smoothly.
  - External `http(s)` links open in a new tab with `rel="noopener noreferrer"`.
- **`img`**: relative `src` values are resolved through the image lookup so colocated images work after Vite hashes them. Absolute URLs pass through unchanged. Every image gets `loading="lazy"`.
- **`table`**: wrapped in a horizontally scrollable container so wide tables don't break the mobile layout.

Not included: syntax highlighting, math/KaTeX, and executable embeds. Code blocks still get basic monospace styling. Syntax highlighting can be added later with `rehype-highlight` without other changes.

---

## 4. Routing

`BrowserRouter` with `basename={import.meta.env.BASE_URL}` (`/umich-coursework/`).

| Route | Page component | Shows |
|---|---|---|
| `/` | `HomePage` | `courses/main.md` content only |
| `/:courseId` | `CoursePage` | Course `main.md` content, with the auto-generated Projects table at the `<!-- projects -->` marker |
| `/:courseId/:slug` | `ProjectPage` | Project markdown, plus the draft toast if `draft: true` |
| `*` | `NotFound` | A friendly 404 with links back to the courses |

Unknown course or project IDs render `NotFound`.
On every route change: scroll to the top, or to the `#hash` if there is one, and update `document.title` (e.g. `Chat Application · EECS 485 · UMich Coursework`).

---

## 5. Layout & Components

```
┌───────────────────────────────────────────────────────────────┐
│ ☰  UMich Coursework                                    ☀/🌙   │  Header
├────────────┬──────────────────────────────────┬───────────────┤
│ Sidebar    │  Markdown content                │  On this page │
│ EECS 281   │                                  │  - Heading    │
│ ▾ EECS 485 │  (course page: Projects table    │  - Heading    │
│   Overview │   at <!-- projects --> marker)   │    - Sub      │
│   Chat App │                                  │               │
└────────────┴──────────────────────────────────┴───────────────┘
```

### Components
- **`Layout`**: header plus a slot for the page. Decides whether the sidebar and TOC columns are shown.
- **`Header`**: hamburger button, the site title "UMich Coursework" (links home), and the theme toggle.
- **`NavTree`**: the list of courses, with the current course expanded to show "Overview" plus its project pages. The active page is highlighted. Shared by the sidebar and the drawer.
- **`Sidebar`**: a persistent left column that renders `NavTree`. Desktop only, and not shown on the home page.
- **`NavDrawer`**: a slide-out panel that renders `NavTree` over a `--darker-1-trans` backdrop.
  - Opened by the hamburger.
  - Closes on link click, backdrop click, or `Esc`.
  - Focus is trapped while it's open.
- **`TableOfContents`**: built from the rendered `h2` and `h3` elements.
  - Highlights the section currently being read (scrollspy via `IntersectionObserver`).
  - Hidden when a page has fewer than 2 headings.
- **`ProjectTable`**: columns are Project (linked title), Description, and Tags (rendered as chips). Sorted by `order`, then title. Draft projects show a small "Draft" badge.
  - Placement: `CoursePage` splits the course `main.md` body on an HTML comment marker, `<!-- projects -->`. It renders the markdown before the marker, then the table, then the markdown after it.
  - If there is no marker, the table goes after the content.
  - Only the first marker is used. Extra markers are removed.
- **`DraftToast`**: appears when a `draft: true` page loads and says "This page is a draft and may be incomplete." It is dismissible, auto-hides after ~6s, and reappears on each visit.
- **`ThemeToggle`**: switches light and dark.
- **`MarkdownRenderer`**: see §3.

### Responsive behavior
| Width | Header | Left | Right |
|---|---|---|---|
| ≥ 1200px | hamburger hidden on course/project pages | sidebar | sticky TOC |
| 768–1199px | hamburger hidden on course/project pages | sidebar | TOC collapsible at top of content |
| < 768px | hamburger shown | drawer only | TOC collapsible at top of content |
| Home page (any width) | hamburger shown | drawer only | none |

---

## 6. Theme

Defined as CSS custom properties on `:root`. Dark values apply under `[data-theme="dark"]`.

### Light (default)
| Token | Value | Used for |
|---|---|---|
| `--bg` | `#F2EFE2` | page background |
| `--text` | `#2D3536` | body text |
| `--main-1` | `#007ea7` | links, focus rings |
| `--darker-1` | `#003459` | header, sidebar background, headings accent |
| `--darker-1-trans` | `#003459cc` | drawer backdrop / overlays |
| `--main-2` | `#ef8354` | hover/active states, active nav item, tag chips, draft badge |

### Dark (derived)
| Token | Value (proposal) | Notes |
|---|---|---|
| `--bg` | `#001f36` | darkened `--darker-1` |
| `--surface` | `#003459` | header, sidebar, table header, code blocks |
| `--text` | `#F2EFE2` | the light theme's background color, used as text |
| `--main-1` | `#4fb8dc` | lightened for contrast on dark background |
| `--main-2` | `#ef8354` | unchanged |

### Behavior
- The site starts in light mode on the first visit.
- The toggle's choice is saved in `localStorage` and restored on later visits.
- The theme is applied via `data-theme` on `<html>`.
- A tiny inline script in `index.html` sets `data-theme` before React mounts, so returning dark-mode users don't see a flash of the light theme.
- Transitions are short (~150ms) and are skipped when the user has `prefers-reduced-motion` set.

### Accessibility note
`#007ea7` on `#F2EFE2` has about a 4.0:1 contrast ratio, slightly below the WCAG AA threshold of 4.5:1 for body text.
To compensate, links in body text are underlined, and their hover state switches to `--darker-1`.

### Typography
- System font stack for body text, and a system monospace stack for code.
- Content max-width is about 75ch, with a base size of 16–17px and a line-height of about 1.65.
- Prose styles (tables, blockquotes, lists, images, `<details>`, inline code, code blocks) live in `markdown.css` and are scoped to `.markdown-body`.

---

## 7. File Structure

```
umich-coursework/
  index.html                  # includes SPA redirect-restore snippet (see §8)
  vite.config.js              # base: '/umich-coursework/'
  package.json                # + predeploy/deploy scripts
  src/
    main.jsx                  # BrowserRouter + App
    App.jsx                   # route table (replaces the Vite starter)
    assets/courses/...        # markdown + colocated images (content only)
    content/
      courses.js              # content index (§2.3)
      links.js                # md-link + asset path resolution helpers
    components/
      Layout.jsx
      Header.jsx
      NavTree.jsx
      Sidebar.jsx
      NavDrawer.jsx
      DocLayout.jsx           # article + TOC grid shared by course/project pages
      TableOfContents.jsx
      ProjectTable.jsx
      DraftToast.jsx
      ThemeToggle.jsx
      MarkdownRenderer.jsx
      icons.jsx               # inline SVG icons (menu, close, sun, moon)
    pages/
      HomePage.jsx
      CoursePage.jsx
      ProjectPage.jsx
      NotFound.jsx
    styles/
      theme.css               # tokens (light + dark)
      layout.css              # grid, header, sidebar, drawer, TOC
      markdown.css            # .markdown-body prose styles
```

The Vite starter files are deleted: `App.css`, `hero.png`, `react.svg`, `vite.svg`, and the starter `index.css` content.

---

## 8. GitHub Pages Deployment

- **Base path**: set `base: '/umich-coursework/'` in `vite.config.js`. The router uses `import.meta.env.BASE_URL` as its basename, so links work both locally and on GitHub Pages.
- **Clean-URL support**: GitHub Pages has no SPA fallback. It uses the "spa-github-pages" approach:
  - `public/404.html` encodes the requested path into a query string and redirects to the site root.
  - A small inline script in `index.html` decodes it and calls `history.replaceState` before React mounts.
  - Result: refreshing a deep link like `/umich-coursework/eecs485/chat485`, or opening it directly, works.
- **Scripts**:
  - `predeploy`: `npm run build`
  - `deploy`: `gh-pages -d dist`
- **Repo settings**: set Pages to serve from the `gh-pages` branch.

---

## 9. Dependencies to Add

- Runtime:
  - `react-router`
  - `react-markdown`
  - `remark-gfm`
  - `rehype-raw`
  - `rehype-slug`
  - `rehype-autolink-headings`
  - `front-matter`
- Dev: `gh-pages`

---

## 10. Implementation Milestones

1. **Cleanup and config**: remove the starter UI, set `base`, install the dependencies.
2. **Sample content**: fill the empty `.md` files with frontmatter and README-style content (headings, a table, an image, links between files). Mark one page as `draft: true`.
3. **Content index**: build `courses.js` and check the parsed output (routes, metadata, ordering) in the console.
4. **Routing and pages**: add the route table, the page components, and `NotFound`, with plain rendering.
5. **MarkdownRenderer**: add the plugins, link rewriting, and image resolution.
6. **Layout**: header, sidebar, drawer, and responsive grid.
7. **Course page extras**: `ProjectTable` and `DraftToast`.
8. **TOC**: heading extraction and scrollspy.
9. **Theme**: tokens, dark palette, toggle, and `markdown.css`.
10. **Deploy**: 404 redirect, `gh-pages` scripts, test with `npm run build && npm run preview`, then deploy.

---

## 11. Verification Checklist

- [ ] Every `.md` file has a working route, and `main.md` files map to `/` and `/<course>`.
- [ ] Adding a new course folder or project file shows up in the nav and the project table with no code changes.
- [ ] Cross-file `.md` links navigate within the app. Hash links scroll to the right heading.
- [ ] Colocated images load in both `dev` and the production build.
- [ ] Wide tables scroll horizontally on mobile.
- [ ] The draft toast appears only on `draft: true` pages, and the Draft badge shows in the project table.
- [ ] The Projects table renders at the `<!-- projects -->` marker, or after the content when there is no marker.
- [ ] The theme choice persists across reloads, without a flash of the light theme.
- [ ] The sidebar is visible on desktop course/project pages. The hamburger and drawer work on mobile and on the home page.
- [ ] The TOC highlights the current section and is hidden on short pages.
- [ ] Dark mode is readable everywhere (tables, code, tags, toast).
- [ ] A deep-link refresh works on GitHub Pages.
- [ ] `npm run lint` passes.

---

## 12. Confirmed Details

- Draft pages **are still listed** in the nav and project table, marked with a "Draft" badge, and show the draft toast when opened.
- The theme choice **is remembered** in `localStorage`. The default is light.
- The Projects table is placed at the `<!-- projects -->` marker in a course's `main.md`, or after the content if there is no marker.
- The header contains only the title "UMich Coursework", the hamburger, and the theme toggle.

---

## 13. v2: Portfolio-Style Restyle

Restyles the site to match [Vidya's portfolio](https://404found2.github.io/Portfolio/), with fixes
for its weak spots. **Only the visual layer changes.** Content loading, markdown rendering,
routing, and deployment stay as they are.

### 13.1 What we're taking from the portfolio

| Portfolio trait | Where it comes from |
|---|---|
| Cream page (`#F2EFE2`) everywhere, including the nav: no dark panels | `#root`, `.nav` |
| Left nav column next to the content, no top bar on desktop | `#application` grid (`nav main`) |
| Orbitron for titles, Inter for body | Google Fonts import |
| Hover/selected nav links get a blue→navy gradient underline | `.nav a:hover, .nav .selected` |
| Bordered cards: 2px blue border, 10px radius, orange Orbitron title | `.course` |
| Outline button that fills orange on hover | `#resume` |
| Solid orange chips | `.nav div .el` |
| Navy translucent overlay | `.activity:hover .text` |

### 13.2 What we're improving over the portfolio

| Portfolio issue | v2 fix |
|---|---|
| Cream text on orange chips is ~2.3:1 contrast (hard to read) | Orange chips use dark text `#2D3536` (~4.8:1) |
| Orange `#ef8354` text on cream is ~2.3:1 (card titles) | A new `--main-2-text` token, about `#b84a1c` (~4.6:1), for orange **text**. `#ef8354` stays for fills and borders |
| Underline appears instantly | Animated: the underline grows from the left on hover and stays full width on the current page |
| Fixed `clamp(820px, …)` widths and a 350px column overflow on phones | Fluid layout. A 280px column on desktop, a top bar + drawer on mobile |
| Content scrolls inside a `100vh` box (`#main { overflow-y: scroll }`) | The normal browser window scrolls, so anchor links, back/forward scroll restore, and mobile address-bar behavior all work |
| No visible keyboard focus styles | Clear `:focus-visible` outlines in every component |
| Light only | Dark mode, mirrored from the light design |

### 13.3 Decisions

| Topic | Decision |
|---|---|
| Fonts | Orbitron + Inter via Google Fonts `<link>` (with `preconnect`, `display=swap`) |
| Orbitron scope | Site title, course names in nav, markdown h1/h2, card titles, toast label. **Not** h3+, the TOC, project names in the nav, tables, or body text |
| Desktop shell | Portfolio-style left nav column on **every page, including home**. No top bar |
| Column separator | 2px vertical gradient line (blue→navy) on the column's right edge |
| Nav column contents | Site title, Home, course list (current course expanded), theme toggle at the bottom |
| Hover/current indicator | Animated gradient underline |
| Mobile (<768px) | Slim cream top bar (hamburger, Orbitron title, theme icon) with a gradient line under it |
| Mobile drawer | Cream panel from the left with the same contents as the nav column, over a navy translucent backdrop |
| Project list | **Cards** in a responsive grid, replacing the table |
| Card hover | Slight lift + shadow, border shifts blue → orange |
| Chips & Draft badge | Orange background, dark text |
| Headings | h1: blue Orbitron + short gradient bar under it. h2: navy Orbitron. h3+: Inter in the text color |
| TOC | Thin left line. The current section gets a blue→navy gradient segment |
| Draft toast | Cream card, 2px orange border, Orbitron "DRAFT" label |
| Dark mode | Kept. The nav column uses the same dark page background, cream text, and a lighter blue gradient |

### 13.4 Design tokens

Replaces the v1 token tables in §6.

**Light**
| Token | Value | Used for |
|---|---|---|
| `--bg` | `#F2EFE2` | page, nav column, mobile bar, drawer |
| `--card-bg` | `#F8F6ED` | cards, toast (a slightly lifted cream) |
| `--text` | `#2D3536` | body text, nav links |
| `--muted` | `#5A6466` | TOC, secondary text |
| `--border` | `#D8D2BD` | hairlines, table borders, TOC track |
| `--main-1` | `#007EA7` | links, card borders, h1 |
| `--darker-1` | `#003459` | h2, link hover, focus outline |
| `--darker-1-trans` | `#003459CC` | drawer backdrop |
| `--main-2` | `#EF8354` | chips, badges, card hover border, toast border |
| `--main-2-text` | `#B84A1C` | orange **text** (card titles, toast label) |
| `--on-accent` | `#2D3536` | text on orange fills |
| `--gradient` | `linear-gradient(90deg, var(--main-1), var(--darker-1))` | underlines, separator, h1 bar, TOC segment |
| `--font-display` | `'Orbitron', 'Segoe UI', system-ui, sans-serif` | titles |
| `--font-body` | `'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif` | everything else |

**Dark** (overrides)
| Token | Value | Notes |
|---|---|---|
| `--bg` | `#001F36` | |
| `--card-bg` | `#002A47` | |
| `--text` | `#F2EFE2` | |
| `--muted` | `#B3C0C6` | |
| `--border` | `#1F4A68` | |
| `--main-1` | `#4FB8DC` | lighter so it's readable on navy |
| `--gradient` | `linear-gradient(90deg, #4FB8DC, #007EA7)` | navy would disappear on a navy background |
| `--main-2-text` | `#EF8354` | the original orange is readable on dark (~7:1) |
| h2 color | `var(--text)` | navy h2 would be unreadable on dark |

**Focus ring:** a 2px `--darker-1` outline with a 3px offset in light mode, and `--main-2` in dark mode.
Orange is not used for focus in light mode because it is ~2.3:1 against cream, below the 3:1
minimum for focus indicators.

### 13.5 Layout

**Desktop (≥768px)**
```
┌──────────────────────┬┬───────────────────────────────────┬──────────────┐
│ UMICH COURSEWORK     ││  # EECS 485: Web Systems          │ ON THIS PAGE │
│                      ││  ▬▬▬▬ (gradient bar)              │ │ Projects   │
│ Home                 ││                                   │ ┃ Topics     │
│                      ││  ┌────────────┐ ┌────────────┐    │ │ Resources  │
│ COURSES              ││  │ CHAT APP   │ │ ...        │    │              │
│ EECS 281             ││  │ desc…      │ │            │    │              │
│ EECS 485  ▔▔▔▔▔▔     ││  │ [python]   │ │            │    │              │
│  │ Overview          ││  └────────────┘ └────────────┘    │              │
│  │ Chat App [DRAFT]  ││                                   │              │
│                      ││                                   │              │
│ [☾ Dark mode]        ││                                   │              │
└──────────────────────┴┴───────────────────────────────────┴──────────────┘
  280px, sticky,        gradient   content, max 75ch          TOC ≥1200px only
  full height           line
```
- The nav column is `position: sticky; top: 0; height: 100vh; overflow-y: auto`. The page itself scrolls with the window.
- Between 768px and 1199px there is no right TOC column. The TOC is collapsible at the top of the content (unchanged from v1).

**Mobile (<768px)**
```
┌─────────────────────────────────┐
│ ☰  UMICH COURSEWORK          ☾  │  sticky cream bar, 56px
├▔▔▔▔▔▔▔ gradient line ▔▔▔▔▔▔▔▔▔▔▔┤
│ content…                        │
```
The drawer slides in from the left. It has the same contents as the nav column, a close button,
and a gradient line on its right edge. The rest of the page is covered by the `--darker-1-trans`
backdrop.

### 13.6 Component styling

**Nav column / drawer (`NavColumn`)**
- **Site title:** "UMich Coursework", Orbitron ~1.3rem, uppercase, text color. Hover turns it `--main-1`, like the portfolio's `#git`.
- **Section label "Courses":** Inter, 0.72rem, uppercase, letter-spaced, `--muted`.
- **Course links:** Orbitron ~1rem in the text color. The semester is **not** shown.
- **Project links** (under the expanded course): Inter 0.95rem with a hairline `--border` on the left. Drafts get an orange "Draft" badge.
- **Animated underline:** the label text sits inside an inner `<span>` so the underline only spans the text.
  - It is drawn as a `background-image: var(--gradient)` with `background-size` going from `0% 3px` to `100% 3px` over ~250ms.
  - `box-decoration-break: clone` keeps the underline correct when a long name wraps onto two lines.
  - The current page keeps the underline at 100% and uses font-weight 600.
  - When `prefers-reduced-motion` is set, the underline appears without animation.
- **Theme toggle** (at the bottom of the column): an outline button in the portfolio's `#resume` style.
  - Navy border, blue text, a moon/sun icon, and a label ("Dark mode" / "Light mode").
  - On hover it fills orange with dark text.

**Mobile bar**: hamburger, Orbitron title, and an icon-only theme toggle. It has a 2px gradient bottom border (via `border-image`).

**Project cards (`ProjectCards`, replaces `ProjectTable`)**
- **Grid:** `repeat(auto-fill, minmax(260px, 1fr))` with a 1.25rem gap.
- **The whole card is one link.** Style: `--card-bg`, a 2px `--main-1` border, 10px radius, and 1.1rem × 1.25rem padding.
- **Contents:**
  - title in Orbitron ~1.1rem, `--main-2-text`
  - description in Inter 0.95rem
  - a row of tag chips
  - an orange "Draft" badge in the top-right corner when relevant
- **Hover/focus:** `translateY(-3px)`, a soft shadow, and the border turns `--main-2`. There is no movement when `prefers-reduced-motion` is set.
- **Empty state:** a dashed-border card saying "No projects yet."
- The `<!-- projects -->` marker and the "Projects" fallback heading work the same as in v1.

**Chips & badges**: orange `--main-2` background, `--on-accent` text, pill shape, 0.8rem. Badges are uppercase and 0.68rem.

**Markdown**
- **h1:** Orbitron ~2rem in `--main-1`. Instead of a full-width border, it has a 4px × 80px gradient bar under it (`::after`).
- **h2:** Orbitron ~1.4rem in `--darker-1` (in dark mode, the text color), with a thin `--border` bottom border.
- **h3 and smaller:** Inter bold in the text color.
- **Links:** `--main-1`, underlined; hover changes them to `--darker-1`.
- **Tables:**
  - a `--border` grid
  - the header row tinted `color-mix(in srgb, var(--main-1) 10%, transparent)`
  - 10px rounded outer corners
- **Blockquotes:** a 4px `--main-2` left border on `--card-bg`.
- **Images:** 10px radius.
- **Code:** unchanged from v1 apart from the new tokens.

**TOC**
- An "On this page" label in Inter, uppercase and muted.
- The list has a 2px `--border` line on its left.
- The current item draws its left segment with the vertical gradient (`::before`) and uses the text color at weight 600. Hover changes the color to `--main-1`.

**Draft toast**
- A `--card-bg` card in the bottom-right corner with a 2px `--main-2` border, 10px radius, and a shadow.
- It has a "DRAFT" label in Orbitron using `--main-2-text`, the message, and a close button.
- Behavior is unchanged: it auto-hides after ~6s and reappears on each visit.

### 13.7 Code changes (when we build)

| File | Change |
|---|---|
| `index.html` | Add Google Fonts `preconnect` + stylesheet links (Orbitron 500–800, Inter 400–700) |
| `components/Header.jsx` | Rename to `MobileBar.jsx`. It only renders below 768px |
| `components/Sidebar.jsx` | Replace with `NavColumn.jsx` (title + `NavTree` + theme toggle). Used by both the desktop column and the drawer |
| `components/NavDrawer.jsx` | Render `NavColumn` and restyle as a cream panel |
| `components/NavTree.jsx` | Wrap labels in an underline `<span>`. Course links use the display font |
| `components/ThemeToggle.jsx` | Add a `variant` prop: `"button"` (labelled outline) or `"icon"` |
| `theme.js` (new) | `useTheme()` / `setTheme()`. Keeps the multiple toggles (column, mobile bar, drawer) in sync via `useSyncExternalStore` on `<html data-theme>` |
| `components/ProjectTable.jsx` | Replace with `ProjectCards.jsx` |
| `components/DraftToast.jsx` | Markup for the label. Restyled |
| `components/Layout.jsx` | Always render the nav column, on home too. Drop the home-only special case |
| `pages/CoursePage.jsx` | Use `ProjectCards` |
| `styles/theme.css` | New tokens + fonts (§13.4) |
| `styles/layout.css` | Rewritten for the new shell, nav, drawer, cards, toast, and TOC |
| `styles/markdown.css` | Heading, table, blockquote, and image updates |

No new npm dependencies.

### 13.8 Build order

1. Update the tokens and fonts (`theme.css`, `index.html`). Check text contrast in both themes.
2. Build the new shell: `Layout`, `NavColumn`, `MobileBar`, the gradient separator, and the responsive breakpoints.
3. Restyle `NavTree` with the animated underline and the theme toggle button variant.
4. Restyle the drawer to use `NavColumn`.
5. Add `ProjectCards`, then the chips and badges.
6. Apply the markdown heading, table, blockquote, and image styles.
7. Restyle the TOC and the toast.
8. Pass over dark mode, then focus states and reduced motion.
9. Run `npm run build` and `npm run lint`, then check by hand at 375px, 900px, and 1400px widths.

### 13.9 v2 verification checklist

- [ ] No dark panels in light mode: the nav, mobile bar, and drawer are all cream.
- [ ] The nav column shows on home, course, and project pages on desktop.
- [ ] The underline animates on hover and stays on the current page. It wraps correctly on long names. There is no animation with reduced motion.
- [ ] Orbitron appears only where §13.3 says it should.
- [ ] Cards reflow from 1 to 3 columns, the whole card is clickable, and the hover lift works.
- [ ] Chip, badge, and orange-title text pass 4.5:1 (or 3:1 for large text) in both themes.
- [ ] Keyboard focus is visible on every link, button, and card.
- [ ] No horizontal scrolling at 375px.
- [ ] Dark mode keeps the same layout, with readable h2s and gradients.
- [ ] The fonts load on GitHub Pages, and the fallback fonts look acceptable before they do.
