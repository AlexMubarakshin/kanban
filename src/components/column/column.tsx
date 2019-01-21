import * as React from "react";
import { connect } from "react-redux";

import { ITask, ITasks } from "../../types/task";
import { Task } from "../task/task";

import { Droppable } from "react-beautiful-dnd";
import { IApplicationStore } from "../../store/store";
import { createNewTask, editTask } from "../../store/tasks/taskAction";

import { getHighestId } from "../../utils";
import { Grid } from "@material-ui/core";
import { TaskCreateButton } from "../task/task-create-button";
import { ColumnTitle } from "./column-title";
import { TaskModal, TaskModalMode } from "../task/task-modal";

const mapStateToProps = (state: IApplicationStore) => ({
    tasks: state.tasksStore.tasks
});

interface IColumnProps {
    title: string;
    tasks?: ITasks;

    tasksID: number[];
    columnID: number;

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
        this.setState({createDialogOpen: true});
    }

    private onTaskOpenClick = (task: ITask) => {
        this.setState({
            currentEditTask: task
        });
    }

    private onEditTaskClose = (editedTask: ITask) => {
        if (editedTask) {
            if (editedTask.id) {
                this.props.dispatch(editTask(editedTask.id, editedTask));
            } else {
                let taskID = getHighestId(Object.keys(this.props.tasks)) + 1;
                const newTask = Object.assign(editedTask, { id: taskID});
                this.props.dispatch(createNewTask(newTask, this.props.columnID));
            }
        }

        this.setState({
            currentEditTask: undefined,
            createDialogOpen: false
        });
    }

    render() {
        const { props, state } = this;
        return (
            <>
                <Droppable droppableId={props.columnID.toString()}>
                    {(provided, snapshot) => (
                        <div
                            className="task-column"
                            ref={provided.innerRef}
                            {...provided.droppableProps}>
                            <ColumnTitle
                                columnName={props.title}
                                tasksCount={props.tasksID.length} />
                            <Grid
                                container
                                spacing={24}>
                                {
                                    props.tasksID.map((id, index) => {
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