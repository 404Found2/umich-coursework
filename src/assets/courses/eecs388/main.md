---
title: EECS 388
name: Intro to Computer Security
semester: Fall 2026
description: The security mindset applied to cryptography, the web, networks, native code, and forensics.
order: 388
---

# EECS 388: Introduction to Computer Security

EECS 388 teaches the **security mindset**: thinking like an attacker in order to build systems
that hold up against one. The course covers the principles and practice of computer security
for software, host systems, and networks. Each project gives me permission to attack a
deliberately vulnerable system, so I can see exactly why the standard defenses exist.

> Taking this course in Fall 2026, so it is still in progress. Pages marked **Draft** are for
> projects I haven't finished yet.

## Projects

<!-- projects -->

## What I Learned

### Cryptography

- Hash functions, message authentication codes (MACs), and why **HMAC** should be used instead
  of plain hashes for authentication
- Symmetric encryption, block cipher modes, and padding
- Public-key cryptography (RSA), digital signatures, and key exchange
- How TLS and certificates protect web traffic
- The most common lesson: real attacks usually target how crypto is *used*, not the math

### Web security

- The browser security model and the same-origin policy
- Injection attacks: **SQL injection** and **cross-site scripting (XSS)**
- Request forgery: **CSRF** and **SSRF**
- Why naive defenses such as blocklists and simple escaping fail

### Network security

- Core protocols and how attackers abuse them
- Analyzing packet captures with Wireshark
- Authentication in enterprise environments
- Man-in-the-middle attacks and how encryption defends against them

### Application security

- Memory layout of a running program: the stack, frames, and return addresses
- **Buffer overflows** and control-flow hijacking
- Defenses such as non-executable memory (DEP) and address randomization (ASLR), and how
  attackers work around them with techniques like **return-oriented programming**

### Forensics, privacy, and more

- Digital forensics and the persistent traces computer use leaves behind
- Information privacy and anonymity
- AI security
- Ethics and law: attacking any system without authorization is illegal

## Labs

Each project comes with a lab that introduces its tools:

| Lab | Tool |
| --- | --- |
| 1 | Docker and Python |
| 2 | Browser DevTools |
| 3 | Python sockets |
| 4 | GDB |
| 5 | Autopsy (forensics) |

## Course Structure

| Component | Details |
| --- | --- |
| Projects and labs | 5 projects (alone or with a partner; P5 requires a partner) and 5 individual labs |
| Exams | Midterm and final |
| Environment | Docker dev containers, plus a dedicated x86-64 VM for the AppSec project |

## Resources

- [Course website](https://eecs388.org/)
- [Assignments](https://eecs388.org/assignments.html)
- Related: [EECS 370](../eecs370/main.md) (assembly and the stack are essential for AppSec)
