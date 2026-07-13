import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types.js';
import { createLearner, updateLearnerName } from '$lib/db/queries.js';

export const prerender = false;
import { v4 as uuidv4 } from 'uuid';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { name, role } = await request.json();

	if (!name || typeof name !== 'string' || name.trim().length === 0) {
		return json({ error: 'name is required' }, { status: 400 });
	}

	const id = uuidv4();
	const cohort = process.env.PUBLIC_COHORT ?? 'default';
	const validRole = ['reference', 'liaison', 'systematic_review', 'scholarly_communication', 'data', 'other'].includes(role)
		? role
		: 'other';

	await createLearner({ id, name: name.trim(), role: validRole, cohort });

	cookies.set('wid', id, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		maxAge: 60 * 60 * 24 // 24 hours
	});

	return json({ learnerId: id });
};

export const PATCH: RequestHandler = async ({ request, cookies }) => {
	const learnerId = cookies.get('wid');
	if (!learnerId) return json({ error: 'no session' }, { status: 401 });

	const { name } = await request.json();
	if (!name || typeof name !== 'string' || !name.trim()) {
		return json({ error: 'name is required' }, { status: 400 });
	}

	await updateLearnerName(learnerId, name.trim());
	return json({ ok: true });
};
