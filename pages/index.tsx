import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { nanoid } from "nanoid";
import { useState } from "react";

// Load the core build.
import { MainSection } from "../components/";
import { Footer, Header, Navbar } from "../components/layout";
import { PokemonSearchResult } from "../components/pokemon";
import { searchPokemons } from "../lib/api";
import { COOKIE_STORE_TASKS, POKI_API_QUERY_KEY } from "../lib/constants";
import { data } from "../lib/data/data";
import { useDebounce } from "../lib/hooks/api/useDebounce";
import { Task, TaskUpdate } from "../lib/interfaces";
import { setNextId } from "../lib/utils";

import { motion } from "framer-motion";
import styles from "../styles/Home.module.css";

export const MyComponent = () => (
    <motion.div
        className="h-12 w-12 rounded-full bg-white"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
    />
);
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
    /**
     * Fetching data on client with react query.
     */
    const [searchValue, setSearchValue] = useState("");
    const debouncedSearchValue = useDebounce(searchValue, 300);
    const { isLoading, isError, isSuccess, data } = useQuery(
        [POKI_API_QUERY_KEY.SEARCH_POKEMONS, debouncedSearchValue],
        () => searchPokemons(debouncedSearchValue),
        {
            enabled: debouncedSearchValue.length > 0,
        }
    );

    const renderResult = (): JSX.Element => {
        if (isLoading) return <div className="text-sky-600">Loading...</div>;
        if (isError)
            return <div className="text-pink-600">Something went wrong!</div>;

        return isSuccess ? <PokemonSearchResult pokemons={data} /> : <></>;
    };

    // const { state, dispatch } = useContext(Store as React.Context<any>);
    // const { store } = state as StoreState;
    const addToStoreHandler = async (taskItem: any) => {
        alert("Implement this");
    };

    const handleNewItem = (taskInput: Task["task"]) => {
        const _id = nanoid();
        const newTask: Task = {
            _id: _id,
            completed: false,
            id: nextId++,
            slug: `/task/${_id}`,
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
        } catch (error) {
            console.log(error);
        }
    };
    const getPokemon = ({ target }: any | unknown) => {
        console.log("clicked");
        //You can use name, number, type, or ability in the url.
        //Example: pokemon/ditto/, pokemon/1/, type/3/ or ability/4/.
        const res = fetch(`https://pokeapi.co/api/v2/pokemon/25/`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
        console.log(res);
    };
    return tasks ? (
        <div className={styles.container}>
            <Header />
            <Navbar />
            <div className="hero grid min-h-screen place-content-center items-center text-center">
                <MyComponent />
                <h1 className="mb-2">Search your pokemon</h1>
                <input
                    type="text"
                    onChange={({ target: { value } }) => setSearchValue(value)}
                    value={searchValue}
                />
                {renderResult()}
                <button onClick={getPokemon}>Get now</button>
            </div>
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
    try {
        // const data = await axios.get("http://localhost:3000/api/task");
        // console.log(data.status);
        // return { props: { tasks: data.status } };
        return { props: { tasks: data.tasks } };
    } catch (error) {
        console.log(error);
    }
    // }
}
