import * as React from "react";
import { Provider } from "react-redux";

import Store from "./store/store";

import { Board } from "./components/board/board";
import { PersistGate } from "redux-persist/integration/react";

export const App = () => (
    <Provider store={Store.store}>
        <PersistGate loading={null} persistor={Store.persistor}>
            <Board />
        </PersistGate>
    </Provider>
);