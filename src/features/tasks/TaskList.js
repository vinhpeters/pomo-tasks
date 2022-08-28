import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Button, Modal, ModalBody,  ModalHeader, Row, Container } from "reactstrap";
import { selectAllTasks, writeTasks } from './tasksSlice';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import Task from './Task';
import TaskForm from './TaskForm';


const TaskList = () => {
    let tasks = useSelector(selectAllTasks)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();

    const handleOnDragEnd = (result) => {
        const items = Array.from(tasks);
        if (items.length > 1) {
            const [reorderedItem] = items.splice(result.source.index, 1);
            items.splice(result.destination.index, 0, reorderedItem);

            tasks = items.map((item, index) => {
                if (index == 0) {
                    return { ...item, active: true };
                }
                return { ...item, active: false };
            });

            //dispatch(setActiveTaskByID(tasks[0].id))
            dispatch(writeTasks(tasks));
            console.log('tasklist', tasks);
        };

    };

    const toggleTaskFormModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const TaskFormModal = () => {
        return  (
            <Modal isOpen={isModalOpen} toggle={toggleTaskFormModal}>
                <ModalHeader toggle={toggleTaskFormModal}> Add a Task
                </ModalHeader>
                <ModalBody >
                    <TaskForm/>
                </ModalBody>
            </Modal>
        )
    };

    return (
        <Container >
            <TaskFormModal/>
            <Row className="justify-content-center m-0">
                <Col sm='10'>

                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId='tasklist'>
                            {(provided) => (
                                <ul className='list-group mt-2' {...provided.droppableProps} ref={provided.innerRef}>
                                    {tasks.map(({ id, name, notes }, index) => {
                                        return (
                                            <Draggable key={id} draggableId={id} index={index}>
                                                {(provided) => (
                                                    <li className="list-group-item rounded my-1" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                        <Task id={id} name={name} notes={notes} />
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
                    <Button size='lg' block color='success' onClick={toggleTaskFormModal}> <FontAwesomeIcon size = "2x" icon={faCirclePlus}/></Button>
                </Col>
            </Row>
        </Container>
    );
};

export default TaskList;