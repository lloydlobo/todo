import React, { ReactNode } from "react";

export function KBDIcon({ children }: { children: any }) {
    return (
        <div className="inline-flex items-center justify-center w-6 h-6 text-xs border border-b-2 rounded-md border-gray6 border-opacity-20 bg-gray7/60">
            {children}
        </div>
    );
}
