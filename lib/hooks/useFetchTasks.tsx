import { useEffect, useRef } from "react";

// If the overall logged time adds up to a significant amount (say, 1ms or more), it might make sense to memoize that calculation.
// As an experiment, you can then wrap the calculation in useMemo to verify whether the total logged time has decreased for that interaction or not:
/**https://beta.reactjs.org/learn/you-might-not-need-an-effect
 * You Might Not Need an Effect
 * Effects are an escape hatch from the React paradigm. They let you step outside of React and synchronize your components with some external system like a non-React widget, network, or the browser DOM. If there is no external system involved (for example, if you want to update a components state when some props or state change), you shouldnt need an Effect. Removing unnecessary Effects will make your code easier to follow, faster to run, and less error-prone. */
// useState: Asynchronous or not? Jack Herrington.
// Whenever search string changes via onChange(), fetch is run.
export function useFetchTasks(
    search: string,
    eventType: string,
    listener: any | (() => void) | void
) {
    const result = useRef<null | Promise<any>>(null);
    useEffect(() => {
        if (search.length > 0) {
            let ignore = false;
            const newFunction = async (search: string) => {
                const resp = await fetch(`/search?${search}`);
                const data = await resp.json();
                return data;
            };

            if (!ignore) {
                return () => {
                    ignore = true;
                    console.time("fetch");
                    result.current = newFunction(search);
                    console.timeEnd("fetch");
                    listener(search);
                };
            }
        }
    }, [search, eventType, listener]);

    return result;
}

//// console.time("fetch search");
//// // useMemo(() => {
//// let ignore = false;
//// (() => {
////     // remove this 1000 fallback later after testing.
////     if (!(search.length > 1000 && userIsSearching)) return null;
////     // https://beta.reactjs.org/learn/you-might-not-need-an-effect#fetching-data
////     const fetchSearchResults = async () => {
////         const resp = await fetch(`/search?${search}`);
////         const json = await resp.json();
//
////         if (ignore) return null; // oIgnore stale responses.
////         return setResults(json);
////     };
//
////     const result = fetchSearchResults();
////     return (): Promise<void | null> => {
////         ignore = true; // cleanup.
////         return result;
////     };
//// })();
//// // }, [userIsSearching, search]);
//// console.timeEnd("fetch search");
//
