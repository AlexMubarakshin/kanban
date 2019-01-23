import { createStore, applyMiddleware, combineReducers } from "redux";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import ReduxThunk from "redux-thunk";
import logger from "redux-logger";

import storage from "redux-persist/lib/storage";

import { tasksReducer, ITasksStore } from "./tasks/taskReducer";
import { columnReducer, IColumnStore } from "./column/columnReducer";

export interface IApplicationStore {
    columnsStore: IColumnStore;
    tasksStore: ITasksStore;
}

const persistConfig: PersistConfig  = {
    key: "root",
    keyPrefix: "",
    storage,
};

const applicationReducer = combineReducers({
    columnsStore: columnReducer,
    tasksStore: tasksReducer
});


const persistedReducer = persistReducer(persistConfig, applicationReducer);

const middlewares = [logger, ReduxThunk];

const store = createStore(
    persistedReducer,
    {},
    applyMiddleware(...middlewares)
);

let persistor = persistStore(store);

export default {
    store,
    persistor
};