<script lang="ts">
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>Pick Your AI Tool — Research with AI</title>
</svelte:head>

<div class="mx-auto max-w-3xl px-6 py-14">
	<a href="{base}/" class="mb-10 inline-flex items-center gap-1.5 text-sm text-jhu-blue/60 transition-colors hover:text-jhu-blue">
		← Back to workshop
	</a>

	<div class="mb-12">
		<p class="mb-3 text-xs font-medium uppercase tracking-wider text-jhu-blue/50">Before you begin</p>
		<h1 class="font-serif text-4xl font-bold leading-tight tracking-tight text-jhu-blue">Pick your AI tool</h1>
		<p class="mt-5 text-[1.0625rem] leading-relaxed text-gray-500">
			This course works in ChatGPT, Claude, Gemini, or Microsoft 365 Copilot. Use the one your library has chosen for the workshop. You need chat, file upload, and—for Module 2—web search or a longer-running research mode.
		</p>
		<div class="mt-7 h-px w-10 bg-jhu-gold"></div>
	</div>

	<section class="mb-12">
		<h2 class="mb-5 font-serif text-2xl font-bold text-jhu-blue">Shared capability map</h2>
		<div class="overflow-x-auto rounded-xl border border-slate-200 bg-white">
			<table class="w-full text-left text-sm">
				<thead class="border-b border-slate-200 bg-slate-50 text-gray-700">
					<tr><th class="p-4">Course term</th><th class="p-4">What to look for</th></tr>
				</thead>
				<tbody class="divide-y divide-slate-100 text-gray-600">
					<tr><td class="p-4 font-medium text-gray-800">Project or notebook</td><td class="p-4">A persistent space for chats, files, and instructions</td></tr>
					<tr><td class="p-4 font-medium text-gray-800">Standing brief</td><td class="p-4">Project instructions, notebook instructions, knowledge, or an uploaded file</td></tr>
					<tr><td class="p-4 font-medium text-gray-800">Quick web search</td><td class="p-4">A current answer with links for a narrow fact</td></tr>
					<tr><td class="p-4 font-medium text-gray-800">Research mode</td><td class="p-4">A multi-step search with a plan, activity view, or cited report</td></tr>
					<tr><td class="p-4 font-medium text-gray-800">Connected source</td><td class="p-4">Optional access to drives, email, or organizational content</td></tr>
				</tbody>
			</table>
		</div>
	</section>

	<section class="mb-12">
		<h2 class="mb-5 font-serif text-2xl font-bold text-jhu-blue">The five checks before every task</h2>
		<ol class="space-y-4 text-sm leading-relaxed text-gray-600">
			<li><span class="font-semibold text-jhu-blue">1. Purpose:</span> What research decision or deliverable will this support?</li>
			<li><span class="font-semibold text-jhu-blue">2. Data:</span> Is every file de-identified, necessary, and approved for this system?</li>
			<li><span class="font-semibold text-jhu-blue">3. Sources:</span> Can the tool use uploads, the web, or connected services? Which are actually needed?</li>
			<li><span class="font-semibold text-jhu-blue">4. Review:</span> Who will verify citations, calculations, search syntax, and claims?</li>
			<li><span class="font-semibold text-jhu-blue">5. Closure:</span> What will be exported, retained, disconnected, or deleted?</li>
		</ol>
	</section>

	<div class="mb-12 rounded-xl border border-jhu-spirit/30 bg-jhu-spirit/5 px-7 py-6">
		<p class="text-sm leading-relaxed text-gray-600">
			<span class="font-semibold text-jhu-blue">Never use real patron data in these exercises.</span>
			The workshop files are simulated and de-identified. Keep email, drives, calendars, and institutional repositories disconnected unless your facilitator confirms an approved training environment.
		</p>
	</div>

	<section class="mb-12">
		<h2 class="mb-4 font-serif text-2xl font-bold text-jhu-blue">Current feature guides</h2>
		<ul class="space-y-3 text-sm text-gray-600">
			<li><a class="text-jhu-blue underline" href="https://help.openai.com/en/articles/10500283-research-faq" target="_blank" rel="noopener noreferrer">ChatGPT deep research</a></li>
			<li><a class="text-jhu-blue underline" href="https://support.claude.com/en/articles/11088861-use-research-on-claude" target="_blank" rel="noopener noreferrer">Claude Research</a></li>
			<li><a class="text-jhu-blue underline" href="https://support.google.com/gemini/answer/15719111?hl=en" target="_blank" rel="noopener noreferrer">Gemini Deep Research</a></li>
			<li><a class="text-jhu-blue underline" href="https://support.microsoft.com/en-us/microsoft-365-copilot/use-researcher-in-microsoft-365-copilot-notebooks" target="_blank" rel="noopener noreferrer">Researcher in Microsoft 365 Copilot Notebooks</a></li>
		</ul>
	</section>

	<div class="text-center">
		<a href="{base}/" class="inline-flex items-center gap-2 rounded-full bg-jhu-blue px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-jhu-blue/90">
			I'm ready — take me to the modules →
		</a>
	</div>
</div>
