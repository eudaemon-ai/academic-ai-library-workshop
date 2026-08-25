# Skill Marketplace Prompt Pack

Every prompt used in the bonus module, *The Skill Marketplace*, in one place. Copy one, paste it, read the answer, move on.

## Before you start: install the plugin

This module works against a real installed plugin, and the prompts below assume it.

In **Claude Cowork**: open Customize in the sidebar, then Plugins, then Browse plugins, then Add marketplace. Enter:

```
jhu-sheridan-libraries/agentic-skill-library
```

Then install the plugin named `context-bazaar`.

In **Claude Code**:

```
/plugin marketplace add https://github.com/jhu-sheridan-libraries/agentic-skill-library
/plugin install context-bazaar
```

Confirm it worked before going further — Exercise 1's third prompt will tell you, since it lists what is installed.

## How to use this pack

Copy a prompt, paste it, read the answer, move on. You do not need a terminal for any exercise in this module.

Two habits before you start:

- Work in a folder you are willing to throw away. Nothing here should touch patron data, assessment data, or licensed content.
- When an answer sounds confident, check one detail against the source yourself. That habit is the point of Exercise 3, and it applies to the answers you get from these prompts too.

Some prompts name the repository directly rather than relying on the plugin's catalog tools. That is deliberate: those tools return an artifact's main file and nothing else, and several exercises need the files packaged beside it.

The repository referred to throughout is:

```
https://github.com/jhu-sheridan-libraries/agentic-skill-library
```


## Exercise 1 — Add the Marketplace and Meet Your Guide

### 1.2 — What would installing this actually do?

```
Read the marketplace and plugin manifests in
https://github.com/jhu-sheridan-libraries/agentic-skill-library
— they are the files .claude-plugin/marketplace.json and .claude-plugin/plugin.json.

In plain language, tell me:
1. what installing this plugin would add to my assistant;
2. what it would be able to reach beyond our conversation;
3. who wrote it, under what licence;
4. anything the manifests claim that I would be taking on trust.

Do not install anything. I am deciding whether to.
```

### 1.3 — Take inventory

```
What skills are installed?

For each one, give me the name, one sentence on what it does, and whether
it is aimed at developers or at some other audience.
```

### 1.4 — Meet your guide

```
Use the kanon skill. What is Kanon, and what reference material does this
skill have available to teach me?

List each reference, what it covers, and roughly how long it would take.
Do not walk me through any of them yet.
```

---

## Exercise 2 — Read the Catalog Record

### 2.1 — Survey the collections

```
List the collections in the Context Bazaar catalog at
https://github.com/jhu-sheridan-libraries/agentic-skill-library
with their member counts and descriptions.

Then tell me which ones an academic library might have any use for,
and which are aimed at software teams.
```

### 2.2 — Find yourself in the catalog

```
List every artifact in the library-ai-workshop collection in
https://github.com/jhu-sheridan-libraries/agentic-skill-library

For each, show me the name, type, description, version, maturity, trust lane,
licence, and which harnesses it targets.
```

### 2.3 — Open one record in full

```
Show me the full content of the review-ai-research-output artifact in
https://github.com/jhu-sheridan-libraries/agentic-skill-library
including its frontmatter and any note about where it came from.

Then tell me: what would this skill instruct an AI tool to do, and what
would it instruct the tool not to do?
```

---

## Exercise 3 — Vet a Skill Before You Install It

### 3.1 — Get the raw text

```
In https://github.com/jhu-sheridan-libraries/agentic-skill-library
open the folder kanon/knowledge/review-ai-research-output/.

Show me the full text of knowledge.md. Then list every other file in that
folder and show me the contents of each one, especially any hooks file or
MCP server definition.

Show the text as it is written. Do not summarise, tidy, or skip anything.
```

### 3.2 — Apply the checklist

```
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
```

### 3.4 — Write the recommendation

```
Draft a short technical-services recommendation for installing the
review-ai-research-output artifact in our library.

Structure it as: what the artifact instructs an AI tool to do; what it can
reach (files, network, credentials); its licence, author, and provenance;
findings against the five checks above; and a single recommendation of
accept, reject, or escalate, with the reason.

Where evidence is missing, say that it is missing rather than assuming it
is fine.
```

