import * as React from "react";

import "./column.scss";

interface IColumnCreate {
    onNewPress(): void;
}

export class ColumnCreate extends React.PureComponent<IColumnCreate> {
    render() {
        return (
            <div className={"task-column"}>
                <div className={"task-column__title"} onClick={this.props.onNewPress}>+ Add new column</div>
            </div>
        );
    }
}