import * as React from "react";
import { Button, Tooltip, Fab, createStyles, withStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

interface IColumnCreate {
    onNewPress(): void;
}

const styles = (theme) => createStyles({
    fab: {
      position: "fixed",
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2,
    }
});

@(withStyles(styles, {withTheme: true}) as any)
export class ColumnCreateButton extends React.PureComponent<IColumnCreate> {
    render() {
        return (
            <Tooltip
                aria-label="Add"
                title="Add new column"
                placement={"right-end"}>
                <Fab color="primary" className={(this.props as any).classes.fab}>
                    <AddIcon onClick={() => this.props.onNewPress()} />
                </Fab>
            </Tooltip>
        );
    }
}