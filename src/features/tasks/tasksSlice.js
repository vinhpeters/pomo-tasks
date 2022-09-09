import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

/* const sampleTask = {
    id: uuid(),
    name: 'Sample Task',
    notes: '',
    active: true,
    pomoCountEst: 4,
    pomoCount: 0
} */

const initialState = {
    tasksArray: []
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            if (state.tasksArray.filter((task)=> task.done===false).length === 0) {
                action.payload = {...action.payload, active: true}
            }
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
            const newCount = action.payload.pomoCount + 1;
            state.tasksArray = state.tasksArray.map((task) => task.id === action.payload.id ? { ...task, pomoCount: newCount } : task);
        },
        editTask: (state, action) => {
            state.tasksArray = state.tasksArray.map((task) => task.id === action.payload.id ? 
            { ...task, name: action.payload.name , notes: action.payload.notes, pomoCountEst: action.payload.pomoCountEst } : task);
        },
        markDone : (state, action) => {
            state.tasksArray = state.tasksArray.map((task) => task.id === action.payload.id ? 
            { ...task,  done: !task.done} : task);


        
            
        },
    }
});

export const tasksReducer = tasksSlice.reducer;
export const { addTask, removeTask, removeTaskByID, writeTasks, incrementPomoCount, editTask, markDone, markActive } = tasksSlice.actions;

export const selectAllTasks = (state) => state.tasks.tasksArray;

export const selectTaskById = (id) => (state) => {
    return state.tasks.tasksArray.find((task) => task.id === parseInt(id));
};

export const selectActiveTask = (state) => {
    return state.tasks.tasksArray.filter((task) => task.done === false)[0];
};

export const selectDoneTasks = (state) => state.tasks.tasksArray.filter((task) => task.done === true);
