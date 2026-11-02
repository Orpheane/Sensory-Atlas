<div align="center">

# Sensory Atlas

**Making public spaces more accessible, one experience at a time.**

*Accessibility beyond physical barriers.*

[**Explore the live concept**](https://orpheane.github.io/Sensory-Atlas/) · [The vision](#the-vision) · [Interactive demo](#interactive-concept-demo) · [Roadmap](#roadmap)

![Early-stage concept](https://img.shields.io/badge/status-early--stage%20concept-4B9E96?style=flat-square)

</div>

> **Current stage:** Sensory Atlas is an independent, early-stage concept focused on sensory accessibility. This repository hosts a live project showcase and a small interactive demonstration with **fictional places and sample ratings**. It is not yet a live mapping service or a source of verified accessibility information.

## The vision

As a neurodivergent woman, I know that a place can be physically accessible and still feel overwhelming. Bright lights, unexpected sounds, crowded rooms, and uncertainty can make everyday outings exhausting.

**Why can we check whether a building has an elevator, but not whether its lighting, noise, or crowds might overwhelm us?**

Sensory Atlas imagines a community-powered map that helps people understand the sensory characteristics of public spaces before deciding where and when to go.

Rather than rating places as universally good or bad, the goal is to help people make informed decisions based on **their own sensory needs**.

## The proposed experience

| Feature | What it could offer |
| :--- | :--- |
| **Interactive sensory map** | Discover places based on sound, lighting, crowds, and access to quiet spaces. |
| **Personal sensory preferences** | Choose the factors that matter most, without needing to disclose a diagnosis. |
| **Community observations** | Share experiences with dates and context, and see when information may be outdated. |
| **Quieter-time discovery** | Find potentially calmer visiting times when sufficiently reliable information is available. |
| **Sensory-friendly planning** | Compare places and prepare for outings with fewer surprises. |

## Interactive concept demo

**[Try the live Sensory Atlas showcase](https://orpheane.github.io/Sensory-Atlas/#try)**

The interactive showcase now includes a **fictional, clickable sensory map**, a synchronized place list, and a comparison of personal comfort preferences. It also offers **light and dark themes**, adjustable text sizes, and an optional browser-based **read-aloud** control.

The interactive example shows how personal preferences could change which places are recommended:

1. Set preferred limits for **noise**, **lighting**, and **crowding**.
2. Explore a set of fictional venues and see which examples match those preferences.
3. Adjust the settings to understand why a single universal accessibility score would not work for everyone.

**Demo limitations:** The places, their map positions, and their 1–5 sensory ratings are fictional. The demonstration does not use live geographic data, measured sound or light levels, actual crowd information, or verified community submissions. It is not medical advice, and sensory slider preferences are not stored or sent to a server. Only optional **display choices** (theme and font size) are saved in your browser's local storage.

## Why it matters

Physical accessibility information is essential, but it does not tell the whole story. Sensory accessibility can matter to autistic people, people with ADHD, people living with migraines or sensory processing differences, and anyone who benefits from greater predictability.

**Accessibility is not only about getting through the door. It is also about being able to experience the space.**

## Guiding principles

- **Personal choice:** Sensory comfort is individual, never universal.
- **Community context:** Separate subjective reports from measurements and show the age and limits of data.
- **Privacy by design:** Do not require medical information and make location sharing optional.
- **Accessible interfaces:** Prioritize keyboard access, readable information, reduced motion, and alternatives to map-only interactions.
- **Honest presentation:** Clearly distinguish concept designs and sample data from real-world functionality.

## Roadmap

- [x] Define the problem and project vision
- [x] Plan the initial feature set and sensory preference concept
- [x] Create a visual identity and public project showcase
- [x] Publish an interactive demonstration with fictional data
- [x] Add a fictional map view and first-pass display accessibility controls
- [ ] Gather feedback from neurodivergent and sensory-sensitive people
- [ ] Design and test accessible map, search, and place-detail prototypes
- [ ] Define community submission, moderation, and data quality rules
- [ ] Build an MVP using real places and privacy-conscious contributions
- [ ] Run a small local pilot before considering expansion

Read more in [the project roadmap](docs/ROADMAP.md) and [privacy and accessibility principles](docs/PRINCIPLES.md).

## Technology

**Used in this showcase:** HTML, CSS, vanilla JavaScript, and GitHub Pages. The project also used AI-assisted drafting and visual exploration.

**Potential future stack (not yet implemented):** React, TypeScript, Vite, MapLibre GL JS, OpenStreetMap-compatible geodata, Supabase, PostgreSQL, and PostGIS. Any final choice will depend on privacy, accessibility, ongoing costs, and applicable terms.

## Project origin

Sensory Atlas grew from personal experiences of neurodivergence and the belief that invisible accessibility barriers deserve more attention.

Concept and project by **[Orpheane](https://github.com/Orpheane)**.

## Copyright and usage

**Copyright © 2026 Orpheane. All rights reserved.**

This is a **publicly viewable, proprietary project**, **not open-source software**. No general license is granted to copy, modify, republish, distribute, or reuse protected code, writing, or design assets. Viewing or forking through GitHub is subject to GitHub's platform terms, and applicable legal exceptions remain unaffected.

See the [full copyright notice](LICENSE) for details. The notice does not claim exclusive rights over the underlying idea of sensory accessibility mapping, nor over third-party material.

---

*Because everyone deserves the freedom to explore the world at their own comfort level.*
