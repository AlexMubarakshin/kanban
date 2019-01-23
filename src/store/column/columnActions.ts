import { COLUMN_CREATE, COLUMN_RENAME, COLUMN_DELETE } from "../actions";
import { Dispatch } from "redux";
import { deleteTask } from "../tasks/taskAction";

export const createNewColumn = (title: string) => ({
    type: COLUMN_CREATE,
    title
});

export const renameColumn = (id: number, title: string) => ({
    type: COLUMN_RENAME,
    title
});

export const deleteColumn = (columnID: number) => {
    return (dispatch: Dispatch<any>, getState: () => any) => {
        const tasksIDs = getState().columnsStore.columns[columnID].taskIDs;

        tasksIDs.forEach(taskID => {
            dispatch(deleteTask(taskID));
        });

        dispatch({
            type: COLUMN_DELETE,
            id: columnID
        });
    };
};

