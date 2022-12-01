import Head from "next/head";
import React, { ReactNode, useRef, useState } from "react";
import { Ctrl1, ShiftM } from "../../lib/util";
import {
    CrossIcon,
    ChevronRightIcon,
    PlusSmallIcon,
    PencilSquareIcon,
} from "../ui";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export function Layout({
    children,
    title,
}: {
    children: ReactNode;
    title: string;
}) {
    const refAside = useRef(null);
    const [toggle, setToggle] = useState(false);

    const handleToggleClick = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        setToggle(!toggle);
    };
    const handleToggleShiftM = () => {
        setToggle(!toggle);
    };

    return (
        <>
            <Head>
                <title>{title ? `${title} | Todo` : "Todo"}</title>
            </Head>

            <header className="relative">
                <nav className="sticky top-0 ">
                    <Navbar toggle={MenuButton(handleToggleClick, toggle)} />
                </nav>
                <ShiftM onPress={() => handleToggleShiftM()} />
            </header>

            <div className="grid w-screen mx-auto place-content-center">
                <div
                    className={`w-[100vw]  transition-all ${
                        toggle ? "container mx-0 flex" : "block"
                    }`}
                >
                    <aside
                        ref={refAside}
                        aria-label="Sidebar"
                        className={`z-10 min-h-screen w-auto max-w-[40%] bg-gray7 shadow-md sm:w-auto
                ${
                    !toggle
                        ? "absolute -translate-x-96 opacity-0 blur-xl transition-all ease-out"
                        : "relative translate-x-0 transition-all ease-in"
                }`}
                    >
                        <Sidebar />
                    </aside>

                    <div className="grid w-full mx-auto">
                        <div className="items-center w-full mx-auto">
                            <main className="container col-span-12 transition-all">
                                {children}
                            </main>
                            <footer className="w-full place-self-center">
                                <Footer />
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export function MenuButton(
    handleToggleClick: (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void,
    toggle: boolean
): React.ReactNode {
    return (
        <button
            title="hamburger menu"
            id="btnSidebarToggler"
            onClick={(e) => handleToggleClick(e)}
            type="button"
            className="pt-1 hover:text-gray-200 place-self-center"
        >
            <div className="relative">
                <svg
                    id="navClosed"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className={`h-6 w-6 transition-all duration-75 ease-in-out ${
                        !toggle ? "opacity-100" : "absolute opacity-0"
                    }`}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                </svg>
                <svg
                    id="navOpen"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className={`h-6 w-6  ${
                        toggle ? "opacity-100" : "absolute opacity-0"
                    }`}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </div>
        </button>
    );
}

export function Sidebar() {
    const boxes = [
        {
            title: "Today",
            total: 1,
            icon: <CrossIcon className="w-4 h-4" />,
        },
        {
            title: "Scheduled",
            total: 3,
            icon: <CrossIcon className="w-4 h-4" />,
        },
        {
            title: "All",
            total: 60,
            icon: <CrossIcon className="w-4 h-4" />,
        },
        {
            title: "Flagged",
            total: 0,
            icon: <CrossIcon className="w-4 h-4" />,
        },
    ];

    const lists = [];
    lists.push(
        {
            title: "Todo List",
            total: 1,
            icon: <CrossIcon className="w-4 h-4" />,
            items: boxes,
            link: "#",
            divider: true,
            className: "border-b-2",
        },
        {
            title: "2022 Goals",
            total: 3,
            icon: <CrossIcon className="w-4 h-4" />,
            items: boxes,
            link: "#",
            divider: true,
            className: "border-b-2",
        },
        {
            title: "Article Items",
            total: 60,
            icon: <CrossIcon className="w-4 h-4" />,
            items: boxes,
            link: "#",
            divider: true,
            className: "border-b-2",
        },
        {
            title: "School",
            total: 1,
            icon: <CrossIcon className="w-4 h-4" />,
            items: boxes,
            link: "#",
            divider: true,
            className: "border-b-2",
        },
        {
            title: "Personal Finance",
            total: 3,
            icon: <CrossIcon className="w-4 h-4" />,
            items: boxes,
            link: "#",
            divider: true,
            className: "border-b-2",
        },
        {
            title: "Work",
            total: 60,
            icon: <CrossIcon className="w-4 h-4" />,
            items: boxes,
            link: "#",
            divider: true,
            className: "border-b-2",
        }
    );

    return (
        <>
            <div className="h-full px-3 py-4 overflow-y-auto bg-black/5 backdrop-blur-sm dark:bg-gray5">
                <section title="tabs-overview" className="">
                    <header>
                        <h2 className="sr-only">Tasks total</h2>
                    </header>
                    <div className="grid grid-cols-2 gap-3">
                        {boxes.map((box, index) => (
                            <div
                                key={`${index}-${box.title}`}
                                className="box box-card"
                            >
                                <div className="grid items-center justify-between grid-flow-col px-1 py-1">
                                    <div className="grid gap-2">
                                        <div className="grid items-center w-6 h-6 p-2 rounded-full aspect-square place-content-center bg-gray7">
                                            <i>{box.icon}</i>
                                        </div>
                                        <span className="font-bold font-display sm:text-xs">
                                            {box.title}
                                        </span>
                                    </div>
                                    <output className="text-2xl font-bold output place-self-start">
                                        {box.total}
                                    </output>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section title="my-lists">
                    <header>
                        <h2>My Lists</h2>
                    </header>
                    <div className="grid divide-y-2 rounded-t-lg divide-gray7/30 bg-gray6">
                        {lists.map((list, index) => (
                            <div
                                key={`${index}-${list.title}`}
                                className="box-rect box-transparent"
                            >
                                <div className="grid items-center justify-between grid-flow-col px-1 py-1 ">
                                    <div className="flex items-center gap-2">
                                        <div className="grid items-center w-6 h-6 p-2 rounded-full aspect-square place-content-center bg-gray7">
                                            <i>{list.icon}</i>
                                        </div>
                                        <div className="grid gap-2 text-md">
                                            {list.title}
                                        </div>
                                    </div>
                                    <div className="grid items-center grid-flow-col total-end text-gray3">
                                        <output className="text-lg font-display">
                                            {list.total}
                                        </output>
                                        <ChevronRightIcon className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                <nav>
                    <div className="overflow-y-hidden bg-gray7/5 backdrop-blur-lg">
                        {/* <div className="absolute left-0 right-0 -z-10 h-[4.5rem] w-[110%] bg-gray5" /> */}
                        <div className="grid items-center justify-between grid-cols-2 gap-2 px-2 py-4">
                            <button className="btn glow btn-ghost">
                                <div className="flex items-center gap-2">
                                    <PlusSmallIcon />
                                    New Reminder
                                </div>
                            </button>
                            <button className="items-center glow btn btn-ghost place-self-end">
                                <div className="flex items-center gap-2">
                                    <div className="hidden">
                                        <PencilSquareIcon />
                                    </div>
                                    Add List
                                </div>
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
}
