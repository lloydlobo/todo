import _ from "lodash";
import { Task } from "../interfaces";

export function setNextId(tasks: Task[], nextId: number): void {
    const tasksDeepCopy = _.cloneDeep(tasks);
    const tasksSorted = _.sortBy(tasksDeepCopy, ["id"]);
    const lastId = tasksSorted[tasksSorted.length - 1].id;
    nextId = lastId;
}
