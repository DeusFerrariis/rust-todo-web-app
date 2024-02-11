import { PRIVATE_TODO_API_URL } from '$env/static/private';
import { error } from '@sveltejs/kit';

export async function GET({ url, fetch }) {
  let tasks = [];

  const response = await fetch(
      `${PRIVATE_TODO_API_URL}/tasks`,
  ).catch(e => {
		error(500, 'could not load tasks');
  });

  const data = await response.json();

	return new Response(JSON.stringify({
    tasks: data,
  }));
}
