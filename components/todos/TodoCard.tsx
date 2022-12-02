import { Todo } from "../../lib/interfaces";
import { validateTodo } from "../../lib/schemas/validate";

/**
 * TodoCard
 *
 * @param {Todo} todo
 * @returns {JSX.Element}
 */
export function TodoCard({ todo }: { todo: Todo }): JSX.Element {
  if (!validateTodo(todo)) {
    return <>Something went wrong!</>;
  } else {
    const { userId, id, title, completed } = todo;
    return (
      <>
        <div className="mx-auto grid min-h-[50vh]">
          <ul className="grid items-center justify-center mx-auto list box place-self-center">
            <li>{userId}</li>
            <li>{id}</li>
            <li>{title}</li>
            <li className="tag">{completed ? "Done" : "Todo"}</li>
          </ul>
        </div>
      </>
    );
  }
}
