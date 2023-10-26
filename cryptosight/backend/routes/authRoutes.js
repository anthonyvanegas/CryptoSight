const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).send({ error: 'Registration failed' });
  }
});

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send({ error: 'Invalid email or password' });
  }

  // Compare provided password with the hashed password in the database
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send({ error: 'Invalid email or password' });
  }

  // Generate JWT
  const token = jwt.sign({ id: user._id }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });
  res.send({ token });
});


module.exports = router;
