
import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardHeader, CardBody, Button, FormGroup, Label } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { validateTaskForm } from '../../utils/validateTaskForm';
import { addTask } from './tasksSlice';
import { v4 as uuid } from 'uuid';



const TaskForm = () => {
    const dispatch = useDispatch()

    const handleSubmit = (values) => {
        const task = {
            id: uuid(),
            name: values.name,
            notes: values.notes,
            active: false,
            pomoCountEst: 4,
            pomoCount: 0

            //taskTime: values.taskTime
        };

        dispatch(addTask(task))

    };

    return (
                <Formik initialValues={{ name: '', notes: '' }} onSubmit={handleSubmit} validate={validateTaskForm}>
                    <Form>
                        <FormGroup>
                            <Label htmlFor='name'>Task Name </Label>
                            <Field
                                name='name'
                                placeholder=''
                                className='form-control'
                            />
                            <ErrorMessage name='name'>{(msg) => <p className="text-danger">{msg}</p>}</ErrorMessage>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor='notes'> Notes </Label>
                            <Field
                                name='notes'
                                as='textarea'
                                placeholder=''
                                className='form-control'
                            />
                        </FormGroup>
                        <Button type='submit' color="success">
                            Submit
                        </Button>
                    </Form>
                </Formik>

    );

};

export default TaskForm;