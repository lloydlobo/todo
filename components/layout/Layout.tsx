import { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
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
            <Header title={title} />
            <Navbar />
            <main className="container">{children}</main>
            <Footer />
        </>
    );
}
