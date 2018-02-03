import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Button from "material-ui/Button";
import Tabs, { Tab } from "material-ui/Tabs";
import ReactJson from "react-json-view";
import RefreshIcon from "material-ui-icons/Refresh";
import Logs from "./Logs";
import LambdaInvokeContainer from "../containers/LambdaInvokeContainer";

const styles = theme => ({
    root: {
        width: "100",
        height: "100%"
    },
    appBar: {
        width: "100%",
        position: "relative"
    },
    content: {
        backgroundColor: theme.palette.background.default,
        width: "100%",
        padding: theme.spacing.unit,
        height: `calc(100% - 64px)`,
        paddingBottom: "20px",
        overflow: "scroll"
    },
    button: {
        margin: 0,
        bottom: "auto",
        right: 20,
        top: 65,
        left: "auto",
        position: "fixed"
    }
});

class LambdaDetails extends React.Component{
    state = {
        tabValue: 0
    };

    handleChange = (event, tabValue) => {
        this.setState({tabvalue});

        if (tabValue === 1){
            this.props.loadLogs(this.props.lambda["FunctionName"]);
        }
    };

    render(){
        if (this.props.lambda) {
            <div className={this.props.classes.root}>
                <AppBar className={this.props.classes.appBar}>
                    <Tabs value={this.state.tabValue} onChange={this.handleChange}>
                        <Tab label="Configuration" />
                        <Tab label="Logs" />
                        <Tab label="Invoke" />
                    </Tabs>
                </AppBar>

                <div className={this.props.classes.content}>
                    {this.state.tabValue === 0 &&
                        <ReactJson src={this.props.lambda} displayDataTypes={false} name={false} />
                    }
                    {this.state.tabValue === 1 &&
                        <div>
                            <Button fab color="accent" aria-label="add" className={this.props.classes.button}
                                onClick={() => {this.props.loadLogs(this.props.lambda["FunctionName"])}}
                            >
                                <RefreshIcon />
                            </Button>
                            {this.props.logs && this.props.logs[this.props.lambda["FunctionName"]] &&
                                <Logs logEntries={this.props.logs[this.props.lambda["FunctionName"]]} />
                            }
                        </div>
                    }
                    {this.state.tabValue === 2 &&
                        <LambdaInvokeContainer />
                    }
                </div>
            </div>
        } else {
            return (
                <div>
                    No Lambda selected.
                </div>
            );
        }
    }
}

LambdaDetails.propTypes = {
    lambda: PropTypes.object
}

export default withStyles(styles)(LambdaDetails);