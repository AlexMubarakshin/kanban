import * as React from "react";
import { connect } from "react-redux";

import { ITask, ITasks } from "../../types/task";
import { Card } from "../card/card";

import "./column.scss";
import { Droppable } from "react-beautiful-dnd";
import { IApplicationStore } from "../../store/store";
import { createNewTask } from "../../store/tasks/taskAction";
import { ITasksStore } from "../../store";
import { getHighestId } from "../../utils";

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
                    <div className="task-column" ref={provided.innerRef} {...provided.droppableProps} >
                        <div className="task-column__title">{props.title}</div>
                        <div className="task-column__list">
                            {
                                props.tasksID.map((id, index) => {
                                    return (<Card
                                        key={props.tasks[id].id}
                                        id={props.tasks[id].id}
                                        name={props.tasks[id].name}
                                        description={props.tasks[id].description}
                                        index={index} />);
                                })
                            }
                        </div>
                        {
                            provided.placeholder
                        }
                        <div className="task-column__footer">
                            <div className="task-column__new-task" onClick={this.onNewTaskClick}>+ Add new task</div>
                        </div>
                    </div>
                )}
            </Droppable>
        );
    }
}