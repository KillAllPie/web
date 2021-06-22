'use strict';
var express = require('express');
var router = express.Router();
const { User } = require('../tools/db');


router.post('/login', async (req, res) => {
    if (req.session.user?.id)
        res.render('error', { message: "Already logged in", error: { stack: "", status: "" }, user: req.session.user });

    let user = await User.findOne({
        email: req.body.email,
    });

    if (user == null)
        return res.render('error', { message: "User doesn't exist", error: { stack: "", status: "" }, user: req.session.user });

    if (req.body.password == user.password) {
        req.session.user = {
            loggedIn: true,
            firstname: user.first_name,
            lastname: user.last_name,
            id: user.userId,
        }
        console.log(req.session.user);
        res.redirect('/');
    } else {
        res.render('error', { message: 'Wrong password', error: { stack: "", status: "" }, user: req.session.user });
    }
});

router.post('/register', async (req, res) => {
    if (req.session.user?.id)
        return res.render('error', { message: "Already logged in", error: { stack: "", status: "" }, user: req.session.user });

    let user = await User.findOne({
        email: req.body.email,
    });

    if (user != null)
        return res.render('error', { message: "User already exists", error: { stack: "", status: "" }, user: req.session.user });

    User.create({
        email: req.body.email,
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        password: req.body.password,
    });
    
    res.redirect('/');
});

router.get('/logout', (req, res) => {
    if (!req.session.user.firstname)
        return res.render('error', { message: "Not logged in", error: { stack: "", status: "" }, user: req.session.user });

    req.session.user = { loggedIn: false };
	res.redirect('/');
});

module.exports = router;