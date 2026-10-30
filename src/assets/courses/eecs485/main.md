---
title: EECS 485
name: Web Systems
semester: Fall 2026
description: "Modern web systems end to end: build a ChatGPT clone, then a Google clone."
order: 485
---

# EECS 485: Web Systems

EECS 485 is a holistic course on modern web systems, covering both the front end and the back
end. The first half of the semester builds **Chat485**, a ChatGPT clone, three different ways:
static pages, server-side dynamic pages, and client-side dynamic pages. The second half
moves to distributed systems, with a **MapReduce framework** and a **Google-style search engine**.

> Taking this course in Fall 2026, so it is still in progress. Pages marked **Draft** are for
> projects I haven't finished yet.

## Projects

<!-- projects -->

## What I Learned

### Web apps (Projects 1–3)

- **Static vs. dynamic pages:** the trade-offs between pre-generating HTML, rendering it on
  the server for every request, and rendering it in the browser.
- **Templates:** separating data from presentation with Jinja templates.
- **Server-side apps with Flask:** routing, views, forms, and CRUD over a SQLite database.
- **Sessions and security:** cookies, login sessions, access control, salted password hashing,
  and common web attacks.
- **REST APIs:** designing JSON resources under `/api/v1/` and their status codes.
- **Client-side apps with React:** components, state, React Router, and asynchronous `fetch`.
- **LLM integration:** an LLM API is *stateless*. A chat app's "memory" comes from the backend
  storing conversations and sending the message history with every request.

### Distributed systems and search (Projects 4–5)

- **MapReduce:** how map, shuffle/sort (grouping), and reduce stages split big data jobs into
  parallel tasks.
- **Google File System:** how large-scale storage is distributed and replicated.
- **OS concurrency and networking:** processes, threads, and TCP/UDP sockets.
- **Fault tolerance:** detecting failed workers with heartbeats and reassigning their work.
- **Information retrieval:** text analysis with tf-idf and cosine similarity, and link
  analysis with PageRank.
- **Scaling:** service-oriented architecture, scaling static and dynamic pages, and scaling storage.

### Beyond the projects

Later lectures cover recommender systems, ads and auctions, blockchain, and the dark web.

## Course Structure

| Component | Details |
| --- | --- |
| Projects | 5 programming projects. P1 is individual; P2–P5 are in groups of 2–3 |
| Exams | One midterm and one final |
| Languages and tools | Python, HTML/CSS, Jinja, SQL (SQLite), JavaScript, React, Flask, pytest, Cypress |

## Resources

- [Course website](https://eecs485.org/)
- [Syllabus](https://eecs485.org/syllabus.html)
- Prerequisite knowledge: [EECS 281](../eecs281/main.md)
