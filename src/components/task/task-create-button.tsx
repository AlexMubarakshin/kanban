import * as React from "react";
import { Button } from "@material-ui/core";

interface ITaskCreateButtonProps {
    onPress(): void;
}

export class TaskCreateButton extends React.PureComponent<ITaskCreateButtonProps> {
    render() {
        return (
            <Button onClick={this.props.onPress}>+ Add new task</Button>
        );
    }
}