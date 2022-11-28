import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextRouter, useRouter } from "next/router";
import PokemonCard from "../../components/pokemon/PokemonCard";
import { fetchPokemon } from "../../lib/api";
import { POKI_API_QUERY_KEY } from "../../lib/constants";
import { PokemonCardProps } from "../../lib/interfaces";

export interface AxiosInstance {
    request<T = any, R = AxiosResponse<T>>(
        config: AxiosRequestConfig
    ): Promise<R>;
}

//// const response = await axios.get(`${urlBase}/api/v2/pokemon/${token}/`);

export default function Pokemon(): JSX.Element {
    const router: NextRouter = useRouter();
    const isStringQueryID: boolean = typeof router.query?.id === "string";
    const pokemonID: string = isStringQueryID
        ? (router.query.id as string)
        : "";

    const {
        isSuccess,
        data: pokemon,
        isLoading,
        isError,
    } = useQuery<any, unknown[]>(
        [POKI_API_QUERY_KEY.GET_POKEMON, pokemonID],
        () => fetchPokemon(pokemonID),
        { enabled: pokemonID?.length > 0, staleTime: Infinity }
    );

    if (isSuccess) {
        if (typeof pokemon !== undefined) {
            return (
                <div className="container">
                    <PokemonCard
                        abilities={pokemon.abilities.map(
                            (item: unknown | any) => item?.ability?.name
                        )}
                        image={
                            pokemon.sprites?.other?.["official-artwork"]
                                ?.front_default
                        }
                        name={pokemon.name}
                        weight={pokemon.weight}
                        xp={pokemon.base_experience}
                    />
                </div>
            );
        }
    }
    if (isLoading)
        return <div className="text-center text-info">Loading...</div>;
    if (isError)
        return (
            <div className="flex text-center text-error">
                <p>Sorry! We couldn&apos;t find your pokemon </p>
                <div role="img" aria-label="sad">
                    😢
                </div>
            </div>
        );
    return <></>;
}

/**
 * - pre-render these pages with Next.js' getStaticProps method.
 * Using Static pre-rendering instead of server-side pre-rendering because the
 * data is publicly available, will barely ever change, and we want the best
 * possible SEO performance.
 * @source https://prateeksurana.me/blog/mastering-data-fetching-with-react-query-and-next-js/#fetching-data-on-the-server
 */
export const getStaticProps = async (context: { params: { id: string } }) => {
    const id = context.params?.id;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery([POKI_API_QUERY_KEY.GET_POKEMON, id], () =>
        fetchPokemon(id)
    );
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};

/* You should use getStaticProps if:
The data required to render the page is available at build time ahead of a user's request
The data comes from a headless CMS
The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance
The data can be publicly cached (not user-specific). This condition can be
bypassed in certain specific situation by using a Middleware to rewrite the path.
@source https://nextjs.org/docs/basic-features/data-fetching/get-static-props
*/
export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: "blocking",
    };
};
