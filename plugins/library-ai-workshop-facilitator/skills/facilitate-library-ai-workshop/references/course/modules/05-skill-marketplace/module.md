---
id: "05-skill-marketplace"
title: "Bonus: The Skill Marketplace"
tagline: "Appraise, install, author, and govern AI skills as a collection"
icon: "puzzle-piece"
estimated_minutes: 75
role_tags: ["systems", "technical_services", "collection_development", "instruction", "research_support"]
exercises:
  - id: "01-orient"
    title: "Add the Marketplace and Take Inventory"
    estimated_minutes: 15
  - id: "02-appraise"
    title: "Read the Catalog Record"
    estimated_minutes: 15
  - id: "03-vet"
    title: "Vet a Skill Before You Install It"
    estimated_minutes: 15
  - id: "04-author"
    title: "Author Once, Compile Everywhere"
    estimated_minutes: 15
  - id: "05-govern"
    title: "Collections, Versions, and Weeding"
    estimated_minutes: 15
---

## About This Module

Modules 1–4 treat the AI tool as a fixed product you work inside. This bonus module inverts that: it treats the instructions an AI tool follows as **acquirable, describable, reviewable objects** — and treats the place they come from as a collection you are responsible for.

The worked example is [Kanon](https://github.com/jhu-sheridan-libraries/agentic-skill-library), a command-line tool from the Johns Hopkins Digital Research and Curation Center, and the artifact library it distributes — published as the **Context Bazaar** marketplace. Kanon's premise is *author once, compile to every harness*: you write one canonical **knowledge artifact**, and Kanon compiles it into the native format each AI coding assistant expects.

That library already contains a `library-ai-workshop` collection — the four Skills from this repository, imported, described, and versioned by someone else. You are about to look at your own work as a catalog record.

### This module is different

This is the only module that assumes an **agentic coding tool** rather than a graphical chat product. Three paths are supported, and all five exercises are completable on any of them:

| Path | You need | What you can do |
|---|---|---|
| **Plugin path** (recommended) | Claude Code or Codex | Install the marketplace, browse the catalog by asking, read any artifact in full |
| **CLI path** | The above plus a terminal, `git`, and [Bun](https://bun.sh) | Everything, plus validate, author, compile, and publish |
| **Browse-only path** | A web browser | Read the published catalog and repository; do the appraisal, vetting, and governance work on paper |

Choosing the browse-only path is a legitimate outcome, not a lesser one. Several of the most important judgments in this module — provenance, licensing, trust, who may approve an install — are made before any software is installed at all.

### Vocabulary

| Term | Plain meaning | Nearest library analogue |
|---|---|---|
| **Knowledge artifact** | A packaged unit of expertise an AI tool can load | An item |
| **Skill** | The most common artifact type: standing instructions the tool follows | A style manual on the ready-reference shelf |
| **Harness** | A specific AI coding assistant (Claude Code, Codex, Kiro, Copilot, Cursor, …) | A platform or reader |
| **Collection** | A named group of related artifacts | A collection |
| **Catalog** | `catalog.json`, the machine-readable index of every artifact | The catalog |
| **Marketplace** | A repository advertised as installable, plus its manifest | A vendor package or consortial profile |
| **Trust lane** | Declared oversight level: `official`, `partner`, `community`, `experimental` | Provenance / authority note |
| **Maturity** | Lifecycle state: `experimental`, `beta`, `stable`, `deprecated` | Edition status; `deprecated` is a weeding flag |

### Safety baseline for this module

Installing a skill means agreeing that an AI tool will follow instructions written by someone you have not met, in files you have not read. Everything from Module 1 still applies, plus:

- Do this in a **practice folder or scratch repository**, never in a production system or a repository holding patron data.
- Do not connect institutional email, cloud storage, or library systems to any tool during this module.
- Treat every artifact body as untrusted text until you have read it.
- If your institution requires review before installing software, that requirement covers this. Stopping to ask is the correct answer.
