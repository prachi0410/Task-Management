const express = require('express');
const Router = new express.Router();
const Notes = require("../models/note");

//creation of user successful!!
Router.post('/student', async (req, res) => {
    try {
        console.log(req.body);
        const note = Notes(req.body);
        const result = await note.save();
        res.send(result);
    } catch (e) {
        res.status(400).send(e);
    }
});

//reading of database is done
Router.get('/student', async (req, res) => {
    const result = await Notes.find();
    // console.log(result);
    res.send(result);
});

//updation of database is done
Router.patch('/student/:id', async (req, res) => {
    console.log(req.body);
    try {
        const result = await Notes.findByIdAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
            useCreateAndModify: false
        });
        console.log(result);
        res.send(result);
    } catch (e) {
        res.status(500).send(e);
    }
});

//deletion of database
Router.delete('/student/:id', async (req, res) => {
    try {
        const result = await Notes.findByIdAndDelete({ _id: req.params.id }, {
            new: true,
            useCreateAndModify: false
        });
        console.log(result);
        res.send(result);
    } catch (e) {
        res.status(500).send(e);
    }
});


module.exports = Router;