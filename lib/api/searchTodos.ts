import { TodosPlaceholder } from "../interfaces/todos";
import { fetchTodos } from "./fetchTodos";

export async function searchTodos(searchValue: string) {
    const todos = await fetchTodos<TodosPlaceholder[]>();
    const filteredTodos = todos.filter((todo) =>
        todo.title.includes(searchValue)
    );
    return filteredTodos;
}