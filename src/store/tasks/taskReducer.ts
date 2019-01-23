import { ITasks, ITask } from "../../types/task";
import { TASK_CREATE, TASK_EDIT, TASK_DELETE } from "../actions";

function editTask(oldTasks: ITasks, editedTask: ITask): ITasks {
    const updatedTasks = Object.assign({}, oldTasks);
    const updatedNewTask = Object.assign({}, editedTask);

    updatedTasks[updatedNewTask.id] = updatedNewTask;

    return updatedTasks;
}

function deleteTask(taskID: number, tasks: ITasks): ITasks {
    const updatedTasks = Object.assign({}, tasks);

    delete updatedTasks[taskID];

    return updatedTasks;
}

export interface ITasksStore {
    tasks: ITasks;
}

const initialState: ITasksStore = {
    tasks: {}
};

export const tasksReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case TASK_CREATE:
        case TASK_EDIT:
            return {
                tasks: editTask(state.tasks, action.task)
            };
        case TASK_DELETE:
            return {
                tasks: deleteTask(action.id, state.tasks)
            };

        default:
            return state;
    }
};