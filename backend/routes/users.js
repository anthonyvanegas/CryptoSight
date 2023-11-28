const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('', (req, res, next) => {
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

router.get('', (req, res, next) => {
  User.find().then(documents => {
    res.status(200).json({
      message: 'Users fetched successfully',
      users: documents
    });
  });
});

module.exports = router;