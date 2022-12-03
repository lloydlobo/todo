import React from "react";
import {
  ChevronRightIcon,
  CrossIcon,
  PencilSquareIcon,
  PlusSmallIcon,
} from "../ui";

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
