import { PRIVATE_TODO_API_URL } from '$env/static/private';
import { error } from '@sveltejs/kit';

export async function PUT({ url, fetch }) {
  const id = url.searchParams.get('id') ?? '';

	if (id == '') {
		error(400, 'id cant be empty');
	}

  const response = await fetch(
    `${PRIVATE_TODO_API_URL}/task/${id}/complete`,
    {
      method: "PUT",
    }
  );

	return new Response(response.ok);
}
