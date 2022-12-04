import { Group, useMantineTheme } from "@mantine/core";
import { useRef } from "react";
import { Layout } from "../components/layout";
import { ScrollShow } from "../components/ui";
import { TextSpan } from "../components/ui/animation";

export default function Home() {
  const sentence = "To do or not".split("");
  const sentence2 = "To do".split("");
  const refLetter = useRef(null);

  const space = "\u00A0"; // Similar to HTML's &nbsp; but gets read as space.
  const theme = useMantineTheme();
  return (
    <>
      <Layout title="Home">
        <Group>
          <div className="container">
            <section className="">
              <div className="mt-20 flex flex-col items-center md:flex-row">
                <header className="flex min-w-[50%] flex-col items-center justify-center p-6 text-center">
                  <h1 className="mb-0 space-x-2 text-6xl uppercase tracking-tight disabled:[word-spacing:0.2ch]">
                    <div className="framer mx-auto mb-4 max-w-md whitespace-pre-wrap">
                      {sentence.map((letter, index) => (
                        <span ref={refLetter} key={`${index}-${letter}`}>
                          <TextSpan>{letter === " " ? space : letter}</TextSpan>
                        </span>
                      ))}
                      <span
                        style={{
                          backgroundSize: "200% 80%",
                          // animation: "gradiant-move 2s ease-in-out infinite",
                        }}
                        className="bg-gradient-to-t from-orange-500 to-yellow-400 bg-clip-text px-[1ch] text-orange-500 text-transparant/5  hover:text-orange-500 "
                      >
                        {sentence2.map((letter, index) => (
                          <span ref={refLetter} key={`${index}-${letter}-2`}>
                            <TextSpan>
                              {letter === " " ? space : letter}
                            </TextSpan>
                          </span>
                        ))}
                      </span>
                    </div>

                    {/* <div className="hero-title">
                    <span>To do or not to</span>
                    <span>
                      <span className="gradient-slide">do</span>
                    </span>
                  </div> */}
                  </h1>
                  <p className="max-w-[36ch] text-2xl text-gray3">
                    Lorem ipsum dolor{" "}
                    <span className="gradient-slide">sit amet </span> &&{" "}
                    <span className="gradient-text gradient-text-pink">
                      consectetur adipisicing
                    </span>
                    ab? Deleniti, tempora porro!
                  </p>
                  <a className="btn btn-green btn-glow" href="#truth">
                    Start here
                  </a>
                </header>
                <div className="relative flex w-full items-center justify-center">
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
              {/* <Group style={{ color: theme.colors.gray[2] }}> */}
              <ScrollShow repeat={true}>
                {/* <scroll-show repeat=""></scroll-show> */}
                <div className="mx-auto flex max-w-3xl flex-col items-center justify-center ">
                  <header>
                    <a id="truth">
                      <h2 className="inline-block bg-red-500 px-6 py-4 text-6xl font-bold uppercase text-gray7 shadow-xl">
                        Lorem ipsum
                      </h2>
                    </a>
                  </header>
                  <div className="grid text-center font-display">
                    <div className="icon animate-bounce text-5xl">🚀</div>
                    <p className="font-display text-5xl text-gray3">
                      Lorem{" "}
                      <span className="animate-pulse font-extrabold uppercase text-red-500">
                        dolo&apos;r
                      </span>{" "}
                      ipsum, dolor sit amet consectetur
                    </p>
                    <a href="#">
                      <p className="animate-bounce text-xl lowercase tracking-wide">
                        Lorem ipsum 🚀
                      </p>
                    </a>
                  </div>
                </div>
              </ScrollShow>
              {/* </Group> */}
            </section>

            <section
              className="relative mt-12 grid place-content-center text-center md:h-screen"
              id="truth"
            >
              <ScrollShow repeat={true}>
                <div className="mx-auto flex max-w-3xl flex-col items-center justify-center">
                  <header>
                    <a>
                      <h2 className="inline-block bg-green-500 px-6 py-4 text-6xl font-bold uppercase text-gray7 shadow-xl">
                        Dolor
                      </h2>
                    </a>
                  </header>
                  <div className="grid text-center font-display">
                    <p className="font-display text-3xl text-gray4">
                      Lorem ipsum, dolor
                      <span className="animate-pulse font-extrabold uppercase text-green-500">
                        {" "}
                        ips&apos;um{" "}
                      </span>
                      sit amet consectetur adipisicing elit similique et
                    </p>
                    <a href="#">
                      <p className="animate-bounce text-xl lowercase tracking-wide">
                        Lorem ipsum dolor sit adipisicing 🚀
                      </p>
                    </a>
                  </div>
                </div>
              </ScrollShow>
            </section>

            <section
              className="relative mt-12 grid place-content-center text-center md:h-screen"
              id="ipsum"
            >
              <ScrollShow>
                <div className="mx-auto flex max-w-3xl flex-col items-center justify-center">
                  <header>
                    <a>
                      <h2 className="inline-block bg-purple-500 px-6 py-4 text-6xl font-bold uppercase text-gray7 shadow-xl">
                        Ipsum lorem
                      </h2>
                    </a>
                  </header>
                  <div className="grid text-center font-display">
                    <p className="font-display text-3xl text-gray4">
                      Lorem ipsum, dolor sit
                      <span className="animate-pulse font-extrabold uppercase text-purple-500">
                        {" "}
                        don&apos;t{" "}
                      </span>
                      amet consectetur adipisicing elit similique et
                    </p>
                    <a href="#">
                      <p className="animate-bounce text-xl lowercase tracking-wide">
                        Lorem ipsum dolor sit adipisicing 🚀
                      </p>
                    </a>
                  </div>
                </div>
              </ScrollShow>
            </section>

            <section
              className="place-content-center12 :h-screen relative mt-12 grid text-center"
              id="dolor"
            >
              <ScrollShow>
                <div className="mx-auto flex max-w-3xl flex-col items-center justify-center">
                  <header>
                    <a>
                      <h2 className="inline-block bg-yellow-500 px-6 py-4 text-6xl font-bold uppercase text-gray7 shadow-xl">
                        Dolor&apos;s it
                      </h2>
                    </a>
                  </header>
                  <div className="grid text-center font-display">
                    <p className="font-display text-3xl text-gray4">
                      Lorem ipsum, dolor sit amet
                      <span className="animate-pulse font-extrabold uppercase text-yellow-500">
                        {" "}
                        si&apos;t{" "}
                      </span>
                      consectetur adipisicing elit similique et
                    </p>
                    <a href="#">
                      <p className="animate-bounce text-xl lowercase tracking-wide">
                        Lorem ipsum dolor sit adipisicing 🚀
                      </p>
                    </a>
                  </div>
                </div>
              </ScrollShow>
            </section>
          </div>
        </Group>
      </Layout>
    </>
  );
}
