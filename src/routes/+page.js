async function newTask(content, onerr) {
  const response = await fetch(
    `/api/task?content=${content}`,
    { method: "POST" },
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
    `/api/task/complete?id=${id}`,
    {
      method: "PUT",
    }
  );
  return response.ok;
}

export async function load({ fetch, params }) {
    let tasks = [];
    const response = await fetch('/api/tasks');

    if (!response.ok) {
      console.log("failed to load /api/tasks");
    } else {
      tasks = (await response.json()).tasks;
    }

    return {
        newTask,
        closeTask,
        tasks,
    }
}
