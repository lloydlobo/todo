import Link from "next/link";
import { SearchIcon } from ".";
import { Todo } from "../../lib/interfaces";

export function TodoSearchResult({ todos }: { todos: Todo[] }) {
  return (
    <>
      {todos.length ? (
        <div className="absolute left-0 right-0 -top-10 grid rounded-t-3xl bg-gray7 pb-[4px] pt-11">
          {todos.map((todo, index) => {
            {
              if (index < 10) {
                return (
                  <Link
                    href={`/todos/${todo.id}`}
                    key={`${index}-${todo.id}`}
                    className="cursor-default"
                  >
                    <div className="py-0 hover:bg-gray6/70">
                      <div title="search-icon-result-space" className="px-5">
                        <div className="inline-flex items-center space-x-4 ">
                          <SearchIcon className="h-3 w-4 shrink-0 stroke-[4px] opacity-60" />
                          <div className="todo-title leading-tight">
                            {todo.title}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              }
            }
          })}

          <div className="grid grid-flow-col justify-center gap-4 pt-5 pb-9">
            <button className="btn btn-glow">Recent</button>
            <button className="btn btn-glow">View All</button>
          </div>
        </div>
      ) : (
        <div>No todos found</div>
      )}
    </>
  );
}
