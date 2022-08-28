import React from 'react';
import './App.css';
import { Container } from 'reactstrap';
import TaskForm from './features/tasks/TaskForm';
import TaskList from './features/tasks/TaskList';
import Timer from './features/timer/Timer'
import { selectAllTasks } from './features/tasks/tasksSlice';
import Header from './features/components/Header';


function App() {


  return (
    <div className='App'>
      <Header />
      <Container className="mt-2">
        <Timer />
      </Container>
      <TaskList />

    </div>

  );
};


export default App;
