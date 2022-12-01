import {
    ChevronRightIcon,
    CrossIcon,
    DivderPill,
    Layout,
    PencilSquareIcon,
    PlusSmallIcon,
} from "../../components";
import Search from "../../components/shared/Search";

export default function TodosPage() {
    return (
        <Layout title="Todos app">
            <div className="hidden">
                <Search />
            </div>
            {/* TODO: Toggle aside hidden ... */}
            <aside className="">
                <Sidebar />
            </aside>
            <section title="hero">
                <header className="flex justify-center gap-4 pt-12 sr-only">
                    <span className="text-5xl text-center">📜</span>
                    <h1 className="text-6xl text-center uppercase gradient-slide">
                        Search
                    </h1>
                    <DivderPill />
                </header>
            </section>
        </Layout>
    );
}

export function Sidebar() {
    // search: <Search />,
    // list: <TodoList />,
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
            title: "Upcoming",
            total: 1,
            icon: <CrossIcon className="w-4 h-4" />,
            items: boxes,
            link: "#",
            divider: true,
            className: "border-b-2",
        },
        {
            title: "Completed",
            total: 3,
            icon: <CrossIcon className="w-4 h-4" />,
            items: boxes,
            link: "#",
            divider: true,
            className: "border-b-2",
        },
        {
            title: "All",
            total: 60,
            icon: <CrossIcon className="w-4 h-4" />,
            items: boxes,
            link: "#",
            divider: true,
            className: "border-b-2",
        },
        {
            title: "Upcoming",
            total: 1,
            icon: <CrossIcon className="w-4 h-4" />,
            items: boxes,
            link: "#",
            divider: true,
            className: "border-b-2",
        },
        {
            title: "Completed",
            total: 3,
            icon: <CrossIcon className="w-4 h-4" />,
            items: boxes,
            link: "#",
            divider: true,
            className: "border-b-2",
        },
        {
            title: "All",
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
            <div className="bg-black/5 backdrop-blur-sm">
                <section title="tabs-overview" className="">
                    <header>
                        <h2 className="sr-only">Tasks total</h2>
                    </header>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
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
                        <div className="grid items-center grid-cols-2 gap-2 px-2 py-4">
                            <button className="grid btn btn-ghost">
                                <div className="flex items-center gap-2">
                                    <PlusSmallIcon />
                                    New Reminder
                                </div>
                            </button>
                            <button className="grid items-center btn btn-ghost">
                                <div className="flex items-center gap-2">
                                    <PencilSquareIcon />
                                    Edit
                                </div>
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
}
