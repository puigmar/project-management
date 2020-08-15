import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import AddProject from '../AddProject/AddProject'
import apiService from '../../../services/apiService';

const ProjectList = () => {

    const [listOfProjects, setListOfProjects] = useState([]);
    
    const getAllProjects = async () => {
        try{
            const getProjects = await apiService.getProjects();
            setListOfProjects(getProjects.data);
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect( () => {
        getAllProjects()
   }, [])

    return (
        <div>
            <div>
                {
                    listOfProjects.map( project => 
                        (
                            <div key={project._id}>
                                <Link to={`/projects/${project._id}`}>
                                    <h3>{project.title}</h3>
                                </Link>

                                <ul>
                                { project.tasks.map((task, index) => (<li key={index} className={(task.isDone) ? 'strikethrough' : ''}>{task.title}</li>)) }
                                </ul>
                            </div>
                        )
                    )
                }
            </div>
            <div>
                <AddProject getData={() => getAllProjects()} />
            </div>
        </div>
    )
}

export default ProjectList
