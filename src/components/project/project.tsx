import * as React from "react";

import { Column } from "../column/column";

import { ITask } from "../../types/task";

import "./project.scss";

const columnTask: ITask[] = [{
    id: 1,
    name: "First",
    description: "First task"
}, {
    id: 2,
    name: "Second",
    description: "Second task"

}];

interface IProjectProps { }

export class Project extends React.Component<IProjectProps> {
    render() {
        return (
            <div className="task-project-container">
                <Column title="TEST" tasks={columnTask}/>
                <Column title="TEST" tasks={columnTask}/>
                <Column title="TEST" tasks={columnTask}/>
                <Column title="TEST" tasks={columnTask}/>
            
            </div>
        );
    }
}