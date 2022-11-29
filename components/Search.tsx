import { ChangeEvent, MutableRefObject, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import {
    useFetchTasks,
    useSearchBarListener,
    useWindowListener,
} from "../lib/hooks";
import { Cartesian, Coordinates, Inputs } from "../lib/interfaces";
import { XMarkIcon } from "./icons";

/**
 * Search component has input field returns data when changes.
 *
 * Specify a search and runs against an API.
 * Manages some state and does API fetch on onChangeHandle.
 * React renders search and array of state data which associates the instance
 * of search. useState return copy of string. JS returns 'by value', array pass
 * by reference.
 *
 * Return React Element. Diffs the VDom with the existing DOM.
 * PERF: Can use deBounce.. lodash _.debounce to avoid multiple entry in search
 * input. and use after every 400ms.
 *
 * @param {string} foo This is a param with a description too long to fit in one line.
 * @return {number} This returns something that has a description too long to fit in one line.
 */
export function Search(): JSX.Element {
    const {
        register,
        handleSubmit,
        watch, // watch input value by passing the name of it
        formState: { errors },
    } = useForm<Inputs>();

    const [search, setSearch] = useState("");
    const [results, setResults] = useState<string[]>([]);
    const [searchBarHovered, setExpand] = useState<null | boolean>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const searchBar = useRef<any | null>(null);
    const userIsSearching = search.length >= 1; // ✅ Calculate what you can during rendering

    useWindowListener(
        "pointermove",
        (e: { clientX: number; clientY: number }) => {
            setPosition({ x: e.clientX, y: e.clientY });
        }
    );
    useSearchBarListener(searchBar, "mouseenter", () => {
        setExpand(true);
    });
    useSearchBarListener(searchBar, "mousemove", () => {
        searchBar.current.style.filter = `hue-rotate(${search.length}deg)`;
    });
    useSearchBarListener(searchBar, "mouseleave", () => {
        setExpand(false);
        searchBar.current.filter = "none";
    });
    const fetchResponseJsonPromise = useFetchTasks(search, "", setResults);

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
    // Caputre value of state at that time.
    const onChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        setSearch(evt.target.value); // value or currentValue?
        const delta = search.length + Math.sin(search.length % 27) * Math.PI; // 27 chars? in alphabet.
        searchBar.current.style.filter = `hue-rotate(${delta}deg)`; //// console.log(watch("searchInput"));
    };

    const clearSearch = (evt: React.PointerEvent<HTMLButtonElement>) => {
        evt.preventDefault();
        setSearch("");
        searchBar.current.reset();
    };

    return (
        // Don not want button click handlers to have fetch code.
        // useState, useReducer
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <div className="grid place-content-end">
            {/* eslint-disable-next-line */}
            <div
                className={`pointer-events-none absolute -left-2 -top-2 h-4 w-4 rounded-full bg-pink-400/10 opacity-60`}
                style={{
                    transform: `translate(${position.x}px, ${position.y}px)`,
                }}
            />
            <form
                ref={searchBar}
                data-credit="https://flowbite.com/docs/forms/search-input/"
                onSubmit={handleSubmit(onSubmit)}
                className={`w-full place-self-end transition-all duration-500 ease-in-out {${
                    userIsSearching || searchBarHovered
                        ? " w-[56vw] place-self-end transition-all delay-75 ease-in-out"
                        : ""
                }`}
            >
                {/* prettier-ignore */}
                <label htmlFor="default-search" className="mb-2 text-xs font-medium text-gray-900 sr-only dark:text-white" >Search</label>
                <div className="relative">
                    {/* prettier-ignore */}
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none" title="icon">
                        <svg aria-hidden="true" className="w-3 h-3 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" ></path> </svg>
                    </div>
                    {/* register your input into the hook by invoking the "register" function */}
                    <div className="input">
                        <input
                            defaultValue=""
                            {...register("searchInput")}
                            type="search"
                            id="default-search"
                            onChange={onChange}
                            className="block w-full rounded-lg border border-zinc-300 bg-gray-50 py-1 pl-8 text-xs text-gray-900 transition-all delay-1000 ease-linear focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-zinc-900/30 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 xl:focus:w-[40vw]"
                            placeholder="Search tasks…"
                            aria-label="search"
                            required
                            // onBlur={cleanSearch}
                        />
                    </div>

                    <div className="absolute">
                        <ul className="result pointer-events-none grid translate-y-4 gap-4 space-x-0 space-y-4">
                            {results.length > 0 &&
                            typeof results !== undefined ? (
                                results?.map((result, index) => (
                                    <li
                                        key={`${index}-${search}`}
                                        className="absolute grid gap-4"
                                        aria-label="Search result"
                                    >
                                        {result}
                                    </li>
                                ))
                            ) : (
                                <li
                                    className="sr-only"
                                    aria-label="No search result"
                                >
                                    No results found
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* errors will return when field validation fails  */}
                    {errors.searchInputRequired && (
                        <span>This field is required</span>
                    )}

                    {userIsSearching ? (
                        <button
                            type="button"
                            aria-label="Clear Search Input"
                            onClick={clearSearch}
                            className="close absolute top-0 right-0 z-30 h-8 -translate-x-8 items-center text-xs after:absolute "
                        >
                            <div className="h-4 w-4 rounded-sm hover:bg-slate-800">
                                <XMarkIcon className="after:link absolute h-3 w-3 items-center " />
                            </div>
                            {/* https://versoly.com/versoly-ui/getting-started/quickstart */}
                            {/* [data-toggle="dropdown"] */}
                            <div
                                className="after:bg-caret-down absolute top-2  flex items-center gap-x-1 bg-opacity-0 p-2 after:absolute after:-left-2 after:top-8 after:h-4 after:w-4
                             after:flex-shrink-0 after:bg-no-repeat after:opacity-0
                            hover:after:opacity-100
                            hover:after:content-['Clear'] "
                            />
                            <span className="sr-only" aria-label="Clear">
                                Clear
                            </span>
                        </button>
                    ) : null}

                    <button
                        title="search"
                        role="button"
                        type="submit"
                        className="py-auto absolute top-0 right-0 h-full rounded-r-lg border border-blue-700 bg-blue-700 px-1 text-xs font-medium text-white shadow-inner hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-sky-700 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        {/* prettier-ignore */}
                        <svg aria-hidden="true" className="h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" ><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" ></path></svg>
                        <span className="sr-only">Search</span>
                    </button>
                </div>
            </form>
        </div>
    );
}

// https://beta.reactjs.org/learn/you-might-not-need-an-effect
// Use Effects only for code that should run because the component was
// displayed to the user. In this example, the notification should appear
// because the user pressed the button, not because the page was displayed!
// 🔴 Avoid: Event-specific logic inside an Effect
// ✅ Calculate all the next state in the event handler
function rotateDivHueOnMouseMove(searchBar: MutableRefObject<any>) {
    if (typeof window === undefined) return;
    if (!(searchBar && searchBar.current)) return;

    const bar: HTMLElement = searchBar.current;
    const rect: DOMRect = searchBar.current.getBoundingClientRect();

    // Get middle of rect search bar.
    const [barX, barY] = [
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
    ];

    return { rect, barX, barY };
}

// atan2 expect ray origin to start at 0,0.
// range (-PI, PI)
export function getAngle({ mouseX, mouseY, barX, barY }: Coordinates) {
    const C: Cartesian = {
        coordinates: { dy: barY - mouseY, dx: barX - mouseX },
        radian: 0,
        degree: 0,
    };
    // Returns the angle (in radians) from the X axis to a point.
    C.radian = Math.atan2(C.coordinates.dy, C.coordinates.dx);
    C.degree = (C.radian * 180) / Math.PI;
    return C.degree;
}

// useSearchBarListener(searchBar, "mousemove", () => {
//     if (typeof window === undefined) return;
//     if (!(searchBar && searchBar.current)) return;
//     const rect = searchBar.current.getBoundingClientRect() as DOMRect;
//     if (typeof rect !== undefined) {
//         const [barX, barY] = [
//             rect.left + rect.width / 2,
//             rect.top + rect.height / 2,
//         ];
//         const [mouseX, mouseY] = [
//             searchBar.current.target.clientX,
//             searchBar.current.target.clientY,
//         ];
//         const coordinates = { mouseX, mouseY, barX, barY };
//         const angleDeg: number = getAngle(coordinates);
//         const increment = Math.sin(angleDeg) * (90 + angleDeg);
//         console.log(increment);
//         searchBar.current.style.filter = `hue-rotate(${Math.floor(
//             increment
//         )}deg)`;
//     }
// });
