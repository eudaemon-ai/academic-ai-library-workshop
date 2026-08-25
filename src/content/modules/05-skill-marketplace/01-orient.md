---
id: "01-orient"
title: "Add the Marketplace and Take Inventory"
estimated_minutes: 15
discovery_moment: false
steps:
  - index: 0
    label: "Choose your path"
    type: "workspace"
    instruction: |
      Decide which path you are on before installing anything.

      - **Plugin path** — you have Claude Code or Codex available and you are permitted to install plugins.
      - **CLI path** — the above, plus a terminal with `git` and [Bun](https://bun.sh).
      - **Browse-only path** — you have a web browser. Open `https://github.com/jhu-sheridan-libraries/agentic-skill-library` and keep it open. You will read what the other paths install.

      Work in a scratch folder or practice repository. Do not do this inside a repository that holds patron data, assessment data, or licensed content.
    checkpoint: "You have named your path and opened a workspace you are willing to throw away."
    facilitator_note: "Ask for a show of hands per path before anyone types a command. Expect most of a library cohort to be browse-only; plan the room around that rather than treating it as a shortfall."
  - index: 1
    label: "Add the marketplace"
    type: "workspace"
    instruction: |
      **Claude Code.** A marketplace is a repository that advertises installable plugins. Add it, then install the plugin it advertises:

      ```
      /plugin marketplace add https://github.com/jhu-sheridan-libraries/agentic-skill-library
      /plugin install context-bazaar
      ```

      The repository is `agentic-skill-library`; the marketplace and plugin it publishes are both named `context-bazaar`.

      **Codex.** Link the checkout into your personal marketplace directory, add an entry named `context-bazaar` to the `plugins` array in `~/.agents/plugins/marketplace.json`, then run:

      ```bash
      codex plugin add context-bazaar@personal
      ```

      **Browse-only.** Read `.claude-plugin/marketplace.json` and `.claude-plugin/plugin.json` in the repository instead. Between them they declare everything the install would do.
    checkpoint: "You can name the two files that define what this marketplace offers, whether or not you installed it."
  - index: 2
    label: "Take inventory"
    type: "prompt"
    instruction: "The plugin ships a skill whose whole job is to answer this question. Ask it in plain language."
    prompt_text: |
      What skills are installed?

      For each one, give me the name, one sentence on what it does, and whether it is aimed at developers or at some other audience.
    checkpoint: "You get a table of roughly twenty skills, most of them developer-facing, one of them named kanon."
    facilitator_note: "This is answered by the `skill-library` skill reading a generated list, not by the model recalling it. If a learner's tool answers without the plugin installed, it is guessing — a useful thing to catch in the room."
  - index: 3
    label: "Inspect what you added"
    type: "observe"
    instruction: "You did not install a document. You installed standing instructions and two background services. Confirm each item from the manifests, not from memory."
    observe_items:
      - "A skills directory (`kanon/skills/`) whose contents your tool may now follow without being asked"
      - "An MCP server, `context-bazaar`, that reads the artifact catalog"
      - "A second MCP server, `souk-compass`, that expects a local Solr instance and is optional for this module"
      - "A declared license (BSL-1.0 on the plugin, MIT on the repository) and a named author"
      - "No independent verification of the claim that the tool collects no telemetry — you are trusting the statement"
  - index: 4
    label: "Reflect on authority"
    type: "reflect"
    instruction: "You have just changed what an AI tool does on your machine, on your own authority."
    reflection_prompt: "Who at your institution would need to approve this install, and what would you have to show them? If the answer is 'nobody', is that a policy or a gap?"
---

## Add the Marketplace and Take Inventory

A marketplace is a repository plus a manifest that says "these plugins are installable from here." Adding one is a two-part act: you register a source, then you install from it. Both parts are worth naming out loud, because the second is where instructions written by a stranger start running in your environment.

The library being added here is **Context Bazaar**, distributed from the Johns Hopkins Sheridan Libraries' `agentic-skill-library` repository. It carries just over sixty knowledge artifacts across six collections, compiled by a command-line tool called **Kanon**. One of those collections is your own workshop — you will find it in the next exercise.

Take the inventory step seriously. The gap between "I installed a helpful thing" and "I can list what it added" is the whole subject of this module.
