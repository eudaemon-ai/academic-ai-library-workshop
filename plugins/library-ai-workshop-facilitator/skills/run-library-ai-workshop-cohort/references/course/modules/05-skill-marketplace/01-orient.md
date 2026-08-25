---
id: "01-orient"
title: "Add the Marketplace and Meet Your Guide"
estimated_minutes: 25
discovery_moment: false
steps:
  - index: 0
    label: "Choose your path"
    type: "workspace"
    instruction: |
      Decide how you are working before installing anything.

      Cowork — the default. Claude Cowork is Claude's workspace for non-coding work. You will add the library through menus and then ask questions in plain language. No terminal.

      Coding agent. You already use Claude Code or Codex. Everything below works there too, and a terminal opens the optional authoring and publishing steps.

      Prompt-only. You install nothing. Every step in this module has a prompt you can paste into any Claude conversation with web access. Open `SKILL-MARKETPLACE-PROMPTS.md` from the workshop folder and keep it beside you.

      Whichever you choose, work somewhere you are willing to throw away. Nothing in this module should touch patron data, assessment data, or licensed content.
    checkpoint: "You have named your path and opened a workspace you are willing to discard."
    facilitator_note: "Ask for a show of hands before anyone clicks or types. Expect a good share of a library cohort to be prompt-only, either by preference or because their institution restricts installs. Plan the room around that rather than treating it as a shortfall."
  - index: 1
    label: "Add the marketplace"
    type: "workspace"
    instruction: |
      A marketplace is a repository that advertises installable plugins. This one is `jhu-sheridan-libraries/agentic-skill-library`, and the marketplace and plugin it publishes are both named `context-bazaar`.

      In Cowork: open Customize in the sidebar, then Plugins, then Browse plugins, then Add marketplace. Enter `jhu-sheridan-libraries/agentic-skill-library` — the short owner/repo form is enough. Then install the plugin named `context-bazaar`.

      In Claude Code: run the slash command `/plugin marketplace add` followed by the repository URL, then `/plugin install context-bazaar`. The prompt pack has both lines ready to copy.

      If you cannot find an Add marketplace option, or your institution does not permit it, stop here and go to the next step. You are not blocked, and nothing later in this module depends on having installed anything.
    checkpoint: "Either the plugin is installed, or you know why it is not and have moved on without it."
    facilitator_note: "Do not troubleshoot an install for more than a minute or two in a live session. The prompt-only path is equivalent for every learning outcome, and switching to it early is the right call."
  - index: 2
    label: "Read the manifest before you trust it"
    type: "prompt"
    instruction: "Whether or not the install worked, find out what it does. This is the same question a selector asks about a package before signing for it — and asking it after installing, as most of us just did, is worth noticing."
    prompt_text: |
      Read the marketplace and plugin manifests in
      https://github.com/jhu-sheridan-libraries/agentic-skill-library
      — they are the files .claude-plugin/marketplace.json and .claude-plugin/plugin.json.

      In plain language, tell me:
      1. what installing this plugin would add to my assistant;
      2. what it would be able to reach beyond our conversation;
      3. who wrote it, under what licence;
      4. anything the manifests claim that I would be taking on trust.

      Do not install anything. I am deciding whether to.
    checkpoint: "You can name what the plugin adds, what it can reach, who wrote it, and at least one claim you are accepting without evidence."

  - index: 3
    label: "Take inventory"
    type: "prompt"
    instruction: "The plugin ships a skill whose whole job is to answer this question. Ask it in plain language. If you did not install anything, use the second form of this prompt in the prompt pack, which asks the assistant to read the same list from the repository."
    prompt_text: |
      What skills are installed?

      For each one, give me the name, one sentence on what it does, and whether it is aimed at developers or at some other audience.
    checkpoint: "You get a table of roughly twenty skills, most of them developer-facing, one of them named kanon."
    facilitator_note: "This is answered by the `skill-library` skill reading a generated list, not by the model recalling it. If a learner's tool answers without the plugin installed, it is guessing — a useful thing to catch in the room."
  - index: 4
    label: "Meet your guide"
    type: "prompt"
    instruction: "One of those skills, `kanon`, exists to teach you the tool in plain language. Ask what it can teach you before you ask it anything else. Without the plugin, the prompt pack has a version that reads the same skill file from the repository."
    prompt_text: |
      Use the `kanon` skill. What is Kanon, and what reference material does this skill have available to teach me?

      List each reference, what it covers, and roughly how long it would take. Do not walk me through any of them yet.
    checkpoint: "You get six references — authoring guide, command reference, tutorial, self-paced course, curriculum guide, and Souk Compass practice — not a lecture."
    facilitator_note: "The point stands on every path: the skill is a finding aid, and the references are the boxes. A learner reading it from the repository has met it just as well as one who installed it."
  - index: 5
    label: "Inspect what you added"
    type: "observe"
    instruction: "An install here is not a document. It is standing instructions plus two background services. Confirm each item against the manifests you read two steps ago, not from memory — and if you did not install, confirm it as what you declined."
    observe_items:
      - "A skills directory (`kanon/skills/`) whose contents an assistant may follow without being asked again"
      - "A background service, `context-bazaar`, that reads the artifact catalog on the assistant's behalf"
      - "A second service, `souk-compass`, for semantic search; it expects a local search index and is not needed here"
      - "A declared license (BSL-1.0 on the plugin, MIT on the repository) and a named author"
      - "No independent verification of the claim that the tool collects no telemetry — you are trusting the statement"
      - "Progressive disclosure: each skill loads a short instruction file first and pulls its longer references only when the conversation calls for them"
  - index: 6
    label: "Reflect on authority"
    type: "reflect"
    instruction: "Installing or declining, you just made a decision about what an AI tool does on your machine, on your own authority."
    reflection_prompt: "Who at your institution would need to approve this install, and what would you have to show them? If the answer is 'nobody', is that a policy or a gap?"
---

## Add the Marketplace and Meet Your Guide

A marketplace is a repository plus a manifest that says "these plugins are installable from here." Adding one is a two-part act: you register a source, then you install from it. Both parts are worth naming out loud, because the second is where instructions written by a stranger start running in your environment.

The library being added here is **Context Bazaar**, distributed from the Johns Hopkins Sheridan Libraries' `agentic-skill-library` repository. It carries just over sixty knowledge artifacts across six collections, compiled by a tool called **Kanon**. One of those collections is your own workshop — you will find it in the next exercise.

If the install does not work, or is not permitted, keep going. From the third step onward this exercise is the same on every path, and so is the rest of the module. What you lose by not installing is convenience; what you keep is every judgment the module is actually about.

Take the inventory step seriously. The gap between "I added a helpful thing" and "I can list what it does" is the whole subject of this module.

One of the things it added is a guide. The `kanon` skill exists to teach you the tool in plain language, and it carries six references — an authoring guide, a command reference, a twenty-lesson tutorial, a self-paced course, a curriculum guide for library staff, and an optional semantic-search practice. You will use two of them in this module. Knowing the other four are there is the point of meeting it now.
