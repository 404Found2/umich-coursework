---
title: Cryptography
description: Attacking misused crypto with length extension, MD5 collisions, a padding oracle, and RSA signature forgery.
tags: [python, cryptography, security]
order: 1
---

# Cryptography

Project 1 of EECS 388. Four attacks on vulnerable uses of cryptography, each inspired by real
security bugs. The theme throughout is that strong primitives can still be broken when they're
applied incorrectly.

## The Attacks

| Part | Attack | What it shows |
| --- | --- | --- |
| 1.1 | **Hash length extension** | Using `hash(secret + message)` as a MAC lets an attacker append data and compute a valid tag without knowing the secret |
| 1.2 | **MD5 collisions** | Two different programs with the same MD5 hash can hide malicious behavior behind a "trusted" hash |
| 2.1 | **Padding oracle** | If a server reveals whether decrypted padding is valid, an attacker can decrypt a message without the key |
| 2.2 | **RSA signature forgery** | Sloppy checking of RSA signature padding (Bleichenbacher-style) allows forging signatures |

## What I Learned

- **Common crypto pitfalls**, and why "secure" building blocks don't guarantee a secure system
- **Use HMAC**, not a plain hash, for message authentication
- **Padding matters:** padding schemes are integral to security, in both encryption and signatures
- **Error messages leak information:** a single yes/no response can become an oracle
- **Collision resistance:** why MD5 is broken and shouldn't be trusted for integrity
- **Python for security work:** working with bytes, hex, and big integers using only the standard library

## Tech Stack

| Area | Technology |
| --- | --- |
| Language | Python (standard library only) |
| Environment | Docker dev container |
| Tools | MD5 collision generator |

## Links

- [Project spec](https://eecs388.org/projects/crypto.html)

---

Back to the [EECS 388 overview](./main.md)
