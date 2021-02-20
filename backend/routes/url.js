const express = require('express');
const UrlData = require('../models/urlSchema');
const router = express.Router();
const fs = require('fs');
const request = require('request');
//search a url
router.get('/:user/:shortUrl', (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
    const { user, shortUrl } = req.params;
    console.log(user, shortUrl);
    UrlData.findOne({ user, shortUrl }, (err, url) => {
        if (err) {
            res.status(400).json(err._message);
            return console.log(err);
        }
        console.log(url);
        if (!url) {
            return res.status(400).json("Url not found");
        }
        res.redirect(url.longUrl);
        // return res.send(JSON.stringify(url));
    })
})
// get all urls for a user
router.get("/all", (req, res) => {
    const user = req.session.currentloggedin;
    if (user == null) return res.status(400).json("Login first");
    console.log(req);
    UrlData.find({ user }).select({ _id: 0, shortUrl: 1, description: 1, longUrl: 1 }).exec((err, file) => {
        if (err) {
            res.status(400).json(err._message);
            return console.log(err);
        }
        console.log(file);
	res.header('Access-Control-Allow-Origin', '*');
        res.send(JSON.stringify(file));
    });
});

// qrcode one 
router.get("/qr", (req, res) => {
    const { shortUrl } = req.body;
    const user = req.session.currentloggedin;
    UrlData.findOne({ user, shortUrl }).select({ _id: 0, qrImage: 1 }).exec((err, results) => {
        if (err) {
            res.status(400).json(err._message);
            return console.log(err);
        }
        console.log(results.qrImage.contentType);
        res.setHeader('content-type', results.qrImage.contentType);
        res.send(results.qrImage.data);
        // res.send(JSON.stringify({ a: "hell" }));
    });
});
// add a url
router.post('/add', (req, res) => {
    const { shortUrl, longUrl, description } = req.body;
    const user = req.session.currentloggedin;
    if (user == null) return res.status(400).json("Login first");
    // console.log(user);
    console.log(shortUrl, longUrl, description);
    // console.log("Beff", qrImage);
    UrlData.findOne({ shortUrl, user }, (err, url) => {
        if (err) {
            res.status(400).json(err._message);
            return console.log(err);
        }
        if (!url) {

            const uri = `https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=https://${req.hostname}/${user}/${shortUrl}`;
            const filename = `${user}.png`;
            request(uri).pipe(fs.createWriteStream(filename)).on('close', () => {
                var qrImage = {
                    data: fs.readFileSync(fs.realpathSync(filename, [])),
                    contentType: 'image/png'
                };
                console.log(qrImage);
                var url1 = new UrlData({ user, shortUrl, longUrl, qrImage, description });
                url1.save((err, url12) => {
                    if (err) {
                        console.error(err);
                        if (err._message === undefined)
                            err._message = "Enter valid data"
                        res.status(400).json(err._message);
                        return console.log(err);
                    }
                    try {
                        fs.unlinkSync(filename)
                    } catch (err) {
                        console.error(err)
                    }
                    console.log(url12);
                    User.findOneAndUpdate({ userName: user }, { $inc: { urlLeft: -1 } }, { new: true }, (err, user) => {
                        if (err) {
                            res.status(400).json(err._message);
                            return console.log(err);
                        }
                        url12.left = user.urlLeft;
                        console.log(user);
                        res.send(JSON.stringify(url12));
                    })
                })
            })
        }
        else {
            res.status(404).json("shortUrl already in use");
        }
    });

})


// delete url
router.post("/delete", (req, res) => {
    const { shortUrl } = req.body;
    const user = req.session.currentloggedin;
    if (user == null) return res.status(400).json("Login first");
    console.log(user);
    UrlData.deleteOne({ user, shortUrl }, (err, record) => {
        if (err) {
            console.error(err);
            res.status(400).json(err._message);
            return console.log(err);
        }
        console.log(record);
        if (record.deletedCount == 0) {
            return res.status(400).json("Url error");
        }
        User.findOneAndUpdate({ userName: user }, { $inc: { urlLeft: 1 } }, { new: true }, (err, user) => {
            if (err) {
                res.status(400).json(err._message);
                return console.log(err);
            }
            console.log(user);
            res.send(JSON.stringify(user.urlLeft));
        })
    })
})
module.exports = router;
