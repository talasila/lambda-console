import "babel-polyfill";
import { combineReduers } from "redux";
import { routeReducers } from "react-router-redux";
import login from "./Login";
import { lambdas, selectedLambda, logs, filter, invocations, inputs } from "./Lambdas";

export default combineReduers({
    routing: routerReducer,
    login,
    lambdas,
    selectedLambda,
    logs,
    filter,
    invocations,
    inputs
});