import Link from "next/link";

/**
 * PokemonSearchResult.
 *
 * @export
 * @param {{
 *     pokemons: string[];
 * }} {
 *     pokemons,
 * }
 * @return {*}  {JSX.Element}
 */
export function PokemonSearchResult({
    pokemons,
}: {
    pokemons: string[];
}): JSX.Element {
    return pokemons.length > 0 ? (
        <div className="search-grid">
            {pokemons.map((pokemon) => (
                <Link href={`/pokemon/${pokemon}`} key={pokemon}>
                    <div className="pokemon-card">{pokemon}</div>
                </Link>
            ))}
        </div>
    ) : (
        <div className="search-message text-sky-600">No pokemon found</div>
    );
}
