# Skill Marketplace Handout

Working sheets for the bonus module, *The Skill Marketplace*. Three tools: an appraisal crosswalk, a vetting checklist, and a policy template.

Everything here works on paper. You do not need a terminal, a plugin, or an installed tool to use any of it — which matters, because the judgments these sheets support are the ones you should be making **before** anything is installed.

This handout is workshop material under MPL-2.0. It describes third-party tooling but bundles none of it. Copy it, adapt it, put your library's name on it.

---

## 1. Appraisal Crosswalk

Use when reading a marketplace listing or an artifact's metadata. The left column is what the record says; the right column is the question you are actually asking.

| Metadata field | Reads like | The selection question |
|---|---|---|
| `name` / `displayName` | A title | Does the name describe the behaviour, or market it? |
| `description` | An abstract | Could you tell from this alone whether it belongs in your collection? |
| `type` | A format (skill, rule, workflow, agent, prompt, template, reference-pack) | Format, not subject. Does it tell you what this *does* to a tool? |
| `author` | A statement of responsibility | Is there an identifiable person or body? Could you contact them? |
| `version` | An edition | Which version did you review? Is that written down anywhere? |
| `license` | Rights | Does it permit your intended use, including internal redistribution? |
| `harnesses` | Supported platforms | Does it cover the tool your staff actually use? |
| `audience` | Reading level | Beginner, intermediate, advanced — asserted by whom? |
| `maturity` | Edition status | `experimental`, `beta`, `stable`, `deprecated`. A deprecated item must name a successor. |
| `trust` | Provenance / authority | `official`, `partner`, `community`, `experimental` — **self-declared by the author, not awarded by a reviewer** |
| `collections` | Series membership | Who curates the series, and to what standard? |
| Provenance note | A source citation | Does it name an upstream source and a specific commit or version? |

### What is not in the record

Name these out loud when you recommend an item. None of the following is present in a marketplace listing:

- peer review, or any review by someone other than the author
- an authority record for the author
- a fixity or integrity check you performed yourself
- controlled subject vocabulary
- a retention commitment, or any guarantee the item will still exist next year
- notification when the item changes under you

---

## 2. Vetting Checklist

Use before installing anything. Read the artifact body **and** its sibling files: a `hooks.yaml` or an MCP server definition can run commands and reach the network even when the prose is harmless.

Automated scanners exist and are worth running. Treat them as a floor. They match patterns; they cannot tell you whether advice is sound, whether an author is who they claim, or whether a file changed since you approved it.

**A. Instruction hijacking.** Does the body try to override the tool's existing instructions?
- [ ] Phrasing like *ignore previous instructions* or *disregard your guidelines*
- [ ] Identity overrides — *you are now …*
- [ ] Counterfeit system markers, e.g. a bracketed `[SYSTEM]` block
- [ ] Named jailbreak references

**B. Reach.** What can it touch beyond the conversation?
- [ ] Hooks that run shell commands
- [ ] Outbound network calls — `curl`, `wget`, a raw socket to an IP address
- [ ] Inline interpreted code (`python -c`, `node -e`) or an encoded payload piped to a shell
- [ ] Declared MCP servers — what command does each one actually run?
- [ ] Environment variables whose names suggest credentials (`key`, `secret`, `token`, `password`)

**C. Concealment.** Is anything hidden from the reader but not from the model?
- [ ] Zero-width or invisible Unicode characters
- [ ] Content that renders differently from how it is stored

**D. Provenance and rights.**
- [ ] Identifiable author or maintaining body
- [ ] A licence, and one compatible with your intended use
- [ ] A stated upstream source, ideally pinned to a commit or tag
- [ ] Version recorded, so a later change is detectable

**E. Fitness.**
- [ ] The guidance matches your library's actual practice
- [ ] It does not instruct a tool to fabricate, to skip verification, or to assert confidence it has not earned
- [ ] Its scope is narrow enough to review in one sitting

### Decision

Reviewer: ______________________  Date: ____________

Artifact and version: ______________________________

Circle one:

- **Accept** — install, record the version, and set a review date.
- **Reject** — record the reason; a rejected item should stay rejected until something changes.
- **Escalate** — name who decides, and what evidence they need.

Reason (one or two sentences, including anything you accepted on trust rather than verified):

_________________________________________________________________

_________________________________________________________________

---

## 3. Local Policy Template

Fill in. Where your library has not decided, write **OPEN** rather than a plausible guess — the open items are the useful output of this exercise.

**Scope.** This policy covers AI skills, plugins, and marketplaces installed on ______________ (which machines? whose? managed or personal?).

**Adding a source.** A marketplace may be added by: ______________. Approval required from: ______________.

**Review before install.**
- Trust lanes installable without individual review: ______________
- Trust lanes requiring review: ______________
- Reviewer(s): ______________
- Review uses the checklist in section 2: yes / adapted as follows ______________

**Local description.** Each installed skill is recorded with: name, version, install date, reviewer, purpose, and owner. Recorded where: ______________

**Ownership.** Every installed skill has a named owner responsible for it. Unowned skills are removed.

**Re-review.** Installed skills are re-reviewed every ______________, and on any version change.

**Removal triggers.** A skill is removed when:
- it is deprecated upstream without a successor
- its guidance no longer matches local practice
- its owner leaves and nobody adopts it
- ______________

**Change communication.** Staff are told about additions, updates, and removals via ______________.

**Opting out.** A staff member may decline to use these tools. Their work is then ______________. Declining carries no performance consequence: yes / OPEN.

**Open questions for the group:**

1. _______________________________________________
2. _______________________________________________
3. _______________________________________________

---

## Where the exercises use these sheets

| Exercise | Sheet |
|---|---|
| 2 — Read the Catalog Record | Appraisal crosswalk (section 1) |
| 3 — Vet a Skill Before You Install It | Vetting checklist (section 2) |
| 5 — Collections, Versions, and Weeding | Policy template (section 3) |

Exercises 1 and 4 need no handout. Exercise 4 works from the authoring guide bundled with the `kanon` skill itself.
