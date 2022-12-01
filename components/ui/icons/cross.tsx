import React from "react";

/**
 * Cross Icon.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {JSX.Element}
 * @sources google.com
 */
export function CrossIcon({ className }: { className?: string }): JSX.Element {
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
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
        </svg>
    );
}
