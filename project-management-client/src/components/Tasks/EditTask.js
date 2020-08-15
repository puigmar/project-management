import React, {useState, useEffect} from 'react'
import apiService from '../../services/apiService'

const EditTask = (props) => {

    const [title, setTitle] = useState(props.task.title)
    const [description, setDescription] = useState(props.task.description);
    const [status, setStatus] = useState(props.task.isDone);

    const handleFormSubmit = async (e) => {
        try{
            e.preventDefault();
            const updateTask = await apiService.updateTask(
                props.task._id, 
                {title, description, isDone: status}
            )
            await props.getTaskDetail();
            props.history.push(`/projects/${props.task.project}`);
        }
        catch(err){
            console.log(err)
        }
    }

    const handleChangeState = (e) => {
        let {value, name} = e.target;
        if(name==="status"){
            (e.target.checked) ? value = true : value = false
        }
        const nameConvesion = name.split('').map((letter,i) => (i===0) ? letter.toUpperCase() : letter).join('');
        eval('set'+nameConvesion)(value)
    }

    const handleDelete = async () => {
        const deleteTask = await apiService.deleteTask(props.task._id)
        props.history.push(`/projects/${props.task.project}`);
    }

    return (
        <div>
            <h3>Edit Form</h3>
            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={e => handleChangeState(e)}
                    />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={description}
                        onChange={e => handleChangeState(e)}
                    />
                </div>
                <div className="form-group">
                    <label>Status</label>
                    Done <input type="checkbox" name="status" checked={status} onClick={ e => handleChangeState(e) }/>
                </div>
                <input type="submit" className="btn btn-primary btn-lg" />
                <button type="button" onClick={handleDelete}>Delete</button>
            </form>
        </div>
    )
}

export default EditTask
