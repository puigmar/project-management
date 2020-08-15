import React, { useState, useEffect, useRef } from 'react'
import apiService from '../../../services/apiService'

function EditProject(props) {

    const [title, setTitle] = useState(props.project.title)
    const [description, setDescription] = useState(props.project.description);

    const handleFormSubmit = async (e) => {
        try{
            e.preventDefault();
            const updateProject = await apiService.updateProject(
                props.project._id, 
                {title, description}
            )
            await props.getSingleProject();
            props.history.push('/projects');
        }
        catch(err){
            console.log(err)
        }
    }

    const handleChangeState = (e) => {
        let {value, name} = e.target;
        const nameConvesion = name.split('').map((letter,i) => (i===0) ? letter.toUpperCase() : letter).join('');
        eval('set'+nameConvesion)(value)
    }
    
    return (
        <div>
            <hr/>
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
                <input type="submit" className="btn btn-primary btn-lg" />
            </form>
        </div>
    )
}

export default EditProject
