import * as React from "react";
import "./card.scss";

interface ICardProps {
    id: number;
    name: string;
    description: string;
}

export class Card extends React.PureComponent<ICardProps> {
    render() {
        const { props } = this;
        return (
            <div className="task-card">
                <div className="task-card__id">{`#${props.id}`}</div>
                <div className="task-card__name">{props.name}</div>
                <div className="task-card__description">{props.description}</div>
            </div>
        );
    }
}