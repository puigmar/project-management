import React, {useState, useEffect} from 'react';
import apiService from '../../services/apiService'
import EditTask from './EditTask';

const TaskDetail = (props) => {
    
    const {params} = props.match;

    const [task, setTask] = useState([])

    const getTaskDetail = async () => {
        const task = await apiService.getTask(params.taskId)
        setTask(task.data)
    }

    useEffect(() => {
        getTaskDetail()
    }, [])

    const renderEditForm = () => {
        if(!task.title){
            getTaskDetail()
        } else{
            return (
                <EditTask task={task} getTaskDetail={getTaskDetail} {...props} /> 
            )
        }
    }

    return (
        <div>
            <h3>TASK DETAILS</h3>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <hr />
            {renderEditForm()}
            <button onClick={props.history.goBack}>Go Back</button>
        </div>
    )
}

export default TaskDetail;