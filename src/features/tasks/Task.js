import React from 'react';
import { useDispatch } from 'react-redux';
import { Row, Button } from 'reactstrap';
import { removeTaskByID } from './tasksSlice';

const Task = ({ id, name, notes }) => {

    const dispatch = useDispatch();

    return (
        <div className='d-inline-flex align-items-center justify-content-between  mt-1'>
            <div className="ms-2 me-auto">
                <div className="fw-bold">{name}</div>
                {notes}
            </div>
            <div className="justify-content-end m-1">
                <Button className='' color='danger' onClick={() => dispatch(removeTaskByID(id))}>
                    <i className="fa fa-trash"></i>
                </Button>
            </div>
        </div >
    );
};
export default Task;