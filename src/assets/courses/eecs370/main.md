---
title: EECS 370
name: Intro to Computer Organization
semester: Winter 2026
description: How computers work from instruction sets and assembly down to pipelines, caches, and virtual memory.
order: 370
---

# EECS 370: Introduction to Computer Organization

EECS 370 explains what happens beneath high-level code: how programs become machine
instructions, how a processor executes them, and how memory is organized to make that fast. The
projects are built around **LC-2K**, a small teaching instruction set. I wrote an assembler,
simulator, and linker for it, then a pipelined processor and a cache, all in C.

## Projects

<!-- projects -->

## What I Learned

### Instruction sets and assembly

- Binary, hexadecimal, and two's complement representation
- Instruction set architectures (ISAs): LC-2K and a subset of ARM (LEGv8)
- Translating C to assembly, including control flow, arrays, and structs
- **Function calls in assembly:** the stack, caller- and callee-saved registers, and calling conventions
- **Linking:** object files, symbol tables, and relocation
- Floating-point representation

### Digital logic and processor design

- Combinational logic (gates, multiplexers, adders) and sequential logic (latches, flip-flops)
- Finite state machines
- **Datapaths:** single-cycle, multi-cycle, and pipelined processor designs
- **Hazards:** data hazards (forwarding and stalls) and control hazards (branch prediction and squashing)
- Measuring performance: CPI, clock period, and execution time

### Memory hierarchy

- **Caches:** blocks, direct-mapped, set-associative, and fully associative designs
- Write policies (write-back vs. write-through, allocate-on-write) and LRU replacement
- **Virtual memory:** page tables, multi-level page tables, and TLBs
- Cache-aware programming and memory performance

## Course Structure

| Component | Details |
| --- | --- |
| Projects | 4 projects in C and LC-2K assembly |
| Homework | 4 homework assignments |
| Labs | Weekly labs (binary and C, ARM assembly, digital logic, datapaths, caches) |
| Exams | Midterm and final |

## Resources

- [Course website](https://eecs370.github.io/)
- [Pipeline simulator](https://eecs370.github.io/simulators/pipeline/), an interactive visualizer
- Related: [EECS 280](../eecs280/main.md) for the C/C++ background
