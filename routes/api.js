const express = require('express');

const router = express.Router();

const Users = require('../models/users');

// Routes
router.get('/', (req, res) => {

  Users.find({ })
    .then((data) => {
      console.log('Data ', data);
      res.json(data);
    })
    .catch((error) => {
      console.log('Error: ', daerrorta);
    });
});


// Saves a New User
router.post('/save', (req, res) => {
  const data = req.body;

  const user = new Users(data);

  user.save((error) => {
    if (error) {
      res.status(500).json({ msg: 'Sorry, internal server errors'});
      return;
    }
    // Users
    return res.json({
        msg: 'Your data has been saved!'
      });
    });
});

module.exports = router;
