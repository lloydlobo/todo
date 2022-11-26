import { nanoid } from "nanoid";
import { Data } from "../interfaces";

// https://beta.reactjs.org/learn/you-might-not-need-an-effect#challenges
let nextId = 0;

const data: Data = {
    tasks: [
        {
            _id: nanoid(),
            id: nextId++,
            uuid: nanoid(),
            task: "task1",
            completed: true,
        },
        {
            _id: nanoid(),
            id: nextId++,
            uuid: nanoid(),
            task: "task2",
            completed: false,
        },
    ],
};

export { data };
