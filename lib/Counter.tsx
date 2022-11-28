// TODO: Priority A https://github.com/lloydlobo/amazone/blob/main/utils/Store.tsx
import { store } from "fp-ts";
import Cookies from "js-cookie";
import { createContext, ReactNode, useReducer } from "react";
import { COOKIE_COUNTER, COOKIE_STORE_TASKS, STORE_ACTIONS } from "./constants";
import { StoreState, Task } from "./interfaces";

// If you thought this should be optional, see
// https://github.com/DefinitelyTyped/DefinitelyTyped/pull/24509#issuecomment-382213106
let defaultContextValue: unknown;
export const Store = createContext(defaultContextValue); // unknown.

/**
 *
 * initialState populates history of store items.
 *
 * Use js-cookie package to use browser cookies.
 * Use json.parse to convert string 'storeTasks' to
 * JS object, Cookies only store strings.
 * https://youtu.be/gJ5_Rx1S8zY
 */
// const initialState: StoreState = {
//     store: Cookies.get(COOKIE_STORE_TASKS)
//         ? JSON.parse(Cookies.get(COOKIE_STORE_TASKS) as string)
//         : { storeTasks: [], shippingAddress: {} },
// };

type ReducerStateCounter = {
    count: number;
    loading: boolean; // https://levelup.gitconnected.com/integrate-apis-in-next-js-with-redux-and-axios-10-step-guide-3d20a2bc9365
};

const initialState: ReducerStateCounter = {
    count: Cookies.get(COOKIE_COUNTER)
        ? JSON.parse(Cookies.get(COOKIE_COUNTER) as string)
        : 0,
    loading: true,
};

function reducer(state: ReducerStateCounter, action: any) {
    switch (action.type) {
        case "increment": {
            const newCountState = state.count + 1;
            cookiesSet(COOKIE_COUNTER, newCountState, { expires: 7 });
            return { ...state, count: newCountState, loading: false };
        }
        case "decrement": {
            const newCountState = state.count - 1;
            cookiesSet(COOKIE_COUNTER, newCountState, { expires: 7 });
            return { ...state, count: newCountState, loading: false };
        }
        case "reset":
            const newCountState = 0;
            cookiesSet(COOKIE_COUNTER, newCountState, { expires: 7 });
            return { count: 0, loading: false };
        default: // throw new Error();
            return state;
    }
}

// import { combineReducers } from "redux";
// const reducers = combineReducers({count: reduce});

export function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <>
            Count: {state.count}
            <button
                type="button"
                aria-label="decrement counter"
                onClick={() => dispatch({ type: "decrement" })}
                className="btn"
            >
                -
            </button>
            <button
                type="button"
                aria-label="increment counter"
                onClick={() => dispatch({ type: "increment" })}
                className="btn"
            >
                +
            </button>
            <button
                type="button"
                aria-label="reset counter"
                onClick={() => dispatch({ type: "reset" })}
                className="btn"
            >
                C
            </button>
        </>
    );
}

/**
 * StoreProvider is a React component.
 *
 * An alternative to `useState`.
 * `useReducer` is usually preferable to `useState` when you have complex state logic that involves
 * multiple sub-values. It also lets you optimize performance for components that trigger deep
 * updates because you can pass `dispatch` down instead of callbacks.
 * overload where dispatch could accept 0 arguments.
 * Call it in _app.tsx
 */
export function CounterProvider({
    children,
}: {
    children: ReactNode;
}): JSX.Element {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <Store.Provider value={value}>{children}</Store.Provider>;
}

// [Part 5: Handle Add to Cart] https://www.youtube.com/watch?v=YeiqNF9fLPw
// addToCartHandler action in pages/product/[slug].tsx.

function addTasks(action: any, state: StoreState) {
    const newTask = action.payload;
    const existTask = state.store.storeTasks.find(
        (task) => task.slug === newTask.slug
    );
    const storeTasks = existTask
        ? state.store.storeTasks.map((task) =>
              task.name === existTask.name ? newTask : task
          )
        : [...state.store.storeTasks, newTask];
    Cookies.set(
        COOKIE_STORE_TASKS,
        JSON.stringify({ ...state.store, storeTasks: storeTasks })
    );
    return { ...state, store: { storeTasks: storeTasks } };
}

function removeTasks(action: any, state: StoreState) {
    const filterTask = action.payload;
    const { store } = state;
    const filterTasks = store.storeTasks.find(
        (task) => task.slug !== filterTask.slug
    );
    return { ...state };
}

function cookiesSet(
    name: string,
    value: any,
    options: Cookies.CookieAttributes | undefined
): void {
    Cookies.set(name, JSON.stringify(value), {
        ...options,
    });
}
