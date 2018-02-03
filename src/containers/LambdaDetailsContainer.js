import { connect } from "react-redux";
import LambdaDetails from "../components/LambdaDetails";
import { loadLogs } from "../actions/Lambdas";

const mapStateToProps = state => {
    return {
        lambda: state.lambdas[state.selectedLambda],
        logs: state.logs
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadLogs: (lambda) => {
            dispatch(loadLogs(lambda));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LambdaDetails);