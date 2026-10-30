---
title: Application Security
description: Exploiting buffer overflows in C programs, from stack smashing to bypassing DEP with ROP.
tags: [c, x86, gdb, exploits]
order: 4
draft: true
---

# Application Security

Project 4 of EECS 388. A series of increasingly difficult **control-flow hijacking** challenges
against small vulnerable C programs, developed and tested inside a dedicated x86-64 virtual
machine.

## Targets

The challenges build on each other:

| Level | Technique |
| --- | --- |
| Easy | Overwriting a variable on the stack |
| Easy | Overwriting the return address |
| Easy | Redirecting control to injected shellcode |
| Medium | Overwriting the return address indirectly |
| Medium | Exploiting bugs beyond string functions |
| Medium | Bypassing non-executable memory (DEP) |
| Medium | Handling a variable stack position |
| Hard | Return-oriented programming (ROP) |
| Hard | Reverse-engineering a binary with Ghidra |

## What I Learned

- **Mechanics of buffer overflows:** how unchecked writes corrupt the stack and hijack execution
- **Machine architecture:** x86-64 registers, stack frames, and calling conventions in assembly
- **Debugging at the machine level:** stepping through programs and inspecting memory with GDB
- **Defenses and their limits:** DEP, ASLR, and stack protections, and how ROP gets around DEP
- **Writing safer native code:** recognizing and avoiding these bugs in my own C and C++

## Tech Stack

| Area | Technology |
| --- | --- |
| Targets | C programs on x86-64 Linux |
| Exploit development | Python |
| Tools | GDB, Ghidra |
| Environment | Dedicated VM, accessed over SSH |

## Links

- [Project spec](https://eecs388.org/projects/appsec.html)
- Background: stack frames and assembly from [EECS 370](../eecs370/main.md)

---

Back to the [EECS 388 overview](./main.md)
