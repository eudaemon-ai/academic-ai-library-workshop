import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const pluginRoot = resolve(scriptDir, '..');
const repoRoot = resolve(pluginRoot, '..', '..');
const skillsRoot = resolve(pluginRoot, 'skills');
const learnerReferences = resolve(skillsRoot, 'facilitate-library-ai-workshop', 'references');
const cohortReferences = resolve(skillsRoot, 'run-library-ai-workshop-cohort', 'references');
const interviewReferences = resolve(
	skillsRoot,
	'practice-library-reference-interview',
	'references'
);
const reviewReferences = resolve(skillsRoot, 'review-ai-research-output', 'references');

const aiGuideSource = resolve(
	repoRoot,
	'src',
	'content',
	'library-context',
	'WORKSPACE-BRIEF.md'
);
const modulesSource = resolve(repoRoot, 'src', 'content', 'modules');
const sampleDataSource = resolve(repoRoot, 'src', 'content', 'library-context', 'sample-data');

const requiredSources = [
	resolve(repoRoot, 'FACILITATOR.md'),
	aiGuideSource,
	modulesSource,
	sampleDataSource
];

for (const source of requiredSources) {
	if (!existsSync(source)) throw new Error(`Missing course source: ${source}`);
}

const allReferenceRoots = [
	learnerReferences,
	cohortReferences,
	interviewReferences,
	reviewReferences
];

for (const referencesRoot of allReferenceRoots) {
	mkdirSync(referencesRoot, { recursive: true });
	cpSync(aiGuideSource, resolve(referencesRoot, 'AI-TOOL-GUIDE.md'));
}

for (const referencesRoot of [learnerReferences, cohortReferences]) {
	const courseRoot = resolve(referencesRoot, 'course');
	rmSync(courseRoot, { recursive: true, force: true });
	cpSync(resolve(repoRoot, 'FACILITATOR.md'), resolve(referencesRoot, 'FACILITATOR.md'));
	cpSync(modulesSource, resolve(courseRoot, 'modules'), { recursive: true });
	cpSync(sampleDataSource, resolve(courseRoot, 'sample-data'), { recursive: true });
}

console.log(`Synced workshop content to ${allReferenceRoots.length} skill reference sets`);
