import React from "react";
import List, { ListItem, ListItemText } from "material-ui/List";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import TextField from "material-ui/TextField";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
    filter: {
        padding: "0 16px"
    },
    selectedItem: {
        background: theme.palette.primary[100]
    },
    hide: {
        display: "none"
    },
    show: {
        display: "block"
    }
});

class LambdaList extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            startsWith: this.props.filter
        }
    }

    componentWillMount = () => {
        // load if no data in localstorage
        // TODO: auto-reload after a certain duration?
        if (!this.props.lambdas){
            this.props.loadLambdas();
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });

        this.props.setFilter(event.target.value);
    }

    render(){
        if (this.props.lambdas){
            return(
                <div>
                    <div className={this.props.classes.filter}>
                        <TextField 
                            id="startsWith"
                            label="Filter"
                            value={this.state.startsWith}
                            helperText="Lambdas starting with..."
                            onChange={this.handleChange("startsWith")}
                            margin="dense"
                            fullWidth
                        />
                    </div>

                    <List>
                        {this.props.lambdas.map((n) => {
                            return (
                                <div key={n.FunctionName} className={n.FunctionName.startsWith(this.state.startsWith) ? this.props.classes.show : this.props.classes.hide}>
                                    <ListItem button dense onClick={() => {this.props.setSelectedLambda(n.FunctionName)}} className={(n.FunctionName === this.props.selectedLambda) ? this.props.classes.selectedItem : ""}>
                                        <ListItemText primary={n.FunctionName} secondary={new Date(n.LastModified).toLocaleString} />
                                    </ListItem>
                                </div>
                            );
                        })}
                    </List>

                    <Button color="primary" onClick={() => {this.props.loadLambdas()}}>
                        Refresh
                    </Button>
                </div>
            );
        } else {
            return(
                <Typography type="caption">Loading...</Typography>
            );
        }
    }
}

LambdaList.propTypes = {
    loadLambdas: PropTypes.func.isRequired,
    setSelectedLambda: PropTypes.func.isRequired
}

export default withStyles(sytles)(LambdaList);