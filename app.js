const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const morgan = require('morgan');

const index = require('./routes/index');
const data = require('./routes/data');
const app = express();

const port = process.env.PORT || 1337;

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
});

//routes
app.use('/', index);
app.use('/data', data);

// Add routes for 404 and error handling
// Catch 404 and forward to error handler
// Put this last
app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// Start up server
app.listen(port, () => console.log(`Example API listening on port ${port}!`));
