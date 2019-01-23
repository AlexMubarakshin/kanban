import * as React from "react";
import { Grid, Typography, colors, createStyles, withStyles, Fab, IconButton } from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";
import { IColumn } from "../../types/column";

const styles = (theme) => createStyles({
    title: {
        color: colors.blue[900]
    }
});

interface IColumnTitleProps {
    column: IColumn;

    onColumnDelete(): void;
}

@(withStyles(styles, { withTheme: true }) as any)
export class ColumnTitle extends React.PureComponent<IColumnTitleProps> {
    render() {
        const isBacklogColumn = this.props.column.id === 0;
        return (
            <div style={{ marginBottom: 8 }}>
                <Grid
                    container
                    justify={"space-between"}
                    direction={"row"}
                    spacing={8}>
                    <Grid item>
                        <Typography
                            className={(this.props as any).classes.title}
                            variant={"h6"}>
                            {this.props.column.name}
                        </Typography>
                    </Grid>
                    <Grid item>
                        {
                            !isBacklogColumn && (
                                <IconButton onClick={() => this.props.onColumnDelete()}>
                                    <DeleteIcon fontSize={"small"} />
                                </IconButton>
                            )
                        }
                    </Grid>
                </Grid>
            </div>
        );
    }
}