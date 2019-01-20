import * as React from "react";
import { Button } from "@material-ui/core";

interface IColumnCreate {
    onNewPress(): void;
}

export class ColumnCreate extends React.PureComponent<IColumnCreate> {
    render() {
        return (
            <Button onClick={this.props.onNewPress}>
                + Add new column
            </Button>
        );
    }
}