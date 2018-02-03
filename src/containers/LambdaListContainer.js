import { connect } from "react-redux";
import LambdaList from "../components/LambdaList";
import { loadLambdas, setSelectedLambda, setFilter } from "../actions/Lambdas";
import _ from "lodash";

const sortedList = (lambdaMap) => {
    let sortedKeys = _.keys(lambdaMap).sort();
    let sortedArray = [];

    sortedKeys.map(key => sortedArray.push(lambdaMap[key]));

    return sortedArray;
}

const mapStateToProps = state => {
    return {
        lambdas: sortedList(state.lambdas),
        selectedLambda: state.selectedLambda,
        filter: state.filter
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadLambdas: () => {
            dispatch(loadLambdas());
        },
        setSelectedLambda: lambdaId => {
            dispatch(setSelectedLambda(lambdaId));
        },
        setFilter: filter => {
            dispatch(setFilter(filter));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LambdaList);