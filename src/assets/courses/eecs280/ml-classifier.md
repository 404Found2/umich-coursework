---
title: Machine Learning Classifier
description: A Naive Bayes classifier that predicts the topic of EECS 280 forum posts.
tags: [c++, machine-learning, nlp, maps]
order: 4
---

# Machine Learning: Forum Post Classifier

Project 4 of EECS 280. A program that automatically identifies the topic of posts from the EECS
280 Piazza forum, such as which project a question is about, using supervised machine learning.

## Overview

Humans can tell a post about "cards" and "spades" is about Euchre, but writing those rules by
hand doesn't scale. Instead, the program **learns** which words go with which topics from
previously labeled posts, then uses that knowledge to classify new ones.

## How It Works

1. **Bag of words:** each post is treated as the set of unique words it contains. Word order and
   repeats are ignored.
2. **Training:** count how many posts have each label, and how often each word appears with each label.
3. **Prediction:** for a new post, compute a log-probability score for every label using those
   counts (a Naive Bayes classifier). Pick the label with the highest score.
4. **Evaluation:** run the classifier on a separate test set and report its accuracy.

## What I Learned

- **Container ADTs:** using `std::set` and `std::map` to count and look up words efficiently
- **Supervised machine learning:** separating training data from test data
- **Probability in practice:** working with log-probabilities so tiny numbers don't underflow
- **Program design:** structuring a larger application into a classifier class and helpers
- **Natural language processing basics:** turning text into features

## Links

- [Project spec](https://eecs280staff.github.io/ml-classifier/)
- Related: the map in this project is the kind of container I build myself in [BST Map](./bst-map.md)

---

Back to the [EECS 280 overview](./main.md)
