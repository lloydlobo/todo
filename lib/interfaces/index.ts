export type Task = {
    _id: string;
    id: number;
    uuid?: string;
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
    AddTasks: string;
    RemoveTasks: string;
    Reset: string;
};

export type StoreState = {
    store: {
        storeTasks: {
            totalCount: number;
            name: string;
            slug: string;
        }[];
        shippingAddress: {
            location: {};
        };
        paymentMethod: string;
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
