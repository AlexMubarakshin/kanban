import { IColumns, IColumn } from "../../types/column";
import { COLUMN_CREATE, COLUMN_DELETE, COLUMN_RENAME, TASK_CREATE, TASK_CHANGE_COLUMN, TASK_MOVE_VERTICALLY } from "../actions";
import { getHighestId } from "../../utils";


function addNewTaskInColumn(taskID: number, columnID: number, columns: IColumns): IColumns {
    const updatedColumns = Object.assign({}, columns);

    updatedColumns[columnID].taskIDs.push(taskID);

    return updatedColumns;
}

function changeTaskColumn(taskID: number, newColumnID: number, oldColumnID: number, newIndex: number, columns: IColumns): IColumns {
    const sourceColumnTasks = [...columns[oldColumnID].taskIDs];
    sourceColumnTasks.splice(sourceColumnTasks.indexOf(taskID), 1);

    const targetColumnTasks = columns[newColumnID].taskIDs;
    targetColumnTasks.splice(newIndex, 0, taskID);
    const updatedColumns = {
        ...columns,
        [oldColumnID]: {
            ...columns[oldColumnID],
            taskIDs: sourceColumnTasks
        },
        [newColumnID]: {
            ...columns[newColumnID],
            taskIDs: [...targetColumnTasks]
        }
    };

    return updatedColumns;
}


function moveTaskVertically(id: number, newIndex: number, columnID: number, columns: IColumns): IColumns {
    const newTaskIds = columns[columnID].taskIDs;
    const oldIndex = newTaskIds.indexOf(id);
    newTaskIds.splice(oldIndex, 1); // delete where it used to be
    newTaskIds.splice(newIndex, 0, id); // add to where it should be
    return {
        ...columns,
        [columnID]: {
            ...columns[columnID],
            taskIds: [...newTaskIds]
        }
    };
}

function removeColumn(columnID: number, columns: IColumns): IColumns {
    const updatedColumns = Object.assign({}, columns);

    delete updatedColumns[columnID];

    return updatedColumns;
}

export interface IColumnStore {
    columns: IColumns;
}

const initialState: IColumnStore = {
    columns: {
        0: { taskIDs: [], id: 0, name: "Backlog" }
    }
};

export const columnReducer = (state = initialState, action: any): IColumnStore => {
    switch (action.type) {
        case COLUMN_CREATE:
            const newColumnID = getHighestId(Object.keys(state.columns)) + 1;
            const newColumn: IColumn = { id: newColumnID, name: action.title, taskIDs: [] };
            const updatedColumns = Object.assign({}, state.columns);
            updatedColumns[newColumnID] = newColumn;
            return {
                columns: updatedColumns
            };
        case COLUMN_RENAME:
            return state;
        case COLUMN_DELETE:
            const isBacklogColumn = action.id === 0;
            if (!isBacklogColumn) {
                 return {
                     columns: removeColumn(action.id, state.columns)
                 };
            }

            return state;

        case TASK_CREATE:
            return {
                columns: addNewTaskInColumn(action.task.id, action.columnID, state.columns)
            };

        case TASK_CHANGE_COLUMN:
            return {
                columns: changeTaskColumn(
                    action.id,
                    action.newColumnId,
                    action.oldColumnId,
                    action.newIndex,
                    state.columns
                )
            };

        case TASK_MOVE_VERTICALLY: {
            return {
                columns: moveTaskVertically(action.id, action.newIndex, action.columnID, state.columns)
            };
        }

        default:
            return state;
    }
};