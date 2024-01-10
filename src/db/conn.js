const express = require('express');
const app = express();
const mongoose = require("mongoose");
const DB = process.env.DATABASE;
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DataBase Connection is Successful!!");
}).catch((e) => {
    console.log(e);
});

