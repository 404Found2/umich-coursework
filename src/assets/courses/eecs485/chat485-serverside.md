---
title: "Chat485: Server-side"
description: A Flask and SQLite ChatGPT clone with accounts, sessions, and server-rendered pages.
tags: [python, flask, sqlite, jinja]
order: 2
---

# Chat485: Server-side Dynamic Pages

Project 2 of EECS 485. Chat485 becomes a real, working chat application: a Flask server renders
every page with Jinja templates, stores data in SQLite, and sends conversations to an LLM.

## Overview

The big idea of this project is that products like ChatGPT are really two parts:

- **A stateless model API:** messages go in and a response comes out. It remembers nothing.
- **A stateful application:** stores conversations, manages sessions, and assembles the
  message history into a prompt for every API call.

This project builds the application layer. Conversation continuity comes from my code, not the model.

## Features

- [x] Home page with a sidebar listing the user's conversations
- [x] Conversation pages with message history and a send form
- [x] New conversations, with titles generated after the first message
- [x] Model picker for choosing which LLM to use
- [x] Account pages: create an account, log in, and edit the account
- [x] Anonymous sessions that can later be linked to a logged-in user
- [x] Paginated message history ("Load older messages")
- [x] Deleting conversations

## Architecture

1. The browser sends a request. Every response is a complete HTML page built from a Jinja template.
2. Flask looks up the session cookie to find who the user is.
3. Views read and write a SQLite database with four tables: users, sessions, conversations, and messages.
4. To answer a message, the server loads the conversation history from the database and sends
   it to the LLM, then saves the reply.

## What I Learned

- **Server-side rendering with Flask:** routes, views, redirects, and form handling.
- **CRUD over SQL:** designing a schema with foreign keys and writing queries for each page.
- **Sessions and access control:** cookies, login and logout, and making sure users can only
  see and change their own data.
- **Password security:** storing salted password hashes instead of passwords.
- **LLM integration:** treating the model as a black box and managing context in the app.
- **Team workflow:** working in a group of 2–3 with Git.

## Tech Stack

| Area | Technology |
| --- | --- |
| Backend | Python, Flask |
| Templates | Jinja |
| Database | SQLite |
| AI | LLM API (used as a black box) |

## Links

- [Project spec](https://eecs485staff.github.io/p2-chat485-serverside/)
- Previous: [Chat485 static](./chat485-static.md)
- Next: [Chat485 client-side](./chat485-clientside.md)

---

Back to the [EECS 485 overview](./main.md)
