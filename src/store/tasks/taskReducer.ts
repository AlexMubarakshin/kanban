import { ITasks, ITask } from "../../types/task";
import { TASK_CREATE, TASK_EDIT, TASK_DELETE } from "../actions";
import { getHighestId } from "../../utils";


function createNewTask(oldTasks: ITasks, newTask: ITask): ITasks {
    const updatedTasks = Object.assign({}, oldTasks);
    const updatedNewTask = Object.assign({}, newTask);

    updatedTasks[updatedNewTask.id] = updatedNewTask;

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
            return {
                tasks: createNewTask(state.tasks, action.task)
            };
        case TASK_EDIT:
            return state;
        case TASK_DELETE:
            return state;

        default:
            return state;
    }
};