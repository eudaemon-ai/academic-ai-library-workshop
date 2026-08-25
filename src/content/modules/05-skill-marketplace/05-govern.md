---
id: "05-govern"
title: "Collections, Versions, and Weeding"
estimated_minutes: 15
discovery_moment: false
steps:
  - index: 0
    label: "Design a local collection"
    type: "prompt"
    instruction: "A collection manifest carries metadata only. Membership is declared by each artifact, in its own frontmatter."
    prompt_text: |
      Draft a Kanon collection manifest for a collection of AI skills maintained
      by an academic library, following the conventions used in
      https://github.com/jhu-sheridan-libraries/agentic-skill-library
      Include name, displayName, description, version, author, trust, and tags.

      Then list five artifacts you would want in it, and for each one say who in the library would own it, what evidence would justify moving it from experimental to stable, and what would trigger its removal.
    checkpoint: "Every proposed artifact has a named owner and a stated condition for promotion and for removal."
  - index: 1
    label: "Read the lifecycle vocabulary"
    type: "observe"
    instruction: "Kanon encodes governance as required metadata rather than as convention. Check what each field commits you to."
    observe_items:
      - "`maturity`: experimental → beta → stable → deprecated, with `deprecated` requiring a `successor` field naming the replacement"
      - "`trust`: official, partner, community, or experimental — and a non-community lane should declare a license"
      - "`risk-level`: an artifact marked high risk without a trust lane fails validation"
      - "`visibility`: public appears everywhere, unlisted stays in the catalog but out of default listings, private is excluded from the catalog entirely"
      - "`version` on every artifact, so an install can be pinned and an upgrade can be reviewed"
      - "A team command reports drift between what a manifest says a team should have and what is actually installed, and another reconciles it"
      - "The vocabulary is enforced by the validator, but every value in it is still self-declared by the author"
  - index: 2
    label: "Draft the local policy"
    type: "prompt"
    instruction: "Section 3 of `SKILL-MARKETPLACE-HANDOUT.md` is this policy as a fill-in template. Use it, and write OPEN wherever your library has not decided. This is the deliverable a department can actually adopt."
    prompt_text: |
      Draft a one-page policy for AI skill adoption in an academic library. Cover: who may add a marketplace; who reviews a skill before install; which trust lanes are installable without review and which require it; how a skill is described locally; who owns each installed skill; how often installed skills are re-reviewed; what triggers removal; and how staff are told when something changes.

      Include an explicit route for a staff member who does not want to use these tools at all, and say what happens to their work.

      Mark every point where the policy depends on a decision our library has not yet made.
    checkpoint: "The policy names people or roles rather than 'the library', and its open questions are marked as open."
    facilitator_note: "The unmarked assumptions are the useful output. Collect them; they are the agenda for whoever owns this after the workshop."
  - index: 3
    label: "Check the drift problem"
    type: "observe"
    instruction: "You reviewed a version. Versions move. Confirm what your setup would and would not tell you."
    observe_items:
      - "An installed skill can be updated upstream without anyone at your library reading the change"
      - "There is a command that shows what an upgrade would change before it changes anything; nothing forces anyone to run it"
      - "Pinning an install to a released version trades currency for reviewability"
      - "Nothing in the marketplace notifies you when an artifact you depend on is deprecated"
      - "Your security review has a date on it, and that date keeps getting older"
  - index: 4
    label: "Reflect on stewardship"
    type: "reflect"
    instruction: "You already own a version of this problem for databases, platforms, and licensed content."
    reflection_prompt: "If your library adopted a shared skill library tomorrow, what would go wrong first — and would it be a technical failure or a maintenance one?"
---

## Collections, Versions, and Weeding

A shared skill library fails the same way an unmaintained collection fails: not at acquisition, but three years later, when nobody remembers who selected an item, what it was for, or whether it still works.

Kanon builds the answer into metadata. Maturity is a lifecycle, and deprecating an artifact requires naming its successor. Trust is a declared lane. Visibility controls what appears in the catalog at all. Versions are mandatory, so an install can be pinned and an upgrade reviewed. For teams, a manifest describes what should be installed and `guild status` reports the drift between that and reality.

None of this is verification. Every one of those fields is asserted by whoever wrote the artifact. The infrastructure gives you a place to record a judgment; making the judgment, and revisiting it, is still the librarian's work.

## Discussion

- Weeding a collection has criteria and a schedule. What are the criteria for weeding an installed skill?
- If a skill your staff rely on is deprecated upstream with no successor, what is your fallback?
- Who at your library would notice that a skill's guidance had quietly drifted away from your actual practice?
- This module asked you to install software, describe it, vet it, author some, and govern it. Which of those five is your institution least prepared for right now?
