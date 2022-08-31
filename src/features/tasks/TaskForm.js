import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, FormGroup, Label, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { validateTaskForm } from '../../utils/validateTaskForm';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { addTask } from './tasksSlice';
import { v4 as uuid } from 'uuid';



const TaskForm = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch()

    const toggleModal = () => {
        setModalOpen(!modalOpen)
    }

    const handleSubmit = (values) => {
        const task = {
            id: uuid(),
            name: values.name,
            notes: values.notes,
            pomoCountEst: values.pomoCountEst,
            pomoCount: 0,
            active: false

        };

        dispatch(addTask(task))
        setModalOpen(false);
    };

    return (
        <>
            <Button className="mt-2" size='lg' block color='success' onClick={toggleModal}>
                <FontAwesomeIcon size="lg" icon={faCirclePlus} />
            </Button>
            <Modal isOpen={modalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}> Add a Task
                </ModalHeader>
                <ModalBody >
                    <Formik initialValues={{ name: '', notes: '', pomoCountEst: '' }} onSubmit={handleSubmit} validate={validateTaskForm}>
                        <Form>
                            <FormGroup>
                                <Label htmlFor='name'><span className='font-weight-bold'> Task Name </span></Label>
                                <Field
                                    name='name'
                                    placeholder='Task Name...'
                                    className='form-control'
                                />
                                <ErrorMessage name='name'>{(msg) => <p className="text-danger">{msg}</p>}</ErrorMessage>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='pomoCountEst'><span className='font-weight-bold'> Estimated Pomos </span> </Label>
                                <Field
                                    name='pomoCountEst'
                                    placeholder=''
                                    className='form-control'
                                    type="number"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='notes'> <span className='font-weight-bold'> Notes </span>  </Label>
                                <Field
                                    name='notes'
                                    as='textarea'
                                    placeholder='Notes...'
                                    className='form-control'
                                />
                            </FormGroup>
                            <Button type='submit' color="success">
                                Submit
                            </Button>
                        </Form>
                    </Formik>
                </ModalBody>
            </Modal>

        </>
    );

};

export default TaskForm;