import { ITask } from "../../types/task";
import { TASK_CREATE, TASK_DELETE, TASK_EDIT, TASK_CHANGE_COLUMN, TASK_MOVE_VERTICALLY } from "../actions";

export const createNewTask = (task: ITask, columnID: number) => ({
    type: TASK_CREATE,
    task,
    columnID
});

export const deleteTask = (id: number) => ({
    type: TASK_DELETE,
    id
});

export const editTask = (id: number, task: ITask) => ({
    type: TASK_EDIT,
    task
});

export const changeTaskColumn = (id: number, newColumnId: number, oldColumnId: number, newIndex: number) => ({
    type: TASK_CHANGE_COLUMN,
    id,
    oldColumnId,
    newColumnId,
    newIndex
});

export const moveTaskVertically = (id: number, newIndex: number, columnID: number) => ({
    type: TASK_MOVE_VERTICALLY,
    id,
    newIndex,
    columnID
});