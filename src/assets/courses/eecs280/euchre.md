---
title: Euchre
description: A simulation of the Michigan card game Euchre with AI and human players.
tags: [c++, oop, polymorphism]
order: 3
---

# Euchre

Project 3 of EECS 280. A program that simulates a full game of Euchre, a trick-taking card game
popular in Michigan, with both a computer-controlled player and a human player.

## Overview

The game is built from layered abstractions: cards, a pack of cards, players, and the game
itself. Each player type follows the same interface but makes decisions differently, which
makes this project an introduction to object-oriented design in C++.

## Components

| Component | Responsibility |
| --- | --- |
| `Card` | Rank and suit, plus Euchre-specific ordering (trump suit, bowers) |
| `Pack` | A deck of cards that can be shuffled and dealt |
| `Player` | Abstract interface for making trump decisions and playing cards |
| Simple player | AI strategy for choosing trump and leading or following tricks |
| Human player | Reads decisions from the keyboard |
| Game | Deals hands, runs trump selection and tricks, and keeps score |

## What I Learned

- **Abstract data types in C++:** classes with private data and public interfaces
- **Inheritance and polymorphism:** an abstract base class with derived player types, called
  through virtual functions
- **Factory functions:** creating the right player type at runtime
- **Designing for testability:** unit-testing each layer before building the full game
- **Working with a checkpoint:** delivering the core classes before the complete game

## Links

- [Project spec](https://eecs280staff.github.io/euchre/)

---

Back to the [EECS 280 overview](./main.md)
