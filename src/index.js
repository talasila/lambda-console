import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ConectedRouter } from "react-router-redux";
import store, { history } from "./store";
import AppContainer from "./containers/AppContainer";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import blue from "material-ui/colors/blue";
import red from "material-ui/colors/red";

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: red
    }
});

render (
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <AppContainer />
            </ConnectedRouter>
        </Provider>
    </MuiThemeProvider>,
    document.querySelector("#root")
);