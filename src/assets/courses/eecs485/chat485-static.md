---
title: "Chat485: Static Site Generator"
description: A Python templated static site generator that builds a non-interactive ChatGPT clone.
tags: [python, jinja, html, css]
order: 1
---

# Chat485: Templated Static Site Generator

Project 1 of EECS 485, and the first of a three-part sequence that builds **Chat485**, a ChatGPT
clone. I wrote a Python program that takes HTML templates, JSON data, and static files (CSS,
images) and generates a complete website of static HTML pages, similar in spirit to Jekyll or
Pelican.

## Overview

The finished site looks like a chat app: a sidebar of conversations, a page for each
conversation, and a model picker. It can't talk back, though. Every conversation is fixed data
that gets rendered once, ahead of time. That makes it the baseline for comparing the later
server-side and client-side versions.

This was an **individual** project and also served as a readiness check for the course.

## How It Works

1. **Input:** a directory with Jinja HTML templates, a JSON config file describing the pages
   and their data, and a folder of static files.
2. **Render:** the generator loads each template, fills it with the matching JSON data, and
   writes the result to an output directory.
3. **Copy:** static files are copied over unchanged.
4. **Serve:** the output folder is plain HTML and CSS that any web server can host.

I started by hand-coding one page in HTML, then turned it into reusable templates.

## What I Learned

- **HTML and CSS fundamentals:** semantic structure, valid markup, and accessibility details
  like marking the current page with `aria-current`.
- **Templating:** template inheritance and loops in Jinja, so layout code isn't repeated.
- **Python tooling:** writing a command-line program, reading JSON, and working with files and paths.
- **Shell scripting:** small scripts to automate building and testing.
- **Testing:** writing my own tests in addition to the public autograder tests.
- **Using generative AI as a tutor:** the course allows GenAI to explain concepts but not to
  write submitted code.

## Tech Stack

| Area | Technology |
| --- | --- |
| Language | Python |
| Templates | Jinja |
| Output | HTML5, CSS |
| Data | JSON |

## Links

- [Project spec](https://eecs485staff.github.io/p1-chat485-static/)
- Next: [Chat485 server-side](./chat485-serverside.md)

---

Back to the [EECS 485 overview](./main.md)
