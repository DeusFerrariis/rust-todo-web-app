export async function load({ fetch, params }) {
    let id = params.slug;

    let tasks = [];
    const response = await fetch(
        `/api/tasks`,
    );


    const data = await response.json();

    return {
        tasks: data,
    }
}
