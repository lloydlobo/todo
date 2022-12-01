import { DivderPill, Layout } from "../../components";
import Search from "../../components/shared/Search";

export default function TodosPage() {
    return (
        <Layout title="Todos app">
            <div className="hidden">
                <Search />
            </div>
            <section title="hero">
                <header className="flex justify-center gap-4 pt-12">
                    <span className="text-center text-5xl">📜</span>
                    <h1 className="gradient-slide text-center text-6xl uppercase">
                        Search
                    </h1>
                </header>
                <DivderPill />
            </section>
        </Layout>
    );
}
