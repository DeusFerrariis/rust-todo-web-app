import { PUBLIC_TODO_API_URL } from '$env/static/public';

const URL = "https://6q61usb552.execute-api.us-east-1.amazonaws.com/dev/api";

async function newTask(content, onerr) {
  const response = await fetch(
    `${URL}/task`,
    {
      method: "POST",
      body: JSON.stringify({content: content})
    }
  );

  if (!response.ok) {
    onerr();
    return;
  }

  let data = await response.json();

  return {
    id: data.id,
    content,
  }
}

async function closeTask(id) {
  const response = await fetch(
    `${URL}/task/${id}/complete`,
    {
      method: "PUT",
    }
  );
  return response.ok;
}

export async function load({ fetch, params }) {
    let id = params.slug;

    let tasks = [];
    const response = await fetch(
        `${URL}/tasks`,
    );


    const data = await response.json();

    return {
        tasks: data,
        newTask,
        closeTask,
    }
}
