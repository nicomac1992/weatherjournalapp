// Setup empty JS object to act as endpoint for all routes
//const projectData = [];
let projectDataHistory = [];
// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8000;

const server = app.listen(port, listening);

function listening() {
    console.log(server);
    console.log(`running on localhost: ${port}`);
}

//get
app.get("/all", gettingData);

function gettingData(request, response) {
    response.send(projectDataHistory);
}

//post

app.post("/add", addingData);

function addingData(req, res) {
    console.log(req.body);
    newEntry = {
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content,
    };
    projectData.push(newEntry);
    res.send(projectDataHistory);
    console.log(projectDataHistory);
}