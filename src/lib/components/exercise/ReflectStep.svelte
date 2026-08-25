<script lang="ts">
	import { PUBLIC_STATIC } from '$env/static/public';
	const IS_STATIC = PUBLIC_STATIC === 'true';

	let {
		step,
		moduleId,
		exerciseId,
		isComplete,
		onComplete
	}: {
		step: { instruction: string; reflection_prompt?: string };
		moduleId: string;
		exerciseId: string;
		isComplete: boolean;
		onComplete: () => void;
	} = $props();

	let body = $state('');
	let saving = $state(false);

	async function saveNote() {
		if (!body.trim() || IS_STATIC) return;
		saving = true;
		await fetch('/api/notes', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ moduleId, exerciseId, body })
		});
		saving = false;
	}
</script>

<div class="space-y-3.5">
	<div class="mb-1">
		<span class="rounded-md bg-jhu-spirit/15 px-2 py-0.5 font-mono text-[11px] font-medium tracking-wide text-[#1265A8]">REFLECT</span>
	</div>

	<div class="prose prose-sm max-w-none text-sm leading-relaxed text-gray-700">{@html step.instruction}</div>

	{#if step.reflection_prompt}
		<p class="rounded-lg border border-jhu-spirit/30 bg-jhu-spirit/8 px-4 py-3.5 text-sm leading-relaxed text-jhu-blue italic">
			{@html step.reflection_prompt}
		</p>
	{/if}

	{#if !isComplete}
		<textarea
			bind:value={body}
			rows="4"
			placeholder="Your thoughts… (optional)"
			class="w-full rounded-lg border border-gray-300 p-3 text-sm leading-relaxed focus:border-jhu-spirit focus:outline-none focus:ring-1 focus:ring-jhu-spirit/50"
		></textarea>

		<div class="flex gap-3 pt-1">
			<button
				onclick={async () => {
					await saveNote();
					onComplete();
				}}
				disabled={saving}
				class="rounded-lg bg-jhu-blue px-4 py-2 text-sm font-medium text-white hover:bg-blue-950 disabled:opacity-50"
			>
				{saving ? 'Saving…' : IS_STATIC ? 'Continue →' : 'Save & Continue →'}
			</button>
			<button
				onclick={onComplete}
				class="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
			>
				Skip
			</button>
		</div>
	{:else}
		<p class="text-sm text-gray-400 italic">Reflection recorded.</p>
	{/if}
</div>
