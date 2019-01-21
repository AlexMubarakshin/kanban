import * as React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import Store from "./store/store";

import { MuiThemeProvider } from "@material-ui/core";

import { Board } from "./components/board/board";
import { defaultTheme } from "./theme";

export const App = () => (
    <Provider store={Store.store}>
        <PersistGate loading={null} persistor={Store.persistor}>
            <MuiThemeProvider theme={defaultTheme}>
                <Board />
            </MuiThemeProvider>
        </PersistGate>
    </Provider>
);