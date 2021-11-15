import {BACKEND_URL} from "$lib/sirius_config";

const apiPath = "/api"

export function api(resource: string, request?: RequestInit, protocoll="http"): Promise<Response> {
	// user must have a cookie set
	// if (!request.locals.userid) {
	// 	return { status: 401 };
	// }		fetch("http://" + BACKEND_URL + "/api/survey", {

	return fetch(`${protocoll}://${BACKEND_URL}${apiPath}/${resource}`, {
		method: request.method || "GET",
		mode: request.mode || "cors",
		redirect: request.redirect || "follow",
		headers: request.headers || {
			"Content-Type": "application/json"
		},
		body: request.body
	});
}