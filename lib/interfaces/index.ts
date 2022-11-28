export type Task = {
    readonly _id: string;
    id: number;
    readonly uuid?: string;
    slug: string;
    task: string;
    completed: boolean;
};
export type Data = {
    tasks: Task[];
};

// The first thing you notice is that the pick type generates a new object.
// Hence, it is not possible to have a primitive type as the new type, such as a
// string or a number.
export type TaskUpdate = Partial<Task> & Pick<Task, "_id">;

export type Brand = {
    name: string;
};

export type Inputs = {
    searchInput: string;
    searchInputRequired: string;
};

export type StoreActionsType = {
    readonly STORE_ADD_TASKS: string;
    readonly STORE_REMOVE_TASKS: string;
    readonly STORE_RESET_TASKS: string;
    readonly STORE_TOGGLE_COMPLETED: string;
};

export type StoreState = {
    store: {
        storeTasks: {
            totalCount: number;
            name: string;
            slug: string;
        }[];
        shippingAddress?: {
            location: {};
        };
        paymentMethod?: string;
    };
};

export type Coordinates = {
    mouseX: number;
    mouseY: number;
    barX: number;
    barY: number;
};

export type Cartesian = {
    coordinates: { dy: number; dx: number };
    radian: number;
    degree: number;
};

export interface PokemonSpecies {
    readonly name: string;
    url: string;
    id?: number;
    url_name?: string;
    url_image?: string;
    url_background?: string;
    url_background_image?: string;
    url_sprites?: string;
    url_sprites_image?: string;
    url_sprites_background?: string;
}

// Index Signatures
// Sometimes you don't know all the names of a type's properties ahead of time,
// but you do know the shape of the values.
// In those cases you can use an index signature to describe the types of
// possible values, for example:
// https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures
interface StringArray {
    [index: number]: string;
}
interface NumberOrStringDictionary {
    [index: string]: number | string;
    length: number; // ok, length is a number
    name: string; // ok, name is a string
}
// Tuple
// https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types
interface StringNumberPair {
    // specialized properties
    length: 2;
    0: string;
    1: number;

    // Other 'Array<string | number>' members...
    slice(start?: number, end?: number): Array<string | number>;
}

export interface PokemonCardProps {
    readonly abilities: ReadonlyArray<string[]>;
    readonly image: string;
    readonly name: string | PokemonSpecies["name"];
    readonly weight: number;
    readonly xp: number;
}
export interface PokeAPIFetch {
    (subString: string): Promise<any>
}
export interface PokeApiMethods<T> {
    fetchPokemon(id: string): Promise<T>;
    searchPokemons(query: string): Promise<string[]>;
};
