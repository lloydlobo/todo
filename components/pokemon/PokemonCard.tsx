import { motion } from "framer-motion";
import Image from "next/image";
import { toast } from "react-toastify";
import { PokemonCardProps } from "../../lib/interfaces";
import { Layout } from "../layout";

const loader = ({
    src,
    width,
    quality,
}: {
    src: string;
    width?: number;
    quality?: number;
}) => {
    return `${src}`;
};

/**
 * PokemonCard.
 *
 * @export
 * @param {PokemonCardProps} {
 *     abilities,
 *     image,
 *     name,
 *     weight,
 *     xp,
 * }
 * @return {JSX.Element}
 */
export default function PokemonCard({
    abilities,
    image,
    name,
    weight,
    xp,
}: PokemonCardProps): JSX.Element {
    return (
        <>
            <Layout title={name}>
                <div className="grid w-screen">
                    <div className="shadow-slate-800/50 box hover:shadow-slate-800/50 contrast-more:border-slate-900 contrast-more:shadow-slate-500/50 grid select-none place-content-center place-self-center rounded-md border bg-black/80 bg-opacity-70 px-8 py-6 shadow-xl backdrop-blur-sm backdrop-brightness-150 transition-all delay-100 duration-700 ease-out hover:shadow-lg [&>*:nth-child(3)_p:first-child]:font-light [&>*:nth-child(3)>*>*+*]:text-[0.55rem] ">
                        <h2 className="first-letter:content-link text-center text-xl tracking-wide first-letter:font-extrabold first-letter:uppercase first-letter:tracking-widest">
                            {name}
                        </h2>
                        {/* https://www.framer.com/motion/ */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ rotate: 360, scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                            }}
                            whileTap={{
                                scale: 0.8,
                                borderRadius: "100%",
                            }}
                            whileHover={{ scale: 1.21 }}
                        >
                            <Image
                                loader={loader}
                                src={image}
                                className={`cursor-auto select-none place-self-center  opacity-90 transition-all delay-300 duration-1000 ease-in-out after:shadow-lg hover:scale-105 hover:cursor-progress hover:opacity-100 hover:ease-in`}
                                onClick={() => {
                                    toast.info(`${name}`);
                                }}
                                alt={name}
                                width={100}
                                height={100}
                                placeholder="blur"
                                blurDataURL={
                                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkVbSuBwABdgDiw53ckQAAAABJRU5ErkJggg=="
                                }
                            />
                        </motion.div>
                        <motion.ul
                            className="m-0 hidden h-40 w-40 list-none grid-cols-2 grid-rows-2 gap-4 overflow-hidden rounded-full p-4"
                            variants={container}
                            initial="hidden"
                            animate="visible"
                        >
                            {[1, 2, 3, 4].map((index) => (
                                <motion.li
                                    key={index}
                                    className="item rounded-full bg-white"
                                    variants={item}
                                />
                            ))}
                        </motion.ul>
                        <ul className="place-self-center text-xs [&>*]:grid [&>*]:grid-cols-2 [&>*]:gap-2">
                            <li>
                                <p className="card-title font-bold">XP</p>
                                <div className="card-content">{xp}</div>
                            </li>
                            <li>
                                <p className="card-title font-bold">Weight</p>
                                <div className="card-content">
                                    {weight / 10}&nbsp;kg
                                </div>
                            </li>
                            <li>
                                <p className="card-title font-bold">
                                    Abilities
                                </p>
                                {abilities.length > 0 ? (
                                    <ul>
                                        {abilities.map((ability, index) => (
                                            <li
                                                key={`${index}-${ability}`}
                                                className="tag list-item"
                                            >
                                                {ability}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="info">No abilites</div>
                                )}
                            </li>
                        </ul>
                        <button
                            type="button"
                            className="btn btn-orange btn-sm glow"
                        >
                            catch em all
                        </button>
                    </div>
                </div>
            </Layout>
        </>
    );
}

/**
 * Remote Images
 *
 * To use a remote image, the src property should be
 * a URL string, * which can be relative or absolute.
 * Because Next.js does not have access to remote files
 * during the build process, you'll need to provide the width,
 * height and optional blurDataURL props manually:
 *
 * @source https://nextjs.org/docs/basic-features/image-optimization#remote-images
 *
 * blurDataURL
 *
 * A Data URL to be used as a placeholder image before the
 * src image successfully loads.
 * Only takes effect when combined with placeholder="blur".
 *
 * Must be a base64-encoded image. It will be enlarged and blurred, so
 * a very small image (10px or less) is recommended. Including larger
 * images as placeholders may harm your application performance.
 *
 *  iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkVbSuBwABdgDiw53ckQAAAABJRU5ErkJggg==
 *  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==">
 *
 * @source https://nextjs.org/docs/api-reference/next/image#blurdataurl
 *
 */

/* Variants
    Variants are a declarative way to orchestrate complex animations throughout a
    component tree. By providing multiple components with a variants object with
    visual states of the same name, they can all be animated in sync by the
    switch of a single animate prop. */
export const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2,
        },
    },
};

export const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
};
