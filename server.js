// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8888;
const server = app.listen(port,listening)

// this function is just to make sure that the server is running 
function listening(){
    console.log('server runing on port ', `${port}`);
}

// get function for sending the projectData to the client server
app.get('/all', function (req, res) {
    res.send(projectData);     
})

// post function for adding request body to the projectData object 
app.post('/add', function(req, res){
    projectData.date = req.body.date;
    projectData.temp = req.body.temp;
    projectData.feel = req.body.feel;
})