import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import classNames from "classnames";
import * as A from "fp-ts/Array";
import { pipe } from "fp-ts/function";
import React, { ReactNode, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

import { URL_API } from "../lib/constants";
import { Counter } from "../lib/Counter";
import { brand } from "../lib/data/brand";
import { Inputs, Task, TaskUpdate } from "../lib/interfaces";
// import styles from "../styles/Home.module.css";

// If i were to start in with fp-ts in TypeScript : RyanDavisDev
// Gets rid of all mutable variables, for loop.
// Abstracted details of iteration into map, reduce.
// Problem is to specify types in all operations.
// Manually carried through the array we want to operate on.
// We want to compose operation together so plumbing operates automatically.
function functionalizeSomething(
    arr1: Array<number>,
    arr2: Array<number>
): number {
    const zipped = A.zip(arr2)(arr1);
    // Specify data in anon func, before feeding in zipped array.
    const maxxed = A.map((pair: Array<number>) => Math.max(...pair))(zipped);
    // Sum up all max values. To subdue error of unknown types, specify number.
    // Feed in what you want to operate on at the end.
    const total = A.reduce(0, (a: number, b: number) => a + b)(maxxed);

    return total;
}

// Operating on arr1.
// Do not feed the second operation wha twe are operating on i.e. arr1.
function composeSomething(arr1: Array<number>, arr2: Array<number>): number {
    return pipe(
        arr1,
        A.zip(arr2),
        A.map((pair) => Math.max(...pair)),
        A.reduce(0, (a, b) => a + b)
    );
}

// https://github.com/react-hook-form/resolvers#zod
// https://zod.dev/?id=form-integrations
const schema = z.object({
    name: z.string().min(1, { message: "Required" }),
    age: z.number().min(10),
});
// https://github.com/gcanti/fp-ts

export function MainSection({
    tasks,
    handleNewItem,
    handleUpdateTask,
    handleDeleteTasks,
}: any) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        // https://github.com/react-hook-form/resolvers
        resolver: zodResolver(schema),
    });
    ////   const [tasks, setTasks] = useState(props.tasks);
    const [taskInput, setTaskInput] = useState<Task | any>({ task: "" });
    return (
        // <div className={styles.main}>
        <div className={""}>
            <div className="card">
                <div className="form">
                    <div className="form-input grid w-full place-content-center gap-4">
                        <h1 className="place-self-center text-center text-[5rem] font-bold">
                            {brand.name}
                        </h1>
                        <div role="form">
                            <div className="flex flex-col items-center place-self-center sm:flex-row">
                                <InputShell>
                                    <TaskTextInput
                                        placeholder="What needs to be done"
                                        initial={""}
                                        onSubmit={handleNewItem}
                                    />
                                </InputShell>
                                <div className="relative hidden scale-90 opacity-90 hover:opacity-100">
                                    <ButtonShell>
                                        <button type="button">
                                            {taskInput._id ? "Update" : "Add"}
                                        </button>
                                    </ButtonShell>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section>
                {/* Counter useReducer */}
                {/* <Counter /> */}
                <header>
                    <h2 className="sr-only">Tasks List</h2>
                </header>
                <div className="card">
                    {tasks.length ? (
                        <div className="flex flex-col items-center justify-center gap-4 rounded-lg p-4 shadow-lg ">
                            <TasksList
                                tasks={tasks}
                                onUpdateTask={handleUpdateTask}
                                onDeleteTasks={() => handleDeleteTasks}
                            />
                        </div>
                    ) : (
                        <div className="hidden flex-col items-center justify-center rounded-lg border-2 p-4 shadow-lg ">
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    axios.get(URL_API).then((res) => {
                                        //// setTasks(res.data);
                                    });
                                }}
                            >
                                Create Task
                            </button>
                        </div>
                    )}
                    <TaskListFooter
                        active={0}
                        completed={0}
                        currentFilter={""}
                        onFilter={function (filter: string): void {
                            throw new Error("Function not implemented.");
                        }}
                        onDeleteCompleted={function (): void {
                            throw new Error("Function not implemented.");
                        }}
                    />
                </div>
            </section>
            <section className="footer"></section>
        </div>
    );
}

export function TasksList({
    tasks,
    onUpdateTask,
    onDeleteTasks,
}: {
    tasks: Task[];
    onUpdateTask: (update: TaskUpdate) => void;
    onDeleteTasks: (_id: number | Pick<Task, "_id">["_id"]) => void;
}) {
    return (
        <ul>
            {" "}
            {tasks.map((task) => (
                <TaskItem
                    task={task}
                    key={task._id}
                    onUpdate={(update) => onUpdateTask(update)}
                    onDelete={() => onDeleteTasks(task._id)}
                />
            ))}{" "}
        </ul>
    );
}

