import * as React from "react";
import { connect } from "react-redux";

import { ITask, ITasks } from "../../types/task";
import { Task } from "../task/task";

import { Droppable } from "react-beautiful-dnd";
import { IApplicationStore } from "../../store/store";
import { createNewTask } from "../../store/tasks/taskAction";

import { getHighestId } from "../../utils";
import { Grid } from "@material-ui/core";
import { TaskCreate } from "../task/task-create";
import { ColumnTitle } from "./column-titile";

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

@connect(mapStateToProps)
export class Column extends React.Component<IColumnProps> {

    private onNewTaskClick = () => {
        let newTaskID = getHighestId(Object.keys(this.props.tasks)) + 1;

        let newTask: ITask = {
            id: newTaskID,
            description: "TEMP",
            name: "TEMP TASK"
        };
        this.props.dispatch(createNewTask(newTask, this.props.columnID));
    }

    render() {
        const { props } = this;
        return (
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
                            spacing={16}>
                            {
                                props.tasksID.map((id, index) => {
                                    return (
                                        <Grid item key={props.tasks[id].id}>
                                            <Task
                                                id={props.tasks[id].id}
                                                name={props.tasks[id].name}
                                                description={props.tasks[id].description}
                                                index={index} />
                                        </Grid>
                                    );
                                })
                            }
                            {
                                provided.placeholder
                            }
                            <Grid item>
                                <TaskCreate onPress={this.onNewTaskClick} />
                            </Grid>
                        </Grid>
                    </div>
                )}
            </Droppable>
        );
    }
}