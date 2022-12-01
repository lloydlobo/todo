import { DivderPill, Layout } from "../components";

export default function About() {
    return (
        <Layout title="About">
            <section title="hero">
                <header>
                    <h1 className="text-center">About Page</h1>
                    <DivderPill />
                </header>
            </section>
        </Layout>
    );
}
