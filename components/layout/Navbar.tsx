import Link from "next/link";
import { brand } from "../../lib/data/brand";
import { MenuDropdown } from "../interactive";
import { Search } from "../Search";

export function Navbar() {
    return (
        <nav className="absolute">
            <div className="fixed left-0 z-50 w-full bg-black/50">
                <div className="p-4 border-b-2 shadow-md navbar border-gray-900/80 shadow-slate-900/10 backdrop-blur-lg">
                    <ul className="flex items-center justify-between gap-x-4">
                        <li className="mr-auto text-lg font-bold logo navbar-left">
                            {brand.name}
                        </li>
                        <li className="">
                            <Search />
                        </li>
                        <li className="grid place-content-end">
                            <ul className="grid grid-flow-col gap-4 list">
                                <li>
                                    <MenuDropdown />
                                </li>
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
