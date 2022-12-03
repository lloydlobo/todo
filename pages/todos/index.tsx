import useSWR, { KeyedMutator } from "swr";
import { AddTodo, Layout } from "../../components";
import { fetcher } from "../../lib/api";
import { TOKEN } from "../../lib/constants";
import { Todo, Todos } from "../../lib/interfaces";
import { validateTodos } from "../../lib/schemas/validate";

// To avoid CORS error, update go fiber or similar backend server.
export default function TodosPage() {
  const { data, mutate, error } = useSWR<Todo[]>(TOKEN, fetcher);
  if (typeof data !== "undefined") {
    if (!validateTodos(data)) return <>Something went wrong!</>;
    if (error) return "An error has occured: " + error.message;
    return getJSXElement(data, mutate);
  }
  return <>Data is undefined</>;
}

function getJSXElement(
  todos: Todos,
  mutate: KeyedMutator<Todo[]>
): JSX.Element {
  return (
    <Layout title="Todos app">
      <div className="grid max-w-3xl px-8 mx-auto">
        <section>
          <header>
            <h1 className="text-purple-400">Disney agenda</h1>
          </header>

          <AddTodo mutate={mutate} />

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

export function TodoList({ todos }: { todos: Todo[] }) {
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
  todo: Todo;
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

//// const { isLoading, error, isSuccess, data } = useQuery(["serverData"], () => ////   fetcher(token) //// );
//// if (isLoading) return "Loading...";
//// if (isSuccess) return getJSXElement(data);
