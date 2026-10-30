---
title: SillyQL
description: An in-memory relational database with a SQL-like shell, joins, and hash and BST indexes.
tags: [c++, hash-tables, bst, databases]
order: 4
---

# SillyQL

Project 3 of EECS 281. A basic relational database with an interactive shell based on a subset
of SQL. The executable is called `silly`. The design work was the hardest part: deciding which
data structures to use and how they should interact.

## Commands

| Command | What it does |
| --- | --- |
| `CREATE` | Create a table with typed columns (string, double, int, bool) |
| `INSERT INTO` | Add rows to a table |
| `PRINT ... WHERE` | Print selected columns, optionally filtered by a condition |
| `DELETE FROM ... WHERE` | Remove the rows that match a condition |
| `JOIN` | Combine two tables on matching column values |
| `GENERATE INDEX` | Build a hash or BST index on a column to speed up later queries |
| `REMOVE` | Delete a table |
| `QUIT` | Exit and clean up |

## Indexes

- **Hash index** (`std::unordered_map`): fast lookups for equality conditions.
- **BST index** (`std::map`): keeps keys sorted, so less-than and greater-than conditions are fast.
- Indexes must stay correct as rows are inserted and deleted.
- Each table has at most one user-generated index at a time.

## What I Learned

- **Hash tables vs. balanced BSTs:** when each one gives the best performance
- **Designing with composition:** combining multiple data structures into one system
- **Supporting multiple column types:** storing strings, doubles, ints, and bools in the same table
- **Functors and predicates:** filtering rows with comparison objects instead of repeated code
- **Database fundamentals:** tables, queries, joins, and why indexes matter
- **Error handling:** reporting bad commands without crashing the shell

## Links

- [Project spec](https://eecs281staff.github.io/p3-sillyql/)

---

Back to the [EECS 281 overview](./main.md)
