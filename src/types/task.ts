export type ITask = {
    readonly id: number;

    name: string;
    description?: string;
};

export type ITasks = { [id: number]: ITask };