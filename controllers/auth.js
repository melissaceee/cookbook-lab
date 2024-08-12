const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user.js');

router.get('/sign-up', (req, res) => {
  res.render('auth/sign-up.ejs');
});

router.get('/sign-in', (req, res) => {
  res.render('auth/sign-in.ejs');
});

router.get('/sign-out', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

router.post('/sign-up', async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
      return res.send('Username already taken.');
    }

    // Ensure passwords match
    if (req.body.password !== req.body.confirmPassword) {
        return res.send('Password and Confirm Password must match');
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPassword;
  
      // Create the new user
      await User.create(req.body);
  
      res.redirect('/auth/sign-in');
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });
  
  router.post('/sign-in', async (req, res) => {
    try {
      // Get user from database
      const userInDatabase = await User.findOne({ username: req.body.username });
      if (!userInDatabase) {
        return res.send('Login failed. Please try again.');
      }
  
      // Test password with bcrypt
      const validPassword = await bcrypt.compare(req.body.password, userInDatabase.password);
      if (!validPassword) {
        return res.send('Login failed. Please try again.');
      }
  
      // Create session
      req.session.user = {
        username: userInDatabase.username,
        _id: userInDatabase._id
      };
  
      res.redirect('/');
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });
  
  module.exports = router;
  