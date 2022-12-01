import { useQuery } from "@tanstack/react-query";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRouter, useRouter } from "next/router";
import { z } from "zod";
import { DivderPill, Layout } from "../../components";
import { TodoCard } from "../../components/todos";
import { fetchTodos } from "../../lib/api";
import { TodosPlaceholder } from "../../lib/interfaces";

export function validateString(router: NextRouter): string {
    let todoID = "";
    const schemaString = z.string();
    const str = schemaString.safeParse(router.query?.id);

    if (!str.success) {
        const fmtResult = str.error.format();
        console.error(fmtResult);
    } else {
        todoID = router.query?.id as string;
    }

    return todoID;
}

// TODO: https://prateeksurana.me/blog/mastering-data-fetching-with-react-query-and-next-js/#fetching-data-on-the-server
export default function Todo(req: NextApiRequest, res: NextApiResponse) {
    const router = useRouter();
    const todoID = typeof router.query?.id === "string" ? router.query.id : "";

    const {
        isSuccess,
        data: todo,
        isLoading,
        isError,
    } = useQuery(
        ["getTodo", todoID],
        () => fetchTodos<TodosPlaceholder>(todoID),
        { enabled: todoID.length > 0 }
    );

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>We couldn&apos;t find your todo </div>;
    return !isSuccess ? (
        <></>
    ) : (
        <Layout title={todoID}>
            <section title="todo">
                <header>
                    <div className="grid items-center justify-center pt-10 text-center">
                        <h1 className="mb-3">{todo.title}</h1>
                        <div className="btn tag w-fit place-self-center font-display">
                            {todo.completed ? "Done" : "Todo"}
                        </div>
                    </div>
                </header>
                <DivderPill />
                <TodoCard todo={todo} />
            </section>

            <section title="history">
                <div className="grid place-content-center">
                    <header>
                        <h3 className="text-4xl tracking-tight text-center uppercase">
                            History
                        </h3>
                        <DivderPill className="from-yellow-500 to-pink-500" />
                    </header>
                    {/* <div className="">
                        <div className="flex w-40 h-40 p-6 mx-2 bg-black border-b-4 rounded-lg aspect-square border-gray6 bg-opacity-30 shadow-3xl">
                            Lorem ipsum dolor sit amet consectetur.
                        </div>
                        <DivderPill className="from-blue-500 to-blue-400" />
                    </div> */}

                    <div className="grid-list">
                        <div className="flex w-40 h-40 p-6 mx-2 bg-black border-b-4 rounded-lg aspect-square border-gray6 bg-opacity-30 shadow-3xl">
                            <div className="text-center list">
                                <h4 className="my-0">Jan - Mar</h4>
                                <ul className="[&>*]:list-disc">
                                    <li className="list-disc">{todo.id}</li>
                                    <li>{todo.id}</li>
                                    <li>{todo.id}</li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex w-40 h-40 p-6 mx-2 bg-black border-b-4 rounded-lg aspect-square border-gray6 bg-opacity-30 shadow-3xl">
                            <div className="text-center list">
                                <h4 className="my-0">Apr - Jun</h4>
                                <ul className="[&>*]:list-disc">
                                    <li className="list-disc">{todo.id}</li>
                                    <li>{todo.id}</li>
                                    <li>{todo.id}</li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex w-40 h-40 p-6 mx-2 bg-black border-b-4 rounded-lg aspect-square border-gray6 bg-opacity-30 shadow-3xl">
                            <div className="text-center list">
                                <h4 className="my-0">Jul - Sep</h4>
                                <ul className="[&>*]:list-disc">
                                    <li className="list-disc">{todo.id}</li>
                                    <li>{todo.id}</li>
                                    <li>{todo.id}</li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex w-40 h-40 p-6 mx-2 bg-black border-b-4 rounded-lg aspect-square border-gray6 bg-opacity-30 shadow-3xl">
                            <div className="text-center list">
                                <h4 className="my-0">Oct - Dec</h4>
                                <ul className="[&>*]:list-disc">
                                    <li className="list-disc">{todo.id}</li>
                                    <li>{todo.id}</li>
                                    <li>{todo.id}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
