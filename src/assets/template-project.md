<!--
=====================================================================
LLM INSTRUCTIONS: PROJECT PAGE
Delete this entire comment block from the file you produce.
=====================================================================

GOAL
Create a write-up page for one project from a university course on the
"UMich Coursework" site. It appears as a card on the course page and as
its own page in the nav.

WHERE THE FILE GOES
  src/assets/courses/<course-id>/<project-slug>.md
  - <course-id> is the existing course folder, e.g. eecs485.
  - <project-slug> is short, lowercase, words joined by hyphens, e.g. insta485, search-engine.
    Do NOT name the file main.md (that name is reserved for the course overview).
  - The URL becomes /<course-id>/<project-slug>  (e.g. /eecs485/search-engine)

INPUTS TO ASK THE USER FOR (if not provided)
  - Project name and which course it belongs to
  - What it does (1–2 sentences) and the tech stack
  - Main features, and which are finished vs. unfinished
  - How it is structured (components, data flow), and any diagram images
  - Challenges faced and lessons learned
  - Optional: API endpoints, results/screenshots, links to a repo or demo
  - Whether the write-up is finished (if not, set draft: true)

OUTPUT RULES
  1. The file MUST start with the frontmatter block (the first line is exactly ---).
  2. Replace every {{PLACEHOLDER}}. Remove any optional section you have no content for.
  3. Frontmatter fields:
       title:       Project name as shown on the card and in the nav
       description: One sentence (max ~20 words) shown on the project card.
                    Wrap in double quotes if it contains a colon (:)
       tags:        2–5 short lowercase tags in brackets, e.g. [python, flask, react]
       order:       Number that sorts cards on the course page (1 = first).
                    Usually the project number from the course (P1 = 1, P2 = 2, ...)
       draft:       true while the write-up is incomplete (shows a "Draft" notice
                    on the page and a badge on the card); delete the line or set false when done
  4. Use exactly ONE "# " heading (the first line after frontmatter).
     Use "## " for sections and "### " for subsections. Don't skip levels.
     The "On this page" table of contents is built from ## and ### headings.
  5. Supported Markdown (GitHub style):
       tables, bullet/numbered lists, task lists (- [ ] / - [x]), blockquotes,
       fenced code blocks with a language (```bash), inline code, images, links,
       <details>/<summary>, <br>.
  6. NOT supported (do not use):
       LaTeX/math ($...$), Mermaid diagrams, GitHub alerts (> [!NOTE]),
       <script>, <iframe>, <style>, footnotes.
  7. Links:
       - Course overview:        [EECS 485 overview](./main.md)
       - Another project:        [Search Engine](./search-engine.md)
       - Another course:         [EECS 281](../eecs281/main.md)
       - A section on this page: [API](#api)
         (anchor = heading text lowercased, punctuation removed, each space -> hyphen,
          e.g. "Challenges & Lessons Learned" -> #challenges--lessons-learned)
       - External sites: full https:// URL (opens in a new tab).
  8. Images: put files in src/assets/courses/<course-id>/images/ and reference them
     relatively, e.g. ![Alt text describing the image](./images/architecture.png).
     Always write meaningful alt text.
  9. Academic integrity: describe the approach, design, and lessons at a high
     level. Never paste project solution code, spec-specific algorithms, or
     autograder details. Short generic snippets (setup commands, config) are fine.
 10. Tone: first person, concise, written as a student's personal project notes.
=====================================================================
-->
---
title: {{PROJECT NAME}}
description: "{{ONE-SENTENCE SUMMARY SHOWN ON THE CARD}}"
tags: [{{tag1}}, {{tag2}}, {{tag3}}]
order: {{NUMBER, e.g. 1}}
draft: {{true OR false}}
---

# {{PROJECT NAME}}

{{2–3 sentences: what the project is, what it does, and the main technologies used.}}

## Overview

{{The goal of the project and the problem it solves.}}

## Architecture

{{How the pieces fit together.}}

![{{Alt text describing the diagram}}](./images/{{diagram-file.png}})

### How it works

1. {{Step 1 of the main flow}}
2. {{Step 2}}
3. {{Step 3}}

## Features

- [x] {{Finished feature}}
- [x] {{Finished feature}}
- [ ] {{Unfinished or stretch feature}}

## Tech Stack

| Layer | Technology |
| --- | --- |
| {{Frontend}} | {{e.g. React}} |
| {{Backend}} | {{e.g. Flask}} |
| {{Data}} | {{e.g. SQLite}} |

## API

<!-- OPTIONAL: remove this section if the project has no API. -->

| Method | Endpoint | Description |
| --- | --- | --- |
| `{{GET}}` | `{{/api/v1/resource/}}` | {{What it does}} |

## Setup

```bash
{{commands to install and run the project}}
```

## Challenges & Lessons Learned

- {{A challenge and how you solved it}}
- {{What you would do differently}}

<details>
<summary>{{Optional: deeper dive title}}</summary>

{{Longer reflection or extra detail.}}

</details>

## Results

{{Outcome: what works, performance, screenshots, or links.}}

---

Back to the [{{COURSE CODE}} overview](./main.md)
