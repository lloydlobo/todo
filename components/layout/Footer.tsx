import Link from "next/link";
import Image from "next/image";
import React from "react";
import { brand } from "../../lib/data/brand";

export function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className={"grid place-content-center py-4"}>
            <div className="copy flex items-center gap-2 place-self-center text-xs opacity-70">
                <Link href={"/"} className="year text-sm font-bold">
                    {brand.name}
                </Link>
                <div className="copy-text">Copyright &copy;{currentYear}</div>
            </div>
            <a
                href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                title="Logo"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden"
            >
                <Image
                    src="/vercel.svg"
                    alt="Vercel Logo"
                    width={72}
                    height={16}
                />
            </a>
            <div className="body-font bg-gray-900 text-gray-400">
                <div className="container mx-auto flex flex-col items-center px-5 py-8 sm:flex-row">
                    <a className="title-font flex items-center justify-center font-medium text-white md:justify-start">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            className="h-10 w-10 rounded-full bg-indigo-500 p-2 text-white"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                        <span className="ml-3 text-xl">Tailblocks</span>
                    </a>
                    <p className="mt-4 text-sm text-gray-400 sm:ml-4 sm:mt-0 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:pl-4">
                        © 2020 Tailblocks —
                        <a
                            href="https://twitter.com/knyttneve"
                            className="ml-1 text-gray-500"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            @knyttneve
                        </a>
                    </p>
                    <span className="mt-4 inline-flex justify-center sm:ml-auto sm:mt-0 sm:justify-start">
                        <a className="text-gray-400">
                            <svg
                                fill="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                            >
                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                            </svg>
                        </a>
                        <a className="ml-3 text-gray-400">
                            <svg
                                fill="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                            >
                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                            </svg>
                        </a>
                        <a className="ml-3 text-gray-400">
                            <svg
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                            >
                                <rect
                                    width="20"
                                    height="20"
                                    x="2"
                                    y="2"
                                    rx="5"
                                    ry="5"
                                ></rect>
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                            </svg>
                        </a>
                        <a className="ml-3 text-gray-400">
                            <svg
                                fill="currentColor"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="0"
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="none"
                                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                                ></path>
                                <circle
                                    cx="4"
                                    cy="4"
                                    r="2"
                                    stroke="none"
                                ></circle>
                            </svg>
                        </a>
                    </span>
                </div>
            </div>
            GitHub
        </footer>
    );
}
