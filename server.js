const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080; // 8080 is just for local testing

require('dotenv').config();

const Users = require('./models/user');
// const routes = require('./routes/api');

const MONGODB_URI = 'mongodb+srv://Group10:Group10@cluster0-ldbdm.mongodb.net/FLtracking?retryWrites=true&w=majority'

mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost/fla-covid-tracking', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected!');
});

// This is a middleware in express that will parse every json
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // extended: false means we don't go very deep into the object...?

// HTTP request logger
app.use(morgan('tiny'));

// app.use('/api', routes);

// Testing if the application is on heroku
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
  {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
  });
}

// Create email functionality
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

transporter.verify(function(error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

// Login
app.post('/api/login', (req, res) => {

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

app.post('/api/signUp', (req, res) => {

  const data = req.body;
  const user = new Users(data);

  console.log("data converted properly: " + user);

  try
  {
    const output = `
      <p>Hi ${req.body.firstName},</p></ br>
      <p>Welcome to fla-covid-tracking.</p>
      <h1>Please click the link below to verify your email address:</h1>
      <a href="https://florida-covid-tracking.herokuapp.com>Click here</a>
      `;

    const emailVerificationData = {
      from: process.env.EMAIL,
      to: req.body.email,
      subject: 'Please verify your email',
      text: 'text',
      html: output
    };

    transporter.sendMail(emailVerificationData, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Success!!');
    });
  }
  catch(e)
  {
    console.log('failure: ' + e);
  }

  user.save((error) => {
    if (error) {
      // console.log(error);
      res.status(500).json({ msg: 'Sorry, internal server errors'});
      return;
    }
    else {
      console.log("Has been Saved! " + user)
    }
    return res.json({
      msg: 'Your data has been saved!' + user
    });
  });
});

app.listen(PORT, console.log(`Server is starting at ${PORT}`));