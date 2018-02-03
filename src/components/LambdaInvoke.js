import React from "react";
import Button from "material-ui/Button";
import SendIcon from "material-ui-icons/Send";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import ReactJson from "react-json-view";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
    root: {
        margin: "16px"
    },
    payloadContainer: {
        margin: "8px 16px 16px 0",
        padding: "8px",
        overflow: "scroll"
    },
    payload: {
        width: "100%",
        fontFamily: "monospace",
        fontSize: "1rem",
        marginBottom: "40px"
    },
    button: {
        margin: 0,
        bottom: "auto",
        right: 20,
        top: 65,
        left: "auto",
        position: "fixed"
    },
    formMethod: {
        margin: "0 40px 20px 0"
    },
    formPath: {
        margin: "0 40px 20px 0",
        width: "50px"
    }
});

class LambdaInvoke extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            payload: this.props.inputs ? this.props.inputs : "{}"
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    }

    handleJSONPayloadEdit = updates => {
        this.setState({
            payload: JSON.stringify(updates)
        });
    }

    render(){
        return(
            <div className={this.props.classes.root}>
                <Button fab color="accent" aria-label="add" className={this.props.classes.button}
                    onClick={() => {this.props.invokeLambda(this.props.lambda, this.state.payload, {})}}
                >
                    <SendIcon />
                </Button>

                <Typography type="title">Payload</Typography>
                <Typography type="caption">Edit JSON below.</Typography>

                <Paper className={this.props.classes.payloadContainer}>
                    <ReactJson 
                        src={JSON.parse(this.state.payload)}
                        name={false}
                        displayDataTypes={false}
                        displayObjectSize={false}
                        collapsed={false}
                        onAdd={add => {return true;}}
                        onEdit={edit => {
                            this.handleJSONPayloadEdit(edit.updated_src);
                            return true;
                        }}
                    />
                </Paper>

                {this.props.result &&
                    <div>
                        <Typography type="title">Output</Typography>
                        <Paper className={this.props.classes.payloadContainer}>
                            <ReactJson src={this.props.result} displayDataTypes={false} name={false} />
                        </Paper>
                    </div>
                }

                {this.props.logs &&
                    <div>
                        <Typography type="title">Logs</Typography>
                        <Paper className={this.props.classes.payloadContainer}>
                            <pre>
                                {this.props.logs}
                            </pre>
                        </Paper>
                    </div>
                }
            </div>
        );
    }
}

export default withStyles(styles)(LambdaInvoke);