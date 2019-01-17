export type IProject = {
    readonly id: number;
    columnIds: number;
};

export type iProjects = { [id: string]: IProject };