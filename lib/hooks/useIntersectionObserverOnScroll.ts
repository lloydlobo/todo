import { useEffect } from "react";
import { ObserverOnScrollProps } from "../interfaces";

/**
 * Hook activates on window scroll.
 *
 * @param setVisible
 * @param repeat
 * @param ref
 * @usecase div of html appear with transition effect,
 * when a intersection is found.
 * @sources https://github.com/fireship-io/fireship.io/blob/master/app/components/ui/scroll-show.svelte
 */
export function useIntersectionObserverOnScroll({
    setVisible,
    repeat,
    ref,
}: ObserverOnScrollProps) {
    useEffect(
        (): (() => void) => handleObserver({ setVisible, repeat, ref }),
        [ref, repeat, setVisible]
    );
}

/**
 * Observes and disconnects the observer on scroll during mount unmount.
 *
 * Returns a callback Cleanup function callback for useEffect hook.
 * @param {ObserverOnScrollProps} { setVisible, repeat, ref }
 */
function handleObserver({
    setVisible,
    repeat,
    ref,
}: ObserverOnScrollProps): () => void {
    let observer: IntersectionObserver = getObserver(setVisible, repeat);
    if (ref && ref.current) observer.observe(ref.current);

    return (): void => {
        observer?.disconnect();
    };
}

/**
 * Returns an IntersectionObserver object.
 *
 * getObserver function  Map out each observer entry,
 * and set it's visibility.
 * @param {Dispatch<SetStateAction<boolean>>} setVisible
 * @param {boolean} repeat
 * @returns {IntersectionObserver}
 */
function getObserver(
    setVisible: ObserverOnScrollProps["setVisible"],
    repeat: ObserverOnScrollProps["repeat"]
): IntersectionObserver {
    return new IntersectionObserver(
        (entries: IntersectionObserverEntry[]): void => {
            entries.forEach((entry): void => {
                if (entry.isIntersecting) setVisible(true);
                else if (repeat) setVisible(false);
            });
        }
    );
}
