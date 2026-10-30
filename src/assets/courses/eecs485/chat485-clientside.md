---
title: "Chat485: Client-side"
description: A React single-page ChatGPT clone backed by a Flask JSON REST API.
tags: [react, javascript, flask, rest-api]
order: 3
---

# Chat485: Client-side Dynamic Pages

Project 3 of EECS 485. The same chat app is rebuilt as a **single-page application**. Flask now
serves a single HTML shell plus a JSON REST API, and a React app in the browser does all the
rendering.

## Overview

Instead of reloading a full page for every action, the React frontend makes asynchronous
requests to the API and updates only what changed. The backend still owns the state
(accounts, sessions, conversations, messages) and still sends conversation history to the LLM.

## Architecture

1. Flask serves one static `index.html` that loads the React bundle.
2. React Router handles navigation in the browser without full page reloads.
3. Components fetch data from the REST API and render it.
4. The API stores and loads data from SQLite and calls the LLM when a message is sent.

## REST API

All endpoints live under `/api/v1/`, grouped by resource:

| Resource | Endpoint | Purpose |
| --- | --- | --- |
| Conversations | `/api/v1/conversations/` | List and create conversations, read their metadata |
| Messages | `/api/v1/conversations/{id}/messages/` | Read and send messages in a conversation |
| Models | `/api/v1/models` | List the available LLMs |
| Accounts | `/api/v1/accounts/` | Create accounts, log in, and log out |

## What I Learned

- **Client-side rendering:** how a single-page app differs from server-rendered pages, and the
  trade-offs between the two.
- **React:** components, props, state, effects, and React Router.
- **Asynchronous JavaScript:** `fetch`, promises, and `async`/`await`.
- **REST API design:** resource URLs, JSON responses, HTTP methods, and status codes.
- **Testing:**
  - backend API tests with pytest
  - end-to-end browser tests with Cypress
  - mutation testing, where the autograder plants bugs to check whether my tests catch them
- **Frontend tooling:** bundling with webpack, linting, and formatting.

## Tech Stack

| Area | Technology |
| --- | --- |
| Frontend | React, React Router, JavaScript |
| Backend | Python, Flask (REST API) |
| Database | SQLite |
| Testing | pytest, Cypress |

## Links

- [Project spec](https://eecs485staff.github.io/p3-chat485-clientside/)
- Previous: [Chat485 server-side](./chat485-serverside.md)

---

Back to the [EECS 485 overview](./main.md)
