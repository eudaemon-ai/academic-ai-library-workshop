import { marked } from 'marked';

// Configure marked with GitHub-flavored markdown defaults.
// Used for rendering exercise body and step content.
marked.setOptions({
	gfm: true,
	breaks: false
});

export function renderMarkdown(src: string): string {
	return marked.parse(src, { async: false }) as string;
}

// For fields rendered inside an existing block element (list items, the
// reflection prompt). parseInline omits the wrapping <p>, which would
// otherwise nest invalidly.
export function renderMarkdownInline(src: string): string {
	return marked.parseInline(src, { async: false }) as string;
}
