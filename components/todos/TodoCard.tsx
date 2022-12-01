import { TodosPlaceholder } from "../../lib/interfaces";

export function TodoCard({ todo }: { todo: TodosPlaceholder }) {
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
