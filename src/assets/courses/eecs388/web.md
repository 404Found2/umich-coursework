---
title: Web Security
description: A security review of an insecure website using SQL injection, XSS, CSRF, and SSRF attacks.
tags: [web-security, sql, javascript]
order: 2
---

# Web Security

Project 2 of EECS 388. A security review of a deliberately insecure website. The setup: after a
cyberattack, U-M hired a consulting firm to rebuild its website, and my job was to find what
they got wrong before it went live.

## The Vulnerabilities

| Attack | Idea |
| --- | --- |
| **SQL injection (SQLi)** | User input changes the structure of a database query |
| **Cross-site scripting (XSS)** | Attacker-controlled JavaScript runs in a victim's browser on a trusted site |
| **Cross-site request forgery (CSRF)** | Another site tricks a logged-in user's browser into sending unwanted requests |
| **Server-side request forgery (SSRF)** | The server is tricked into making requests to internal resources |

For each class of attack, the project also includes a series of **flawed defenses** to bypass,
such as filters and escaping that only handle some cases.

## What I Learned

- **The web platform security model:** origins, cookies, and the same-origin policy
- **Spotting vulnerabilities** in web apps and SQL-backed code
- **Why naive defenses fail:** blocklists and partial escaping can almost always be bypassed
- **Real defenses:** parameterized queries, context-aware output encoding, CSRF tokens and
  `SameSite` cookies, and validating server-side requests
- **Browser DevTools** for inspecting requests, cookies, and the DOM
- **Ethics:** testing only with authorization

## Links

- [Project spec](https://eecs388.org/projects/web.html)
- Related: I build my own web app's sessions and security in [EECS 485 Chat485](../eecs485/chat485-serverside.md)

---

Back to the [EECS 388 overview](./main.md)
