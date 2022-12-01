import Link from "next/link";
import { DivderPill, Layout } from "../components";

export default function Error404() {
    return (
        <Layout title="404">
            <section>
                <header className="pt-4">
                    <h1 className="pt-10 text-5xl tracking-tight text-center uppercase">
                        404 Not Found
                    </h1>
                    <DivderPill className="from-red-500 to-red-400" />
                </header>
                <div className="grid items-center justify-center mx-auto">
                    <p>Ooops you just found a bug!</p>
                    <Link href={"/"} className="btn glow btn-glow">
                        Go back home!
                    </Link>
                </div>
            </section>
        </Layout>
    );
}
