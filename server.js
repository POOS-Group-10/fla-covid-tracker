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

  // This prevents "CANNOT GET /" errors when directly accessing pages from the web.
  app.get('*', (req, res) =>
  {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  });
}

// Create email functionality
// const nodemailer = require('nodemailer');
const Users = require('./models/user');

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASSWORD
//   }
// });
//
// transporter.verify(function(error, success) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Server is ready to take our messages");
//   }
// });

app.post('/api/Login', (req, res) => {

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
      console.log('Error: ', error);
    });
});

app.post('/api/findUser', (req, res) => {
  
  Users.find({userName: req.body.userName})
    .then((data) => {
      if (data.length > 0)
        return res.json({
          msg: "That username is taken",
          taken: "1"
        })
      else 
          return res.json({
            taken: "0"
          });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post('/api/SignUp', (req, res) => {

  const data = req.body;
  const user = new Users(data);

  // try
  // {
  //   const output = `
  //     <p>Hi ${req.body.firstName},</p></ br>
  //     <p>Welcome to fla-covid-tracking.</p>
  //     <h1>Please click the link below to verify your email address:</h1>
  //     <p>https://florida-covid-tracking.herokuapp.com/Home</p>
  //     `;

  //   const emailVerificationData = {
  //     from: process.env.EMAIL,
  //     to: req.body.email,
  //     subject: 'Please verify your email',
  //     text: 'text',
  //     html: output
  //   };

  //   transporter.sendMail(emailVerificationData, (error, info) => {
  //     if (error) {
  //       return res.json({
  //         msg: "Something broke. Did you enter your email correctly?"
  //       });
  //     }
  //     return res.json({
  //       msg: "Check your email to verify your account and log in."
  //     });
  //   });
  // }
  // catch(e)
  // {
  //   console.log('failure: ' + e);
  // }

  // Saves the user into the database. Will hook this up to 
  // the link in the email later.
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
      msg: 'Your data has been saved!'
    });
  });
});

app.post('/api/PasswordRecovery', (req, res) => 
{
  console.log("The email is " + req.body.email);
  Users.find({email: req.body.email})
    .then((data) => {
      if (data.length > 1)
      {
        // try
        // {
        //   const passwordResetData = {
        //     from: process.env.EMAIL,
        //     to: req.body.email,
        //     subject: 'Reset your password',
        //     text: 'text',
        //     html: `<a href="https://localhost:3000/PasswordReset">Click here to reset your password</a>`
        //   };

        //   transporter.sendMail(passwordResetData, (error, info) => {
        //     if (error) {
        //       return console.log(error);
        //     }
        //     console.log('Success!!');
        //   });
        // }
        // catch(e)
        // {
        //   console.log('failure: ' + e);
        // }
        return res.json({
          msg: "Email sent"
        });
      }
      else {
        return res.json({
          msg: "That email is not linked to a fla-covid-tracking account"
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });

});

app.listen(PORT, console.log(`Server is starting at ${PORT}`));