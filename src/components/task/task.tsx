import * as React from "react";

import { Draggable } from "react-beautiful-dnd";

import { Card, CardContent, Typography, Divider } from "@material-ui/core";
import { ITask } from "../../types/task";

interface ITaskProps {
    task: ITask;

    index: number;
    onClick(task: ITask): void;
}

export class Task extends React.PureComponent<ITaskProps> {

    render() {
        const { task, index, onClick } = this.props;
        const hasDescription = !!task.description;

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
                                    <Typography variant="h6" component="h2" noWrap>
                                        {task.name}
                                    </Typography>
                                    {
                                        hasDescription && (
                                            <>
                                                <Divider />
                                                <Typography color="textSecondary" noWrap>
                                                    {task.description}
                                                </Typography>
                                            </>
                                        )
                                    }
                                </CardContent>
                            </Card>
                        </div>
                    )
                }
            </Draggable>
        );
    }
}