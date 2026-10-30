---
title: Networking
description: A simulated cyberattack investigation using packet traces, network protocols, and enterprise authentication.
tags: [networking, wireshark, python, security]
order: 3
---

# Networking

Project 3 of EECS 388. An investigation of a simulated cyberattack. Playing the role of a newly
hired government analyst, I worked through network traffic and an enterprise environment to
figure out what happened, using the same offensive techniques the attackers would.

## Overview

The project introduces network protocols, packet trace analysis, and why large interconnected
systems are hard to engineer securely, from both the networking and the authentication side.
All attacks happen inside controlled, simulated environments.

## Skills Practiced

- **Packet analysis:** capturing, filtering, and reading network traffic in Wireshark
- **Protocol knowledge:** following conversations across the layers of the network stack
- **Socket programming:** writing Python tools that talk to network services directly
- **Enterprise authentication:** how networked services authenticate users, and where that breaks
- **Offensive techniques:** how attackers move through a network, including man-in-the-middle attacks

## What I Learned

- **Core network protocols and concepts**, and what they reveal on the wire
- **Design trade-offs** for networked services and authentication in organizations
- **How intrusions actually work**, which makes it clearer which defenses matter
- **Why encryption and authentication** are essential on untrusted networks

## Tech Stack

| Area | Technology |
| --- | --- |
| Analysis | Wireshark |
| Scripting | Python (sockets) |
| Environment | Docker container with simulated network |

## Links

- [Project spec](https://eecs388.org/projects/networking.html)

---

Back to the [EECS 388 overview](./main.md)
