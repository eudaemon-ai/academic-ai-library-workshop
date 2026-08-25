---
id: "04-author"
title: "Author Once, Compile Everywhere"
estimated_minutes: 15
discovery_moment: false
steps:
  - index: 0
    label: "Scaffold an artifact"
    type: "workspace"
    instruction: |
      Kanon's premise is that you write knowledge once and it compiles into the format each AI tool expects.

      **CLI path.** From the `kanon/` directory:

      ```bash
      bun run dev new library-search-log --type skill
      ```

      The wizard asks for a description, keywords, author, artifact type, inclusion strategy, categories, and target harnesses. It creates `knowledge/library-search-log/` containing `knowledge.md`, `hooks.yaml`, and `mcp-servers.yaml`.

      **Plugin and browse-only paths.** Ask your assistant to show you the `kanon` skill's authoring guide, and draft the same `knowledge.md` in a plain text file. You are writing the identical artifact; you simply will not compile it.
    checkpoint: "You have a `knowledge.md` with YAML frontmatter and an empty body, or a text file standing in for one."
    facilitator_note: "`bun run dev tutorial` is a twenty-lesson guided walkthrough if a learner wants the long version later. Do not run it in a 15-minute exercise."
  - index: 1
    label: "Write the knowledge"
    type: "prompt"
    instruction: "Choose something small, real, and repetitive from your own practice — a search log format, a handoff template, a citation-audit checklist. Then draft it."
    prompt_text: |
      Help me draft a knowledge artifact called `library-search-log` for the Kanon format.

      The frontmatter needs: name, displayName, description, keywords, author, version, harnesses, type, inclusion, categories, maturity, trust, license, audience, and collections.

      The body should instruct an AI tool how to help a librarian record a reproducible database search: databases and platforms searched, date, exact syntax per database, limiters, result counts, deduplication method, and what the librarian decided and why.

      Set maturity to experimental and trust to community, because that is what this honestly is. Include an explicit instruction that the tool must not invent result counts or syntax it has not been given.
    checkpoint: "The body tells the tool what to do and names at least one thing it must refuse to do."
  - index: 2
    label: "Validate, build, preview"
    type: "workspace"
    instruction: |
      **CLI path.** Three commands, in this order:

      ```bash
      bun run dev validate knowledge/library-search-log
      bun run dev build --harness claude-code
      bun run dev temper library-search-log --compare
      ```

      `validate` checks the frontmatter against the schema. `build` compiles into `dist/claude-code/library-search-log/`. `temper` shows you what each AI tool would actually receive, side by side.

      **Plugin and browse-only paths.** Ask your assistant to compare `knowledge/adr/knowledge.md` in the repository with what the same artifact becomes in `kanon/skills/adr/SKILL.md`. That is the compile step, already done, with both ends visible.
    checkpoint: "You can point at one source file and at two or more different outputs generated from it."
  - index: 3
    label: "Observe the compile"
    type: "observe"
    instruction: "The point of the exercise is what changes and what does not between the source and each output."
    observe_items:
      - "One canonical source produced Kiro steering files, a Claude Code skill, a Codex skill, Copilot instructions, Cursor rules, and more"
      - "Each harness has a capability matrix: features are supported fully, partially, or not at all"
      - "Unsupported features degrade rather than fail — inlined, commented, or omitted, with a warning"
      - "Codex has no declarative hooks, so hook definitions arrive as manual guidance instead"
      - "The instructions you wrote survive; the packaging around them does not"
      - "`build --strict` turns those degradation warnings into errors, which is how a shared library keeps its promises"
  - index: 4
    label: "Reflect on what to share"
    type: "reflect"
    instruction: "Writing it down for a tool means writing it down for colleagues."
    reflection_prompt: "Which piece of your practice is currently held only in your head, and what would have to be true before you would put it in a shared library rather than your own notes?"
---

## Author Once, Compile Everywhere

Every AI coding assistant has invented its own file format for standing instructions: Kiro has steering files, Claude Code has `CLAUDE.md` and skills, Codex has `AGENTS.md`, Copilot has instructions files, Cursor and Windsurf and Cline each have rules. Maintaining the same guidance in eight formats is the problem Kanon exists to solve.

You author one **knowledge artifact** — frontmatter plus Markdown — and the pipeline runs `source → parse → adapt → write`. A per-harness adapter turns your artifact into that tool's native output, degrading gracefully where a tool lacks a feature.

For a library, the interesting part is not the plumbing. It is that professional practice becomes a versioned, describable, reviewable object that outlives whichever product your institution is subscribed to this year. That is the same argument you already make about metadata standards.
