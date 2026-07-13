<script lang="ts">
	import Modal from './Modal.svelte';

	let { onIdentified }: { onIdentified: (learnerId: string) => void } = $props();

	let name = $state('');
	let role = $state('reference');
	let loading = $state(false);
	let error = $state('');
	let open = $state(true);

	async function submit() {
		if (!name.trim()) {
			error = 'Please enter your name so your facilitator can track your progress.';
			return;
		}
		loading = true;
		error = '';
		try {
			const res = await fetch('/api/session', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ name: name.trim(), role })
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.error ?? 'Failed to create session');
			open = false;
			onIdentified(data.learnerId);
		} catch (e: unknown) {
			error =
				e instanceof Error && e.message !== 'Failed to create session'
					? e.message
					: "We couldn't start your session. Please check your connection and try again.";
		} finally {
			loading = false;
		}
	}
</script>

<Modal {open} title="Welcome to Library AI Workshop">
	<p class="mb-6 text-sm text-gray-600">
		Before we begin, tell us a little about yourself so your facilitator can track your progress.
	</p>

	<div class="space-y-4">
		<div>
			<label for="learner-name" class="block text-sm font-medium text-gray-700">Your Name</label>
			<input
				id="learner-name"
				type="text"
				bind:value={name}
				placeholder="e.g. Maria Chen"
				class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
			/>
		</div>

		<div>
			<label for="learner-role" class="block text-sm font-medium text-gray-700">Your Role</label>
			<select
				id="learner-role"
				bind:value={role}
				class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
			>
				<option value="reference">Reference / Research Services</option>
				<option value="liaison">Subject Liaison</option>
				<option value="systematic_review">Evidence Synthesis / Systematic Review</option>
				<option value="scholarly_communication">Scholarly Communication</option>
				<option value="data">Data Services / Assessment</option>
				<option value="other">Other / Administration</option>
			</select>
		</div>

		{#if error}
			<div class="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5">
				<svg class="mt-0.5 h-4 w-4 shrink-0 text-red-500" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
					<path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm-.75 4a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-1.5 0V5zm.75 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
				</svg>
				<p class="text-sm text-red-700">{error}</p>
			</div>
		{/if}

		<button
			onclick={submit}
			disabled={loading}
			class="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
		>
			{loading ? 'Starting…' : 'Start Workshop'}
		</button>
	</div>
</Modal>
