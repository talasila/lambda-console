import React from "react";
import LoginContainer from "../containers/LoginContainer";
import LambdaListContainer from "../containers/LambdaListContainer";
import LambdaDetailsContainer from "../containers/LambdaDetailsContainer";
import Drawer from "material-ui/Drawer";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import "typeface-roboto";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        width: "100%",
        height: "100%",
        zIndex: 1,
        backgroundColor: theme.palette.background.default,
        overflow: "hidden"
    },
    appbar: {
        padding: "18px",
        height: "60px",
        position: "relative"
    },
    drawerPaper: {
        height: "100%",
        width: drawerWidth
    },
    drawerHeader: {
        padding: "12px 16px"
    },
    content: {
        height: "100%",
        overflow: "hidden",
        marginLeft: drawerWidth
    }
});

const App = () => {
    if (login) {
        return (
            <div className={classes.root}>
                <Drawer type="permanent" classes={{paper: classes.drawerPaper}}>
                    <div className={classes.drawerHeader}>
                        <Typography type="title">Lambda Console</Typography>
                        <Typography type="caption">v 0.0.1</Typography>
                    </div>

                    <LambdaListContainer />
                </Drawer>

                <div className={classes.content}>
                    {lambda && <LambdaDetailsContainer />}
                </div>
            </div>
        )
    } else {
        return <LoginContainer />
    }
}

export default withStyles(styles)(App);