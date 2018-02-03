import { connect } from "react-redux";
import { login } from "../actions/Login";
import Login from "../components/Login";

const mapStateToProps = state => {
    return {
        userid: state.login.userid,
        password: state.login.password,
        role: state.login.role,
        save: state.login.save
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoginSubmit: (userid, password, role, save) => {
            dispatch(login(userid, password, role, save));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);