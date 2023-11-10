import type { RequestHandler } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";

export const GET: RequestHandler = async () => {
	const res = await fetch(`${env.HASS_URI}/services/light/toggle`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${env.HASS_TOKEN}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			entity_id: env.HASS_ENTITY_ID,
		}),
	});

	if (res.ok) {
		const data = await res.json();
		const enabled = data[0].state == "on";
		return new Response(JSON.stringify(enabled), { status: 200 });
	}

	return new Response(JSON.stringify(null), { status: res.status });
};
