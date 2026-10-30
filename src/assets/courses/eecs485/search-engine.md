---
title: Search Engine
description: A scalable Wikipedia search engine using MapReduce, tf-idf, and PageRank.
tags: [python, mapreduce, information-retrieval, flask]
order: 5
draft: true
---

# Search Engine

Project 5 of EECS 485. A scalable search engine similar to Google or Bing, built over a subset
of Wikipedia pages.

## Overview

The system has three parts:

1. **Inverted index pipeline:** a chain of MapReduce programs that turns raw documents into a
   segmented inverted index.
2. **Index servers:** REST API services that return ranked search results as JSON. There is one
   server per index segment.
3. **Search server:** the user-facing website. It queries every Index server, merges the
   results, and renders them like a real search results page.

## Architecture

| Component | Role |
| --- | --- |
| MapReduce pipeline | Computes term frequencies, inverse document frequencies, and document normalization factors |
| Inverted index | Split into segments by document ID, so each segment can be served independently |
| Index server | Loads one segment plus PageRank scores and returns scored hits for a query |
| Search server | Sends the query to all Index servers in parallel and combines the top results |

## Ranking

Each result's score combines two signals:

- **tf-idf cosine similarity:** how well the document's words match the query.
- **PageRank:** how important the page is, based on links between pages.

A weight parameter controls the balance. A higher weight favors PageRank, and a lower weight
favors text relevance.

## Concepts

- **Information retrieval:** text analysis, tf-idf, cosine similarity, and stop-word removal
- **Link analysis:** PageRank
- **Parallel data processing:** MapReduce pipelines (run with Michigan Hadoop, "Madoop")
- **Service-oriented architecture:** splitting search into independently scalable services
- **Concurrency:** querying multiple Index servers at once

## Tech Stack

| Area | Technology |
| --- | --- |
| Index pipeline | Python, MapReduce (Hadoop Streaming interface) |
| Services | Python, Flask (REST API and server-side pages) |
| Data | Wikipedia document subset, PageRank scores |

## Links

- [Project spec](https://eecs485staff.github.io/p5-search-engine/)
- Previous: [MapReduce](./mapreduce.md)

---

Back to the [EECS 485 overview](./main.md)
