const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./routes/auth');
const url = require('./routes/url');
const chalk = require('chalk');
const bcrypt = require('bcryptjs');
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT |3001;
const MONGO_URI = "mongodb://127.0.0.1:27017/testdb";
const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;
const disconnected = chalk.bold.red;
const termination = chalk.bold.magenta;

const cors = require('cors')

app.use(cors());
// mongoose connection
mongoose.set('useFindAndModify', false);
{
    mongoose.connect(MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true });
    mongoose.connection.on('connected', function () {
        console.log(connected("Mongoose default connection is open to ", MONGO_URI));
    });
    mongoose.connection.on('error', function (err) {
        console.log(error("Mongoose default connection has occured " + err + " error"));
    });
    mongoose.connection.on('disconnected', function () {
        console.log(disconnected("Mongoose default connection is disconnected"));
    });
    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log(termination("Mongoose default connection is disconnected due to application termination"));
            process.exit(0)
        });
    })
}


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Express Session
app.use(
    session({
        secret: "H",
        resave: false,
        saveUninitialized: true,
        currentloggedin: null,
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
);

app.use(auth);
app.use(url);

app.post('/', (req, res) => {
    var p = req.body;
    console.log(req.body);
    console.log(req.method);
    res.send(p);
});
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
