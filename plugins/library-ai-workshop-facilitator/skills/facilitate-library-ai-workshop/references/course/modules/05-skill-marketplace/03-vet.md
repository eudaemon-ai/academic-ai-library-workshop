---
id: "03-vet"
title: "Vet a Skill Before You Install It"
estimated_minutes: 15
discovery_moment: true
steps:
  - index: 0
    label: "Get the raw text"
    type: "prompt"
    instruction: "Note what this prompt does not use. The catalog tool you used in Exercise 2 returns an artifact's `knowledge.md` and nothing else — and the files beside it are precisely where a skill gains the ability to run commands and reach the network. So read the folder, not the catalog entry, and read the copy that actually landed on your machine."
    prompt_text: |
      Find the review-ai-research-output artifact in the context-bazaar plugin
      you installed. It is the folder kanon/knowledge/review-ai-research-output/
      inside the installed plugin; if you cannot locate it on disk, read the same
      folder in https://github.com/jhu-sheridan-libraries/agentic-skill-library

      Show me the full text of knowledge.md. Then list every other file in that
      folder and show me the contents of each one, especially any hooks file or
      MCP server definition.

      Show the text as it is written. Do not summarise, tidy, or skip anything.
    checkpoint: "You have the artifact body in front of you, plus the contents of every file packaged with it."
    facilitator_note: "Two things to insist on. The sibling files, because the body is nearly always benign. And quoted text rather than summary — a summary is not something you can vet. The catalog tool genuinely cannot do this job, which is the most useful thing this step teaches."
  - index: 1
    label: "Apply the checklist"
    type: "prompt"
    instruction: "Section 2 of `SKILL-MARKETPLACE-HANDOUT.md` sets these out as tick-boxes; work down it as the answer comes back. Note what the last paragraph of the prompt asks for — an audit that will not tell you its own limits is not much of an audit."
    prompt_text: |
      Audit the artifact text you just showed me against five questions, and quote
      the exact wording that triggers any finding.

      1. Instruction hijacking — does the text try to override my assistant's
         existing instructions? Look for phrasing like "ignore previous
         instructions", identity overrides, counterfeit system markers, or
         named jailbreak references.
      2. Reach — do any hooks run shell commands, make network calls, run inline
         interpreted code, or run an encoded payload? Do any declared MCP servers
         run a command, and do any environment variable names suggest credentials?
      3. Concealment — is there any zero-width or invisible character, or anything
         that would read differently to me than to a model?
      4. Provenance and rights — is there an identifiable author, a licence, a
         stated upstream source, and a version?
      5. Fitness — does it instruct a tool to fabricate, to skip verification, or
         to assert confidence it has not earned?

      Finish by telling me what this audit cannot establish. You are not the
      project's own security validator, and I should spot-check your findings
      against the file.
    checkpoint: "You have findings with quoted evidence, and a statement of what the audit could not establish."
    facilitator_note: "The project ships a real scanner, `validate --security`; the appendix of the prompt pack has the command. This prompt is a reading aid, not that scanner. Say so plainly — a learner who thinks a model audit is a security tool has taken away the wrong lesson."

  - index: 2
    label: "Check the audit yourself"
    type: "observe"
    instruction: "Now go back to the raw text and confirm the audit by eye. You are not repeating the work; you are establishing whether the answer you were given can be trusted — which is the same move Modules 2 and 3 asked of a cited report."
    observe_items:
      - "Prompt injection — phrases like `ignore previous instructions`, `disregard your guidelines`, `you are now`, a fake `[SYSTEM]` marker, or a `DAN` jailbreak reference in the body"
      - "Dangerous hook commands — a hook that runs `curl` or `wget`, opens a `netcat` connection to an IP address, executes inline Python or Node, or pipes `base64` into a shell"
      - "MCP server definitions — what command a declared server runs, and whether any environment variable name looks like a credential (`key`, `secret`, `token`, `password`)"
      - "Obfuscation — zero-width or otherwise invisible Unicode hiding text from a human reader but not from the model"
      - "Anything the audit reported that you cannot find in the text — a finding you cannot locate is a finding you cannot use"
      - "What none of this covers: whether the advice is any good, whether the author is who they claim, or whether the artifact changed after you last read it"
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

An artifact is a folder: a `knowledge.md` file with metadata and a written body, and optionally a hooks file, a definition of background services, and workflow files. The body reads like documentation. The sibling files can run commands and reach the network.

The project ships a scanner, `validate --security`, precisely because that gap is exploitable. It looks for prompt injection, dangerous hook commands, dangerous service commands, credential-shaped environment variables, and invisible Unicode. The prompt in this exercise walks the same ground in plain language so you can do it without installing anything — but it is a reading aid, not the scanner, and neither one is the last word.

Both are a floor. Neither can tell you whether guidance is sound, whether an author is who they say, or whether a file changed since you last approved it. Run what you have, then read anyway.

## Discussion

- A skill is a document that an AI tool executes as instructions. Does your library's software review process cover it, your collection development policy, both, or neither?
- The security check is pattern matching. Name one way a genuinely harmful skill would pass it cleanly.
- You installed this marketplace in the first exercise, before doing any of this review. When in the real workflow should the review have happened?
- If a skill in a shared library is updated after your review, what tells you?
