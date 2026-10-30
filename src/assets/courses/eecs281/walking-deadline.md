---
title: The Walking Deadline
description: A zombie tower-defense simulation that uses priority queues to decide which zombie to shoot next.
tags: [c++, priority-queues, simulation]
order: 2
---

# The Walking Deadline

Project 2A of EECS 281. Zombies are invading the Beyster Building, and I'm defending it with a
bow, an infinite supply of arrows, and priority queues. The program simulates the battle round
by round and decides which zombie to shoot first.

## How the Game Works

Each round:

1. Refill the quiver to full capacity.
2. Every active zombie moves closer by its speed. If one reaches the player, the game is lost.
3. New zombies arrive, some from the input file and some randomly generated.
4. Fire every arrow in the quiver, always at the most urgent zombie.

The game ends when the player is killed or when every zombie has been destroyed.

## Prioritizing Targets

Zombies are ranked by **estimated time of arrival** (distance divided by speed). Ties are broken
by health and then by name. A priority queue with a custom comparator always gives the most
urgent zombie in logarithmic time.

## Optional Output Modes

| Flag | Output |
| --- | --- |
| `--verbose` | Every zombie created, moved, and destroyed |
| `--statistics N` | Summary at the end, such as the first and last N zombies destroyed and the most and least active |
| `--median` | A running median of how long destroyed zombies were active |

## What I Learned

- **Priority queues in practice:** `std::priority_queue` with custom comparators
- **Simulation design:** keeping the round logic separate from bookkeeping and output
- **Tracking statistics efficiently** while the simulation runs
- **Object-oriented design** for the game's entities
- **Performance:** avoiding unnecessary copies of zombie objects

## Links

- [Project spec](https://eecs281staff.github.io/p2-the-walking-deadline/)
- Part B: [Priority Queues](./priority-queues.md)

---

Back to the [EECS 281 overview](./main.md)
