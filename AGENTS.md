# Codex-cli-library-workshop — Developer Instructions

## Project Overview

This is a SvelteKit 2.x eLearning application for the "Library AI Workshop" — a guided program teaching non-technical academic library staff to use Codex CLI. The app has two views: a learner view (self-paced exercises) and a facilitator dashboard (cohort progress monitoring).

**Note**: There are two AGENTS.md files in this project:
- This file (`/AGENTS.md`) — for developers building the SvelteKit app
- `src/content/library-context/AGENTS.md` — for workshop participants using Codex CLI during exercises

## Tech Stack

- **Framework**: SvelteKit 2.x + Svelte 5 (TypeScript)
- **Styling**: Tailwind CSS 3.x + @tailwindcss/typography
- **Database**: AWS DynamoDB (single table design via `@aws-sdk/lib-dynamodb`)
- **Content**: Markdown + YAML frontmatter (gray-matter + marked)
- **Adapter**: `@sveltejs/adapter-node` (runs as a Node.js server)

## Project Structure

```
src/
├── lib/
│   ├── db/               # DynamoDB client, schema definitions, prepared queries
│   ├── content/          # Markdown content loader and TypeScript types
│   ├── stores/           # Svelte 5 $state progress cache
│   └── utils/            # formatDuration, formatRelativeTime, renderMarkdown
├── content/
│   ├── library-context/  # AGENTS.md and sample data for workshop participants
│   └── modules/          # Exercise markdown files (01-reference, 02-cataloging, 03-collection-dev)
├── routes/
│   ├── /                 # Landing page (module cards)
│   ├── /learn/[moduleId]/[exerciseId]  # Learner exercise view
│   ├── /facilitator      # Facilitator dashboard (requires ?token=)
│   └── /api/             # session, progress, notes, modules endpoints
└── lib/components/
    ├── layout/            # AppNav, Sidebar, ProgressBar
    ├── modules/           # ModuleCard, ModuleOverview, ExerciseListItem
    ├── exercise/          # StepShell, TerminalStep, PromptStep, ObserveStep, ReflectStep, DiscoveryMoment
    ├── facilitator/       # CohortProgressTable, ModuleHeatmap, PacingAlert, TalkingPoints
    └── ui/                # CopyButton, Badge, Modal, LearnerIdentityModal
```

## DynamoDB Schema

Single table `LibraryWorkshop`. Key patterns:
- Learner: `pk=learner#<uuid>` / `sk=META`
- Progress: `pk=learner#<uuid>` / `sk=progress#<moduleId>#<exerciseId>#<padded-stepIndex>`
- Note: `pk=learner#<uuid>` / `sk=note#<moduleId>#<exerciseId>`

GSI: `cohort-lastSeen-index` (pk=cohort, sk=lastSeen) for facilitator queries.

## Content Format

Exercise markdown files use YAML frontmatter for structured step data, followed by markdown body for the exercise introduction and discussion questions. Steps have types: `terminal`, `prompt`, `observe`, `reflect`.

The `discovery_moment: true` flag triggers a `DiscoveryMoment` interstitial after the exercise's last step, showing the `## Discussion` section from the markdown body.

## Session Identity

Cookie-based: `wid=<uuid>` (24h). Created via `POST /api/session`. No authentication.

Facilitator view protected by `?token=<FACILITATOR_TOKEN>` (env var).

## Environment Variables

```
AWS_REGION=us-east-1
AWS_ROLE_ARN=arn:aws:iam::123456789012:role/LibraryWorkshopRole
AWS_ROLE_SESSION_NAME=library-workshop-session
DYNAMODB_TABLE=LibraryWorkshop
FACILITATOR_TOKEN=changeme
PUBLIC_WORKSHOP_TITLE=Library AI Workshop
PUBLIC_COHORT=spring2026
```

The app assumes `AWS_ROLE_ARN` via STS (`fromTemporaryCredentials` in `src/lib/db/client.ts`). Underlying credentials for the STS call come from the ambient chain — instance profile, ECS task role, `~/.aws/credentials`, or `AWS_PROFILE`. No static keys.

## Development Commands

```bash
npm run dev          # Start dev server (localhost:5173)
npm run build        # Build for production
npm run check        # TypeScript + Svelte type check
npm run preview      # Preview production build
```

## Adding Content

To add a new module:
1. Create `src/content/modules/<id>/module.md` with the required frontmatter
2. Create exercise files `01-<name>.md` through `N-<name>.md`
3. Follow the step frontmatter schema in `src/lib/content/types.ts`
No code changes needed — the content loader discovers files automatically.
