import React from 'react';
import './App.scss';
import { Container } from 'reactstrap';
import TaskList from './features/tasks/TaskList';
import Timer from './features/timer/Timer'
import Header from './features/components/Header';
import { useEffect } from 'react';


function App() {
  


  return (
    <>
      <Header />
      <Container className="mt-1">
        <Timer />
      </Container>
      <TaskList />

    </>
    

  );
};


export default App;
