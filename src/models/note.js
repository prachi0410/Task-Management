// const express = require("express");
const validator = require("validator");
const mongoose = require('mongoose');


const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: [true, "Title Can't be Same!!"],
        minlength: 0
    },
    description: {
        type: String,
        required: true,
        minlength: 0
    },
    status: {
        type: String,
        required: true,
    }
});

const Notes = new mongoose.model('NoteData', noteSchema);
module.exports = Notes;
