// express
const express = require('express');
const app = express();
// bodyParser
const bodyParser = require('body-parser');
// task router
const taskRouter = require('./routes/task.router.js')

// bring in routes

// Telling bodyParser how to parse in data from client
app.use(bodyParser.urlencoded({ extended: true }));

// Serve back static files by default
app.use('/task', taskRouter)
app.use(express.static('server/public'));



// Start listening for requests on a specific port
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});