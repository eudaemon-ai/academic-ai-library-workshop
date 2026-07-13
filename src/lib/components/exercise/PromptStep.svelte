<script lang="ts">
	import CopyButton from '$lib/components/ui/CopyButton.svelte';
	import StepCheckpoint from './StepCheckpoint.svelte';

	let {
		step,
		isComplete,
		onComplete
	}: {
		step: { instruction: string; prompt_text?: string; checkpoint?: string };
		isComplete: boolean;
		onComplete: () => void;
	} = $props();
</script>

<div class="space-y-3.5">
	<div class="mb-1">
		<span class="rounded-md bg-jhu-blue/8 px-2 py-0.5 font-mono text-[11px] font-medium tracking-wide text-jhu-blue">TRY THIS PROMPT</span>
	</div>

	<div class="prose prose-sm max-w-none leading-relaxed text-gray-700">
		{@html step.instruction}
	</div>

	{#if step.prompt_text}
		<div class="relative rounded-lg border border-jhu-blue/20 bg-jhu-blue/5">
			<div class="absolute right-2 top-2">
				<CopyButton text={step.prompt_text} />
			</div>
			<pre class="overflow-x-auto whitespace-pre-wrap p-4 pr-16 font-mono text-sm leading-relaxed text-jhu-blue">{step.prompt_text.trim()}</pre>
		</div>
	{/if}

	{#if isComplete && step.checkpoint}
		<StepCheckpoint text={step.checkpoint} />
	{/if}

	{#if !isComplete}
		<div class="flex items-center gap-4 pt-1">
			{#if step.checkpoint}
				<p class="text-sm leading-relaxed text-gray-500 italic">{step.checkpoint}</p>
			{/if}
			<button
				onclick={onComplete}
				class="ml-auto shrink-0 rounded-lg bg-jhu-blue px-4 py-2 text-sm font-medium text-white hover:bg-blue-950"
			>
				Mark Complete →
			</button>
		</div>
	{/if}
</div>
