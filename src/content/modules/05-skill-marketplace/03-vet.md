---
id: "03-vet"
title: "Vet a Skill Before You Install It"
estimated_minutes: 15
discovery_moment: true
steps:
  - index: 0
    label: "Get the raw text"
    type: "workspace"
    instruction: |
      A skill is instructions. To vet it you must read it, not read about it.

      **CLI path.** Clone the library and look at an artifact directly:

      ```bash
      git clone https://github.com/jhu-sheridan-libraries/agentic-skill-library.git
      cd agentic-skill-library/kanon
      cat knowledge/review-ai-research-output/knowledge.md
      ls knowledge/review-ai-research-output/
      ```

      **Plugin path.** Ask your assistant for the full artifact content and for any `hooks.yaml` or `mcp-servers.yaml` beside it.

      **Browse-only path.** Read the same files in the repository on the web.
    checkpoint: "You have the artifact body in front of you, plus a list of any hook or MCP files packaged with it."
    facilitator_note: "Insist on the sibling files. The body is usually benign; hooks and MCP server definitions are where a skill gains the ability to run commands and reach the network."
  - index: 1
    label: "Run the security check"
    type: "workspace"
    instruction: |
      Kanon ships an automated pass over these files.

      **CLI path:**

      ```bash
      bun install
      bun run dev validate --security
      ```

      **Plugin and browse-only paths:** you will do this pass by hand in the next step. That is the more instructive version anyway.
    checkpoint: "You have either a validator report or a decision to read manually."
  - index: 2
    label: "Apply the checklist"
    type: "observe"
    instruction: "Work through section 2 of `SKILL-MARKETPLACE-HANDOUT.md`, which sets these out as tick-boxes. These are the families an automated scanner looks for; check the artifact against each yourself, so you know what the tool is and is not covering."
    observe_items:
      - "Prompt injection — phrases like `ignore previous instructions`, `disregard your guidelines`, `you are now`, a fake `[SYSTEM]` marker, or a `DAN` jailbreak reference in the body"
      - "Dangerous hook commands — a hook that runs `curl` or `wget`, opens a `netcat` connection to an IP address, executes inline Python or Node, or pipes `base64` into a shell"
      - "MCP server definitions — what command a declared server runs, and whether any environment variable name looks like a credential (`key`, `secret`, `token`, `password`)"
      - "Obfuscation — zero-width or otherwise invisible Unicode hiding text from a human reader but not from the model"
      - "What the checklist does not cover: whether the advice is any good, whether the author is who they claim, or whether the artifact changed after you last read it"
  - index: 3
    label: "Write the recommendation"
    type: "prompt"
    instruction: "Produce the document a colleague could act on. Substitute the artifact you actually examined."
    prompt_text: |
      Draft a short technical-services recommendation for installing the `review-ai-research-output` artifact in our library.

      Structure it as: what the artifact instructs an AI tool to do; what it can reach (files, network, credentials); its license, author, and provenance; findings against the four security check families; and a single recommendation of accept, reject, or escalate, with the reason.

      Where evidence is missing, say that it is missing rather than assuming it is fine.
    checkpoint: "The recommendation names a decision and distinguishes what you verified from what you accepted on trust. Record it in the decision block at the end of section 2 of the handout."
  - index: 4
    label: "Reflect on the boundary"
    type: "reflect"
    instruction: "You have just done acquisitions review on a piece of software that looks like a document."
    reflection_prompt: "What is the smallest review step your library could realistically require before staff install a skill, and who would perform it?"
---

## Vet a Skill Before You Install It

An artifact is a folder: a `knowledge.md` file with YAML frontmatter and a Markdown body, and optionally `hooks.yaml`, `mcp-servers.yaml`, and workflow files. The body reads like documentation. The sibling files can run commands and reach the network.

Kanon's `validate --security` pass exists because that gap is exploitable. It scans for prompt injection, dangerous hook commands, dangerous MCP server commands, credential-shaped environment variables, and invisible Unicode. It is a floor. It cannot tell you whether guidance is sound, whether an author is who they say, or whether a file changed since you last approved it.

Run it, then read anyway.

## Discussion

- A skill is a document that an AI tool executes as instructions. Does your library's software review process cover it, your collection development policy, both, or neither?
- The security check is pattern matching. Name one way a genuinely harmful skill would pass it cleanly.
- You installed this marketplace in the first exercise, before doing any of this review. When in the real workflow should the review have happened?
- If a skill in a shared library is updated after your review, what tells you?
