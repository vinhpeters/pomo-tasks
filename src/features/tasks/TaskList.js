import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Container } from "reactstrap";
import { selectAllTasks, writeTasks } from './tasksSlice';
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

            tasks = items.map((item, index) => {
                if (index === 0) {
                    return { ...item, active: true };
                }
                return { ...item, active: false };
            });

            dispatch(writeTasks(tasks));
        };

    };
    return (
        <Container >
            <Row className="justify-content-center m-0">
                <Col md='6'>
                    {(tasks.length ===0) && <p className='lead text-center mt-1 mb-0'>Add a task to get started!</p>}
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId='tasklist'>
                            {(provided) => (
                                <ul className='list-group mt-2' {...provided.droppableProps} ref={provided.innerRef}>
                                    {tasks.map((task , index) => {
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
                <TaskForm/>
                </Col>
            </Row>
        </Container>
    );
};

export default TaskList;