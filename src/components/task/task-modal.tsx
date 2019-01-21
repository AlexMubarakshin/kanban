import * as React from "react";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@material-ui/core";
import { ITask } from "../../types/task";

export enum TaskModalMode {
    CREATE = "CREATE",
    EDIT = "EDIT",
}

interface ITaskModalProps {
    modalMode: TaskModalMode;
    task?: ITask;

    onClose(task?: ITask): void;
}

interface ITaskModalState {
    name: string;
    description: string;
}

export class TaskModal extends React.Component<ITaskModalProps, ITaskModalState> {
    constructor(props: ITaskModalProps) {
        super(props);

        const clonedTask: ITask = Object.assign({}, props.task);

        this.state = {
            name: clonedTask.name || "",
            description: clonedTask.description || ""
        };
    }

    private onClose = (needSave?: boolean) => {
        const taskID = this.props.task && this.props.task.id;
        const savedTask = needSave && { name: this.state.name, description: this.state.description, id: taskID};
        this.props.onClose(savedTask);
    }

    render() {
        const { props, state } = this;
        const { onClose, modalMode } = props;
        const label = modalMode === TaskModalMode.CREATE ? "Create new task" : `Edit ${name} #${props.task.id}`;
        return (
            <Dialog
                open={true}
                onClose={() => this.onClose()}>
                <DialogTitle>{label}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin={"dense"}
                        value={state.name}
                        id={"name"}
                        label={"Name"}
                        type={"text"}
                        onChange={(e) => { this.setState({ name: e.target.value }); }}
                        fullWidth />
                    <TextField
                        multiline
                        margin={"dense"}
                        value={state.description}
                        id={"description"}
                        label={"Description"}
                        type={"text"}
                        onChange={(e) => { this.setState({ description: e.target.value }); }}
                        fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button
                        color={"secondary"}
                        onClick={() => { this.onClose(); }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={() => { this.onClose(true); }}
                        variant="contained"
                        color={"primary"}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}