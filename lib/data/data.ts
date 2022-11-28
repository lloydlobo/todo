import { nanoid } from "nanoid";
import { Data, Task } from "../interfaces";

// https://beta.reactjs.org/learn/you-might-not-need-an-effect#challenges
let nextId = 0;

export function newTasks(count: number): Task[] {
    let tasks: Task[] = [];

    for (let i = 0; i < count; i++) {
        const uuid: string = nanoid();
        const id: number = nextId++;

        tasks.push({
            _id: uuid,
            completed: false,
            id: id,
            slug: `/task/${uuid}`,
            task: `Task ${id}`,
            uuid: uuid,
            // createdAt: new Date(),
            // updatedAt: new Date(),
        });
    }

    return tasks;
}

const data: Data = {
    tasks: newTasks(100),
};

export { data };
