<!--
=====================================================================
LLM INSTRUCTIONS: COURSE OVERVIEW PAGE (main.md)
Delete this entire comment block from the file you produce.
=====================================================================

GOAL
Create the overview page for one university course on the
"UMich Coursework" site. The page lists the course's projects
automatically, so you only write the course description and notes.

WHERE THE FILE GOES
  src/assets/courses/<course-id>/main.md
  - <course-id> is the lowercase course code with no spaces, e.g. eecs485, eecs281, math214.
  - The folder name becomes the URL: /<course-id>  (e.g. /eecs485)
  - Every other .md file in the same folder automatically becomes a project page.

INPUTS TO ASK THE USER FOR (if not provided)
  - Course code (e.g. EECS 485) and full name (e.g. Web Systems)
  - Semester taken (e.g. Fall 2026)
  - One-sentence summary of the course
  - Main topics covered
  - Optional: key takeaways, useful resources/links, related courses on this site

OUTPUT RULES
  1. The file MUST start with the frontmatter block (the first line is exactly ---).
  2. Replace every {{PLACEHOLDER}}. Remove any optional section you have no content for.
  3. Frontmatter fields:
       title:       Short course code with a space, e.g. EECS 485 (shown in the nav)
       name:        Full course name (shown under the code in the nav)
       semester:    e.g. Fall 2026
       description: One sentence. Wrap in double quotes if it contains a colon (:)
       order:       Number that sorts courses in the nav (lower = higher up).
                    Use the course number (e.g. 485) unless the user says otherwise.
  4. Use exactly ONE "# " heading (the first line after frontmatter).
     Use "## " for sections and "### " for subsections. Don't skip levels.
     The "On this page" table of contents is built from ## and ### headings.
  5. Keep the projects marker comment under "## Projects" exactly as written in the
     template below. The site replaces it with a grid of project cards.
     Write it only once in the file.
  6. Supported Markdown (GitHub style):
       tables, bullet/numbered lists, task lists (- [ ] / - [x]), blockquotes,
       fenced code blocks, inline code, images, links, <details>/<summary>, <br>.
  7. NOT supported (do not use):
       LaTeX/math ($...$), Mermaid diagrams, GitHub alerts (> [!NOTE]),
       <script>, <iframe>, <style>, footnotes.
  8. Links:
       - Another page on this site: link to the .md file with a relative path.
           Project in this course:   [Chat App](./chat485.md)
           Another course overview:  [EECS 281](../eecs281/main.md)
           A section on a page:      [Setup](./chat485.md#setup)
       - External sites: full https:// URL (opens in a new tab).
  9. Images: put files in src/assets/courses/<course-id>/images/ and reference them
     relatively, e.g. ![Alt text describing the image](./images/diagram.png).
     Always write meaningful alt text.
 10. Academic integrity: describe concepts and experiences only. Never include
     project solution code, exam content, or autograder details.
 11. Tone: first person, concise, written as a student's personal course notes.
=====================================================================
-->
---
title: {{COURSE CODE, e.g. EECS 485}}
name: {{FULL COURSE NAME, e.g. Web Systems}}
semester: {{SEMESTER, e.g. Fall 2026}}
description: "{{ONE-SENTENCE SUMMARY OF THE COURSE}}"
order: {{NUMBER, e.g. 485}}
---

# {{COURSE CODE}}: {{FULL COURSE NAME}}

{{2–3 sentences: what the course is about, what you built, and why it mattered to you.}}

## Projects

<!-- projects -->

## Topics

- {{Topic 1}}
- {{Topic 2}}
- {{Topic 3}}

<!-- OPTIONAL: use a table instead of the list above when topics have examples.
| Topic | Examples |
| --- | --- |
| {{Topic}} | {{Examples}} |
-->

## Key Takeaways

- {{Most important skill or idea you took away}}
- {{Another takeaway}}

## Tips for Future Students

> {{One standout piece of advice.}}

- {{Practical tip}}
- {{Practical tip}}

## Resources

- [{{Resource name}}]({{https://...}})
- [{{Related course on this site}}](../{{other-course-id}}/main.md)
