---
id: "04-author"
title: "Author Once, Compile Everywhere"
estimated_minutes: 20
discovery_moment: false
steps:
  - index: 0
    label: "Open the authoring guide"
    type: "prompt"
    instruction: "Do not work from this page. The `kanon` skill carries a nine-step authoring guide written for library staff — use it, and read it as a piece of instructional design while you do."
    prompt_text: |
      Use the `kanon` skill and give me its authoring guide for creating a first knowledge artifact.

      Summarise the nine steps, then tell me what its metadata-quality checklist requires and what its most common listed mistakes are.
    checkpoint: "You have nine steps from idea to compiled output, plus a metadata checklist — and you notice its worked examples are Dublin Core."
    facilitator_note: "That the guide teaches artifact metadata through Dublin Core is not a coincidence; it was written for a library. Point it out. It is the clearest evidence in the module that this tooling can be met on library terms rather than developer ones."
  - index: 1
    label: "Scaffold an artifact"
    type: "prompt"
    instruction: "Kanon's premise is that you write knowledge once and it compiles into the format each AI tool expects. Start with the metadata, because that is the part the guide you just read spends most of its time on."
    prompt_text: |
      Draft a knowledge artifact called library-search-log in the Kanon format,
      as a file I can save.

      The frontmatter needs: name, displayName, description, keywords, author,
      version, harnesses, type, inclusion, categories, maturity, trust, license,
      audience, and collections. Follow the field conventions used by the
      artifacts in https://github.com/jhu-sheridan-libraries/agentic-skill-library

      Leave the body empty for now. Show me the frontmatter and explain what each
      field commits me to.
    checkpoint: "You have a complete set of metadata fields and can say what each one commits you to."
    facilitator_note: "At a terminal the equivalent is an interactive wizard, `kanon new`, and the appendix of the prompt pack has it. The wizard asks the same questions this prompt does. Neither answers them for you."

  - index: 2
    label: "Write the knowledge"
    type: "prompt"
    instruction: "Choose something small, real, and repetitive from your own practice — a search log format, a handoff template, a citation-audit checklist. Then draft it."
    prompt_text: |
      Help me draft a knowledge artifact called `library-search-log` for the Kanon format.

      The frontmatter needs: name, displayName, description, keywords, author, version, harnesses, type, inclusion, categories, maturity, trust, license, audience, and collections.

      The body should instruct an AI tool how to help a librarian record a reproducible database search: databases and platforms searched, date, exact syntax per database, limiters, result counts, deduplication method, and what the librarian decided and why.

      Set maturity to experimental and trust to community, because that is what this honestly is. Include an explicit instruction that the tool must not invent result counts or syntax it has not been given.
    checkpoint: "The body tells the tool what to do and names at least one thing it must refuse to do."
  - index: 3
    label: "See the compile"
    type: "prompt"
    instruction: "You do not need to run a compiler to see what one does. The library already contains the same artifact at both ends of the pipeline — canonical source, and compiled output for one particular tool."
    prompt_text: |
      In https://github.com/jhu-sheridan-libraries/agentic-skill-library
      compare two files: kanon/knowledge/adr/knowledge.md, which is the canonical
      source, and kanon/skills/adr/SKILL.md, which is what that same artifact
      becomes once compiled for Claude Code.

      Show me what is the same, what changed, and what the packaging added or
      dropped. Then tell me what would happen to the same artifact compiled for
      Cursor, for Copilot, and for a tool with no support for hooks at all.
    checkpoint: "You can point at one source file and at least two different outputs generated from it, and name something that was lost on the way."
    facilitator_note: "At a terminal, `validate`, `build --harness`, and `temper --compare` do this for an artifact you wrote yourself; the appendix has the commands. The comparison here teaches the same idea and needs nothing installed."

  - index: 4
    label: "What survives, what does not"
    type: "observe"
    instruction: "The point of the exercise is what changes and what does not between one source and each output. Check the answer you were given against each of these."
    observe_items:
      - "One canonical source produced Kiro steering files, a Claude Code skill, a Codex skill, Copilot instructions, Cursor rules, and more"
      - "Each harness has a capability matrix: features are supported fully, partially, or not at all"
      - "Unsupported features degrade rather than fail — inlined, commented, or omitted, with a warning"
      - "A tool with no support for hooks receives them as written guidance instead, with a warning"
      - "The instructions you wrote survive; the packaging around them does not"
      - "There is a setting that turns those degradation warnings into errors, which is how a shared library keeps its promises"
  - index: 5
    label: "Reflect on what to share"
    type: "reflect"
    instruction: "Writing it down for a tool means writing it down for colleagues."
    reflection_prompt: "Which piece of your practice is currently held only in your head, and what would have to be true before you would put it in a shared library rather than your own notes?"
---

## Author Once, Compile Everywhere

Every AI assistant has invented its own file format for standing instructions: Kiro has steering files, Claude Code has skills, Codex has its own, Copilot has instructions files, Cursor and Windsurf and Cline each have rules. Maintaining the same guidance in eight formats is the problem Kanon exists to solve.

You author one **knowledge artifact** — a metadata block plus a written body — and the pipeline turns it into each tool's native output, degrading gracefully where a tool lacks a feature. You can see the whole idea by comparing one artifact's source with its compiled form, which is what this exercise does; running the compiler yourself is optional.

The `kanon` skill's authoring guide walks this in nine steps, and it teaches artifact metadata using Dublin Core — because it was written for library staff. Use it rather than this page; reading it as instructional design is half the exercise.

For a library, the interesting part is not the plumbing. It is that professional practice becomes a versioned, describable, reviewable object that outlives whichever product your institution is subscribed to this year. That is the same argument you already make about metadata standards.
