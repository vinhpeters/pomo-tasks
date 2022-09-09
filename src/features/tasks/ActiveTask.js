import { useSelector } from "react-redux";
import { selectActiveTask } from "./tasksSlice";

const ActiveTask = () => {
    const activeTask = useSelector(selectActiveTask)
    

}