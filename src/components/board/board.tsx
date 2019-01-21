import * as React from "react";
import { connect } from "react-redux";

import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Grid } from "@material-ui/core";

import { Column } from "../column/column";

import { ColumnCreate } from "../column/column-create";
import { IApplicationStore } from "../../store/store";
import { IColumns } from "../../types/column";
import { createNewColumn } from "../../store/column/columnActions";
import { changeTaskColumn, moveTaskVertically } from "../../store/tasks/taskAction";

const mapStateToProps = (state: IApplicationStore) => ({
    columns: state.columnsStore.columns
});

interface IBoardProps {
    dispatch?: Function;

    columns?: IColumns;
}

@connect(mapStateToProps)
export class Board extends React.Component<IBoardProps> {

    private onDragEnd = (result: DropResult) => {
        const { source, destination, draggableId } = result;
        if (!destination) {
            return; // if dropping outside of any droppable area
        }

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return; // check if we are dropping into the same place
        }
        if (source.droppableId !== destination.droppableId) {
            // dispatch two columns to first move its column, then to order it to an index accordingly
            this.props.dispatch(changeTaskColumn(
                parseInt(draggableId, 10),
                parseInt(destination.droppableId, 10),
                parseInt(source.droppableId, 10),
                destination.index
            ));
        } else {
            this.props.dispatch(moveTaskVertically(
                parseInt(draggableId, 10),
                destination.index,
                parseInt(source.droppableId, 10)
            ));
        }
    }

    private onNewColumnPress = () => {
        this.props.dispatch(createNewColumn("New column"));
    }

    render() {
        return (
            <div className="task-board-container">
                <Grid
                    direction={"row"}
                    container
                    spacing={16}
                    wrap={"nowrap"}>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        {
                            Object.keys(this.props.columns).map((key) => (
                                <Grid item xs={4} key={key}>
                                    <Column
                                        key={key}
                                        tasksID={this.props.columns[key].taskIDs}
                                        columnID={this.props.columns[key].id}
                                        title={this.props.columns[key].name} />
                                </Grid>
                            ))
                        }
                        <Grid item>
                            <ColumnCreate onNewPress={this.onNewColumnPress} />
                        </Grid>
                    </DragDropContext>
                </Grid>
            </div>
        );
    }
}