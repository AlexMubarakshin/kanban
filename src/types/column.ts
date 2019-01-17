export type IColumn = {
    readonly id: number;
    name: string;
    taskIDs: number[];
};

export type IColumns = { [id: string]: IColumn };