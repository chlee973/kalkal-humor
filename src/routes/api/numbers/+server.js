/** @type {import('./$types').RequestHandler} */
export async function GET({ fetch, url }) {
	const minutes = url.searchParams.get('minutes');
	const response = await fetch(`http://numbersapi.com/${minutes}/math?json`);
	const data = await response.json();
	return new Response(JSON.stringify(data));
}
