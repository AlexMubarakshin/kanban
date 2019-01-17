import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";

import { tasksReducer, ITasksStore } from "./tasks/taskReducer";
import { columnReducer, IColumnStore } from "./column/columnReducer";

export interface IApplicationStore {
    columnsStore: IColumnStore;
    tasksStore: ITasksStore;
}

const applicationReducer = combineReducers({
    columnsStore: columnReducer,
    tasksStore: tasksReducer
});

export const store = createStore(
    applicationReducer,
    applyMiddleware(logger)
);

// store.subscribe(() => { });