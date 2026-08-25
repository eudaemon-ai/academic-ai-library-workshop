# Library AI Workshop

A SvelteKit eLearning application that helps research librarians use graphical AI tools safely and critically. No coding is required. The June 2026 curriculum is product-neutral across ChatGPT, Claude, Gemini, and Microsoft 365 Copilot and follows four modules:

1. **Safe Setup & the Reference Interview** — Set a data boundary, scope a research request, and build a concept map
2. **Search & Source Verification** — Review research plans, inspect source sets, and audit claims against citations
3. **Evidence Synthesis & Data** — Build claim-evidence matrices, preserve disagreement, and verify calculations
4. **Reproducible Research Support** — Test database syntax, teach critical AI use, and package accountable handoffs

An optional fifth module sits outside that product-neutral core:

5. **Bonus: The Skill Marketplace** — Appraise, install, author, and govern AI skills as a collection, using [Kanon and the agentic-skill-library](https://github.com/jhu-sheridan-libraries/agentic-skill-library)

The bonus module needs no terminal, but it does need the plugin. Its default surface is **Claude Cowork**, where the library installs through menus (Customize → Plugins → Browse plugins → Add marketplace) and every step is a copy-paste prompt; Claude Code and Codex work too, and add the optional authoring and publishing steps. Because the module works against a real installed plugin, **permission to install one is a prerequisite** — confirm it with the cohort before the session.

It does not try to teach the CLI from scratch. The marketplace ships a `kanon` skill written for library staff — its authoring guide teaches artifact metadata through Dublin Core — and the module hands learners to it, then points anyone wanting depth at that skill's twenty-lesson tutorial, self-paced course, and curriculum guide.

The curriculum is grounded in the [ACRL AI Competencies for Academic Library Workers](https://www.ala.org/acrl/standards/ai) and the [ALA Guidance on the Use of Artificial Intelligence in Libraries](https://www.ala.org/sites/default/files/2026-06/ALA%20CD%2044.2%20AI%20Guidance%20Document%20-%20Final.pdf). AI output is treated as draft material requiring meaningful human review.

Progress is tracked in AWS DynamoDB. A facilitator dashboard shows cohort progress, pacing alerts, and talking points keyed to the current exercise.

See `FACILITATOR.md` for the full run-of-show guide.

---

## Prerequisites

- Node.js 20+
- An AWS account with DynamoDB access
- A ChatGPT, Claude, Gemini, or Microsoft 365 Copilot account that participants may use for the workshop
- File upload access and, for Module 2, web search or a longer-running research mode
- The `src/content/library-context/` folder accessible to participants
- **For the optional bonus module only**: Claude Cowork (or Claude Code / Codex) plus permission to install a plugin on the machine participants are using. No terminal is required. The release package carries `SKILL-MARKETPLACE-PROMPTS.md` and `SKILL-MARKETPLACE-HANDOUT.md` for that module, but does not bundle Kanon or the Context Bazaar marketplace itself. See [Distribution](#distribution).

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` with your role ARN and settings:

```
AWS_REGION=us-east-1
AWS_ROLE_ARN=arn:aws:iam::123456789012:role/LibraryWorkshopRole
AWS_ROLE_SESSION_NAME=library-workshop-session
DYNAMODB_TABLE=LibraryWorkshop
FACILITATOR_TOKEN=choose-a-secure-token
PUBLIC_WORKSHOP_TITLE=Library AI Workshop
PUBLIC_COHORT=spring2026
```

The app assumes the role specified in `AWS_ROLE_ARN` via STS on startup. The underlying credentials for the STS call come from the **ambient AWS credential chain** — EC2/ECS instance profile, EKS pod identity, an `~/.aws/credentials` named profile, or the `AWS_PROFILE` environment variable. No static `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` are used or expected.

### 3. Create the DynamoDB table

Create a table named `LibraryWorkshop` (or whatever you set `DYNAMODB_TABLE` to) with:

- **Partition key**: `pk` (String)
- **Sort key**: `sk` (String)
- **Billing mode**: On-demand (PAY_PER_REQUEST)
- **TTL attribute**: `expiresAt`
- **Global Secondary Index**:
  - Name: `cohort-lastSeen-index`
  - Partition key: `cohort` (String)
  - Sort key: `lastSeen` (String)
  - Projection: All

You can create this via the AWS Console or AWS CLI:

```bash
aws dynamodb create-table \
  --table-name LibraryWorkshop \
  --attribute-definitions \
    AttributeName=pk,AttributeType=S \
    AttributeName=sk,AttributeType=S \
    AttributeName=cohort,AttributeType=S \
    AttributeName=lastSeen,AttributeType=S \
  --key-schema \
    AttributeName=pk,KeyType=HASH \
    AttributeName=sk,KeyType=RANGE \
  --billing-mode PAY_PER_REQUEST \
  --global-secondary-indexes '[
    {
      "IndexName": "cohort-lastSeen-index",
      "KeySchema": [
        {"AttributeName":"cohort","KeyType":"HASH"},
        {"AttributeName":"lastSeen","KeyType":"RANGE"}
      ],
      "Projection": {"ProjectionType":"ALL"}
    }
  ]'
```

### 4. Enable TTL

```bash
aws dynamodb update-time-to-live \
  --table-name LibraryWorkshop \
  --time-to-live-specification "Enabled=true, AttributeName=expiresAt"
```

---

## Development

```bash
npm run dev          # Start dev server at http://localhost:5173
npm run check        # TypeScript + Svelte type check
npm run build        # Build for production
npm run preview      # Preview production build
```

## Agent-Led Delivery

The repo includes an installable workshop Plugin at `plugins/library-ai-workshop-facilitator/`. It bundles four Skills:

- `facilitate-library-ai-workshop` coaches one learner through the curriculum;
- `run-library-ai-workshop-cohort` helps a human instructor prepare, teach, and debrief a live session;
- `practice-library-reference-interview` role-plays a fictional patron and gives a non-scored debrief;
- `review-ai-research-output` audits AI-assisted research work against evidence and release checks.

The Plugin includes the course materials, simulated data, practice scenarios, and review rubric it needs at runtime.

After changing course content or `FACILITATOR.md`, refresh the bundled references:

```bash
npm run sync:facilitator-plugin
```

The repo-local marketplace entry is `.agents/plugins/marketplace.json`. See `FACILITATOR.md` for the agent teaching protocol, validation commands, installation steps, and test scenarios.

---

## Distribution

Two separate things ship from this repository, and the bonus module deliberately depends on neither.

**The workshop materials release.** `.github/workflows/release-materials.yml` packages `src/content/library-context/` as `library-context.zip` on the `workshop-materials` release whenever that folder changes. It contains the standing brief, the simulated data used by Modules 1–4, and two companion documents for the bonus module: `SKILL-MARKETPLACE-PROMPTS.md`, every prompt in that module ready to paste into Cowork, and `SKILL-MARKETPLACE-HANDOUT.md`, its appraisal crosswalk, vetting checklist, and local policy template. Both are our own material under MPL-2.0, and between them a participant needs no terminal at any point.

**The facilitator plugin.** `plugins/library-ai-workshop-facilitator/`, installed from the repo-local marketplace at `.agents/plugins/marketplace.json`, carrying its own copy of the course.

**Kanon and the Context Bazaar marketplace are not bundled into either, by design.** Module 5 works against the upstream [`jhu-sheridan-libraries/agentic-skill-library`](https://github.com/jhu-sheridan-libraries/agentic-skill-library) at whatever version a learner finds there. Vendoring a copy into our release would mean redistributing third-party code under a different licence (BSL-1.0 plugin, MIT repository) inside an MPL-2.0 package, pinning a snapshot that immediately begins to drift, and implicitly vouching for software that Exercise 3 exists to teach learners to vet for themselves.

### Ways to install

Module 5 depends on the plugin being installed. Where the GUI route is unavailable, manual installation is a first-class upstream path, not a workaround. In rough order of effort:

1. **Add the marketplace in Cowork.** Customize → Plugins → Browse plugins → Add marketplace, entering `jhu-sheridan-libraries/agentic-skill-library`, then install `context-bazaar`. No terminal. This is the route the module assumes.
2. **Copy a single skill.** `kanon/skills/<name>/` in the upstream repository is a plain `SKILL.md` plus a `references/` folder. Copy the directory into `.claude/skills/` in a project, or `~/.claude/skills/` for personal use. This is all that is needed for the `kanon` skill itself, which is what Module 5 leans on most.
3. **Install a pinned artifact.** `kanon install <artifact> --harness <harness> --from-release <tag>` pulls from an upstream tagged release. Upstream publishes per-harness `dist-<harness>.tar.gz` assets and a release manifest, so an install can be pinned and reviewed rather than tracking `main`.
4. **Clone and build locally.** `git clone`, then `bun run dev build --harness <harness>` and `bun run dev install <artifact> --harness <harness> --source .`.

Whichever route a library takes, the review in Module 5's Exercise 3 should happen before the install, not after.

---

## Facilitator Access

The facilitator dashboard is at:

```
http://[your-url]/facilitator?token=<FACILITATOR_TOKEN>
```

The token is checked against the `FACILITATOR_TOKEN` environment variable. The dashboard refreshes every 30 seconds.

---

## Production Deployment

This app uses `@sveltejs/adapter-node`. Build and run:

```bash
npm run build
node build/index.js
```

Set environment variables in your deployment environment (not in `.env`).

For a workshop, a simple option is to run the app on a local machine on the same network as participants. Participants still need internet access for their AI tool and current-source exercises.

---

## Adding Content

To add a new module, create a directory under `src/content/modules/<id>/` with:
- `module.md` — module metadata in frontmatter + overview body
- `01-<name>.md` through `N-<name>.md` — exercise files

No code changes needed. The content loader discovers modules automatically at server startup.

Exercise frontmatter schema is documented in `src/lib/content/types.ts`.

---

## Teardown

After the workshop, delete the DynamoDB table (all data has a 48-hour TTL anyway):

```bash
aws dynamodb delete-table --table-name LibraryWorkshop
```

---

## License

Copyright (c) 2026 Steven J. Miklovic. Licensed under the [Mozilla Public License 2.0](LICENSE).

---

## Project Structure

```
src/
├── lib/db/           # DynamoDB client and queries
├── lib/content/      # Markdown loader and TypeScript types
├── lib/components/   # Svelte components
├── content/
│   ├── library-context/   # WORKSPACE-BRIEF.md + simulated sample data
│   └── modules/           # Workshop exercise markdown files
└── routes/           # SvelteKit pages and API endpoints
```
