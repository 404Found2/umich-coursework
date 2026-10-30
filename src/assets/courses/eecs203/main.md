---
title: EECS 203
name: Discrete Mathematics
semester: Fall 2025
description: The mathematical foundations of computer science, from proofs and logic to graphs, counting, and probability.
order: 203
---

# EECS 203: Discrete Mathematics

EECS 203 is the mathematical foundation for computer science. Instead of programming
projects, the course is built around weekly problem sets and discussion sections where I
practiced writing **rigorous proofs**. The tools from this class show up everywhere later:
induction in recursion, graphs in algorithms, counting in complexity analysis, and modular
arithmetic in cryptography.

## What I Learned

### Proofs and logic

- **Propositional and predicate logic:** truth tables, logical equivalence, and quantifiers
- **Boolean algebra**
- **Proof techniques:**
  - direct proofs and disproofs by counterexample
  - proof by contrapositive
  - proof by contradiction
  - proof by cases

### Sets, functions, and infinity

- Set operations and set-builder notation
- Functions: one-to-one (injective), onto (surjective), and bijections
- **Cardinality:** countable vs. uncountable sets, and why some infinities are bigger than others

### Number theory

- Divisibility and **modular arithmetic**
- Modular exponentiation and solving modular equivalences
- The **Euclidean algorithm**, GCDs as linear combinations, and modular inverses
- Fermat's Little Theorem, which underlies RSA cryptography

### Graph theory

- Graph terminology, isomorphism, paths, and connectivity
- Graph coloring

### Induction and recursion

- **Mathematical induction** and **strong induction**
- **Structural induction** for recursively defined structures and recursive programs
- Recurrence relations

### Counting and probability

- Sum and product rules, the pigeonhole principle
- **Permutations and combinations**, combinatorial proofs, and "balls and bars" (stars and bars)
- Probability, conditional probability, and **Bayes' rule**
- Random variables and **expected value**

### Algorithms and complexity

- Asymptotic analysis and **Big-O**, Big-Omega, and Big-Theta notation
- Divide-and-conquer algorithms

## How It Connects

| Topic | Where I used it next |
| --- | --- |
| Big-O and recurrences | Analyzing algorithms in [EECS 281](../eecs281/main.md) |
| Graphs | BFS, DFS, MSTs, and shortest paths in [EECS 281](../eecs281/main.md) |
| Induction | Reasoning about recursive code in [EECS 280](../eecs280/main.md) |
| Modular arithmetic | RSA and cryptography in [EECS 388](../eecs388/main.md) |
| Probability | The Naive Bayes classifier in [EECS 280](../eecs280/ml-classifier.md) |

## Course Structure

| Component | Details |
| --- | --- |
| Homework | Weekly homework and check-in problem sets |
| Discussion | Weekly discussion sections, including inquiry-based (IBL) sections |
| Exams | Midterm and final |
| Textbook | Rosen, *Discrete Mathematics and Its Applications* |

## Resources

- [Course website](https://eecs203.github.io/eecs203.org/)
- [Course description](https://ece.engin.umich.edu/academics/course-information/course-descriptions/eecs-203/)
