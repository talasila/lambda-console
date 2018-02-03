import { connect } from "react-redux";
import App from "../components/App";

const validateStoredLoginCredentials = (state) => {
    if (state.login) {
        let lastLoginExpirationDate = new Date(state.login.awsExpirationDate),
            currentDate = new Date(),
            nextLoginNeeded = (lastLoginExpirationDate - currentDate)/60000;

        // if creds are going to expire in the next 2 mins
        if (nextLoginNeeded <= 2){
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}

const mapStateToProps = state => {
    return {
        login: validateStoredLoginCredentials(state),
        lambda: state.selectedLambda
    }
}

export default connect(
    mapStateToProps,
    null
)(App);