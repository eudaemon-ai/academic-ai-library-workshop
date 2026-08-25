---
id: "05-skill-marketplace"
title: "Bonus: The Skill Marketplace"
tagline: "Appraise, install, author, and govern AI skills as a collection"
icon: "puzzle-piece"
estimated_minutes: 90
role_tags: ["systems", "technical_services", "collection_development", "instruction", "research_support"]
exercises:
  - id: "01-orient"
    title: "Add the Marketplace and Meet Your Guide"
    estimated_minutes: 25
  - id: "02-appraise"
    title: "Read the Catalog Record"
    estimated_minutes: 15
  - id: "03-vet"
    title: "Vet a Skill Before You Install It"
    estimated_minutes: 15
  - id: "04-author"
    title: "Author Once, Compile Everywhere"
    estimated_minutes: 20
  - id: "05-govern"
    title: "Collections, Versions, and Weeding"
    estimated_minutes: 15
---

## About This Module

Modules 1–4 treat the AI tool as a fixed product you work inside. This bonus module inverts that: it treats the instructions an AI tool follows as **acquirable, describable, reviewable objects** — and treats the place they come from as a collection you are responsible for.

The worked example is [Kanon](https://github.com/jhu-sheridan-libraries/agentic-skill-library), a tool from the Johns Hopkins Digital Research and Curation Center, and the artifact library it distributes — published as the **Context Bazaar** marketplace. Kanon's premise is *author once, compile to every harness*: you write one canonical **knowledge artifact**, and Kanon compiles it into the native format each AI coding assistant expects.

That library already contains a `library-ai-workshop` collection — the four Skills from this repository, imported, described, and versioned by someone else. You are about to look at your own work as a catalog record.

### The library comes with its own guide

You are not expected to memorise a command-line tool. The marketplace ships a skill called **`kanon`** whose entire job is to teach you Kanon — and once it is installed, you use it by asking questions in plain language.

`kanon` is written for library staff, and it practises what this module preaches: a short skill file loads first, and six longer references load only when they are needed.

| Ask for | You get |
|---|---|
| the **authoring guide** | Nine steps from idea to compiled artifact, with a metadata-quality checklist and Dublin Core examples |
| the **command reference** | Every Kanon command, with flags and worked examples |
| the **tutorial** | Twenty sequential lessons, from "what is a coding agent" through publishing; each one skippable |
| the **self-paced course** | A three-to-four hour course on skill creation, with a practice artifact, assessments, and an answer key |
| the **curriculum guide** | Learning paths, facilitation notes, assessment strategy, and accessibility considerations for library staff |
| **Souk Compass practice** | An optional session on semantic search over the catalog |

This module is the 90-minute library-facing pass. Those references are where you go afterwards, and Exercises 1 and 4 hand you to them directly.

### What you need before you start

This module works against a real installed plugin. Before the session you need **Claude Cowork or a coding agent, and permission to install a plugin on the machine you are using**. If your institution has not decided who may install what, that decision has to happen first — which is itself a preview of Exercise 5.

Two paths are supported, and all five exercises work the same way on both:

| Path | You need | How you work |
|---|---|---|
| **Cowork** (default) | Claude Cowork | Install through menus, then work by asking questions in plain language. No terminal. |
| **Coding agent** | Claude Code or Codex | The same, plus a terminal if you want to compile and publish your own artifact |

**To install in Cowork**: open Customize in the sidebar, then Plugins, then Browse plugins, then Add marketplace. Enter `jhu-sheridan-libraries/agentic-skill-library` — the short owner/repo form is enough. Then install the plugin named `context-bazaar`.

**In Claude Code**: run `/plugin marketplace add` with the repository URL, then `/plugin install context-bazaar`.

Two companion files sit in the workshop folder beside `WORKSPACE-BRIEF.md`:

- `SKILL-MARKETPLACE-PROMPTS.md` — every prompt in this module, ready to copy and paste into Cowork.
- `SKILL-MARKETPLACE-HANDOUT.md` — the three working sheets: an appraisal crosswalk, a vetting checklist, and a local policy template.

You will not need a terminal for any exercise. You will need the plugin.

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

### Going further

Ninety minutes is a survey. When someone wants depth, the `kanon` skill already carries it — ask for the reference by name:

- **the tutorial** — twenty sequential lessons, each self-contained, running from "what is a coding agent" through catalog, import, scaffold, validate, build, install, collections, evals, publish, upgrade, and team sync.
- **the self-paced course** — three to four hours on skill creation, with a safe practice artifact, assessments, an answer key, and a capstone review.
- **the curriculum guide** — written for a library that wants to teach this: learning paths, a curriculum map, facilitation notes, assessment strategy, accessibility considerations, and a production-readiness gate.

One honest caveat about all of it. The `kanon` skill's setup instructions still tell you to clone `agentic-skill-forge`, the repository's former name. The old name redirects, so nothing breaks — but you found a documentation drift in the guide you are being asked to trust, on your first read, without looking for it. Note where you found it. Exercise 3 is about exactly this habit.
