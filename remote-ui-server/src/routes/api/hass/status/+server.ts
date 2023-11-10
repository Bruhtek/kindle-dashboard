import type { RequestHandler } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";

export const GET: RequestHandler = async () => {
	const res = await fetch(`${env.HASS_URI}/states/${env.HASS_ENTITY_ID}`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${env.HASS_TOKEN}`,
			"Content-Type": "application/json",
		},
	});

	if (res.ok) {
		const data = await res.json();
		const enabled = data.state == "on";
		return new Response(JSON.stringify(enabled), { status: 200 });
	}

	return new Response(JSON.stringify(null), { status: res.status });
};
