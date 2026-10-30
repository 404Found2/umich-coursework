---
title: Pipeline Simulator
description: A cycle-accurate simulator of a 5-stage pipelined LC-2K processor with forwarding and hazard handling.
tags: [c, computer-architecture, pipelining]
order: 3
---

# Pipeline Simulator

Project 3 of EECS 370. A cycle-accurate simulator of a **pipelined** LC-2K processor in C. Each
simulated clock cycle moves instructions forward through the pipeline's stages, just like the
hardware would.

## Pipeline Design

The processor has five stages separated by pipeline registers:

```
IF  ->  ID  ->  EX  ->  MEM  ->  WB
   IF/ID  ID/EX  EX/MEM  MEM/WB  WB/END
```

| Stage | Work done |
| --- | --- |
| IF (fetch) | Read the next instruction from memory |
| ID (decode) | Read source registers and detect hazards |
| EX (execute) | ALU operations and branch comparisons |
| MEM (memory) | `lw` and `sw` access data memory, and branches resolve |
| WB (write back) | Write results to the register file |

## Hazard Handling

- **Data forwarding:** results from later stages are routed back to EX so dependent
  instructions don't have to wait.
- **Load-use stalls:** when an instruction needs a value that a `lw` hasn't loaded yet, the
  pipeline stalls for one cycle by inserting a `noop` bubble.
- **Control hazards:** branches are predicted not taken. If a branch is actually taken, the
  wrongly fetched instructions are squashed.

## What I Learned

- **How pipelining increases throughput**, and the hazards it introduces
- **Thinking cycle by cycle:** keeping every pipeline register consistent within a cycle
- **Forwarding and stall logic:** checking hazards between instructions in different stages
- **Branch prediction:** the cost of mispredictions
- **Debugging with traces:** comparing state dumps against the course's visual pipeline simulator

## Links

- [Course pipeline simulator](https://eecs370.github.io/simulators/pipeline/)
- Previous: [Linker](./linker.md)
- Next: [Cache Simulator](./cache-simulator.md)

---

Back to the [EECS 370 overview](./main.md)
