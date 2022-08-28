import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectActiveTask } from "../tasks/tasksSlice";

const ActiveTask = (getActiveTask) => {
    const activeTask = useSelector(selectActiveTask).name

    useEffect(()=> {

    },[activeTask])

    return(
        <div>
            <h2>{activeTask}</h2>
        </div>
    )
}

export default ActiveTask;