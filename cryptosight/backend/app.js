const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const axios = require('axios');

const User = require('./models/User');

const app = express();

mongoose.connect(JSON.parse(fs.readFileSync('./config.json')).dbCred)
    .then(() => {
        console.log("Database connected")
    })
    .catch(() => {
        console.log("Database connection failed")
});

async function getAssetData(slug) {
    const apiKey = JSON.parse(fs.readFileSync('./config.json')).apiKey;
    const response = await axios.get('https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest', {
      headers: {
        'X-CMC_PRO_API_KEY': apiKey,
      },
      params: {
        'slug': slug
      }
    });
  
    const json = response.data;
    return json;
}

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

app.get('/api/assets', async (req, res, next) => {
    try {
      const response = await getAssetData(req.query.slug);
  
      res.status(200).json({
        message: 'Users fetched successfully',
        response: response,
        data: JSON.stringify(Object.values(response.data))
      });
    } catch (error) {
      switch (error.response.status) {
        case 400:
          res.status(400).json({
            message: 'Bad Request'
          });
          break;
        case 401:
          res.status(401).json({
            message: 'Unauthorized'
          });
          break;
        case 403:
          res.status(403).json({
            message: 'Forbidden'
          });
          break;
        case 429:
          res.status(429).json({
            message: 'Too Many Requests'
          });
          break;
        case 500:
          res.status(500).json({
            message: 'Internal Server Error'
          });
          break;
        default:
          res.status(500).json({
            message: 'Unknown Error'
          });
          break;
      }
    }
});

module.exports = app;