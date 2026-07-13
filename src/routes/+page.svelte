<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { base } from '$app/paths';
	import { PUBLIC_STATIC } from '$env/static/public';
	import ModuleCard from '$lib/components/modules/ModuleCard.svelte';
	import LearnerIdentityModal from '$lib/components/ui/LearnerIdentityModal.svelte';
	const IS_STATIC = PUBLIC_STATIC === 'true';

	let { data } = $props();

	// Count completed steps per module
	function moduleCompletedSteps(moduleId: string) {
		return data.completedSteps.filter((s) => s.moduleId === moduleId).length;
	}

	function moduleCurrentExerciseNum(moduleId: string): number | null {
		const mod = data.modules.find((m) => m.id === moduleId);
		if (!mod) return null;
		const seen = new Set(
			data.completedSteps.filter((s) => s.moduleId === moduleId).map((s) => s.exerciseId)
		);
		if (seen.size === 0) return null;
		let furthestIdx = -1;
		mod.exercises.forEach((ex, i) => { if (seen.has(ex.id)) furthestIdx = i; });
		return furthestIdx >= 0 ? furthestIdx + 1 : null;
	}

	function moduleTotalSteps(moduleId: string) {
		const mod = data.modules.find((m) => m.id === moduleId);
		if (!mod) return 0;
		return mod.exercises.reduce((sum, ex) => sum + (ex.step_count ?? 0), 0);
	}

	const showModal = $derived(!data.learnerId && !IS_STATIC);

	async function handleIdentified() {
		await invalidateAll();
	}
</script>

<div class="relative overflow-hidden">
	<!-- Research-project watermark -->
	<div
		aria-hidden="true"
		class="pointer-events-none absolute right-0 top-0 w-72 select-none px-6 pt-12 opacity-[0.07]"
		style="mask-image: linear-gradient(to bottom, black 0%, black 55%, transparent 100%); -webkit-mask-image: linear-gradient(to bottom, black 0%, black 55%, transparent 100%);"
	>
		<pre class="font-mono text-[0.6rem] leading-[1.7] text-jhu-blue">RESEARCH SUPPORT PROJECT

Sources enabled
  ✓ WORKSPACE-BRIEF.md
  ✓ research-request.txt
  ✓ public web
  — connected drives off

Research question
  How does open access affect
  the reach and use of public-
  health research?

Plan review
  ✓ separate outcome families
  ✓ include mixed findings
  ✓ record coverage gaps

Source audit
  12 checked
   2 partly supported
   1 inaccessible

Human review
  pending</pre>
	</div>

	<!-- Page content -->
	<div class="relative mx-auto max-w-4xl px-6 py-16">
		<div class="mb-12 text-center">
			<p class="mb-3 text-xs font-medium uppercase tracking-wider text-jhu-blue/60">
				Johns Hopkins University Libraries
			</p>
			<h1 class="font-serif text-[2.5rem] font-bold leading-tight tracking-tight text-jhu-blue">
				Research with AI
			</h1>
			<p class="mx-auto mt-4 max-w-md text-[0.9375rem] leading-7 text-gray-500">
				A hands-on workshop for librarians using ChatGPT, Claude, Gemini, or Copilot.
			</p>
			<p class="mt-2 font-mono text-[0.6875rem] tracking-wide text-gray-400">
				exercises run in <a href="{base}/terminal-primer" class="text-jhu-blue/50 underline underline-offset-2 hover:text-jhu-blue transition-colors">your AI tool</a> &nbsp;·&nbsp; no coding &nbsp;·&nbsp; self-paced
			</p>
			<div class="mx-auto mt-6 h-px w-10 bg-jhu-gold"></div>
		</div>

		<div class="flex flex-wrap justify-center gap-6">
			{#each data.modules as mod}
				<div class="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
					<ModuleCard
						module={mod}
						completedSteps={moduleCompletedSteps(mod.id)}
						totalSteps={moduleTotalSteps(mod.id)}
						currentExerciseNum={moduleCurrentExerciseNum(mod.id)}
					/>
				</div>
			{/each}
		</div>

		{#if data.modules.length === 0}
			<div class="mx-auto max-w-sm rounded-xl border border-amber-200 bg-amber-50 p-6 text-center">
				<p class="font-medium text-amber-800">No workshop modules found</p>
				<p class="mt-2 text-sm leading-6 text-amber-700">
					The content files couldn't be loaded. Make sure the
					<code class="rounded bg-amber-100 px-1 font-mono text-xs">src/content/modules/</code>
					directory exists and restart the dev server.
				</p>
			</div>
		{/if}
	</div>
</div>

{#if showModal}
	<LearnerIdentityModal onIdentified={handleIdentified} />
{/if}
