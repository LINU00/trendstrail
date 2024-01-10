const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Route for user registration
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    console.log(user);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route for user login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Assuming you have a User model
    const user = await User.findOne({ email });

    if (user) {
      // Check if the provided password matches the stored hashed password
      if (user.password === password) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Route for contact form submission
router.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Assuming you have a Contact model
    const Contact = require('../models/contact');

    // Create a new contact instance
    const contact = new Contact({ name, email, subject, message });

    // Save the contact data to MongoDB
    await contact.save();

    res.status(200).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
