import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiService from '../../services/apiService'

const AddTask = (props) => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [isDone, setIsDone] = useState(false)
    const [isShowing, setIsShowing] = useState(false)

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const projectID = props.project._id;
    
        try{
            const tasks = await apiService.createTask(title, description, projectID);
            props.getSingleProject()
            setTitle("")
            setDescription("")
        }
        catch(err){
            console.log(err)
        }
    }

    const handleChange = (e) => {
        let {value, name} = e.target;
        const nameConvesion = name.split('').map((letter,i) => (i===0) ? letter.toUpperCase() : letter).join('');
        eval('set'+nameConvesion)(value)
    }

    const toggleForm = () => {
        if(!isShowing){
            setIsShowing(true);
        } else {
            setIsShowing(false);
        }
    }

    const showAddTaskForm = () => {
        if(isShowing){
            return(
                <div>
                    <h3>Add Task</h3>
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-group">
                            <label>Title:</label>
                            <input type="text" name="title" value={title} onChange={ e => handleChange(e)}/>
                        </div>

                        <div className="form-group">
                            <label>Description:</label>
                            <textarea name="description" value={description} onChange={ e => handleChange(e)} />
                        </div>

                        <input className="btn btn-lg bt-primary" type="submit" value="Submit" />

                      </form>
                </div>
              )
        }
    }

    return(
        <div>
            <hr />
            <button onClick={() => toggleForm()}> Add task </button>
            { showAddTaskForm() }
        </div>
    )

}

export default AddTask;