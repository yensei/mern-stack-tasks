const express = require('express');
const router = express.Router();

const Task = require('../models/task');

router.get('/', async (req, res) => {
    const tasks = await Task.find();    
    res.json(tasks);
});


router.get('/:id', async (req, res) => {
    const tasks = await Task.findById(req.params.id);    
    res.json(tasks);
});


router.post('/', async( req, res ) => {
    const {title,description} = req.body;
    const task = new Task({
        title : title,
        description : description
    });

    await task.save();

    res.json({status : "Tarea guardada!"});
});


router.put('/:id', async ( req, res ) => {
    const {title, description} = req.body;
    const newTask = {title, description};

    await Task.findOneAndUpdate(req.params.id, newTask);
    //5c3c17c36564e809dda94194
    res.json({status : "Tarea actualizada!"});
});

router.delete('/:id', async (req, res) =>{
    await Task.findOneAndRemove(req.params.id);
    res.json({status : "Tarea eliminada"});
} );

module.exports = router;