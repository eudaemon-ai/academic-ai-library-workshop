---
id: "01-orient"
title: "Add the Marketplace and Meet Your Guide"
estimated_minutes: 25
discovery_moment: false
steps:
  - index: 0
    label: "Set up your workspace"
    type: "workspace"
    instruction: |
      You will be installing a plugin and then working with it. Two surfaces are supported.

      Cowork — the default. Claude Cowork is Claude's workspace for non-coding work. You will add the library through menus and then work by asking questions in plain language. No terminal at any point.

      Coding agent. If you already use Claude Code or Codex, everything here works there too, and a terminal opens the optional authoring and publishing steps in Exercise 4.

      Either way, work somewhere you are willing to throw away. Nothing in this module should touch patron data, assessment data, or licensed content.

      Keep `SKILL-MARKETPLACE-PROMPTS.md` from the workshop folder open beside you. Every prompt in this module is in it, ready to copy.
    checkpoint: "You have Cowork or a coding agent open, permission to install a plugin, and a workspace you are willing to discard."
    facilitator_note: "Confirm install permission when you confirm accounts, a week out — not in the room. A learner who discovers at the session that they may not install anything cannot do this module, and finding that out live wastes their afternoon."
  - index: 1
    label: "Add the marketplace"
    type: "workspace"
    instruction: |
      A marketplace is a repository that advertises installable plugins. This one is `jhu-sheridan-libraries/agentic-skill-library`, and the marketplace and plugin it publishes are both named `context-bazaar`.

      In Cowork: open Customize in the sidebar, then Plugins, then Browse plugins, then Add marketplace. Enter `jhu-sheridan-libraries/agentic-skill-library` — the short owner/repo form is enough. Then install the plugin named `context-bazaar`.

      In Claude Code: run the slash command `/plugin marketplace add` followed by the repository URL, then `/plugin install context-bazaar`. The prompt pack has both lines ready to copy.

      Confirm the install before moving on. If your assistant cannot see the plugin, the rest of this module will not work as written.
    checkpoint: "The context-bazaar plugin is installed and your assistant can see it."

  - index: 2
    label: "Read the manifest before you trust it"
    type: "prompt"
    instruction: "Now find out what you just installed. This is the question a selector asks about a package before signing for it — and you are asking it afterwards, which is worth sitting with for a moment."
    prompt_text: |
      Read the marketplace and plugin manifests in
      https://github.com/jhu-sheridan-libraries/agentic-skill-library
      — they are the files .claude-plugin/marketplace.json and .claude-plugin/plugin.json.

      In plain language, tell me:
      1. what installing this plugin would add to my assistant;
      2. what it would be able to reach beyond our conversation;
      3. who wrote it, under what licence;
      4. anything the manifests claim that I am taking on trust.
    checkpoint: "You can name what the plugin added, what it can reach, who wrote it, and at least one claim you are accepting without evidence."

  - index: 3
    label: "Take inventory"
    type: "prompt"
    instruction: "The plugin ships a skill whose whole job is to answer this question. Ask it in plain language."
    prompt_text: |
      What skills are installed?

      For each one, give me the name, one sentence on what it does, and whether it is aimed at developers or at some other audience.
    checkpoint: "You get a table of roughly twenty skills, most of them developer-facing, one of them named kanon."
    facilitator_note: "This is answered by the `skill-library` skill reading a generated list, not by the model recalling it. A learner whose answer looks plausible but omits `kanon` has probably not completed the install — check before letting them move on."
  - index: 4
    label: "Meet your guide"
    type: "prompt"
    instruction: "One of those skills, `kanon`, exists to teach you the tool in plain language. Ask what it can teach you before you ask it anything else."
    prompt_text: |
      Use the `kanon` skill. What is Kanon, and what reference material does this skill have available to teach me?

      List each reference, what it covers, and roughly how long it would take. Do not walk me through any of them yet.
    checkpoint: "You get six references — authoring guide, command reference, tutorial, self-paced course, curriculum guide, and Souk Compass practice — not a lecture."
    facilitator_note: "The shape is the lesson: the skill is a finding aid, and the references are the boxes. It loads the short file first and fetches a reference only when the conversation calls for it."
  - index: 5
    label: "Inspect what you added"
    type: "observe"
    instruction: "You did not install a document. You installed standing instructions and two background services. Confirm each item against the manifests you read two steps ago, not from memory."
    observe_items:
      - "A skills directory (`kanon/skills/`) whose contents your assistant may now follow without being asked again"
      - "A background service, `context-bazaar`, now reading the artifact catalog on your assistant's behalf"
      - "A second service, `souk-compass`, for semantic search; it expects a local search index and is not needed here"
      - "A declared license (BSL-1.0 on the plugin, MIT on the repository) and a named author"
      - "No independent verification of the claim that the tool collects no telemetry — you are trusting the statement"
      - "Progressive disclosure: each skill loads a short instruction file first and pulls its longer references only when the conversation calls for them"
  - index: 6
    label: "Reflect on authority"
    type: "reflect"
    instruction: "You have just changed what an AI tool does on your machine, on your own authority."
    reflection_prompt: "Who at your institution would need to approve this install, and what would you have to show them? If the answer is 'nobody', is that a policy or a gap?"
---

## Add the Marketplace and Meet Your Guide

A marketplace is a repository plus a manifest that says "these plugins are installable from here." Adding one is a two-part act: you register a source, then you install from it. Both parts are worth naming out loud, because the second is where instructions written by a stranger start running in your environment.

The library being added here is **Context Bazaar**, distributed from the Johns Hopkins Sheridan Libraries' `agentic-skill-library` repository. It carries just over sixty knowledge artifacts across six collections, compiled by a tool called **Kanon**. One of those collections is your own workshop — you will find it in the next exercise.

Take the inventory step seriously. The gap between "I added a helpful thing" and "I can list what it does" is the whole subject of this module.

One of the things it added is a guide. The `kanon` skill exists to teach you the tool in plain language, and it carries six references — an authoring guide, a command reference, a twenty-lesson tutorial, a self-paced course, a curriculum guide for library staff, and an optional semantic-search practice. You will use two of them in this module. Knowing the other four are there is the point of meeting it now.
