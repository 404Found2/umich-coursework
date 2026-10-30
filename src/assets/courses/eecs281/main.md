---
title: EECS 281
name: Data Structures and Algorithms
semester: Winter 2026
description: Choosing, implementing, and analyzing data structures and algorithms in performance-focused C++.
order: 281
---

# EECS 281: Data Structures and Algorithms

EECS 281 is about picking the right data structure for the job and proving it's fast enough.
Every project is graded on correctness **and** on running time and memory, so I learned to
think about complexity before writing code, and to measure and profile after. The four projects
covered graph search, priority queues, a database with hash table and BST indexes, and
optimization problems like the Traveling Salesperson Problem.

## Projects

<!-- projects -->

## What I Learned

### Analysis

- **Complexity analysis:** Big-O, Big-Theta, and Big-Omega, and best, worst, and average cases
- **Recurrences** and the Master Theorem
- **Amortized analysis**, such as why `vector::push_back` is constant time on average
- **Measuring performance:** profiling with `perf` and checking memory with Valgrind

### Containers and the STL

- Stacks, queues, deques, and priority queues as ADTs
- Array-based containers and the trade-offs between them
- The **Standard Template Library:** containers, iterators, algorithms, and functors/lambdas

### Heaps and sorting

- **Binary heaps**, heapsort, and pairing heaps
- Elementary sorts, **quicksort** (with average-case analysis), and **mergesort**
- Ordered arrays and binary search

### Hashing and trees

- **Hash tables:** hash functions, load factor, and collision resolution (separate chaining and open addressing)
- Trees, **binary search trees**, and self-balancing **AVL trees**

### Graphs and algorithm families

- Graph representations (adjacency list vs. matrix) and BFS/DFS
- **Minimum spanning trees:** Prim's and Kruskal's algorithms (with union-find)
- Shortest paths with Dijkstra's algorithm
- **Algorithm families:**
  - brute force
  - greedy
  - divide and conquer
  - **backtracking** and **branch and bound**
  - **dynamic programming**, such as the knapsack problem

## Course Structure

| Component | Details |
| --- | --- |
| Projects | 4 individual projects (P2 has two parts), graded on correctness, speed, and memory |
| Labs | Weekly labs |
| Exams | Midterm and final |
| Language | C++ (with the STL) |

## Tips

> Profile before optimizing. `perf` and `valgrind` will tell you where the time and memory
> actually go.

- Start projects early. The autograder's time limits are strict.
- Write small test cases first, and keep a brute-force version around to check the fast one.
- Pass large objects by reference, and reserve vector space when the size is known.

## Resources

- [Course website](https://eecs281staff.github.io/eecs281.org/)
- Prerequisites: [EECS 203](../eecs203/main.md) and [EECS 280](../eecs280/main.md)
