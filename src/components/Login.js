import React from "react";
import Button from "material-ui/Button";
import Dialog, { DialogTitle, DialogContent, DialogActions } from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import Checkbox from "material-ui/Checkbox";
import { FormControlLabel } from "material-ui/Form";
import PropTypes form "prop-types";

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            open: true,
            userid: props.userid,
            password: props.password,
            role: props.role,
            save: props.save
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    }

    handleCheck = name => (event, checked) => {
        this.setState({
            [name]: checked
        });
    }

    render(){
        return(
            <Dialog open={this.state.open} modal="true">
                <DialogTitle>
                    Login
                </DialogTitle>

                <DialogContent>
                    <form autoComplete="on">
                        <Textfield 
                            id="userid"
                            label="UserId"
                            value={this.state.userid}
                            fullWidth
                            helperText="Your AWS userid"
                            margin="dense"
                            onChange={this.handleChange("userid")}
                        />
                        <Textfield 
                            id="password"
                            label="Password"
                            value={this.state.password}
                            type="password"
                            fullWidth
                            helperText="Your AWS password"
                            margin="dense"
                            onChange={this.handleChange("password")}
                        />
                        <Textfield 
                            id="role"
                            label="Role"
                            value={this.state.role}
                            fullWidth
                            helperText="Your AWS role"
                            margin="dense"
                            onChange={this.handleChange("role")}
                        />
                        <FormControlLabel 
                            control={
                                <Checkbox 
                                    checked={this.state.save}
                                    onChange={this.handleCheck("save")}
                                    value="save"
                                />
                            }
                            label="Save login info?"
                        />
                    </form>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => {this.props.onLoginSubmit(this.state.userid, this.state.password, this.state.role, this.state.save)}}>
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

Login.propTypes = {
    onLoginSubmit: PropTypes.func.isRequired,
    userid: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    save: PropTypes.bool.isRequired
}

export default Login;