// TODO: Priority A https://github.com/lloydlobo/amazone/blob/main/utils/Store.tsx
import Cookies from "js-cookie";
import { createContext, useReducer } from "react";
import { COOKIE_STORE_TASKS } from "./constants";
import { StoreState } from "./interfaces";

// If you thought this should be optional, see
// https://github.com/DefinitelyTyped/DefinitelyTyped/pull/24509#issuecomment-382213106
let defaultContextValue: unknown;

export const Store = createContext(defaultContextValue); // unknown.

/**
 * initialState populates history of store items.
 *
 * Use js-cookie package to use browser cookies.
 * Use json.parse to convert string 'storeTasks' to
 * JS object, Cookies only store strings.
 * https://youtu.be/gJ5_Rx1S8zY
 */
const initialState = {
    store: Cookies.get(COOKIE_STORE_TASKS)
        ? JSON.parse(Cookies.get(COOKIE_STORE_TASKS) as string)
        : { storeItems: [], shippingAddress: {} },
};

// [Part 5: Handle Add to Cart] https://www.youtube.com/watch?v=YeiqNF9fLPw
// addToCartHandler action in pages/product/[slug].tsx.
function reducer(state: StoreState, action: any): StoreState {
    switch (action!.type) {
        case "STORE_ADD_TASKS": {
            const newItem = action.payload;

            // Check if item exists and assign it to existItem.
            const existItem = state.store.storeTasks.find(
                (item: any) => item.slug === newItem.slug
            );

            // If exists keep items in store item.
            // Else concatenate & push new items at the end.
            const storeItems = existItem
                ? state.store.storeTasks.map((item: { name: any }) =>
                      item.name === existItem.name ? newItem : item
                  )
                : [...state.store.storeTasks, newItem];

            // Set Cookies of 'storeTasks' key for initialState() to read state.
            // Update cookie for card key, and convert JS Object to string.
            Cookies.set(
                COOKIE_STORE_TASKS,
                JSON.stringify({ ...state.store, storeItems: storeItems })
            );

            return {
                ...state,
                store: { ...state.store, storeTasks: storeItems },
            } as StoreState;
        }
        case "STORE_REMOVE_ITEM": {
            // Remove selected (payload X action) item from store.
            const storeItems = state.store.storeTasks.filter(
                (item: { slug: any }) => item.slug !== action.payload.slug
            );

            // Update cookie for card key, and convert JS Object to string.
            Cookies.set(
                COOKIE_STORE_TASKS,
                JSON.stringify({ ...state.store, storeItems })
            );

            return {
                ...state,
                store: { ...state.store, storeTasks: storeItems },
            } as StoreState;
        }
        case "STORE_RESET": {
            return {
                ...state,
                store: {
                    storeTasks: [],
                    shippingAddress: { location: [] },
                    paymentMethod: "",
                },
            };
        }
        case "SAVE_SHIPPING_ADDRESS": {
            return {
                ...state,
                store: {
                    ...state.store, // Keep same state for storeItems, and paymentMethods.
                    shippingAddress: {
                        ...state.store.shippingAddress, // Keep shippingAddress as it is.
                        // Payload from ShippingScreen onSubmit() form values.
                        ...action.payload, // Merge address in payload with shipping address.
                    },
                },
            };
        }
        case "SAVE_PAYMENT_METHOD": {
            return {
                ...state,
                store: {
                    ...state.store,
                    paymentMethod: action.payload,
                },
            };
        }
        default: {
            return state as StoreState;
        }
    } // end of switch.
}

/**
 * StoreProvider is a React component.
 *
 * An alternative to `useState`.
 * `useReducer` is usually preferable to `useState` when you have complex state logic that involves
 * multiple sub-values. It also lets you optimize performance for components that trigger deep
 * updates because you can pass `dispatch` down instead of callbacks.
 *
 * Call it in _app.tsx
 */
// overload where dispatch could accept 0 arguments.
export function StoreProvider({ children }: { children: any }): JSX.Element {
    const [state, dispatch] = useReducer(reducer, initialState as never);

    const value = { state, dispatch };

    return <Store.Provider value={value}>{children}</Store.Provider>;
}
