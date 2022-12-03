import Head from "next/head";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { z } from "zod";
import { ShiftM } from "../../lib/util";
import {
  ChevronRightIcon,
  ChevronUpIcon,
  CrossIcon,
  PencilSquareIcon,
  PlusSmallIcon,
} from "../ui";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

// FIXME: Overflow x axis in main.
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
        <nav className="sticky top-0" id="nav">
          <Navbar toggle={MenuButton(handleToggleClick, toggle)} />
        </nav>
        <ShiftM onPress={() => handleToggleShiftM()} />
      </header>

      <div className="mx-auto grid w-screen place-content-center">
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

          <div className="grid w-full">
            <div className="container sticky top-[90vh] z-50 justify-end place-self-end transition-all">
              <ScrollUp />
            </div>
            <div className="s-center mx-auto w-full">
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

/**
 * ScrollUp button.
 *
 * @returns JSX.Element.
 * @sources https://stackabuse.com/how-to-scroll-to-top-in-react-with-a-button-component/
 * @sources https://github.com/fireship-io/fireship.io/blob/master/app/util/scroll.ts
 */
function ScrollUp(): JSX.Element {
  const [scrollTop, setScrollTop] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", (): void => {
      return window.scrollY > 200 ? setScrollTop(true) : setScrollTop(false);
    });

    return () => {
      window.removeEventListener("scroll", () => {
        setScrollTop(false);
      });
    };
  }, []);

  type mouseEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;

  const handleOnClick = (e: mouseEvent) => {
    e.preventDefault();
    const nav = window.document.getElementById("nav");

    if (nav) {
      let top: number;

      top = nav.scrollTop; // 0
      window?.scrollTo({ top: top, behavior: "smooth" });
    }
  };

  return (
    <>
      <div
        className={`absolute top-0 right-4 transition-all duration-300 hover:drop-shadow-[0_0_9px_rgba(34,197,94,0.9)] ${
          scrollTop
            ? "scroll-up scale-100 opacity-100 ease-in"
            : "glow scale-50 opacity-0 mix-blend-hue blur-lg brightness-75 hue-rotate-180  "
        }`}
      >
        <button
          type="button"
          title="scroll up"
          className=" btn btn-sm glow aspect-square rounded-full backdrop-blur-sm transition-all  hover:text-green-500"
          onClick={(e) => handleOnClick(e)}
        >
          <ChevronUpIcon className="h-6 w-6 stroke-2 " />
        </button>
      </div>
      <style>{`
      .scroll-up {
        // animation: scrollup 5s infinite;
      }

      .scroll-up:target,
      .scroll-up:hover,
      .scroll-up:focus-within,
      .scroll-up:focus {
        scale: 1;
        animation: squeeze 0.3s 1;
      }

        @keyframes squeeze {
          0% {
            transform: scale3d(1.0, 1.0, 1.0);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          25% {
            transform: scale3d(0.98, 1.01, 1.0);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          45% {
            transform: scale3d(0.93, 1.04, 1.0);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: scale3d(0.90, 1.08, 1.0);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          750% {
            transform: scale3d(0.98, 1.01, 1.0);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          100% {
            transform: scale3d(1.0, 1.0, 1.0);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
        }

      @keyframes scrollup {
        0%, 9%, 100% {
            transform: translateY(0px);
            // animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
        }
        5% {
            transform: translateY(-0.5px);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
        }
        38% {
            transform: translateY(5px);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
        }
        39% {
            transform: translateY(5.5px);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
        }
      }

      `}</style>
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
      className="hover:text-gray-200 place-self-center pt-1"
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
      icon: <CrossIcon className="h-4 w-4" />,
    },
    {
      title: "Scheduled",
      total: 3,
      icon: <CrossIcon className="h-4 w-4" />,
    },
    {
      title: "All",
      total: 60,
      icon: <CrossIcon className="h-4 w-4" />,
    },
    {
      title: "Flagged",
      total: 0,
      icon: <CrossIcon className="h-4 w-4" />,
    },
  ];

  const lists = [];
  lists.push(
    {
      title: "Todo List",
      total: 1,
      icon: <CrossIcon className="h-4 w-4" />,
      items: boxes,
      link: "#",
      divider: true,
      className: "border-b-2",
    },
    {
      title: "2022 Goals",
      total: 3,
      icon: <CrossIcon className="h-4 w-4" />,
      items: boxes,
      link: "#",
      divider: true,
      className: "border-b-2",
    },
    {
      title: "Article Items",
      total: 60,
      icon: <CrossIcon className="h-4 w-4" />,
      items: boxes,
      link: "#",
      divider: true,
      className: "border-b-2",
    },
    {
      title: "School",
      total: 1,
      icon: <CrossIcon className="h-4 w-4" />,
      items: boxes,
      link: "#",
      divider: true,
      className: "border-b-2",
    },
    {
      title: "Personal Finance",
      total: 3,
      icon: <CrossIcon className="h-4 w-4" />,
      items: boxes,
      link: "#",
      divider: true,
      className: "border-b-2",
    },
    {
      title: "Work",
      total: 60,
      icon: <CrossIcon className="h-4 w-4" />,
      items: boxes,
      link: "#",
      divider: true,
      className: "border-b-2",
    }
  );

  return (
    <>
      <div className="h-full overflow-y-auto bg-black/5 px-3 py-4 backdrop-blur-sm dark:bg-gray5">
        <section title="tabs-overview" className="">
          <header>
            <h2 className="sr-only">Tasks total</h2>
          </header>
          <div className="grid grid-cols-2 gap-3">
            {boxes.map((box, index) => (
              <div key={`${index}-${box.title}`} className="box box-card">
                <div className="grid grid-flow-col items-center justify-between px-1 py-1">
                  <div className="grid gap-2">
                    <div className="grid aspect-square h-6 w-6 place-content-center items-center rounded-full bg-gray7 p-2">
                      <i>{box.icon}</i>
                    </div>
                    <span className="font-display font-bold sm:text-xs">
                      {box.title}
                    </span>
                  </div>
                  <output className="output place-self-start text-2xl font-bold">
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
          <div className="grid divide-y-2 divide-gray7/30 rounded-t-lg bg-gray6">
            {lists.map((list, index) => (
              <div
                key={`${index}-${list.title}`}
                className="box-rect box-transparent"
              >
                <div className="grid grid-flow-col items-center justify-between px-1 py-1 ">
                  <div className="flex items-center gap-2">
                    <div className="grid aspect-square h-6 w-6 place-content-center items-center rounded-full bg-gray7 p-2">
                      <i>{list.icon}</i>
                    </div>
                    <div className="text-md grid gap-2">{list.title}</div>
                  </div>
                  <div className="total-end grid grid-flow-col items-center text-gray3">
                    <output className="font-display text-lg">
                      {list.total}
                    </output>
                    <ChevronRightIcon className="h-4 w-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <nav>
          <div className="overflow-y-hidden bg-gray7/5 backdrop-blur-lg">
            {/* <div className="absolute left-0 right-0 -z-10 h-[4.5rem] w-[110%] bg-gray5" /> */}
            <div className="grid grid-cols-2 items-center justify-between gap-2 px-2 py-4">
              <button className="btn glow btn-ghost">
                <div className="flex items-center gap-2">
                  <PlusSmallIcon />
                  New Reminder
                </div>
              </button>
              <button className="glow btn btn-ghost items-center place-self-end">
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
