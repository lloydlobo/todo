import { StoreActionsType } from "./interfaces";

export const URL_API = "http://localhost:3000/api/task";
export const COOKIE_STORE_TASKS = "storeTasks";
export const STORE_ACTIONS: StoreActionsType = {
    AddTasks: "STORE_ADD_TASKS",
    RemoveTasks: "STORE_REMOVE_TASKS",
    Reset: "STORE_RESET",
};
