---
title: Among Us
description: Minimum spanning trees and the Traveling Salesperson Problem with heuristics and branch and bound.
tags: [c++, graphs, mst, tsp]
order: 5
---

# Among Us

Project 4 of EECS 281. Graph optimization themed after *Among Us*. The input is a map of rooms
given as x-y coordinates, and the program works in three modes:

| Mode | Role | Problem |
| --- | --- | --- |
| `MST` | Impostor | Build a vent network connecting every room with the least total length |
| `FASTTSP` | Ghost crewmate | Quickly find a short tour that visits every room and returns to the start |
| `OPTTSP` | Ghost crewmate | Find the *guaranteed optimal* tour |

## Part A: Minimum Spanning Tree

- The map has three areas: the **Lab**, the **Outer Area**, and a **Decontamination** zone
  between them.
- Vents can't go directly between the Lab and the Outer Area. They have to pass through
  Decontamination.
- Every room can potentially connect to every other room, so the graph is dense. That makes the
  choice between **Prim's** and **Kruskal's** algorithm matter.

## Part B: Fast TSP

- The Traveling Salesperson Problem is NP-hard, so an exact answer is too slow here.
- Instead, I researched and compared **TSP heuristics** (construction methods such as nearest
  neighbor and insertion, and improvements such as 2-opt).
- The goal was the best balance of tour quality and speed under the autograder's time limit.

## Part C: Optimal TSP

- Exhaustive search over permutations, made practical with **branch and bound**.
- Compute a lower bound for every partial tour, and skip any branch that can't beat the best
  tour found so far.
- A good starting tour from Part B makes pruning much more effective.

## What I Learned

- **MST algorithms**, and picking the right one based on graph density
- **Heuristics vs. exact algorithms:** trading optimality for speed on NP-hard problems
- **Branch and bound:** how lower bounds and pruning make exponential search usable
- **Runtime and quality trade-offs:** there's no single correct output for Part B
- **Memory awareness:** computing distances on the fly instead of storing every edge
- **Visual debugging:** plotting graphs and tours to spot mistakes

## Links

- [Project spec](https://eecs281staff.github.io/p4-among-us/)

---

Back to the [EECS 281 overview](./main.md)
