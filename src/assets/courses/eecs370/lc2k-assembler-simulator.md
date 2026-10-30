---
title: LC-2K Assembler & Simulator
description: An assembler and behavioral simulator for the LC-2K ISA, plus a multiplication program in assembly.
tags: [c, assembly, isa]
order: 1
---

# LC-2K Assembler & Simulator

Project 1 of EECS 370. Three parts that together make a working toolchain for **LC-2K**, a small
32-bit instruction set used throughout the course.

## Overview

| Part | What I built |
| --- | --- |
| 1A: Assembler | A C program that turns LC-2K assembly (`.as`) into machine code (`.mc`) |
| 1S: Simulator | A C program that runs a machine code file and prints the machine state after each instruction |
| 1M: Multiplication | An LC-2K assembly program that multiplies two 15-bit numbers |

## The LC-2K ISA

- **8 registers** and 32-bit words
- **8 instructions:**
  - **R-type:** `add`, `nor`
  - **I-type:** `lw`, `sw`, `beq`
  - **J-type:** `jalr`
  - **O-type:** `halt`, `noop`
- The `.fill` directive stores data or label addresses in memory

## How It Works

1. **Assembler:** a two-pass design. The first pass records the address of every label. The
   second pass encodes each instruction's opcode, registers, and offset field into a 32-bit
   word, and reports errors like undefined labels or out-of-range offsets.
2. **Simulator:** loads machine code into memory, then repeatedly fetches, decodes, and executes
   instructions, updating registers and the program counter until `halt`.
3. **Multiplication:** LC-2K has no multiply instruction, so the program builds multiplication
   from adds, `nor`, and bit masks.

## What I Learned

- **Instruction encoding:** packing fields into bits with shifts and masks
- **Two's complement:** sign-extending 16-bit offsets
- **The fetch-decode-execute cycle**
- **Thinking in assembly:** implementing multiplication with only the instructions available
- **Testing:** writing test programs designed to expose bugs in buggy instructor implementations

## Links

- [Project spec](https://eecs370.github.io/project_1_spec/)
- Next: [Linker](./linker.md)

---

Back to the [EECS 370 overview](./main.md)
