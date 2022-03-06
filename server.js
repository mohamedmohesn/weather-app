// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 5000;
app.listen(port , ()=>{console.log(`server is running on ${port}`)});

// Initialize all route with a callback function

// Callback function to complete GET '/all'
app.get('/all', async (req, res)=>{
await res.send(projectData);
});
// Post Route


app.post('/add', callBack);

function callBack(req,res){
  
  newEntry = {
    temperature: req.body.temperature,
    date: req.body.date,
    userResponse: req.body.userResponse
  }
  projectData = newEntry;
   res.send(projectData);
   console.log(projectData)

}
