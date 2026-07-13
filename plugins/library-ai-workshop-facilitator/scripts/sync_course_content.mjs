import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const pluginRoot = resolve(scriptDir, '..');
const repoRoot = resolve(pluginRoot, '..', '..');
const referencesRoot = resolve(
	pluginRoot,
	'skills',
	'facilitate-library-ai-workshop',
	'references'
);
const courseRoot = resolve(referencesRoot, 'course');

const requiredSources = [
	resolve(repoRoot, 'FACILITATOR.md'),
	resolve(repoRoot, 'src', 'content', 'library-context', 'WORKSPACE-BRIEF.md'),
	resolve(repoRoot, 'src', 'content', 'modules'),
	resolve(repoRoot, 'src', 'content', 'library-context', 'sample-data')
];

for (const source of requiredSources) {
	if (!existsSync(source)) throw new Error(`Missing course source: ${source}`);
}

mkdirSync(referencesRoot, { recursive: true });
rmSync(courseRoot, { recursive: true, force: true });

cpSync(resolve(repoRoot, 'FACILITATOR.md'), resolve(referencesRoot, 'FACILITATOR.md'));
cpSync(
	resolve(repoRoot, 'src', 'content', 'library-context', 'WORKSPACE-BRIEF.md'),
	resolve(referencesRoot, 'AI-TOOL-GUIDE.md')
);
cpSync(resolve(repoRoot, 'src', 'content', 'modules'), resolve(courseRoot, 'modules'), {
	recursive: true
});
cpSync(
	resolve(repoRoot, 'src', 'content', 'library-context', 'sample-data'),
	resolve(courseRoot, 'sample-data'),
	{ recursive: true }
);

console.log(`Synced workshop content to ${referencesRoot}`);
