const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Project = require("../models/project");
const Task = require("../models/task");

// GET route => to get all the projects
router.get('/projects', async (req, res, next) => {
    try{
        const getProyects = await Project.find()
                                         .populate('tasks');
        console.log(getProyects)
        res.status(200).json(getProyects);
    }
    catch(err){
        res.json(err);
    }
})

// POST route => to create a new project
router.post('/projects', async (req, res, next) => {

    try{
        const createProject = await Project.create({
            title: req.body.title,
            description: req.body.description,
            tasks: []
        })

        res.status(200).json(createProject);
        
    }
    catch(err){
        res.json(err);
    }
    
})


// GET route => to get a specific project/detailed view
router.get('/projects/:id', async (req, res, next) => {
    try{
        const {id} = req.params;
        const findProject = await Project.findById(id).populate('tasks');
        res.status(200).json(findProject);
    }
    catch(err){
        res.json(err);
    }
})

// PUT route => to update a specific project
router.put('/projects/:id', async (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid'})
        return
    }

    if(req.params.length < 0){
        res.status(400).json({ message: 'All fields must be filled'})
        return
    }

    try{
        const findAndUpdate = await Project.findByIdAndUpdate(req.params.id, req.body);
        res.json({ message: `Project with ${req.params.id} is updated successfully.` });
    }
    catch(err){
        res.json(err);
    }
})

// DELETE route => to delete a specific project
router.delete('/projects/:id', async (req, res, next) => {
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(400).json({ message: 'Specified id is not valid'})
            return
        }

        const deleteProyect = await Project.findByIdAndDelete(req.params.id)
        res.json({ message: `Project with ${req.params.id} is removed successfully.` })
    }
    catch(err){
        res.json(err)
    }
})

module.exports = router;
