import * as React from "react";

import { Draggable } from "react-beautiful-dnd";

import { Card, CardContent, Typography } from "@material-ui/core";

interface ITaskProps {
    id: number;
    name: string;
    description: string;

    index: number;
}

export class Task extends React.PureComponent<ITaskProps> {
    render() {
        const { props } = this;
        return (
            <Draggable
                index={props.index}
                draggableId={props.id.toString()}>
                {
                    (provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}>
                            <Card>
                                <CardContent>
                                    <Typography variant="headline" component="h2" noWrap>
                                        {props.name}
                                    </Typography>
                                    <Typography color="textSecondary" noWrap>
                                        {props.description}
                                    </Typography>
                                    <Typography component="p" noWrap>
                                        {`#${props.id}`}
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