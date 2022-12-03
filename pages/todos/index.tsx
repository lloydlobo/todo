import { Box, CheckIcon, List, ThemeIcon } from "@mantine/core";
import { FormEvent } from "react";
import useSWR, { KeyedMutator } from "swr";
import { AddTodo, Layout } from "../../components";
import { fetcher } from "../../lib/api";
import { ENDPOINT, TOKEN } from "../../lib/constants";
import { Todo, Todos } from "../../lib/interfaces";
import { SchemaTodo, SchemaTodos } from "../../lib/schemas";
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
      <div className="mx-auto grid max-w-3xl px-8">
        <section>
          <header>
            <div className="mb-4 flex w-full items-center">
              <h1 className="my-0 flex-1 items-center text-purple-400">
                Disney agenda
              </h1>
              <AddTodo mutate={mutate} />
            </div>
          </header>

          {todos.length ? (
            <TodoList todos={todos} mutate={mutate} />
          ) : (
            <p className="text-center">No todos found</p>
          )}
        </section>
      </div>
    </Layout>
  );
}

// FIXME: text-current resets to sans-serif.!!!

export function TodoList({
  todos,
  mutate,
}: {
  todos: Todo[];
  mutate: KeyedMutator<Todo[]>;
}) {
  const markToDoAsDone = async (
    e: FormEvent<HTMLLIElement>,
    id: Todo["id"]
  ) => {
    e.preventDefault();
    let isDone = false;

    const updated = await fetch(
      `${ENDPOINT}/${TOKEN}/${id}/${isDone ? "completed" : "pending"}`,
      {
        method: "PATCH",
      }
    ).then((response) => response.json());

    const gotTodos = SchemaTodos.safeParse(updated);
    if (!gotTodos.success) return console.error(gotTodos.error);

    mutate(gotTodos.data);
  };

  return (
    <>
      {/* <div className="grid divide-y-[1px] divide-gray4/30 transition-all"> */}
      <Box
        sx={(thing) => ({
          padding: "2rem",
          width: "100%",
          maxWidth: "40rem",
          margin: "0 auto",
        })}
      >
        <List
          spacing="xs"
          size="sm"
          mb="12"
          center
          className="divide-y-[1px] divide-gray4/30"
        >
          {todos.map((todo) => (
            <List.Item
              // onClick={() => markToDoAsDone(todo.id)}
              onChange={(e) => markToDoAsDone(e, todo.id)}
              defaultChecked={todo.completed}
              key={`todo__list__${todo.id}`}
              icon={
                todo.completed ? (
                  <ThemeIcon color={"teal"} size={16} radius="xl">
                    <CheckIcon className="h-4" />
                  </ThemeIcon>
                ) : (
                  <ThemeIcon color={"gray"} size={16} radius="xl">
                    <CheckIcon className="h-2" />
                  </ThemeIcon>
                )
              }
            >
              <TodoItem
                todo={todo}
                className="p-2 text-gray2 transition-all hover:bg-gray6 dark:text-gray7"
              />
            </List.Item>
          ))}
        </List>
      </Box>
      {/* </div> */}
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
        <div className="grid w-full">
          <h2 className="my-0 text-sm">{todo.title}</h2>
          <div className="flex w-full">
            <p className="my-0 mr-auto flex-1 text-sm">{todo.body}</p>
            <div className="tag  my-0 ">list-{todo.userId}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

//// const { isLoading, error, isSuccess, data } = useQuery(["serverData"], () => ////   fetcher(token) //// );
//// if (isLoading) return "Loading...";
//// if (isSuccess) return getJSXElement(data);
