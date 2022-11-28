import axios from "axios";
import { PokeAPIFetch, PokeApiMethods, PokemonCardProps } from "../interfaces";
import { searchPokemons } from "./searchPokemon";

// https://stackoverflow.com/a/53901625
// AsyncFunction is a type generic that receives two type variables - the type of the input(A), and the type of the output.
type AsyncFunction<A, O> = (...args: [A]) => Promise<O>
type SearchFn<T> = AsyncFunction<[T], T>/**
 * fetchPokemon.
 * @param {string} id
 * @returns {Promise<any>}
 */
// For the second argument of useQuery, we are using axios to fetch the data
// from the PokéAPI this time, which also returns a Promise with the data or the
// error.
// const response = await axios.request<void | any, PokemonCardProps | any>({ method: "get", url: url, }); // url: typeof path !== undefined ? path : url,
// https://prateeksurana.me/blog/mastering-data-fetching-with-react-query-and-next-js/#fetching-data-on-the-server
//// const path = process.env?.API_POKE_URL_PATH + token; const _url = `https://pokeapi.co/api/v2/pokemon/25/`
// https://pokeapi.co/docs/v2#items-section
export const fetchPokemon = async (
    id: string
): Promise<any> => {
    const urlBase = "https://pokeapi.co";
    const limit = 151;
    const token = id;
    const url = `${urlBase}/api/v2/pokemon/${token}/`;
    const res = fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            return data
        });
    return res
};
