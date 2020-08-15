import axios from 'axios'

class ApiService {
    constructor () {
        this.api = axios.create({
            baseURL: "http://localhost:4000"
        });
    }

    getProjects () {
        return this.api.get(`/api/projects`)
    }

    getProject(id) {
        return this.api.get(`/api/projects/${id}`)
    }

    updateProject(id, {title, description}) {
        return this.api.put(`/api/projects/${id}`, 
            {
                title, 
                description
            }
        )
    }

    deleteProject(id) {
        return this.api.delete(`/api/projects/${id}`)
    }

    createTask(title, description, projectID) {
        return this.api.post('/api/tasks', { title, description, projectID })
    }

    getTasks() {
        return this.api.get('/api/tasks')
    }

    getTask(id) {
        return this.api.get(`/api/tasks/${id}`)
    }

    updateTask(id, {title, description, isDone}) {
        return this.api.put(`/api/tasks/${id}`, 
            {
                title, 
                description,
                isDone
            }
        )
    }

    deleteTask(id) {
        return this.api.delete(`/api/tasks/${id}`)
    }
}

const apiService = new ApiService ()

export default apiService;
