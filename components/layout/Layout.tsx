import { AppShell, Footer, Group, Header, Text } from "@mantine/core";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { z } from "zod";
import { ShiftM } from "../../lib/util";
import { ChevronUpIcon } from "../ui";
import { FooterShell } from "./Footer";
// import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

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
      <AppShell
        padding={0}
        styles={{ main: {} }}
        fixed
        header={
          <>
            <Head>
              <title>{title ? `${title} | Todo` : "Todo"}</title>
            </Head>

            <Header height={70}>
              <nav className="sticky top-0" id="nav">
                <Text
                  className="absolute top-0 left-0 grid h-auto w-screen -translate-y-16 bg-gray7 focus-within:translate-y-20"
                  weight={"bolder"}
                >
                  <a href="#mainContent">Skip to main content</a>
                </Text>
                <Navbar toggle={MenuButton(handleToggleClick, toggle)} />
              </nav>
              <ShiftM onPress={() => handleToggleShiftM()} />
            </Header>
          </>
        }
        footer={
          <>
            <FooterShell />

            <div className="hidden">
              <Footer height={"auto"} fixed={false} p="md">
                <Group position="apart" spacing="xl">
                  <Text size="sm">
                    <span className="font-bold">List Time: </span>
                    0h 25m
                  </Text>
                </Group>
              </Footer>
            </div>
          </>
        }
      >
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

            <div id="mainContent" className="grid w-full">
              <div className="container sticky top-[90vh] z-50 justify-end place-self-end transition-all">
                <ScrollUp />
              </div>
              <div className="s-center mx-auto w-full">
                <main className="container col-span-12 transition-all">
                  {children}
                </main>
                <footer className="w-full place-self-center">
                  {/* <Footer /> */}
                </footer>
              </div>
            </div>
          </div>
        </div>
      </AppShell>
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
          className="btn btn-sm glow aspect-square rounded-full backdrop-blur-sm transition-all hover:text-green-500"
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
