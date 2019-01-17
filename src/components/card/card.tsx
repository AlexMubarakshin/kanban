import * as React from "react";

import { Draggable } from "react-beautiful-dnd";

import "./card.scss";

interface ICardProps {
    id: number;
    name: string;
    description: string;

    index: number;
}

export class Card extends React.PureComponent<ICardProps> {
    render() {
        const { props } = this;
        return (
            <Draggable
                index={props.index}
                draggableId={props.id.toString()}>
                {
                    (provided, snapshot) => (
                        <div
                            className="task-card"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}>
                            <div className="task-card__id">{`#${props.id}`}</div>
                            <div className="task-card__name">{props.name}</div>
                            <div className="task-card__description">{props.description}</div>
                        </div>

                    )
                }

            </Draggable>
        );
    }
}