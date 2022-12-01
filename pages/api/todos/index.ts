import { NextApiRequest, NextApiResponse } from "next";
import { fetchTodos } from "../../../lib/api";
import { TodosPlaceholder } from "../../../lib/interfaces";


// 200 todos.
// https://jsonplaceholder.typicode.com/

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const todos = await fetchTodos<TodosPlaceholder>()

    res.status(200).json({
        status: 200,
        message: 'Todos fetched successfully',
        data: todos,
    })
}