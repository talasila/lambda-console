import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Table, { TableBody, TableCell, TableRow } from "material-ui/Table";

const styles = theme => ({
    logEntryTime: {
        width: "150px",
        color: theme.palette.secondary[500]
    },
    logEntryMsg: {
        fontFamily: "monospace",
        fontSize: "1rem"
    }
});

const Logs = ({logEntries, classes}) => {
    return (
        <Table>
            <TableBody>
                {logEntries.map((log, i) => {
                    return (
                        <TableRow key={i}>
                            <TableCell padding="dense" className={classes.logEntryTime}>{log.time}</TableCell>
                            <TableCell padding="dense" className={classes.logEntryMsg}>{log.message}</TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}

Logs.propTypes = {
    logEntries: PropTypes.arrayOf(
        PropTypes.shape({
            time: PropTypes.string,
            message: PropTypes.string
        })
    )
}

export default withStyles(styles)(Logs);