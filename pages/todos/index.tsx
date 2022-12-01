import { useQuery } from "@tanstack/react-query";
import { Layout } from "../../components";

import Search from "../../components/shared/Search";
import { TodosPlaceholder } from "../../lib/interfaces";

export const ENDPOINT = "http://localhost:8080";

export const fetcher = (urlToken: string): Promise<TodosPlaceholder[]> =>
    fetch(`${ENDPOINT}/${urlToken}`).then((res) => res.json());

export default function TodosPage() {
    const token = "api/todos";
    const {
        isLoading,
        error,
        isSuccess,
        data: todos,
    } = useQuery(["serverData"], () => fetcher(token)); //// { enabled: true }

    if (isLoading) return "Loading...";
    // To avoid CORS error, update go fiber or similar backend server.
    if (error)
        return "An error has occured: " + (error as unknown as any).message;

    if (isSuccess)
        return (
            <Layout title="Todos app">
                <div className="grid max-w-3xl px-8 mx-auto">
                    <section>
                        <header>
                            <h1 className="text-purple-400">Disney agenda</h1>
                        </header>

                        {todos.length ? (
                            <div className="grid divide-y-[1px] divide-gray4/30 transition-all">
                                {todos.map((todo) => (
                                    <TodoItem
                                        key={`${todo.id}-${todo.title}`}
                                        todo={todo}
                                        className="p-2 transition-all hover:bg-gray6"
                                    />
                                ))}
                            </div>
                        ) : (
                            <p>No todos found</p>
                        )}
                    </section>
                    <section>
                        <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </section>
                </div>
            </Layout>
        );
}

export function TodoItem({
    todo,
    className,
}: {
    todo: TodosPlaceholder;
    className?: string;
}) {
    return (
        <div className={`${className}`}>
            <div className="flex items-start gap-4">
                <input
                    type="checkbox"
                    defaultChecked={todo.completed}
                    className="my-1"
                    onChange={(e) => {
                        alert(e.target.checked ? "true" : "false");
                    }}
                />

                <div className="grid">
                    <h2 className="my-0 text-lg">{todo.title}</h2>
                    <p className="my-0 text-sm">{todo.body}</p>

                    <div
                        title="project-list-category"
                        className="my-0 tag w-fit"
                    >
                        list-{todo.userId}
                    </div>
                </div>
            </div>
        </div>
    );
}
