import React from "react";

/**
 * XMarkIcon for cancelling or closing ui.
 *
 * @param className
 * @sources heroicons.com | x-mark jsx
 */
export function XMarkIcon({ className }: { className?: string }): JSX.Element {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            height={24}
            width={24}
            className={`${className}`}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
            />
        </svg>
    );
}
