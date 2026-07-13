<script lang="ts">
	import StepCheckpoint from './StepCheckpoint.svelte';

	let {
		step,
		isComplete,
		onComplete
	}: {
		step: { instruction: string; checkpoint?: string };
		isComplete: boolean;
		onComplete: () => void;
	} = $props();
</script>

<div class="space-y-3">
	<div class="mb-1 flex items-center gap-2">
		<span class="rounded-md bg-gray-900/8 px-2 py-0.5 font-mono text-[11px] font-medium tracking-wide text-gray-500">IN YOUR AI TOOL</span>
	</div>

	<div class="prose prose-sm max-w-none rounded-lg border border-slate-200 bg-white p-4 text-sm leading-relaxed text-gray-700">
		{@html step.instruction}
	</div>

	{#if isComplete && step.checkpoint}
		<StepCheckpoint text={step.checkpoint} />
	{/if}

	{#if !isComplete}
		<div class="flex items-center gap-4">
			{#if step.checkpoint}
				<p class="text-sm italic text-gray-500">{step.checkpoint}</p>
			{/if}
			<button onclick={onComplete} class="ml-auto shrink-0 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700">
				Mark Complete →
			</button>
		</div>
	{/if}
</div>
