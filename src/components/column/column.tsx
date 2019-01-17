import * as React from "react";
import { ITask } from "../../types/task";
import { Card } from "../card/card";

import "./column.scss";

interface IColumnProps {
    title: string;
    tasks: ITask[];
}

export class Column extends React.Component<IColumnProps> {
    private onNewTaskClick = () => {
        console.info("Not implemented!");
    }

    render() {
        return (
            <div className="task-column">
                <div className="task-column__title">{this.props.title}</div>
                <div className="task-column__list">
                    {
                        this.props.tasks.map((task) => (
                            <Card
                                key={task.id}
                                id={task.id}
                                name={task.name}
                                description={task.description} />
                        ))
                    }
                </div>
                <div className="task-column__footer">
                    <div className="task-column__new-task" onClick={this.onNewTaskClick}>+ Add new task</div>
                </div>
            </div>
        );
    }
}