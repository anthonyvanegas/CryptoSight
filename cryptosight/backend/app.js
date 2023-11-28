require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const availableSymbolRoutes = require('./routes/availablesymbols')
const assetsRoutes = require('./routes/assets');
const usersRoutes = require('./routes/users');

const app = express();

mongoose.connect(process.env.DB_CONNECTION_STRING)
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

app.use('/api/symbols', availableSymbolRoutes);
app.use('/api/assets', assetsRoutes);
app.use('/api/users', usersRoutes);

module.exports = app;