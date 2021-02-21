const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const router = express.Router();
const saltRounds = 8
router.post('/login', (req, res) => {
    const { userName, password } = req.body;
    console.log(userName, password);
    User.findOne({ userName }, (err, user) => {
        if (err) {
            res.status(400).json(err._message);
            return console.log(err);
        }
        if (!user) {
            return res.status(400).json("User not found");
        }
        bcrypt.compare(password, user.password, (err, result) => {
            console.log(result);
            if (result) {
                req.session.currentloggedin = userName;
                console.log(req.session);
                res.send({
			message:`${userName} Logged succesfully`,
			user:result
		});
            }
            else {
                return res.status(400).json("Incorect password");
            }
        });
        // res.send("recieved");
    });
});

router.post('/register', (req, res, next) => {
    const { password } = req.body;
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            res.status = 400;
            res.err = "Error Try again";
            res.redirect('/register');
        }
        req.body.password = hash;
        next();
    });
}, (req, res) => {
    const { userName, email, name, password, phoneNumber, countryCode } = req.body;
    console.log(userName, password);
    User.findOne({ $or: [{ userName }, { email }] }, (err, user) => {
        if (err) {
            res.status(400).json(err._message);
            return console.log(err);
        }
        if (!user) {
            var user1 = new User({ name: name, userName: userName, password: password, phoneNumber: phoneNumber, countryCode: countryCode, email: email, urlLeft: 1000, urlAllcoated: 1000 });
            user1.save((err, user11) => {
                if (err) {
                    console.error(err);
                    if (err._message === undefined)
                        err._message = "Check constraints"
                    res.status(400).json(err._message);
                    return console.log(err);
                }
                res.send(`${userName} successfully registered Login`);
            });

        }
        else {
            res.status(400).json("Username / Email already exists");
        }
    });
});

router.post('/logout', (req, res) => {
    req.session.currentloggedin = null;
    res.send("Successfully logged out !");
})

module.exports = router;
