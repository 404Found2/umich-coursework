---
title: Priority Queues
description: Implementing sorted-array, binary heap, and pairing heap priority queues behind one templated interface.
tags: [c++, heaps, templates]
order: 3
---

# Priority Queues

Project 2B of EECS 281. Several implementations of the priority queue ADT, all behind the same
templated `Eecs281PQ` interface, so they can be swapped in for one another and compared.

## Implementations

| Priority queue | Idea | Trade-off |
| --- | --- | --- |
| Unordered (provided) | Search the whole container for the top element | Fast push, slow pop |
| Sorted array | Keep elements in sorted order | Fast top and pop, slow push |
| Binary heap | Complete binary tree stored in an array | Logarithmic push and pop |
| Pairing heap | A node-based heap, learned from a research paper | Very fast push and merge; supports updating priorities |

Every implementation supports `push`, `pop`, `top`, `size`, and `empty`, and can rebuild itself
when priorities change. The pairing heap can also update a single element's priority directly.

## What I Learned

- **Heaps from scratch:** the heap invariant and the operations that restore it
- **Learning from a paper:** implementing the pairing heap from its original description,
  which is a skill I'll need on the job
- **Templates and inheritance:** implementing a templated abstract interface in several
  subclasses that take custom comparators
- **Pointer-based structures:** managing nodes, and writing a correct destructor and copy
  operations without leaks
- **Empirical comparison:** measuring each implementation's performance on different workloads

## Links

- [Project spec](https://eecs281staff.github.io/p2b-priority-queues/)
- Part A: [The Walking Deadline](./walking-deadline.md)

---

Back to the [EECS 281 overview](./main.md)
