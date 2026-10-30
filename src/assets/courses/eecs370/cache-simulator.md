---
title: Cache Simulator
description: A configurable set-associative cache with write-back and LRU, integrated into the LC-2K simulator.
tags: [c, caches, memory-hierarchy]
order: 4
---

# Cache Simulator

Project 4 of EECS 370. A flexible CPU cache simulator, integrated into the Project 1 LC-2K
simulator so that every instruction fetch, `lw`, and `sw` goes through the cache.

## Overview

The cache is configured from the command line with three parameters:

| Parameter | Meaning |
| --- | --- |
| Block size | Number of words in each cache block |
| Number of sets | How many sets the cache has |
| Blocks per set | Associativity: from 1 (direct-mapped) up to fully associative |

## Cache Policies

- **Unified cache** for both instructions and data
- **Write-back:** dirty blocks are written to memory only when they are evicted
- **Allocate-on-write:** a write miss brings the block into the cache first
- **Replacement:** fill an empty block if one exists, otherwise evict the least recently used (**LRU**) block

## How It Works

1. Split each address into **tag**, **set index**, and **block offset** bits.
2. Search the set for a valid block with a matching tag (hit or miss).
3. On a miss, evict a block if needed (writing it back if dirty) and load the new block from memory.
4. Update LRU order and dirty bits, then return or write the data.
5. Log every transfer between the processor, cache, and memory.

## What I Learned

- **Address decomposition:** how tag, index, and offset bits depend on the cache configuration
- **Associativity trade-offs:** fewer conflict misses vs. more complex lookups
- **Write policies:** why write-back saves memory traffic
- **LRU bookkeeping**
- **Locality:** how program access patterns affect hit rates

## Links

- [Project spec](https://eecs370.github.io/project_4_spec/)
- Previous: [Pipeline Simulator](./pipeline-simulator.md)

---

Back to the [EECS 370 overview](./main.md)
