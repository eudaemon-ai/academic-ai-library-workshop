# Library AI Workshop

A SvelteKit eLearning application that teaches non-technical academic library staff to use Claude Code CLI in their everyday work. No coding required — participants follow guided prompting exercises across three modules:

1. **Reference & Research** — Draft reference responses, synthesize sources, refine with follow-up prompts
2. **Cataloging & Metadata** — Generate MARC records, suggest LCSH headings, write catalog abstracts
3. **Collection Development** — Write selection rationales, evaluate vendor offers, analyze COUNTER 5 usage data

Progress is tracked in AWS DynamoDB. A facilitator dashboard shows cohort progress, pacing alerts, and talking points keyed to the current exercise.

See `FACILITATOR.md` for the full run-of-show guide.

---

## Prerequisites

- Node.js 20+
- An AWS account with DynamoDB access
- Claude Code CLI installed on each participant's machine (`npm install -g @anthropic-ai/claude-code`)
- The `src/content/library-context/` folder accessible to participants

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

For a workshop, a simple option is to run on a local machine on the same network as participants. No internet connection is required except for AWS DynamoDB access.

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
│   ├── library-context/   # CLAUDE.md + sample data for participants
│   └── modules/           # Workshop exercise markdown files
└── routes/           # SvelteKit pages and API endpoints
```
