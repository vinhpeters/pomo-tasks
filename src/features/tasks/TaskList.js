import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Container } from "reactstrap";
import { selectAllTasks,  writeTasks } from './tasksSlice';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import Task from './Task';
import TaskForm from './TaskForm';


const TaskList = () => {
    let tasks = useSelector(selectAllTasks)

    const dispatch = useDispatch();

 

    const handleOnDragEnd = (result) => {
        const items = Array.from(tasks);
        if (items.length > 1) {
            const [reorderedItem] = items.splice(result.source.index, 1);
            items.splice(result.destination.index, 0, reorderedItem);

            dispatch(writeTasks(items));
        };

    };
    return (
        <Container >
            <Row className="justify-content-center m-0">
                <Col md='6'>
                <h4 className='mt-1 mb-0'>Tasks!</h4>
                    <hr className='m-0'/>
                    {(tasks.length === 0) && <p className='lead text-center mt-1 mb-0'>Add a task to get started!</p>}
                    {(tasks.filter((task) => task.done === false).length === 0 && tasks.filter((task) => task.done === true).length > 0  ) && <p className='lead text-center mt-1 mb-0'>All done!</p>}
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId='tasklist'>
                            {(provided) => (
                                <ul className='list-group mt-2' {...provided.droppableProps} ref={provided.innerRef}>
                                    {tasks.filter((task) => task.done === false).map((task, index) => {
                                        return (
                                            <Draggable key={task.id} draggableId={task.id} index={index}>
                                                {(provided) => (
                                                    <li className="list-group-item rounded mt-1 px-0" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                        <Task task={task} />
                                                    </li>
                                                )}
                                            </Draggable>
                                        );
                                    })}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </DragDropContext>
                    <TaskForm />
                    {tasks.filter((task) => task.done === true).length > 0 &&
                    <>
                    <h4 className='mt-2 mb-0'>Completed!</h4>
                    <hr className='m-0'/>
                        <ul className='list-group mt-2'>
                            {tasks.filter((task) => task.done === true).map((task) => {
                                return (
                                    <li key={task.id} className="list-group-item rounded mt-1 px-0" >
                                        <Task task={task} />
                                    </li>
                                );
                            })}
                        </ul>
                            </>
                    }
                </Col>
            </Row>
        </Container >
    );
};

export default TaskList;