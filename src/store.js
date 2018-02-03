import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "react-router-redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import createHistory from "history/createBrowserHistory";
import rootReducer from "./reducers";
import { loadState, saveState } from "./localstorage";
import { throttle } from "lodash";

export const history = createHistory();

const initialState = loadState(),
    enhancers = [],
    middleware = [
        thunk,
        routerMiddleware(history),
        logger
    ];

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);

const store = createStore(
    rootReducer,
    initialState,
    composedEnhancers
);

store.subscribe(throttle(() => {
    saveState(
        {
            login: store.getState().login,
            lambdas: store.getState().lambdas,
            selectedLambda: store.getState().selectedLambda,
            inputs: store.getState().inputs,
            filter: store.getState().filter ?
                    store.getState().filter : 
                    (
                        store.getState().selectedLambda ?
                        store.getState().selectedLambda.substring(0,5) :
                        ""
                    )

        }
    );
}), 1000);