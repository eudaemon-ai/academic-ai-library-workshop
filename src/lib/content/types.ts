export type StepType = 'workspace' | 'prompt' | 'observe' | 'reflect';

export interface Step {
	index: number;
	label: string;
	type: StepType;
	instruction: string;
	prompt_text?: string;
	checkpoint?: string;
	facilitator_note?: string;
	reflection_prompt?: string;
	observe_items?: string[];
}

export interface ExerciseMeta {
	id: string;
	title: string;
	estimated_minutes: number;
	step_count?: number;
}

export interface Exercise extends ExerciseMeta {
	discovery_moment: boolean;
	steps: Step[];
	body: string; // rendered HTML
}

export interface ModuleMeta {
	id: string;
	title: string;
	tagline: string;
	icon: string;
	estimated_minutes: number;
	role_tags: string[];
	exercises: ExerciseMeta[];
}

export interface Module extends ModuleMeta {
	exercises: Exercise[];
	body: string; // rendered HTML
}

// Progress/cohort types used across routes

export interface StepKey {
	moduleId: string;
	exerciseId: string;
	stepIndex: number;
}

export interface LearnerSummary {
	id: string;
	name: string;
	role: string;
	cohort: string;
	lastSeen: string;
	completedSteps: StepKey[];
}
