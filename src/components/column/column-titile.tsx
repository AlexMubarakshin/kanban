import * as React from "react";
import { Grid, Typography } from "@material-ui/core";

interface IColumnTitleProps {
    columnName: string;
    tasksCount: number;
}

export class ColumnTitle extends React.PureComponent<IColumnTitleProps> {
    render() {
        return (
            <Grid
                container
                direction={"row"}
                spacing={8}>
                <Grid item>
                    <Typography variant={"h6"}>
                        {this.props.columnName}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography
                        variant={"h6"}
                        color={"textSecondary"}>
                        {`(${this.props.tasksCount})`}
                    </Typography>
                </Grid>
            </Grid>
        );
    }
}