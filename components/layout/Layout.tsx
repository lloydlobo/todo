import Head from "next/head";
import { ReactNode } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export function Layout({
    children,
    title,
}: {
    children: ReactNode;
    title: string;
}) {
    return (
        <>
            <Head>
                <title>{title ? `${title} | Todo` : "Todo"}</title>
            </Head>

            <header className="relative">
                <nav className="sticky top-0 ">
                    <Navbar />
                </nav>
            </header>

            <main className="container">{children}</main>

            <footer>
                <Footer />
            </footer>
        </>
    );
}
