const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const xlsx = require('xlsx') // xlsx read/write parser
const app = express();
const PORT = 3000;

// General middleware for 
// Cookie access, Body parsing JSON, Terminal request logger
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));

app.use('/', (req, res) => {
    res.json({ message: `Hello from Express:${PORT}` })
})

// Handler for catch all and sends 404 response
app.use((req, res) =>
    res.status(404).send("This is not the page you're looking for. ¯\\_(ツ)_/¯")
);

// Global error handler
app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 500,
        message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
    console.log(`⚡️Express:${PORT} ⚡️`);
});

module.exports = app;
