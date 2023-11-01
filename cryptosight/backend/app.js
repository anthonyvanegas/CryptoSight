const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.post('/api/users', (req, res, next) => {
    const user = req.body;
    console.log(user);
    res.status(201).json({
        message: 'User added successfully'
    });
});

app.get('/api/users', (req, res, next) => {
    const users = [
        { id: '1', 
            firstname: 'John', 
            lastname: 'Jones', 
            email: '123@example.com', 
            password: 'password'
        },
        { id: '2', 
            firstname: 'Conner', 
            lastname: 'McGregor', 
            email: '1234@example.com', 
            password: 'password'
        },
    ]
    res.status(200).json({
        message: 'Users sent successfully!',
        users: users
    });
});

module.exports = app;