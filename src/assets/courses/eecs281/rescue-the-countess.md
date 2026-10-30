---
title: Rescue the Countess
description: Guiding Marco through a multi-room castle with warp pipes using stack- and queue-based search.
tags: [c++, bfs, dfs, graphs]
order: 1
---

# Rescue the Countess

Project 1 of EECS 281. Louser has taken Countess Cherry captive in his maze-like castle, and
Marco needs a path to rescue her. The program finds a route through the castle using two search
strategies: one based on a **queue** (breadth-first) and one based on a **stack** (depth-first).

## The Castle

- Up to 10 square rooms of the same size
- `.` is open floor, `#` is a wall, and `!` is one of Louser's minions (which can't be walked through)
- `S` is Marco's start and `C` is the Countess
- A digit `0`–`9` is a **warp pipe**: stepping on it lets Marco reach the same row and column
  in the room with that number

Marco moves north, east, south, or west within a room, or through warp pipes between rooms.
That makes the castle a 3D grid graph: room, row, and column.

## How It Works

1. Read the castle in either **map** format or **coordinate list** format.
2. Search from `S` using a single search container: as a queue for BFS, or as a stack for DFS.
3. Record how each location was discovered, so the route can be traced back from `C` to `S`.
4. Print the route in either a map view or a coordinate list, or report that there's no solution.

## Features

- [x] Two input formats (map and coordinate list)
- [x] Queue-based (BFS) and stack-based (DFS) routing
- [x] Two output formats showing the path taken
- [x] Command-line options parsed with `getopt_long`
- [x] Error checking for invalid input and options

## What I Learned

- **BFS vs. DFS:** how the choice of container changes the search order and the route found
- **Modeling problems as graphs:** grid cells and warp pipes become vertices and edges
- **Backtracking a path** from the goal to the start
- **Performance-conscious C++:** choosing compact data structures for large 3D maps, and fast I/O
- **Command-line programs:** parsing options and handling errors properly
- **Testing:** writing small test files that catch bugs in buggy instructor solutions

## Links

- [Project spec](https://eecs281staff.github.io/p1-rescue-the-countess/)

---

Back to the [EECS 281 overview](./main.md)
