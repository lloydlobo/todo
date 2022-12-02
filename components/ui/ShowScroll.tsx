import { ReactNode, useState, useRef } from "react";
import { useIntersectionObserverOnScroll } from "../../lib/hooks";

/**
 * ScrollShow.
 *
 * @sources https://css-tricks.com/lazy-loading-images-in-svelte/
 * @sources https://github.com/fireship-io/fireship.io/blob/master/app/components/ui/scroll-show.svelte
 */
export function ScrollShow({
    children,
    repeat = true,
    start = "right",
    delay = 200,
}: {
    children: ReactNode;
    repeat?: boolean;
    start?: string;
    delay?: number;
}): JSX.Element {
    const [visible, setVisible] = useState(false); // PERF: can be null.
    const ref = useRef(null);

    useIntersectionObserverOnScroll({ setVisible, repeat, ref });
    return (
        <>
            <div
                style={{ transitionDelay: `${delay}ms` }}
                ref={ref}
                className={`${
                    visible
                        ? "translate-x-0 -translate-y-0 opacity-100 hue-rotate-0 transition-all"
                        : `show-scroll ${styleBeforeIntersection(start)}`
                } relative transition-all duration-500`}
            >
                {children}
            </div>
            <style>{`
            @media (prefers-reduced-motion: no-preference) {
                .show-scroll {
                    position: relative;
                    opacity: 0;
                    hue-rotate: rotate(90deg);
                    transition: all;
                    transition-duration: 500ms;
                }
                .right {
                    transform: translateX(-20px);
                }
                .left {
                    transform: translateX(20px);
                }
                .top {
                    transform: translateY(-20px);
                }
                .bottom {
                    transform: translateY(20px);
                }
            )
            `}</style>
        </>
    );
}

function styleBeforeIntersection(start: string) {
    const available = ["top", "right", "bottom", "left"];
    const selected = available.find((elem) => elem === start);
    return `${switchDirections(selected)}`; //// return `${style} ${preStyle()}`;
}

function switchDirections(selected: string | undefined) {
    let className = "";
    switch (selected) {
        case "right":
            className = `right`;
            break;
        case "top":
            className = `top`;
            break;
        // FIXME: Left causes screen X to overflow.
        case "left":
            className = `left`;
            break;
        case "bottom":
            className = `bottom`;
            break;
        default:
            className = `right`;
            break;
    }
    return className;
}
//// function styleBeforeIntersection(start: string) {
////     const available = ["right", "top"];
////     const selected = available.find((elem) => elem === start);
//
////     let style = "";
//
////     switch (selected) {
////         case "right":
////             style = `-translate-x-5`;
////             break;
////         case "top":
////             style = `-translate-y-5`;
////             break;
////         default:
////             style = `-translate-x-5`;
////             break;
////     }
////     return `${style}`; //// return `${style} ${preStyle()}`;
//// }

//// function preStyle() {
////     let prefix = "motion-safe:";
////     prefix = "";
////     const all = [
////         "relative",
////         "opacity-0",
////         "hue-rotate-90",
////         "transition-all",
////         "duration-500",
////     ];
////     const motionReducedStyle = all.map((elem) => prefix + elem);
////     const styleBase = motionReducedStyle.join(" ");
////     return styleBase;
//// }
