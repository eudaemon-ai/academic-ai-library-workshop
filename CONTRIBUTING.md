# Contributing to Library AI Workshop

Thank you for your interest in contributing! This document explains how to get involved, submit changes, and — importantly — how to add your name to the project copyright.

---

## Getting Started

1. **Fork** the repository and clone your fork locally.
2. **Install dependencies** and configure your environment following the steps in [README.md](README.md).
3. Create a branch for your work:

   ```bash
   git checkout -b my-feature-or-fix
   ```

4. Make your changes, then open a pull request against `main`.

---

## Reporting Issues

- Use the GitHub issue tracker for bug reports and feature requests.
- Please include enough detail to reproduce a bug (steps, expected vs. actual behavior, Node.js version, OS).
- For content issues (typos in exercise copy, unclear instructions), a short description is enough.

---

## Pull Requests

- Keep pull requests focused — one logical change per PR.
- Run `npm run check` before opening a PR to catch TypeScript and Svelte type errors.
- If your PR adds or changes behavior, update the relevant section of `README.md` or `FACILITATOR.md`.
- PRs that add new workshop modules only need exercise markdown files — no code changes are required (see the [Adding Content](README.md#adding-content) section of the README).

---

## Copyright Attribution

This project is licensed under the [Mozilla Public License 2.0](LICENSE). MPL 2.0 permits contributors to add their own copyright notices alongside the original.

**If your contribution is substantive** (new features, new exercises, significant refactoring), please add your name and the year to the copyright header at the top of the `LICENSE` file:

```
Copyright (c) 2026 Steven J. Miklovic
Copyright (c) <year> <Your Name>
```

Add one line per contributor, in chronological order of first contribution. For minor fixes (typos, small copy edits, dependency bumps) you do not need to add a copyright line.

Do not modify any other part of the `LICENSE` file.

---

## Code Style

- TypeScript and Svelte files follow the conventions already present in the codebase.
- Tailwind utility classes are preferred over custom CSS.
- Keep Svelte components small and focused; add new components to the appropriate subdirectory under `src/lib/components/`.

---

## Commit Messages

Use short, descriptive imperative sentences:

```
Add collection development exercise on vendor negotiation
Fix progress bar overflow on narrow screens
Update README with new AWS CLI commands
```

---

## Questions?

Open an issue and tag it **question** — we're happy to help.
