import Link from "next/link";
import { SearchModal } from "../shared";
import { splitBrandName } from "../../lib/util";
import { ReactNode } from "react";

export function Navbar({ toggle }: { toggle: ReactNode }) {
  const { b1, b2 } = splitBrandName();

  return (
    <div className="navbar container top-0 flex w-full justify-between bg-gray7 py-6 shadow-sm md:p-8">
      <div className="mr-auto flex flex-1 items-center">
        <div className="grid grid-flow-col items-center bg-black/5">
          {toggle}

          <Link
            href="/"
            className="logo flex items-center font-display text-2xl"
          >
            <span className="">{b1}</span>
            <span className=" gradient-slide">{b2}</span>
          </Link>
        </div>
      </div>

      <div className="nav-items flex items-center justify-center gap-[1.5ch] px-4 align-middle">
        <div className="grid grid-flow-col items-center gap-8 px-2">
          <Link
            href="/api"
            className="rounded-md border border-green-500 px-2 py-1 font-display text-base font-bold text-green-400 no-underline hover:no-underline hover:drop-shadow-[0_0_9px_rgba(34,197,94,0.9)]"
          >
            API
          </Link>
          <Link href="/docs" className="font-bold lowercase">
            Docs
          </Link>
          <Link href="/todos" className="font-bold lowercase">
            Todos
          </Link>
          <Link href="/about" className="font-bold lowercase">
            About
          </Link>
        </div>
        <div className="search">
          <SearchModal />
        </div>
        <div className="login">
          <a className="login-btn btn hidden sm:flex">Login</a>
          <div className="login-icon sm:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