// https://github.com/rocicorp/replicache-vercel-template/blob/main/src/components/todo-item.tsx.
export function TaskItem({
    task,
    onUpdate,
    onDelete,
}: {
    task: Task;
    onUpdate: (update: TaskUpdate) => void;
    onDelete: () => void;
}) {
    const { _id } = task;
    const [editing, setEditing] = useState(false);

    const handleDoubleClick = () => {
        setEditing(true);
    };
    const handleSave = (text: string) => {
        text.length === 0 ? onDelete() : onUpdate({ _id: _id, task: text });
        setEditing(false);
    };
    const handleTaskCompleted = () =>
        onUpdate({ _id, completed: !task.completed });

    let element;
    element = editing ? (
        <>
            TextInput
            <TaskTextInput
                initial={task.task}
                onBlur={handleSave}
                onSubmit={handleSave}
            />
        </>
    ) : (
        <div className="view w-[60vw]  cursor-pointer place-self-stretch">
            {/* prettier-ignore */}
            <div className="flex w-full gap-2 px-4 border rounded-full border-neutral-800 hover:bg-sky-500/90 ">
        {/* TODO: change handleTaskCompleted or look at todo-item handleToggleCompleted!!! */}
        <input checked={task.completed} onChange={handleTaskCompleted} className="toggle" type="checkbox" id="toggle" />
        <label onDoubleClick={handleDoubleClick} htmlFor="toggle" className="label" >
          {task.task}
        </label>
        <button onClick={() => onDelete()} type="button" title="destroy" className="destroy" aria-label="destroy" />
      </div>
        </div>
    );

    return (
        <li className={classNames({ completed: task.completed, editing })}>
            {element}
        </li>
    );
}

export const TaskTextInput = ({
    initial,
    placeholder,
    onBlur,
    onSubmit,
}: {
    initial: Task["task"];
    placeholder?: string;
    onBlur?: (text: Task["task"]) => void;
    onSubmit: (text: Task["task"]) => void;
}) => {
    const [textInput, setTextInput] = useState<Task["task"]>(initial);
    const ref = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSubmit(textInput);
            setTextInput("");
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextInput(e.target.value);
    };
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (onBlur) onBlur(textInput);
    };
    const style =
        "min-w-36 peer h-10 w-full rounded-lg bg-black/90 px-2 text-gray-200 placeholder-transparent ring-2 ring-gray-500 focus:border-rose-600 focus:outline-none focus:ring-sky-600";
    return (
        <>
            <input
                ref={ref}
                className={`${style} ${classNames({
                    edit: initial !== "",
                    "new-task": initial == "",
                })}`}
                type="text"
                placeholder={placeholder}
                autoFocus={true}
                value={textInput}
                onBlur={handleBlur}
                onChange={handleChange}
                onKeyDown={handleSubmit}
            />
            <label
                htmlFor="username"
                className="bg-inherit text-gray-500 peer-placeholder-shown:text-gray-500 peer-focus:text-sky-600 pointer-events-none absolute left-0 -top-3 mx-1 cursor-text px-1 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-sm"
            >
                {placeholder}
            </label>
        </>
    );
};

export function FilterLink({
    onClick,
    selected,
    children,
}: {
    onClick: () => void;
    selected: boolean;
    children: ReactNode;
}) {
    return (
        <>
            <a
                className={`cursor-pointer ${classNames({ selected })}`}
                onClick={() => onClick()}
            >
                {children}
            </a>
        </>
    );
}
export function TaskListFooter({
    active,
    completed,
    currentFilter,
    onFilter,
    onDeleteCompleted,
}: {
    active: number;
    completed: number;
    currentFilter: string;
    onFilter: (filter: string) => void;
    onDeleteCompleted: () => void;
}) {
    const itemWord = active === 1 ? "item" : "items";
    const FILTER_TITLES = ["All", "Active", "Completed"];
    return (
        <div className="grid w-full grid-flow-col items-center justify-between gap-12">
            <span className="task-count flex-1">
                <strong>{active || "No"}</strong> {itemWord} left
            </span>
            <ul className="filters grid w-max grid-cols-3 items-center gap-2">
                {FILTER_TITLES.map((filter) => (
                    <li key={filter} className="w-max">
                        <FilterLink
                            onClick={() => onFilter(filter)}
                            selected={filter === currentFilter}
                        >
                            {filter}
                        </FilterLink>
                    </li>
                ))}
            </ul>
            {completed ? (
                <button
                    type="button"
                    className="clear-completed btn"
                    onClick={() => onDeleteCompleted()}
                >
                    Clear completed
                </button>
            ) : null}
        </div>
    );
}

export function InputShell({ children }: { children: ReactNode }) {
    return (
        <div className="w-[60vw] rounded-lg bg-black/90 p-4">
            <div className="bg-inherit relative">{children}</div>
        </div>
    );
}

export function ButtonShell({ children }: { children: ReactNode }) {
    return (
        <div className="bg-gray-200 before:bg-sky-600 group relative overflow-hidden rounded-lg px-6 py-3 [transform:translateZ(0)] before:absolute before:bottom-0 before:left-0 before:h-full before:w-full before:-translate-x-full before:transition before:duration-500 before:ease-in-out hover:cursor-pointer hover:before:translate-x-0">
            <span className="group-hover:text-gray-200 relative text-black transition duration-500 ease-in-out">
                {children}
            </span>
        </div>
    );
}
