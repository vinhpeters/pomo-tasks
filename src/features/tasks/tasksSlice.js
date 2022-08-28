import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

const sampleTask = {
    id: uuid(),
    name: 'Sample Task',
    notes: '',
    active: true,
    pomoCountEst: 4,
    pomoCount: 0
}

const initialState = {
    tasksArray: [sampleTask]
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasksArray.push(action.payload);
        },
        removeTask: (state, action) => {
            state.tasksArray = state.tasksArray.filter(
                (task) => task.id !== action.payload.id
            );
        },
        removeTaskByID: (state, action) => {
            state.tasksArray = state.tasksArray.filter(
                (task) => task.id !== action.payload
            );
        },
        writeTasks: (state, action) => {
            state.tasksArray = action.payload
        },
        incrementPomoCount: (state, action) => {
            console.log(action.payload)
            const newCount = action.payload.pomoCount + 1;
            state.tasksArray = state.tasksArray.map((task) => task.id === action.payload.id ? { ...task, pomoCount: newCount } : task);
        }
    }
});

export const tasksReducer = tasksSlice.reducer;
export const { addTask, removeTask, removeTaskByID, writeTasks, incrementPomoCount } = tasksSlice.actions;
export const selectAllTasks = (state) => state.tasks.tasksArray;

export const selectTaskById = (id) => (state) => {
    return state.tasks.tasksArray.find((task) => task.id === parseInt(id));
};

export const selectActiveTask = (state) => {
    return state.tasks.tasksArray.find((task) => task.active === true);
};