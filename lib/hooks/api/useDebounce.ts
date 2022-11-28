import { useEffect, useState } from "react";

/**
 * Debounce a value for a search query every 300ms.
 *
 * Helps to avoid making API requests at each keystroke,
 * when the user types in search input field.
 *
 * @param value The value to debounce.
 * @param delay The delay in milliseconds.
 * @returns The debounced value.
 */
export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            // After delay update the debounced value
            setDebouncedValue(value);
        }, delay);
        // Cleanup function cancels timeout if value changes, or unmount and
        // delay change. Prevents debounced value from updating if value,
        // changes, within the delay period. Clear time and restart it.
        return () => {
            clearTimeout(handler);
        };
        // Re-call Effect only if there is change in value or delay.
    }, [value, delay]);
    return debouncedValue;
}
