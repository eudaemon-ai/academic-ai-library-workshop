import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { renderMarkdown, renderMarkdownInline } from '$lib/utils/markdown.js';
import type { Module, ModuleMeta, Exercise, ExerciseMeta, Step } from './types.js';

// Content lives at src/content/modules/ relative to the project root.
// In SvelteKit server context, process.cwd() is the project root.
function contentRoot(): string {
	return join(process.cwd(), 'src', 'content', 'modules');
}

// Step text is authored as markdown in frontmatter and rendered here, so the
// step components receive HTML. Fields that sit inside an existing block
// element are rendered inline to avoid nesting a <p> inside a <p>.
function renderSteps(steps: Step[] = []): Step[] {
	return steps.map((step) => ({
		...step,
		instruction: renderMarkdown(step.instruction),
		...(step.observe_items && {
			observe_items: step.observe_items.map(renderMarkdownInline)
		}),
		...(step.reflection_prompt && {
			reflection_prompt: renderMarkdownInline(step.reflection_prompt)
		})
	}));
}

export function loadAllModules(): ModuleMeta[] {
	const root = contentRoot();
	const dirs = readdirSync(root, { withFileTypes: true })
		.filter((d: { isDirectory: () => boolean }) => d.isDirectory())
		.map((d: { name: string }) => d.name)
		.sort();

	return dirs.map((dir) => {
		const raw = readFileSync(join(root, dir, 'module.md'), 'utf-8');
		const { data } = matter(raw);
		const meta = data as ModuleMeta;
		const exerciseCounts = loadExerciseMeta(dir);
		return {
			...meta,
			exercises: meta.exercises.map((ex) => ({
				...ex,
				step_count: exerciseCounts.find((e) => e.id === ex.id)?.step_count ?? 0
			}))
		};
	});
}

export function loadModule(moduleId: string): Module {
	const root = contentRoot();
	const moduleDir = join(root, moduleId);

	const moduleRaw = readFileSync(join(moduleDir, 'module.md'), 'utf-8');
	const { data: moduleMeta, content: moduleContent } = matter(moduleRaw);

	const exerciseDirs = readdirSync(moduleDir)
		.filter((f) => f !== 'module.md' && f.endsWith('.md'))
		.sort();

	const exercises: Exercise[] = exerciseDirs.map((filename) => {
		return loadExercise(moduleId, filename.replace('.md', ''));
	});

	return {
		...(moduleMeta as ModuleMeta),
		exercises,
		body: renderMarkdown(moduleContent)
	};
}

export function loadExercise(moduleId: string, exerciseId: string): Exercise {
	const root = contentRoot();
	const filePath = join(root, moduleId, `${exerciseId}.md`);
	const raw = readFileSync(filePath, 'utf-8');
	const { data, content } = matter(raw);

	const exercise = data as Omit<Exercise, 'body'>;

	return {
		...exercise,
		steps: renderSteps(exercise.steps),
		body: renderMarkdown(content)
	};
}

export function loadExerciseMeta(moduleId: string): ExerciseMeta[] {
	const root = contentRoot();
	const moduleDir = join(root, moduleId);
	return readdirSync(moduleDir)
		.filter((f) => f !== 'module.md' && f.endsWith('.md'))
		.sort()
		.map((filename) => {
			const raw = readFileSync(join(moduleDir, filename), 'utf-8');
			const { data } = matter(raw);
			return {
			id: data.id,
			title: data.title,
			estimated_minutes: data.estimated_minutes,
			step_count: Array.isArray(data.steps) ? data.steps.length : 0
		};
		});
}
