---
title: Image Processing
description: Content-aware image resizing using the seam-carving algorithm.
tags: [c++, pointers, algorithms, images]
order: 2
---

# Image Processing (Seam Carving)

Project 2 of EECS 280 (called "Computer Vision" in the Fall 2025 syllabus). A program that
resizes images **without distorting them** using seam carving.

## Overview

Normal resizing squashes or stretches everything. Seam carving instead finds "seams", connected
paths of pixels from one edge of the image to the other, that pass through the least important
parts of the image, and removes them. Important content like people and objects keeps its shape
while the background shrinks.

## How It Works

1. **Energy:** compute how "important" each pixel is, based on how different it is from its
   neighbors. Edges and details have high energy.
2. **Cost matrix:** for each pixel, compute the minimum total energy of any seam reaching it.
3. **Find the seam:** trace back the lowest-cost path from bottom to top.
4. **Remove the seam:** shift pixels over to close the gap. Repeat until the image is the
   target width.
5. **Resize height:** rotate the image, carve vertical seams, and rotate it back.

## What I Learned

- **C-style ADTs:** building `Matrix` and `Image` abstractions with structs and functions
- **Pointers:** working directly with memory through C-style pointers
- **Streams and I/O:** reading and writing image files in the PPM format
- **Dynamic programming:** the cost matrix reuses results for earlier rows instead of recomputing them
- **Testing and debugging:** isolating bugs in each layer of the program

## Links

- [Project spec](https://eecs280staff.github.io/image-processing/)

---

Back to the [EECS 280 overview](./main.md)
