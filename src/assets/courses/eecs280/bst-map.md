---
title: BST Map
description: A templated map container built on a recursive binary search tree.
tags: [c++, recursion, templates, bst]
order: 6
---

# Binary Search Tree Map

Project 6 of EECS 280. A map container similar to `std::map`, built on a binary search tree
that I implemented myself.

## Overview

The project has two layers:

1. **`BinarySearchTree`:** a templated tree that keeps elements sorted and supports
   insertion, search, traversal, and iteration.
2. **`Map`:** an associative container that stores key-value pairs in the tree, using a custom
   comparator so it only compares keys.

In earlier terms this was combined with the machine learning project, whose word counts can run
on this map instead of `std::map`.

## What I Learned

- **Recursion:** writing tree operations (size, height, copy, destroy, search, traversals) as
  recursive functions
- **Binary search trees:** the sorting invariant, and why tree height determines performance
- **Templates:** writing generic code that works for any key and value types
- **Functors:** passing comparison objects to customize ordering
- **Associative containers:** how maps and sets work under the hood

## Links

- [Project spec](https://eecs280staff.github.io/bst-map/)
- Related: [Machine Learning Classifier](./ml-classifier.md)

---

Back to the [EECS 280 overview](./main.md)
