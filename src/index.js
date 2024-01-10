const express = require('express');
const app = express();
const port = process.env.PORT || 8001;
const Router = require('./router/router');
const dotenv = require('dotenv');
const cors = require('cors');
app.use(cors());
dotenv.config({ path: "./.env" });

app.use(express.json());
app.use(express.static('frontend/build'));
/// router using
app.use(Router);
require("./db/conn");





app.get('/', (req, res) => {
    res.send("Hiiii from me");
});

app.listen(port, () => {
    console.log(`listening to porn number ${port}`);
});