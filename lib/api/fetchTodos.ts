export async function fetchTodos<T>(id?: number | string): Promise<T> {
    let baseURL = `https://jsonplaceholder.typicode.com/todos`
    const pathInputURL = id ? `${baseURL}/${id}` : baseURL

    const response = await fetch(pathInputURL);
    const json = await response.json();

    return json
}