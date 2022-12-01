import { modelNames } from "mongoose";
import { useEffect } from "react";
// https://dev.to/lico/react-overriding-browsers-keyboard-shortcuts-19bf
export const Ctrl1 = ({ onPress }: { onPress: VoidFunction }) => {
    useEffect(() => {
        const isCtrl1 = (e: KeyboardEvent): boolean => e.ctrlKey && e.key === '1'

        const handler = (e: KeyboardEvent): void => {
            if (isCtrl1(e)) onPress()
        }
        const ignore = (e: KeyboardEvent): void => {
            if (isCtrl1(e)) e.preventDefault()
        }

        window.addEventListener('keyup', handler)
        window.addEventListener('keydown', ignore)

        // Cleanup fn.
        return () => {
            window.removeEventListener('keyup', handler)
            window.removeEventListener('keydown', ignore)
        }
    }, [onPress])

    return null
}

export const CtrlK = ({ onPress }: { onPress: VoidFunction }): null => {
    useEffect(() => {
        const isCtrlK = (e: KeyboardEvent): boolean => e.ctrlKey && e.key === 'k'

        const handler = (e: KeyboardEvent): void => {
            if (isCtrlK(e)) onPress();
        };

        const ignore = (e: KeyboardEvent): void => {
            if (isCtrlK(e)) e.preventDefault();
        };

        window.addEventListener('keyup', handler)
        window.addEventListener('keydown', ignore)

        // Cleanup fn.
        return () => {
            window.removeEventListener('keyup', handler)
            window.removeEventListener('keydown', ignore)
        }
    }, [onPress])

    return null
}


// TODO: add shortcutkeys array.
// Handle if any user error.
export const handleUserKeyError = (
    shortcutKeys: string[],
    callback: Function
) => {
    if (!Array.isArray(shortcutKeys)) {
        throw new Error(
            "The first parameter to `useKeyboardShortcuts` must be an ordered array of `KeyboardEvent.key` strings"
        );
    }
    if (!shortcutKeys.length) {
        throw new Error(
            "The first parameter to `useKeyboardShortcut` must contain at least one `KeyboardEvent.key` string."
        );
    }
    if (!callback || typeof callback !== "function") {
        throw new Error(
            "The second parameter to `useKeyboardShortcut` must be a function that will be invoked when the keys are pressed."
        );
    }
};



//// export const BLACKLISTED_DOM_TARGETS = ["TEXTAREA", "INPUT"];
//
//// export const DEFAULT_OPTIONS = {
////     overrideSystem: false,
////     ignoreInputFields: true,
////     repeatOnHold: true,
//// };

/** useEffect allows us to add side effects to our application.
 * In our specific case, we will use this hook to create an event listeners when our component mounts. It will also remove listeners when the component unmounts.
 * useReducer allows us to keep a state of pressed keys. We will use a keydown event to keep track of held down keys and a keyup event to keep track of released keys.
 * useCallback is simply a performance optimization hook which we use to
 * wrap our event listener callback function. If we do not do this, React
 * will re-instantiate a new function every time our custom hook re-renders, which will happen quite often.‍
 *
 * KeyboardEvent.repeat is a read only property that returns a Boolean that is set to true if the key is being held down such that it is automatically repeating.
 * KeyboardEvent.key is a read only property that returns a String that
 * is set to the current key that was pressed. This also takes into
 * account any modifier keys that might have affected the KeyboardEvent.
 * https://www.fullstacklabs.co/blog/keyboard-shortcuts-with-react-hooks
 * https://github.com/arthurtyukayev/use-keyboard-shortcut/blob/develop/lib/useKeyboardShortcut.js
 */