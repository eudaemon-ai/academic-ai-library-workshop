---
id: "02-appraise"
title: "Read the Catalog Record"
estimated_minutes: 15
discovery_moment: false
steps:
  - index: 0
    label: "Survey the collections"
    type: "prompt"
    instruction: "The plugin gives your assistant three catalog tools: one lists collections, one lists artifacts, one reads an artifact in full. Something is genuinely being read rather than recalled. Start at the top."
    prompt_text: |
      List the Context Bazaar collections with their member counts and descriptions.

      Then tell me which ones an academic library might have any use for,
      and which are aimed at software teams.
    checkpoint: "You see six collections — kiro-official, neon-caravan, jh-drcc, byron-powers, library-ai-workshop, archon — with counts."
    facilitator_note: "The counts are derived at runtime from artifact metadata, so a collection manifest never lists its own members. Worth asking the room why a catalogue would be built that way — deleting an item removes it from its collections automatically."
  - index: 1
    label: "Find yourself in the catalog"
    type: "prompt"
    instruction: "One of those collections is this workshop. Look at how someone else described your work."
    prompt_text: |
      List every artifact in the library-ai-workshop collection.

      For each, show me the name, type, description, version, maturity,
      trust lane, licence, and which harnesses it targets.
    checkpoint: "Four artifacts, all MPL-2.0, all maturity `experimental` and trust `community`."
  - index: 2
    label: "Open one record in full"
    type: "prompt"
    instruction: "A listing is not the item. Ask for the artifact itself."
    prompt_text: |
      Show me the full content of the review-ai-research-output artifact,
      including its frontmatter and any note about where it came from.

      Then tell me: what would this skill instruct an AI tool to do, and what
      would it instruct the tool not to do?
    checkpoint: "You can see a provenance note naming the upstream repository and the exact commit it was imported from."
  - index: 3
    label: "Map metadata to selection criteria"
    type: "observe"
    instruction: "Open the appraisal crosswalk in `SKILL-MARKETPLACE-HANDOUT.md` and work down it. Every field in that frontmatter is doing a job you already do under a different name; check which ones are present and which are only asserted."
    observe_items:
      - "`type` — skill, rule, workflow, agent, prompt, template, reference-pack: format, not subject"
      - "`trust` — official, partner, community, or experimental: a declared oversight lane, self-assigned by the author"
      - "`maturity` — experimental, beta, stable, or deprecated: edition status, and a weeding signal"
      - "`license` and `author` — rights and responsibility, stated but not verified by the marketplace"
      - "`version` plus a provenance note citing an upstream commit — the closest thing here to a fixity check"
      - "`harnesses` and `audience` — who and what this is for; not a subject heading"
      - "No peer review, no controlled vocabulary, no authority record for the author, no independent integrity check"
  - index: 4
    label: "Reflect on description"
    type: "reflect"
    instruction: "You have spent a career distinguishing a record from the thing it describes."
    reflection_prompt: "Which single missing field would most change your willingness to recommend an artifact from this catalog to a colleague, and why that one?"
---

## Read the Catalog Record

The catalog here is a generated file, `catalog.json`, rebuilt from the artifacts themselves whenever the library changes. Collections do not list their members; each artifact declares which collections it belongs to, and membership is derived. Delete an artifact and it leaves its collections automatically — a deliberate design choice, and a familiar one to anyone who has maintained a bib record and a holdings record separately.

When you ask "what's in this collection", something is actually being read: the plugin gave your assistant three catalogue tools, and they open the real index. That is worth noticing, because for most of this workshop you have been training yourself to assume the opposite. It is also worth testing — ask a follow-up about a detail and see whether the answer stays consistent.

The `library-ai-workshop` collection is the four Skills from this repository, imported into someone else's library, given a version, assigned a trust lane, and stamped with the commit they were taken from. This is your work as a catalog record. Read it the way you would read a vendor's description of your own institutional repository.

## Discussion

- The trust lane is assigned by the author, not by a reviewer. What would a reviewed lane require?
- The provenance note cites a commit hash. Is that a citation, a fixity check, or both?
- If this collection were a purchased database, which of these fields would appear in your license review?
