import React, { ReactNode } from "react";

export function KBDIcon({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div
            className={`${className} inline-flex h-6 w-6 items-center justify-center rounded-md border border-b-2 border-gray6 border-opacity-20 bg-gray7/60 text-xs`}
        >
            {children}
        </div>
    );
}
