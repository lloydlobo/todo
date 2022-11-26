import Link from "next/link";
import { brand } from "../../lib/data/brand";
import { Search } from "../Search";

export function Navbar() {
    return (
        <nav className="absolute">
            <div className="fixed left-0 z-50 w-full bg-black/50">
                <div className="navbar border-b-2 border-gray-900/80 p-4 shadow-md shadow-slate-900/10 backdrop-blur-lg">
                    <ul className="grid grid-cols-5 items-center gap-x-4">
                        <li className="logo navbar-left col-span-2 text-lg font-bold">
                            {brand.name}
                        </li>
                        <li className="navbar-center col-span-2 w-full place-self-start">
                            <Search />
                        </li>
                        <li className="navbar-right grid place-content-end">
                            <ul className="list grid grid-flow-col gap-4">
                                <li>
                                    <Link href="/about" className="link">
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/api/task" className="link">
                                        TaskApi
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            {/* <div className="absolute top-0 left-8"> <ToastContainer /> </div> */}
        </nav>
    );
}
