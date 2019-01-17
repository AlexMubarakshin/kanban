import * as React from "react";
import { Provider } from "react-redux";

import { store } from "./store/store";

import { Board } from "./components/board/board";

export const App = () => (
    <Provider store={store}>
        <Board />
    </Provider>
);