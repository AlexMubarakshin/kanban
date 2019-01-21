import * as React from "react";

import { Draggable } from "react-beautiful-dnd";

import { Card, CardContent, Typography } from "@material-ui/core";
import { ITask } from "../../types/task";

interface ITaskProps {
    task: ITask;

    index: number;
    onClick(task: ITask): void;
}

export class Task extends React.PureComponent<ITaskProps> {
    render() {
        const { task, index, onClick} = this.props;
        return (
            <Draggable
                index={index}
                draggableId={task.id.toString()}>
                {
                    (provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => onClick(task)}>
                            <Card>
                                <CardContent>
                                    <Typography variant="headline" component="h2" noWrap>
                                        {task.name}
                                    </Typography>
                                    <Typography color="textSecondary" noWrap>
                                        {task.description}
                                    </Typography>
                                    <Typography component="p" noWrap>
                                        {`#${task.id}`}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                    )
                }
            </Draggable>
        );
    }
}