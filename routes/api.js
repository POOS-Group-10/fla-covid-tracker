const express = require('express');

const router = express.Router();

const Users = require('../models/user');

// Login
router.post('/Login', (req, res) => {

  console.log('we are actually here ' + req.body.userName);

  Users.find({ userName: req.body.userName, password: req.body.password})
    .then((data) => {
      console.log('Data ', data);
      if (data.length < 1)
        return res.status(401).json({
          message: "Auth failed."
        })
      res.json(data);
    })
    .catch((error) => {
      console.log('Error: ', daerrorta);
    });
});

// SignUp API
router.post('/SignUp', (req, res) => {
  
  // console.log("attempted to send data! " + req.body.userName + ' ' + req.body.password
  // + ' ' + req.body.firstName + ' ' + req.body.lastName + ' ' + req.body.email);

  const data = req.body;
  const user = new Users(data);

  console.log("data converted properly: " + user);

  user.save((error) => {
    if (error) {
      // console.log(error);
      res.status(500).json({ msg: 'Sorry, internal server errors'});
      return;
    }
    return res.json({
      msg: 'Your data has been saved!'
    });
  });
});

router.post('/test', (req, res) => {
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
