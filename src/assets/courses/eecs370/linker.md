---
title: Object Files & Linker
description: An LC-2K assembler that emits object files, a linker for multi-file programs, and recursive assembly.
tags: [c, assembly, linking]
order: 2
---

# Object Files & Linker

Project 2 of EECS 370. Extends the Project 1 assembler so LC-2K programs can be split across
multiple files and linked into one executable.

## Overview

| Part | What I built |
| --- | --- |
| 2A: Assembler | Outputs an **object file** instead of machine code |
| 2L: Linker | Combines 1–6 object files into one machine code file that the Project 1 simulator can run |
| 2R: Recursion | A recursive LC-2K assembly function that computes combination(n, r) |

## Object File Format

| Section | Contents |
| --- | --- |
| Header | Sizes of the sections that follow |
| Text | Machine code instructions |
| Data | Words created by `.fill` directives |
| Symbol table | Global labels: defined in Text, defined in Data, or Undefined |
| Relocation table | Every instruction or data word that uses a label's address and must be fixed up |

## How Linking Works

1. Concatenate the Text sections of every object file, in argument order, followed by all the
   Data sections.
2. Build a combined symbol table and check for undefined or duplicate global labels.
3. Walk each relocation table and rewrite each address to the label's final location.
4. Output a single machine code file. The first object file acts as `main`.

## What I Learned

- **What a linker actually does:** symbol resolution and relocation
- **Local vs. global labels**, and why only some symbols need to be visible to other files
- **Calling conventions in practice:** writing a recursive function that saves registers and the
  return address on a stack it manages itself

## Links

- [Project spec](https://eecs370.github.io/project_2_spec/)
- Previous: [LC-2K Assembler & Simulator](./lc2k-assembler-simulator.md)
- Next: [Pipeline Simulator](./pipeline-simulator.md)

---

Back to the [EECS 370 overview](./main.md)
