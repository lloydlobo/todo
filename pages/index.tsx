import { Layout } from "../components/layout";
import { ScrollShow } from "../components/ui";

export default function Home() {
    return (
        <>
            <Layout title="Home">
                <div className="container">
                    <section className="">
                        <div className="flex flex-col items-center mt-20 md:flex-row">
                            <header className="flex min-w-[50%] flex-col items-center justify-center p-6 text-center">
                                <h1 className="mb-0 space-x-2 text-6xl uppercase tracking-tight disabled:[word-spacing:0.2ch]">
                                    <span>To do or not to</span>
                                    <span>
                                        <span className="gradient-slide">
                                            do
                                        </span>
                                    </span>
                                </h1>
                                <p className="max-w-[36ch] text-2xl text-gray3">
                                    Lorem ipsum dolor{" "}
                                    <span className="gradient-slide">
                                        sit amet{" "}
                                    </span>{" "}
                                    &&{" "}
                                    <span className="gradient-text gradient-text-pink">
                                        consectetur adipisicing
                                    </span>
                                    ab? Deleniti, tempora porro!
                                </p>
                                <a
                                    className="btn btn-green btn-glow"
                                    href="#truth"
                                >
                                    Start here
                                </a>
                            </header>
                            <div className="relative flex items-center justify-center w-full">
                                <div className="mx-auto mt-20 w-full bg-cover bg-no-repeat sm:max-w-[800px] md:mt-0 md:min-h-[300px] md:w-[40vw] md:max-w-[700px] md:bg-[url('/img/tv.png')]">
                                    <iframe
                                        title="video"
                                        src="https://player.vimeo.com/video/573477191"
                                        frameBorder={0}
                                        allowFullScreen
                                        className="relative mx-auto aspect-video w-full md:left-[48px] md:top-[54px] md:mx-0 md:h-auto md:w-[35vw]"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mt-12">
                        <ScrollShow repeat={true}>
                            {/* <scroll-show repeat=""></scroll-show> */}
                            <div className="flex flex-col items-center justify-center max-w-3xl mx-auto ">
                                <header>
                                    <a id="truth">
                                        <h2 className="inline-block px-6 py-4 text-6xl font-bold uppercase bg-red-500 shadow-xl text-gray7">
                                            Lorem ipsum
                                        </h2>
                                    </a>
                                </header>
                                <div className="grid text-center font-display">
                                    <div className="text-5xl icon animate-bounce">
                                        🚀
                                    </div>
                                    <p className="text-5xl font-display text-gray3">
                                        Lorem{" "}
                                        <span className="font-extrabold text-red-500 uppercase animate-pulse">
                                            dolo&apos;r
                                        </span>{" "}
                                        ipsum, dolor sit amet consectetur
                                    </p>
                                    <a href="#">
                                        <p className="text-xl tracking-wide lowercase animate-bounce">
                                            Lorem ipsum 🚀
                                        </p>
                                    </a>
                                </div>
                            </div>
                        </ScrollShow>
                    </section>

                    <section
                        className="relative grid mt-12 text-center place-content-center md:h-screen"
                        id="truth"
                    >
                        <ScrollShow repeat={true}>
                            <div className="flex flex-col items-center justify-center max-w-3xl mx-auto">
                                <header>
                                    <a>
                                        <h2 className="inline-block px-6 py-4 text-6xl font-bold uppercase bg-green-500 shadow-xl text-gray7">
                                            Dolor
                                        </h2>
                                    </a>
                                </header>
                                <div className="grid text-center font-display">
                                    <p className="text-3xl font-display text-gray4">
                                        Lorem ipsum, dolor
                                        <span className="font-extrabold text-green-500 uppercase animate-pulse">
                                            {" "}
                                            ips&apos;um{" "}
                                        </span>
                                        sit amet consectetur adipisicing elit
                                        similique et
                                    </p>
                                    <a href="#">
                                        <p className="text-xl tracking-wide lowercase animate-bounce">
                                            Lorem ipsum dolor sit adipisicing 🚀
                                        </p>
                                    </a>
                                </div>
                            </div>
                        </ScrollShow>
                    </section>

                    <section
                        className="relative grid mt-12 text-center place-content-center md:h-screen"
                        id="ipsum"
                    >
                        <ScrollShow>
                            <div className="flex flex-col items-center justify-center max-w-3xl mx-auto">
                                <header>
                                    <a>
                                        <h2 className="inline-block px-6 py-4 text-6xl font-bold uppercase bg-purple-500 shadow-xl text-gray7">
                                            Ipsum lorem
                                        </h2>
                                    </a>
                                </header>
                                <div className="grid text-center font-display">
                                    <p className="text-3xl font-display text-gray4">
                                        Lorem ipsum, dolor sit
                                        <span className="font-extrabold text-purple-500 uppercase animate-pulse">
                                            {" "}
                                            don&apos;t{" "}
                                        </span>
                                        amet consectetur adipisicing elit
                                        similique et
                                    </p>
                                    <a href="#">
                                        <p className="text-xl tracking-wide lowercase animate-bounce">
                                            Lorem ipsum dolor sit adipisicing 🚀
                                        </p>
                                    </a>
                                </div>
                            </div>
                        </ScrollShow>
                    </section>

                    <section
                        className="relative grid mt-12 text-center place-content-center12 :h-screen"
                        id="dolor"
                    >
                        <ScrollShow>
                            <div className="flex flex-col items-center justify-center max-w-3xl mx-auto">
                                <header>
                                    <a>
                                        <h2 className="inline-block px-6 py-4 text-6xl font-bold uppercase bg-yellow-500 shadow-xl text-gray7">
                                            Dolor&apos;s it
                                        </h2>
                                    </a>
                                </header>
                                <div className="grid text-center font-display">
                                    <p className="text-3xl font-display text-gray4">
                                        Lorem ipsum, dolor sit amet
                                        <span className="font-extrabold text-yellow-500 uppercase animate-pulse">
                                            {" "}
                                            si&apos;t{" "}
                                        </span>
                                        consectetur adipisicing elit similique
                                        et
                                    </p>
                                    <a href="#">
                                        <p className="text-xl tracking-wide lowercase animate-bounce">
                                            Lorem ipsum dolor sit adipisicing 🚀
                                        </p>
                                    </a>
                                </div>
                            </div>
                        </ScrollShow>
                    </section>
                </div>
            </Layout>
        </>
    );
}
