---
title: MapReduce
description: A multi-process, multi-threaded MapReduce framework in Python with fault tolerance.
tags: [python, distributed-systems, sockets, threads]
order: 4
draft: true
---

# MapReduce

Project 4 of EECS 485. A MapReduce framework in Python, inspired by Google's original MapReduce
paper. It runs user-submitted MapReduce jobs on a single machine using multiple processes and
threads that communicate over the network, the same way a real cluster would.

## Overview

The framework has two main pieces:

- **Manager:** listens for submitted jobs, splits them into tasks, and assigns tasks to Workers.
- **Workers:** register with the Manager, run map and reduce tasks, and report back when done.

## How a Job Runs

1. **Submit:** a user submits a job with an input directory and map and reduce programs.
2. **Partition:** the Manager splits the input into map tasks.
3. **Map:** Workers run the map program and write partitioned, sorted intermediate output.
4. **Group:** intermediate results are grouped by key so all values for a key end up together.
5. **Reduce:** Workers run the reduce program on each group and write the final output.

## Fault Tolerance

- Workers send regular **heartbeat** messages to the Manager over UDP.
- If a Worker stops sending heartbeats, the Manager marks it dead and reassigns its task.
- Instructions and status updates travel over TCP.

## Concepts

- **MapReduce program execution**
- **Distributed systems basics:** coordinating a Manager and many Workers
- **OS concurrency:** threads and processes
- **Networking:** TCP and UDP sockets
- **Fault tolerance:** heartbeats and task reassignment

## Tech Stack

| Area | Technology |
| --- | --- |
| Language | Python |
| Concurrency | Threads, processes |
| Networking | TCP and UDP sockets |

## Links

- [Project spec](https://eecs485staff.github.io/p4-mapreduce/)
- Next: [Search engine](./search-engine.md), which uses MapReduce pipelines to build its index

---

Back to the [EECS 485 overview](./main.md)
