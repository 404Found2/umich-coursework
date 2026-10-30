# UMich Coursework: Architecture

A Vite + React single-page app that turns the Markdown files in `src/assets/courses/` into a
multi-page course site, deployed to GitHub Pages at `/umich-coursework/`.
The full planning history is in `agents.md`. This file describes the site **as built**.

---

## Stack

| Concern | Choice |
|---|---|
| Build / dev | Vite (`base: '/umich-coursework/'`) |
| UI | React 19, React Router (`BrowserRouter`) |
| Markdown | `react-markdown` + `remark-gfm`, `rehype-raw`, `rehype-slug`, `rehype-autolink-headings` |
| Frontmatter | `front-matter` |
| Fonts | Orbitron (display) + Inter (body) via Google Fonts |
| Deploy | `gh-pages` (`npm run deploy`) |
| Lint | `oxlint` |

---

## File Structure

```
index.html                 # fonts, saved-theme script, GitHub Pages deep-link restore
public/404.html            # GitHub Pages SPA redirect (keeps 1 path segment)
src/
  main.jsx                 # BrowserRouter (basename = BASE_URL) + global CSS
  App.jsx                  # route table
  theme.js                 # useTheme() / setTheme(): <html data-theme> + localStorage
  assets/
    courses/               # ALL site content (see Content Model)
    template-main.md       # LLM template for a course overview page
    template-project.md    # LLM template for a project page
  content/
    courses.js             # globs + parses all .md files into the content index
    links.js               # path resolution: .md links → routes, images → built URLs
  components/
    Layout.jsx             # shell: mobile bar, drawer, nav column, <main>; scroll handling
    NavColumn.jsx          # site title + NavTree + theme button (sidebar and drawer)
    NavTree.jsx            # Home + courses; current course expands to its pages
    NavDrawer.jsx          # mobile slide-out panel (Esc/backdrop close, inert background)
    MobileBar.jsx          # <768px top bar: menu, title, theme icon
    SiteTitle.jsx          # "UMich Coursework" link ("UMich" in orange)
    DocLayout.jsx          # article + table of contents grid, heading scrollspy
    TableOfContents.jsx    # "On this page" (desktop column / mobile <details>)
    MarkdownRenderer.jsx   # react-markdown + plugins + link/image/table overrides
    ProjectCards.jsx       # course page project grid
    DraftToast.jsx         # "Draft" notice on draft pages
    ThemeToggle.jsx        # variant "button" (nav column) or "icon" (mobile bar)
    icons.jsx              # inline SVG icons
  pages/
    HomePage.jsx  CoursePage.jsx  ProjectPage.jsx  NotFound.jsx
  styles/
    theme.css              # design tokens (light/dark), base element styles
    layout.css             # shell, nav, drawer, TOC, cards, chips, toast
    markdown.css           # .markdown-body prose styles
```

---

## Content Model

```
src/assets/courses/
  main.md                → /                    home page
  <course-id>/main.md    → /<course-id>         course page
  <course-id>/<slug>.md  → /<course-id>/<slug>  project page (any non-main .md file)
  <course-id>/images/*   → referenced relatively from that course's .md files
```

Adding a folder or file is all it takes. No code changes are needed. Deeper nesting is ignored.

**Frontmatter**
| Page | Fields |
|---|---|
| Course `main.md` | `title` (e.g. EECS 485), `name`, `semester`, `description`, `order` |
| Project `<slug>.md` | `title`, `description`, `tags: [..]`, `order`, `draft: true/false` |

- **Missing `title`:** falls back to the first `# heading`, then the folder or file name.
- **Sorting:** by `order`, then by title.
- **Project grid placement:** a `<!-- projects -->` comment in a course `main.md` marks where the grid goes. Without one, the grid goes at the end.

---

## Rendering Pipeline

1. **Load:** `courses.js` pulls every `.md` file in as raw text at build time with `import.meta.glob`, parses its frontmatter, and builds the content index:
   - `home`
   - `courses[]`, each with its `projects[]`
   - `getCourse()` and `getProject()` lookups
2. **Render:** `MarkdownRenderer` turns the markdown into HTML with GitHub-style features (GFM), allows inline HTML, and gives every heading an ID and a `#` anchor link.
3. **Element overrides:**
   - **Links:** links to other `.md` files become router `<Link>`s. External links open in a new tab.
   - **Images:** relative paths are resolved to the built URL Vite generates.
   - **Tables:** wrapped in a horizontally scrollable container.

---

## Routing

| Route | Page | Notes |
|---|---|---|
| `/` | `HomePage` | Renders `courses/main.md` |
| `/:courseId` | `CoursePage` | Course markdown, with `ProjectCards` at the marker |
| `/:courseId/:slug` | `ProjectPage` | Project markdown, plus `DraftToast` if `draft: true` |
| `*` | `NotFound` | Links back to the courses |

