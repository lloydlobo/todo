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

            {/* <section title="hero">
                <header className="flex justify-center gap-4 pt-12 sr-only">
                    <span className="text-5xl text-center">📜</span>
                    <h1 className="text-6xl text-center uppercase gradient-slide">
                        Search
                    </h1>
                    <DivderPill />
                </header>
            </section> */}
            <section>
                <header>
                    <h1 className="text-purple-400">Disney agenda</h1>
                </header>
            </section>
            <section>
                {/*
                //// TodosPlaceholder
                ////     userId: number
                ////     id: number
                ////     title: string
                //// completed: boolean
                */}
                <ul>
                    <li>
                        <div className="flex items-start gap-4">
                            <input
                                type="checkbox"
                                defaultChecked={true}
                                className="my-1"
                                onChange={(e) => {
                                    alert(e.target.checked ? "true" : "false");
                                }}
                            />
                            <div className="grid">
                                <h2 className="my-0 text-xl">
                                    Check-in at hotel
                                </h2>
                                <p className="my-0">No earlier than 3pm</p>
                                <div className="my-0 tag w-fit">To do list</div>
                            </div>
                        </div>
                    </li>
                    <li></li>
                    <li></li>
                </ul>
            </section>
        </Layout>
    );
}
