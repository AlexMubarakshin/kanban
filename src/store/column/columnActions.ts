import { COLUMN_CREATE, COLUMN_RENAME, COLUMN_DELETE } from "../actions";

export const createNewColumn = (title: string) => ({
    type: COLUMN_CREATE,
    title
});

export const renameColumn = (id: number, title: string) => ({
    type: COLUMN_RENAME,
    title
});

export const deleteColumn = (id: number) => ({
    type: COLUMN_DELETE,
    id
});