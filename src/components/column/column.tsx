import * as React from "react";
import { connect } from "react-redux";

import { ITask, ITasks } from "../../types/task";
import { Task } from "../task/task";

import { Droppable } from "react-beautiful-dnd";
import { Grid } from "@material-ui/core";
import { TaskCreateButton } from "../task/task-create-button";
import { ColumnTitle } from "./column-title";
import { TaskModal, TaskModalMode } from "../task/task-modal";

import { IColumn } from "../../types/column";
import { IApplicationStore } from "../../store/store";
import { createNewTask, editTask } from "../../store/tasks/taskAction";
import { deleteColumn } from "../../store/column/columnActions";

import { getHighestId } from "../../utils";

const mapStateToProps = (state: IApplicationStore) => ({
    tasks: state.tasksStore.tasks
});

interface IColumnProps {
    column: IColumn;
    tasks?: ITasks;
    onColumnRemovePress(columnID: number): void;

    dispatch?: Function;
}

interface IColumnState {
    currentEditTask?: ITask;

    createDialogOpen?: boolean;
}

@connect(mapStateToProps)
export class Column extends React.Component<IColumnProps, IColumnState> {

    state: IColumnState = {
        currentEditTask: undefined,
        createDialogOpen: false
    };

    private onNewTaskClick = () => {
        this.setState({ createDialogOpen: true });
    }

    private onTaskOpenClick = (task: ITask) => {
        this.setState({
            currentEditTask: task
        });
    }

    private onEditTaskClose = (editedTask: ITask) => {
        const { taskIDs, id } = this.props.column;
        if (editedTask) {
            const isEditMode = editedTask.id !== undefined;
            if (isEditMode) {
                this.props.dispatch(editTask(editedTask.id, editedTask));
            } else {
                let taskID = getHighestId(Object.keys(this.props.tasks)) + 1;
                const newTask = Object.assign(editedTask, { id: taskID });
                this.props.dispatch(createNewTask(newTask, id));
            }
        }

        this.setState({
            currentEditTask: undefined,
            createDialogOpen: false
        });
    }

    private onColumnDelete = () => {
        this.props.dispatch(deleteColumn(this.props.column.id));
    }

    render() {
        const { props, state, onColumnDelete } = this;
        return (
            <>
                <Droppable droppableId={props.column.id.toString()}>
                    {(provided, snapshot) => (
                        <div
                            className="task-column"
                            ref={provided.innerRef}
                            {...provided.droppableProps}>
                            <ColumnTitle
                                onColumnDelete={onColumnDelete}
                                column={props.column} />
                            <Grid
                                container
                                spacing={24}>
                                {
                                    props.column.taskIDs.map((id, index) => {
                                        return (
                                            <Grid
                                                xs={12}
                                                item
                                                key={props.tasks[id].id}>
                                                <Task
                                                    task={props.tasks[id]}
                                                    onClick={this.onTaskOpenClick}
                                                    index={index} />
                                            </Grid>
                                        );
                                    })
                                }
                                {
                                    provided.placeholder
                                }
                                <Grid item>
                                    <TaskCreateButton onPress={this.onNewTaskClick} />
                                </Grid>
                            </Grid>
                        </div>
                    )}
                </Droppable>

                {
                    state.currentEditTask && (
                        <TaskModal
                            modalMode={TaskModalMode.EDIT}
                            onClose={this.onEditTaskClose}
                            task={state.currentEditTask} />
                    )
                }
                {
                    state.createDialogOpen && (
                        <TaskModal
                            modalMode={TaskModalMode.CREATE}
                            onClose={this.onEditTaskClose} />
                    )
                }
            </>
        );
    }
}