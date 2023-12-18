const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connection } = require('mongoose');
const connect = require('./database/connection');
const router = require('./router/routes')
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan('tiny')); //single line for each HTTP request in a simple format.
app.disable('x-powered-by'); //others can not see which stack i used

const port = 8000;

// <-------- HTTP GET REQUEST Home------------------------>

app.get('/', (req, res) => {
    res.status(201).json("Home coming back");
});


// <----------api routes------------->

app.use('/api', router);












// <----------connection valid  then server start------------>

connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`server connected on port ${port}`);
        })
    } catch (error) {
        console.log("cannot connect to the server");

    }



}).catch(error => {

    console.log('invalid database connection');


})