<script lang="ts">
	import { invalidate, goto } from '$app/navigation';
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import { PUBLIC_STATIC } from '$env/static/public';
	const IS_STATIC = PUBLIC_STATIC === 'true';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import ExerciseHeader from '$lib/components/exercise/ExerciseHeader.svelte';
	import StepShell from '$lib/components/exercise/StepShell.svelte';
	import WorkspaceStep from '$lib/components/exercise/WorkspaceStep.svelte';
	import PromptStep from '$lib/components/exercise/PromptStep.svelte';
	import ObserveStep from '$lib/components/exercise/ObserveStep.svelte';
	import ReflectStep from '$lib/components/exercise/ReflectStep.svelte';
	import DiscoveryMoment from '$lib/components/exercise/DiscoveryMoment.svelte';
	import ModuleComplete from '$lib/components/exercise/ModuleComplete.svelte';

	const accentColors: Record<string, string> = {
		'01-reference': '#002D72',
		'02-cataloging': '#1265A8',
		'03-collection-dev': '#D4870A',
		'04-leadership': '#3730a3'
	};

	let { data } = $props();

	// Use $derived for reactive references to data properties
	const exercise = $derived(data.exercise);
	const mod = $derived(data.module);

	// Client-side completed steps (starts from server data)
	let completedIndices = $state<number[]>(data.completedStepIndices);
	let showDiscovery = $state(false);
	let showModuleComplete = $state(false);
	let sidebarOpen = $state(false);

	const accentColor = $derived(accentColors[mod.id] ?? '#002D72');

	const activeStep = $derived(
		completedIndices.length < exercise.steps.length ? completedIndices.length : exercise.steps.length - 1
	);
	const exerciseComplete = $derived(completedIndices.length >= exercise.steps.length);

	async function markComplete(stepIndex: number) {
		if (!IS_STATIC) {
			await fetch('/api/progress', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({
					moduleId: mod.id,
					exerciseId: exercise.id,
					stepIndex
				})
			});
		}
		completedIndices = [...completedIndices, stepIndex];

		// If that was the last step
		if (completedIndices.length >= exercise.steps.length) {
			if (exercise.discovery_moment) {
				showDiscovery = true;
			} else {
				await advanceToNextExercise();
			}
		}

		if (!IS_STATIC) await invalidate('app:progress');
	}

	async function advanceToNextExercise() {
		const currentIdx = mod.exercises.findIndex((e) => e.id === exercise.id);
		const next = mod.exercises[currentIdx + 1];
		if (next) {
			await goto(`${base}/learn/${mod.id}/${next.id}`);
		} else {
			showModuleComplete = true;
		}
	}

	// Extract discussion section from exercise body HTML
	function extractDiscussionHtml(html: string): string {
		const match = html.match(/<h2[^>]*>Discussion<\/h2>([\s\S]*?)(?=<h2|$)/i);
		return match ? `<h2>Discussion</h2>${match[1]}` : html;
	}
</script>

{#if showModuleComplete}
	<ModuleComplete
		moduleTitle={mod.title}
		moduleId={mod.id}
		exercises={mod.exercises}
		{accentColor}
	/>
{:else if showDiscovery}
	<DiscoveryMoment
		exerciseTitle={exercise.title}
		discussionHtml={extractDiscussionHtml(exercise.body)}
		onContinue={advanceToNextExercise}
	/>
{:else}
	<div class="flex">
		<Sidebar
			moduleId={mod.id}
			moduleTitle={mod.title}
			exercises={mod.exercises}
			currentExerciseId={exercise.id}
			completedExerciseIds={data.completedExerciseIds}
			open={sidebarOpen}
			onClose={() => (sidebarOpen = false)}
		/>

		<div class="flex-1 overflow-y-auto">
			<div class="mx-auto max-w-2xl px-5 py-8 sm:px-10 sm:py-10">
			<div class="mb-5 -mt-1 flex items-center justify-between">
				<a
					href="{base}/learn/{mod.id}"
					class="text-[0.8125rem] text-gray-400 transition-colors hover:text-gray-600"
				>← {mod.title}</a>
				<button
					onclick={() => (sidebarOpen = true)}
					class="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-600 shadow-sm hover:bg-gray-50 md:hidden"
					aria-label="Open exercise navigation"
				>
					<svg viewBox="0 0 16 16" fill="currentColor" class="h-3.5 w-3.5" aria-hidden="true">
						<path fill-rule="evenodd" d="M2 3.75A.75.75 0 0 1 2.75 3h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 3.75zm0 4.083A.75.75 0 0 1 2.75 7h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 2 7.833zm0 4A.75.75 0 0 1 2.75 11h5.5a.75.75 0 0 1 0 1.5h-5.5A.75.75 0 0 1 2 11.833z" clip-rule="evenodd"/>
					</svg>
					Exercises
				</button>
			</div>
			<ExerciseHeader
				title={exercise.title}
				currentStep={completedIndices.length}
				totalSteps={exercise.steps.length}
				estimatedMinutes={exercise.estimated_minutes}
			/>

			<!-- Exercise introduction -->
			{#if exercise.body}
				<div class="prose mb-8 max-w-none text-gray-600">
					{@html exercise.body.replace(/<h2[^>]*>Discussion<\/h2>[\s\S]*/i, '')}
				</div>
			{/if}

			<div class="space-y-4">
				{#each exercise.steps as step}
					{@const isComplete = completedIndices.includes(step.index)}
					{@const isActive = step.index === activeStep && !exerciseComplete}
					<StepShell {step} {isComplete} {isActive}>
						{#if step.type === 'workspace'}
							<WorkspaceStep
								{step}
								{isComplete}
								onComplete={() => markComplete(step.index)}
							/>
						{:else if step.type === 'prompt'}
							<PromptStep
								{step}
								{isComplete}
								onComplete={() => markComplete(step.index)}
							/>
						{:else if step.type === 'observe'}
							<ObserveStep
								{step}
								{isComplete}
								onComplete={() => markComplete(step.index)}
							/>
						{:else if step.type === 'reflect'}
							<ReflectStep
								{step}
								moduleId={mod.id}
								exerciseId={exercise.id}
								{isComplete}
								onComplete={() => markComplete(step.index)}
							/>
						{/if}
					</StepShell>
				{/each}
			</div>

			{#if exerciseComplete && !exercise.discovery_moment}
				<div class="mt-8 rounded-xl border border-jhu-gold/40 bg-jhu-gold/8 p-6 text-center">
					<p class="font-semibold text-jhu-blue">Exercise complete!</p>
					<button
						onclick={advanceToNextExercise}
						class="mt-4 rounded-lg bg-jhu-blue px-6 py-2 font-medium text-white hover:bg-blue-950"
					>
						Next Exercise →
					</button>
				</div>
			{/if}
			</div>
		</div>
	</div>
{/if}
