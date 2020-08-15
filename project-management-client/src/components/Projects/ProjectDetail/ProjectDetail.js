import React, { useState, useEffect } from 'react'
import './ProjectDetail.css';

import { Link, Redirect } from 'react-router-dom'
import apiService from '../../../services/apiService'
import EditProject from '../EditProject/EditProject'
import AddTask from '../../Tasks/AddTask'


const ProjectDetail = (props) => {

    const { params } = props.match
    
    const [project, setProject] = useState([])

    const getSingleProject = async (id) => {
        try{
            const getProject = await apiService.getProject(id);
            setProject(getProject.data)
        }
        catch(err){
            console.log(err)
        }
    }

    const renderEditForm = () => {
        if(!project.title){
            getSingleProject(params.id)
        } else{
            return (
                <EditProject project={project} getSingleProject={getSingleProject} {...props} /> 
            )
        }
    }

    useEffect(() => {
        getSingleProject(params.id)
    }, [])


    const deleteProject = async () => {
        try{
            const { params } = props.match;
            const deleteProject = await apiService.deleteProject(params.id)
            props.history.push('/projects');
        }
        catch(err){
            console.log(err)
        }
    }

    const renderAddTaskForm = () => {
        if(!project.title){
            getSingleProject(params.id);
          } else {
            return <AddTask project={project} getSingleProject={getSingleProject} />
          }
    }

    return (
        <div>
            <h1>{project.title}</h1>
            <p>{project.description}</p>
            {project.tasks && project.tasks.length > 0 && <h3>Tasks</h3>}
            {   project.tasks && project.tasks.map((task, index) => {
                    return (
                        <div key={ index } className={(task.isDone) ? `strikethrough` : ``}>
                            <Link to={`/tasks/${task._id}`}>
                                { task.title }
                            </Link>
                        </div>
                    )

                }) 
            }
            <div>{renderEditForm()}</div>
            <button onClick={() => deleteProject()}>Delete project</button>
            <br/>
            <div>
                {
                    renderAddTaskForm()
                }
            </div>
            <br />
            <br />
            <hr/>
            <Link to={"/projects"}>Back to projects</Link>
        </div>
    )
}

export default ProjectDetail
