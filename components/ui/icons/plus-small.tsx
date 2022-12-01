/**
 * Plus Icon.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {JSX.Element}
 * @sources heroicons.com | plus-small.
 */
export function PlusSmallIcon({
    className,
}: {
    className?: string;
}): JSX.Element {
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
                d="M12 6v12m6-6H6"
            />
        </svg>
    );
}
