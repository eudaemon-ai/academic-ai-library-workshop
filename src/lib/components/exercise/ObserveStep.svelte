<script lang="ts">
	import StepCheckpoint from './StepCheckpoint.svelte';

	let {
		step,
		isComplete,
		onComplete
	}: {
		step: { instruction: string; observe_items?: string[]; checkpoint?: string };
		isComplete: boolean;
		onComplete: () => void;
	} = $props();

	let checked = $state<boolean[]>([]);
	$effect(() => {
		if (step.observe_items) {
			checked = step.observe_items.map(() => false);
		}
	});

	const allChecked = $derived(checked.length > 0 && checked.every(Boolean));
</script>

<div class="space-y-3.5">
	<div class="mb-1">
		<span class="rounded-md bg-[#D4870A]/10 px-2 py-0.5 font-mono text-[11px] font-medium tracking-wide text-[#A0620A]">OBSERVE</span>
	</div>

	<div class="prose prose-sm max-w-none text-sm leading-relaxed text-gray-700">{@html step.instruction}</div>

	{#if step.observe_items}
		<ul class="space-y-2.5">
			{#each step.observe_items as item, i}
				<li class="flex items-start gap-3">
					<input
						type="checkbox"
						id="obs-{i}"
						bind:checked={checked[i]}
						disabled={isComplete}
						class="mt-0.5 h-4 w-4 rounded border-gray-300 text-jhu-gold focus:ring-jhu-gold/50"
					/>
					<label for="obs-{i}" class="text-sm leading-relaxed text-gray-700">{@html item}</label>
				</li>
			{/each}
		</ul>
	{/if}

	{#if isComplete && step.checkpoint}
		<StepCheckpoint text={step.checkpoint} />
	{/if}

	{#if !isComplete}
		<button
			onclick={onComplete}
			disabled={!allChecked}
			class="rounded-lg bg-[#D4870A] px-4 py-2 text-sm font-medium text-white hover:bg-[#b8720a] disabled:cursor-not-allowed disabled:opacity-40"
		>
			{allChecked ? 'Mark Complete →' : 'Check all items to continue'}
		</button>
	{/if}
</div>
