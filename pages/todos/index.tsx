import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AddTodo, Layout } from "../../components";
import { ENDPOINT } from "../../lib/constants";
import { Todos } from "../../lib/interfaces";

export function fetcher(urlToken: string): Promise<Todos[]> {
  return fetch(`${ENDPOINT}/${urlToken}`).then((res) => res.json());
}

// To avoid CORS error, update go fiber or similar backend server.
export default function TodosPage() {
  const token = "api/todos";
  const {
    isLoading,
    error,
    isSuccess,
    // useMutation,
    data: todos,
  } = useQuery(["serverData"], () => fetcher(token)); //// { enabled: true }

  // https://tanstack.com/query/v4/docs/quick-start
  // Access the client
  const queryClient = useQueryClient();
  const mutation = useMutation({
    onSuccess: () => {
      // Invalidate and refetch.
      queryClient.invalidateQueries({ queryKey: ["serverData"] });
    },
  });

  if (isLoading) return "Loading...";
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

            <AddTodo mutation={mutation} />

            {todos.length ? (
              <TodoList todos={todos} />
            ) : (
              <p className="text-center">No todos found</p>
            )}
          </section>
        </div>
      </Layout>
    );
}
export function TodoList({ todos }: { todos: Todos[] }) {
  return (
    <>
      <div className="grid divide-y-[1px] divide-gray4/30 transition-all">
        {todos.map((todo) => (
          <TodoItem
            key={`${todo.id}-${todo.title}`}
            todo={todo}
            className="p-2 transition-all hover:bg-gray6"
          />
        ))}
      </div>
    </>
  );
}

export function TodoItem({
  todo,
  className,
}: {
  todo: Todos;
  className?: string;
}) {
  return (
    <div className={`${className}`}>
      <div className="flex items-start gap-x-4">
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
          <div className="my-0 tag w-fit">list-{todo.userId}</div>
        </div>
      </div>
    </div>
  );
}