- **Scroll:** each route change scrolls to the top, or to the `#hash` if there is one.
- **Tab titles:** set with React 19's `<title>`.
- **Deep links on GitHub Pages:** `404.html` redirects to the app, and a script in `index.html` restores the original path.

---

## Web Design

### Layout

**Desktop (≥768px).** The nav column is pinned to the left of the window on every page.
```
┌─────────────────────┬┬────────────────────────────────┬──────────────┐
│ UMICH COURSEWORK    ││ # Page Title                   │ ON THIS PAGE │
│ Home                ││                                │ ▌ Section    │
│ COURSES             ││ ┌──────────┐ ┌──────────┐      │   Section    │
│ EECS 281            ││ │ card     │ │ card     │      │              │
│ EECS 485            ││ └──────────┘ └──────────┘      │              │
│ ┃ Overview          ││                                │              │
│ ┃ [Chat App]        ││                                │              │
│ [☾ Dark mode]       ││                                │              │
└─────────────────────┴┴────────────────────────────────┴──────────────┘
 280px, 100dvh       blue→orange    content ≤ 75ch         TOC ≥1200px
```
- **Nav column:**
  - The title and theme button stay pinned. Only the course list scrolls, and only when it overflows.
  - Short screens (≤640px tall) hide the full course names.
- **Table of contents:** between 768px and 1199px it shows as a collapsible block at the top of the content.

**Mobile (<768px).** A sticky cream bar holds the menu button, the title, and a theme icon, with a blue→orange line under it. The drawer has the same contents as the nav column, over a navy translucent backdrop.

### Design Tokens (`theme.css`)

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#F2EFE2` | `#001F36` | page, nav, bars, drawer |
| `--card-bg` | `#F8F6ED` | `#002A47` | cards, blockquotes |
| `--text` | `#2D3536` | `#F2EFE2` | body text |
| `--muted` | `#5A6466` | `#B3C0C6` | secondary text |
| `--border` | `#D8D2BD` | `#1F4A68` | hairlines |
| `--main-1` | `#007EA7` | `#4FB8DC` | links, h1, card borders |
| `--darker-1` | `#003459` | `#003459` | h2 (light), toast, focus (light) |
| `--main-2` | `#EF8354` | `#EF8354` | orange fills, lines, chips, active pill |
| `--main-2-text` | `#B84A1C` | `#EF8354` | orange **text** (contrast-safe) |
| `--gradient-accent` | blue→orange | blue→orange | nav separator, mobile bar line, `<hr>` |

**Typography**
- **Orbitron:** the site title, course names in the nav, h1, h2, and card titles.
- **Inter:** everything else.
- **Body:** 17px with a line-height of 1.65.

### Components

| Element | Style |
|---|---|
| Nav links | Rounded highlight; hover fades in a 16% orange tint (0.2s) |
| Current page | Solid orange pill with dark text |
| Current course | Bold orange Orbitron. Its pages sit beside a 2px orange line |
| Section labels | "Courses" and "On this page": small uppercase orange text |
| Theme button | Outline button (navy border, blue text) that fills orange on hover |
| Project cards | Responsive grid, `minmax(260px, 1fr)` |
| Card style | 2px blue border, orange Orbitron title, description, orange tag chips, "Draft" badge |
| Card hover | Lifts 3px, gains a shadow, and the border turns orange |
| Draft toast | Navy card, cream text, 4px orange left edge, bottom-right; auto-hides after 6s |
| TOC | Muted links on a hairline; the current section gets an orange bar |
| h1 / h2 / h3 | h1: blue Orbitron. h2: navy Orbitron with a full-width hairline. h3: orange Inter |
| Lists and checkboxes | Orange markers and checkboxes |
| Tables | Rounded, orange-tinted header with an orange bottom rule |
| Blockquotes | Orange left border |
| Links | Blue and underlined; orange on hover |
| Page-wide | Orange text selection and scrollbar |

### Accessibility

- **Orange text:** always uses `--main-2-text` (≥4.5:1). Chips and pills use dark text on orange (4.8:1).
- **Focus:** a `:focus-visible` outline on everything, navy in light mode and orange in dark mode.
- **Drawer:** while it's open, the rest of the page is `inert` and Esc closes it.
- **Reduced motion:** `prefers-reduced-motion` turns off all transitions and animations.
- **Known exception:** blue links on cream are 4.0:1. They are underlined to compensate.

---

## Workflows

| Task | How |
|---|---|
| Add a course | Create `src/assets/courses/<id>/main.md` (use `template-main.md`) |
| Add a project | Add `<slug>.md` to the course folder (use `template-project.md`) |
| Dev server | `npm run dev` → `http://localhost:5173/umich-coursework/` |
| Check | `npm run build && npm run lint` |
| Deploy | `npm run deploy`. Pages serves from the `gh-pages` branch |
