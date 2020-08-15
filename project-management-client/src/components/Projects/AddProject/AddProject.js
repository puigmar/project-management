import React, { useState, useEffect } from 'react'
import axios from 'axios'

const AddProject = (props) => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const handleFormSubmit = e => {
        e.preventDefault();
        axios
            .post("http://localhost:4000/api/projects", { title, description })
            .then(() => {
                setTitle("")
                setDescription("")
                props.getData();
            })
            .catch(error => console.log(error));
    };

    const handleChange = (e) => {
        let {value, name} = e.target;
        const nameConvesion = name.split('').map((letter,i) => (i===0) ? letter.toUpperCase() : letter).join('');
        eval('set'+nameConvesion)(value)
    }

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label>Title:</label>
                    <input type="text" name="title" value={title} className="form-control" onChange={e => handleChange(e)} />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <input type="text" name="description" value={description} className="form-control" onChange={e => handleChange(e)} />
                </div>
                <div className="form-group">
                    <input type="submit" className="btn btn-lg btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default AddProject;
