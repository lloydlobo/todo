/**
 * ChevronRightIcon.
 *
 * @param className
 * @returns {JSX.Element}
 * @constructor
 * @sources heroicons.com | chevron-right.
 */
export function ChevronRightIcon({
    className,
}: { className?: string } = {}): JSX.Element {
    return (
        <svg
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={`${className} h-6 w-6`}
            fill="none"
            strokeWidth={1.5}
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
        </svg>
    );
}
