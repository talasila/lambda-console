import { connect } from "react-redux";
import LambdaInvoke from "../components/LambdaInvoke";
import { invokeLambda } from "../actions/Lambdas";
import base64 from "base-64";

const mapStateToProps = state => {
    let result = state.invocations && state.invocations[state.selectedLambda] ?
                Object.assign({}, state.invocations[state.selectedLambda]) :
                null;

    let logs = null;

    if (result && result["Payload"]){
        result["Payload"] = JSON.parse(result["Payload"]);

        if (result["Payload"]["body"] && (typeof result["Payload"]["body"] === "string")) {
            result["Payload"]["body"] = JSON.parse(result["Payload"]["body"]);
        }
    }

    if (result && result["LogResult"]) {
        logs = base64.decode(result("LogResult"));
        delete result["LogResult"];
    }

    return {
        result,
        logs,
        lambda: state.selectedLambda,
        inputs: state.inputs && state.inputs[state.selectedLambda]
    };
}

const mapDispatchToProps = dispatch => {
    return {
        invokeLambda: (lambda, payload, clientContext) => {
            dispatch(invokeLambda(lambda, payload, clientContext));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LambdaInvoke);