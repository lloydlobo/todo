export async function fetchTask(id: string) {
    const API_URL = `http://localhost:3000/api/task`
    // const res = await fetch(`${API_URL}/${id}`)
    const res = await fetch(`${API_URL}`)
    const { data } = await res.json()
    console.log(data[id])
    return data[id]
}