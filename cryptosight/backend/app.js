const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');

const User = require('./models/User');

const app = express();

mongoose.connect(JSON.parse(fs.readFileSync('./config.json')).dbCred)
    .then(() => {
        console.log("Database connected")
    })
    .catch(() => {
        console.log("Database connection failed")
    });

app.use(bodyParser.json());

app.use((req, res, next) => {   
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.post('/api/users', (req, res, next) => {
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    });
    user.save().then(createdUser => {
        res.status(201).json({
            message: 'User added successfully',
            userId: createdUser._id
        });
    });
});

app.get('/api/users', (req, res, next) => {
    User.find().then(documents => {
        res.status(200).json({
            message: 'Users fetched successfully',
            users: documents
        });
    });
});

const burl = 

module.exports = app;