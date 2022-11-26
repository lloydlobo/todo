// The ref value 'ref.current' will likely have changed by the time this effect
// cleanup function runs. If this ref points to a node rendered by React, copy
// 'ref.current' to a variable inside the effect, and use that variable in the

import { MutableRefObject, useEffect } from "react";

// cleanup function.eslintreact-hooks/exhaustive-deps.
export function useSearchBarListener(
    ref: MutableRefObject<any>,
    eventType: string,
    listener: any | (() => void) | void
): void {
    useEffect(() => {
        const reference = ref.current;
        reference.addEventListener(eventType, listener);

        // Cleanup function.
        return (): void => {
            reference.removeEventListener(eventType, listener);
        };
    }, [ref, eventType, listener]);
}
