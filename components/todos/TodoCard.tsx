import { Todos } from "../../lib/interfaces";

export function TodoCard({ todo }: { todo: Todos }) {
    const { userId, id, title, completed } = todo;

    return (
        <>
            <div className="mx-auto grid min-h-[50vh]">
                <ul className="list box mx-auto grid items-center justify-center place-self-center">
                    <li>{userId}</li>
                    <li>{id}</li>
                    <li>{title}</li>
                    <li className="tag">{completed ? "Done" : "Todo"}</li>
                </ul>
            </div>
        </>
    );
}
