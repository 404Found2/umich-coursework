---
title: Text Editor
description: A terminal text editor built on a custom doubly linked list with iterators.
tags: [c++, linked-lists, dynamic-memory, iterators]
order: 5
---

# Text Editor

Project 5 of EECS 280. The core of a terminal-based text editor, usable like nano, Pico, or vi,
built on top of my own linked list.

## Overview

A text buffer needs fast insertions and deletions wherever the cursor is. A doubly linked list
handles that well, so the project starts by implementing a `List` container similar to
`std::list` and then builds the editor's text buffer on top of it.

## Components

| Component | Responsibility |
| --- | --- |
| `List` | A templated doubly linked list with its own iterator type |
| Iterator | Moves forward and backward through the list, like a cursor |
| `TextBuffer` | Stores the text and tracks the cursor's position, row, and column |
| Editor | Provided terminal interface that calls into the `TextBuffer` |

## Features

- [x] Insert and delete characters at the cursor
- [x] Move the cursor forward, backward, and between lines
- [x] Track the cursor's current row and column

## What I Learned

- **Dynamic memory:** allocating and freeing nodes with `new` and `delete`
- **The Big Three:** writing a destructor, copy constructor, and assignment operator so lists
  copy deeply and never leak memory
- **Linked lists:** pointer manipulation for inserting and erasing nodes
- **Iterators:** designing an iterator class and its operators
- **Memory debugging:** finding leaks and invalid accesses with sanitizer tools

## Links

- [Project spec](https://eecs280staff.github.io/list-editor/)

---

Back to the [EECS 280 overview](./main.md)
