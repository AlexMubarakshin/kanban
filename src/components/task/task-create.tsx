import * as React from "react";
import { Button } from "@material-ui/core";

interface ITaskCreateProps {
    onPress(): void;
}

export class TaskCreate extends React.PureComponent<ITaskCreateProps> {
    render() {
        return (
            <Button onClick={this.props.onPress}>+ Add new task</Button>
        );
    }
}