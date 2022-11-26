import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import _ from "lodash";
import { nanoid } from "nanoid";
import { useContext } from "react";
import { toast } from "react-toastify";

// Load the core build.
import { MainSection } from "../components/";
import { Footer, Header, Navbar } from "../components/layout";
import { Store } from "../lib";
import { COOKIE_STORE_TASKS, STORE_ACTIONS, URL_API } from "../lib/constants";
import { StoreState, Task, TaskUpdate } from "../lib/interfaces";
import { setNextId } from "../lib/utils";

import styles from "../styles/Home.module.css";

let nextId = 0;
const initialState = {
    store: Cookies.get(COOKIE_STORE_TASKS)
        ? JSON.parse(Cookies.get(COOKIE_STORE_TASKS) as unknown as string)
        : [],
};

// renames all to new task name.  /// setTasks(tasks.map((t: Task) => ({ ...t, task: newTask.task })));
// TODO: To use instead of axios.
export default function Home({ tasks }: { tasks: Task[] }) {
    setNextId(tasks, nextId);

    //// const { data } = useQuery({ queryKey: ["tasks"], queryFn: getTasks, initialData: props.tasks, });
    const { state, dispatch } = useContext(Store as React.Context<any>);
    const { store } = state as StoreState;
    const addToStoreHandler = async (taskItem: any) => {
        const existTask = store.storeTasks.find(
            (x) => x.slug === taskItem.slug
        );
        const totalCount = existTask ? existTask.totalCount + 1 : 1;
        const { data } = await axios.get(`${URL_API}/${taskItem._id}`);
        dispatch({
            type: STORE_ACTIONS.AddTasks,
            payload: { ...taskItem },
            totalCount,
        }); // Dispatch to store.
        return data.countInStock < totalCount
            ? toast.error(`Sorry.  Task ${taskItem.name} is out of stock`)
            : toast.success(`Added ${taskItem.name} to store`);
    };

    const handleNewItem = (taskInput: Task["task"]) => {
        const newTask: Task = {
            _id: nanoid(),
            completed: false,
            id: nextId++,
            task: taskInput,
            uuid: nanoid(),
        }; //// setTasks([...tasks, newTask]);
        Cookies.set(COOKIE_STORE_TASKS, JSON.stringify(tasks), { expires: 7 });
    };

    const handleChange = ({ currentTarget: input }: any) => {
        //// input.value === "" ? setTask({ task: "" }) : setTask((prev: any) => ({ ...prev, task: input.value }));
    };

    const handleDeleteTasks = async (ids: Task["_id"][]) => {
        console.log(ids);
    };

    const handleUpdateTask = async (update: TaskUpdate) => {
        console.log(update);
    };

    const onUpdateTask = async (id: Task["_id"]) => {
        try {
            const originalTasks = [...tasks];
            const index = originalTasks.findIndex((t) => t._id === id);
            const { data } = await axios.put(URL + "/" + id, {
                completed: !originalTasks[index].completed,
            });
            originalTasks[index] = data.data; //// setTasks(originalTasks);
            toast(`Task ${data.data[index]} updated! ${data.message}`);
        } catch (error) {
            console.log(error);
        }
    };

    return tasks ? (
        <div className={styles.container}>
            <Header />
            <Navbar />
            <MainSection
                tasks={tasks}
                handleNewItem={addToStoreHandler}
                handleUpdateTask={handleUpdateTask}
                handleDeleteTasks={handleDeleteTasks}
            />
            <Footer />
        </div>
    ) : (
        <div className="text-warning text-amber-500">Loading...</div>
    );
}

export async function getServerSideProps() {
    const { data } = await axios.get(URL_API);
    return { props: { tasks: data.data } }; // will be passed to the page component as props
}
