const express = require('express');
const mongoose = require('mongoose');
const Task = require('../models/task');
const Project = require('../models/project');

const router  = express.Router();

// POST route => to create a new task
router.post('/tasks', async (req, res, next) => {
    try{
        const createTask = await Task.create({
            title: req.body.title,
            description: req.body.description,
            project: req.body.projectID
        })
        let message = '';
        let createMessage = `The task ${createTask._id} has been created succesfully`
        if(createTask){
            const UpdateProyectTask = await Project.findByIdAndUpdate(req.body.projectID, {
                $push: {tasks: createTask._id}
            })

            res.json({message: `${createMessage} and updated in the project model.`})
        }
    }
    catch(err){
        res.json(err)
    }
})

// GET route => to retrieve a specific task
router.get("/tasks/:taskId", (req, res, next) => {
    Task.findById(req.params.taskId)
      .then(theTask => {
        res.json(theTask);
      })
      .catch(err => {
        res.json(err);
      });
  });

// PUT route => to update a specific task
router.put("/tasks/:id", async (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid'})
        return
    }  
    try{
        const updateTask = await Task.findByIdAndUpdate(req.params.id, req.body)
        res.json({
            message: `Task with ${req.params.id} is updated successfully.`
        })
    }
    catch(err){
        res.json(err)
    }
});


// DELETE route => to delete a specific task
router.delete('/tasks/:id', async (req, res, next) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    try{

        const deleteTask = await Task.findByIdAndDelete(req.params.id);

        if(deleteTask){
            const UpdateProyectTasks = await Project.findOneAndUpdate(
                { _id: deleteTask.project },
                { $pull: { tasks: deleteTask._id } },
                { new: true }
            )

            res.json({
                message: `Task with ${req.params.id} is removed successfully.`
            })
        }
    }
    catch(err){
        res.json(err);
    }
})


module.exports = router;