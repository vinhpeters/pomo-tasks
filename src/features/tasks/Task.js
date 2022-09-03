import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, FormGroup, Label, ButtonGroup } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { validateTaskForm } from '../../utils/validateTaskForm';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPenToSquare, faSquareCheck } from '@fortawesome/free-solid-svg-icons'
import { faSquare } from '@fortawesome/free-regular-svg-icons'
import { editTask, removeTaskByID } from './tasksSlice'



const Task = ({ task }) => {
    const { id, name, notes, pomoCount, pomoCountEst } = task;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    const EditTaskModal = () => {
        const handleSubmit = (values) => {
            const editedTask = {
                id: id,
                name: values.name,
                notes: values.notes,
                pomoCountEst: values.pomoCountEst,

            };

            dispatch(editTask(editedTask));
            toggleModal();
        };

        const deleteTask = () => {
            dispatch(removeTaskByID(id))
            setIsModalOpen(!isModalOpen)
        }

        return (
            <Modal isOpen={isModalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>
                    <h3>Edit Task</h3>
                </ModalHeader>
                <ModalBody>


                    <Formik initialValues={{ name: name, notes: notes, pomoCountEst: pomoCountEst }} onSubmit={handleSubmit} validate={validateTaskForm}>
                        <Form>
                            <FormGroup>
                                <Label htmlFor='name'><span className='font-weight-bold'> Task Name </span> </Label>
                                <Field
                                    name='name'
                                    placeholder={name}
                                    className='form-control'
                                    type='text'
                                />
                                <ErrorMessage name='name'>{(msg) => <p className="text-danger">{msg}</p>}</ErrorMessage>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='pomoCountEst'> <span className='font-weight-bold'> Estimated Pomos </span> </Label>
                                <Field
                                    name='pomoCountEst'
                                    placeholder={pomoCountEst}
                                    className='form-control'
                                    type="number"

                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='notes'> <span className='font-weight-bold'> Notes </span> </Label>
                                <Field
                                    name='notes'
                                    as='textarea'
                                    placeholder={notes}
                                    className='form-control'
                                    rows='4'
                                />
                            </FormGroup>
                            <ButtonGroup>
                                <Button type='submit' className="mx-1 rounded" color="success">
                                    Save Task
                                </Button>
                                <Button className="mx-1 rounded" onClick={toggleModal} >
                                    Cancel
                                </Button>
                                <Button className="mx-1 rounded" onClick={deleteTask} color="danger">
                                    Delete
                                </Button>
                            </ButtonGroup>
                        </Form>
                    </Formik>
                </ModalBody>
            </Modal>
        );

    }


    return (
        <div className='d-flex align-items-center justify-content-between'>
            <div className='m-0'>
                <FontAwesomeIcon className='mx-1' icon={faBars} />
                <span className='m-0 fs-5'>{name}</span>
            </div>
            <div className='m-0'>
                <FontAwesomeIcon className='mx-1' icon={faSquare} />
                <span className='m-0 fs-5'>{name}</span>
            </div>
            <EditTaskModal />
            <div className='d-flex align-items-center'>
                <span className='mx-1'> {pomoCount}{pomoCountEst && <span>/{pomoCountEst}</span>}</span>
                <Button size="sm" color="success" className='mx-1' onClick={toggleModal}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                </Button>
            </div>
        </div>

    );
};
export default Task;