---

## Exercise 4 — Author Once, Compile Everywhere

### 4.1 — Open the authoring guide

```
Use the kanon skill and give me its authoring guide for creating a first
knowledge artifact.

Summarise the nine steps, then tell me what its metadata-quality checklist
requires and what its most common listed mistakes are.
```

### 4.2 — Scaffold an artifact

```
Draft a knowledge artifact called library-search-log in the Kanon format,
as a file I can save.

The frontmatter needs: name, displayName, description, keywords, author,
version, harnesses, type, inclusion, categories, maturity, trust, license,
audience, and collections. Follow the field conventions used by the
artifacts in https://github.com/jhu-sheridan-libraries/agentic-skill-library

Leave the body empty for now. Show me the frontmatter and explain what each
field commits me to.
```

### 4.3 — Write the knowledge

```
Now write the body of library-search-log.

It should instruct an AI tool how to help a librarian record a reproducible
database search: databases and platforms searched, date, exact syntax per
database, limiters, result counts, deduplication method, and what the
librarian decided and why.

Set maturity to experimental and trust to community, because that is what
this honestly is. Include an explicit instruction that the tool must not
invent result counts or syntax it has not been given.
```

### 4.4 — See the compile

```
In https://github.com/jhu-sheridan-libraries/agentic-skill-library
compare two files: kanon/knowledge/adr/knowledge.md, which is the canonical
source, and kanon/skills/adr/SKILL.md, which is what that same artifact
becomes once compiled for Claude Code.

Show me what is the same, what changed, and what the packaging added or
dropped. Then tell me what would happen to the same artifact compiled for
Cursor, for Copilot, and for a tool with no support for hooks at all.
```

---

## Exercise 5 — Collections, Versions, and Weeding

### 5.1 — Design a local collection

```
Draft a Kanon collection manifest for a collection of AI skills maintained
by an academic library. Include name, displayName, description, version,
author, trust, and tags.

Then list five artifacts you would want in it, and for each one say who in
the library would own it, what evidence would justify moving it from
experimental to stable, and what would trigger its removal.
```

### 5.3 — Draft the local policy

```
Draft a one-page policy for AI skill adoption in an academic library.

Cover: who may add a marketplace; who reviews a skill before install; which
trust lanes are installable without review and which require it; how a skill
is described locally; who owns each installed skill; how often installed
skills are re-reviewed; what triggers removal; and how staff are told when
something changes.

Include an explicit route for a staff member who does not want to use these
tools at all, and say what happens to their work.

Mark every point where the policy depends on a decision our library has not
yet made.
```

---

## Appendix — the same work at a command line

For staff who already work in a terminal. None of this is required to complete the module.

Add the marketplace and install the plugin in Claude Code:

```
/plugin marketplace add https://github.com/jhu-sheridan-libraries/agentic-skill-library
/plugin install context-bazaar
```

In Codex, link the checkout into your personal marketplace directory, add an entry named `context-bazaar` to the `plugins` array in `~/.agents/plugins/marketplace.json`, then run `codex plugin add context-bazaar@personal`.

Read an artifact and its sibling files directly (Exercise 3):

```bash
git clone https://github.com/jhu-sheridan-libraries/agentic-skill-library.git
cd agentic-skill-library/kanon
cat knowledge/review-ai-research-output/knowledge.md
ls knowledge/review-ai-research-output/
```

Run the project's own security validator (Exercise 3). This is the real scanner; the checklist prompt above is a reading aid, not a substitute:

```bash
bun install
bun run dev validate --security
```

Scaffold, validate, compile, and preview an artifact (Exercise 4):

```bash
bun run dev new library-search-log --type skill
bun run dev validate knowledge/library-search-log
bun run dev build --harness claude-code
bun run dev temper library-search-log --compare
```

Install a pinned artifact from a tagged upstream release, rather than tracking the latest:

```bash
kanon install <artifact> --harness <harness> --from-release <tag>
```
