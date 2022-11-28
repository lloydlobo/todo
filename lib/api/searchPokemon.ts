import { ALL_POKEMON_SPECIES } from "../constants";

/**
 * searchPokemons
 *
 * @export
 * @param {string} query
 * @return {*}  {Promise<string[]>}
 */
export function searchPokemons(query: string): Promise<string[]> {
    return new Promise((resolve) => {
        const matchingPokemons = ALL_POKEMON_SPECIES.filter(({ name }) =>
            name.includes(query.toLowerCase())
        ).map(({ name }) => name);
        // Mock timeout for the perpose of demonstration.
        setTimeout(() => resolve(matchingPokemons), 500);
    });
}
