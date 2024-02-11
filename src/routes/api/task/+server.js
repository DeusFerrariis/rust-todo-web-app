import { PRIVATE_TODO_API_URL } from '$env/static/private';
import { error } from '@sveltejs/kit';

export async function POST({ url }) {
	const content = url.searchParams.get('content') ?? '';

	if (content == '') {
		error(400, 'content cant be empty');
	}

  const response = await fetch(
    `${PRIVATE_TODO_API_URL}/task`,
    {
      method: "POST",
      body: JSON.stringify({content: content})
    }
  );

  if (!response.ok) {
		error(500, 'error');
  }

  let data = await response.json();

	return new Response(JSON.stringify({
    id: data.id,
    content,
  }));
}
