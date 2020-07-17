const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 8080; // 8080 is just for local testing
const TWO_HOURS = 1000 * 60 * 60 * 2 // 2 hours in milliseconds 
var session = require('express-session');
const bcrypt = require('bcrypt');


require('dotenv').config();

const Users = require('./models/user');
// const routes = require('./routes/api');

const MONGODB_URI = "mongodb+srv://Group10:Group10@cluster0-ldbdm.mongodb.net/FLTracking?retryWrites=true&w=majority";

console.log(MONGODB_URI);

// Local mongoose connection
// mongoose.connect('mongodb://localhost/fla-covid-tracking', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

// test functions

mongoose.connection.once('open', function(){
  console.log("connected to mongo db");
});

mongoose.connection.on('error', function(error){
  console.log("errrr:" + error);
})

// mongoose.connection.on('connected', () => {
//   console.log('Mongoose is connected!');
// });

// This is a middleware in express that will parse every json
// app.use(express.json());
// app.use(express.urlencoded({ extended: false })); // extended: false means we don't go very deep into the object...?

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// HTTP request logger
app.use(morgan('tiny'));

// app.use('/api', routes);

// Testing if the application is on heroku
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  // This prevents "CANNOT GET /" errors when directly accessing pages from the web.
  app.get('*', (req, res) =>
  {
    console.log("get(*) Entered")
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  });
}

const {
  NODE_ENV = 'production',
  SESS_NAME = 'sid',
  SESS_SECRET = 'ssh!quiet,itsasecret!',
  SESS_LIFETIME = TWO_HOURS
} = process.env

// const IN_PROD = NODE_ENV === 'production'

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

// Starting Sessions
app.use(session({
  name: SESS_NAME,
  resave: false,
  saveUnititialized: false,
  secret: SESS_SECRET,
  cookie: {
      maxAge: SESS_LIFETIME,
      sameSite: true,
  }
}))

// app.use(session({
//   // genid: (req) => {
//   //   console.log('Inside the session middleware')
//   //   console.log(req.sessionID)
//   //   return uuid() // use UUIDs for session IDs
//   // },
//   secret: 'keyboard cat',
//   // resave: false,
//   saveUninitialized: true,
//   resave: true,  // connect-mongo update JR
//   store: new MongoStore({ mongooseConnection: mongoose.connection }) // connect-mongo update JR
// }))

 
// app.use(function (req, res, next) {
  // console.log("Line 76")
  // if (!req.session.userId) {
  //   console.log("Inside if statement - Line 78")
  //   req.session.userId = 0;
  // }

//   Users.find({userName: req.body.userName})
//   .then((data) => {
//     if (data.length > 1)
//     {
//      console.log("id is  " + data._id)
//     }
//   })
//   .catch(e)
//   {
//     console.log("Error: " + e)
//   }
//   next()
// })

app.post('/api/profile', (req, res) => {
  console.log('session shit: ' + req.session.userCounty + ' ' + req.session.userName)
  console.log('session id ' + session._id)

  return res.json({county: req.session.userCounty , userName: req.session.userName})
  
})


// Login
app.post('/api/Login', (req, res) => {
  if (!req.session.userId) {
    req.session.userId = 0;
  }

  Users.find({ userName: req.body.userName })
    .then(async (data) => {
      console.log('returned login data: ' + data)
      if (data.length < 1)
      { 
        console.log("User name not found")
        return res.status(401).json({
          message: "UserName not found."
        })
      } 
      // else if (!data.verified)
      // {
      //   return res.json({
      //     msg: "Please verify your email first."
      //   })
      // }
      else {
          console.log('req..passw: ' + req.body.password)
          console.log('data[0].passw: ' + data[0].password)
            if ( !(await bcrypt.compare(req.body.password, data[0].password))) {
              console.log('password no matchy')
              return res.json({
                msg: "Password no matchy",
                auth: "0"
              })

          } else {
            console.log('password is bueno!')
          
            // req.session = data[0];
            req.session.userId = data[0]._id;
            req.session.userName = data[0].userName;
            req.session.userCounty = data[0].userCounty;
            console.log("Server.js Recorded County: " + req.session.userCounty)
            return res.status(200).json({ 
              _id: data[0]._id,           
              userName: data[0].userName,
              firstName: data[0].firstName,
              lastName: data[0].lastName,
              email: data[0].email,
              userCounty: data[0].userCounty,
              auth: "1"
              })
          }

      }
    })
    .catch((error) => {
      console.log('Error: ', error);
    });
});

app.post('/api/findUser', (req, res) => {
  console.log("Entered Find User")
  console.log('userName we are looking for: ' + req.body.userName)
  Users.find({userName: req.body.userName})
    .then((data) => {
      console.log(data);
      if (data.length > 0)
      {
        return res.json({
          msg: "That username and/or email is taken",
          taken: "1"
        })
      }
      else
      {
        return res.json({
          taken: "0"
        });
      }  
    })
    .catch((error) => {
      console.log("Users are not found!!!!")
      console.log(error);
    });
});

app.post('/api/SignUp', async (req, res) => {
  console.log("Entering api")
  console.log("Paylod is " + req.body)
  console.log('body.userName' + req.body.userName)
  console.log('body.password' + req.body.password)
  const hashPassword = await bcrypt.hash(req.body.password, 10)
  const user = new Users( {              
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        userCounty: req.body.userCounty,
        password: hashPassword,
        verified: req.body.verified
      });
      console.log('user is: ' + user)

  // Saves the user into the database. Will hook this up to 
  // the link in the email later.
  Users.create(user)
      .then((data) => {
        console.log('we sent the data: ' + data._id)

        try
        {
          jwt.sign(
            {
              id: data._id
            },
            process.env.EMAIL_SECRET,
            {
              expiresIn: '1d',
            },
            (err, emailToken) => {
              const url = `https://florida-covid-tracking.herokuapp.com/EmailVerification/${emailToken}`
              
              console.log('email token is ' + emailToken)
              const output = `
                <p>Hi ${req.body.firstName},</p></ br>
                <p>Welcome to fla-covid-tracking.</p>
                <h1>Please click the link below to verify your email address:</h1>
                <a href="${url}">${url}</a>
                `;
                
              console.log('we made it here but something broke anyway.1')
              const emailVerificationData = {
                from: process.env.EMAIL,
                to: req.body.email,
                subject: 'Please verify your email',
                text: 'text',
                html: output
              };

              console.log('we made it here but something broke anyway.2')
              transporter.sendMail(emailVerificationData, (error, info) => {
                if (error) {
                  return res.json({
                    msg: "Something broke. Did you enter your email correctly?"
                  });
                }
              });

              console.log('we made it here but something broke anyway.3')
              return res.status(200)
            })
        }
        catch(e)
        {
          console.log('failure: ' + e);
          return res.status(500)
        }
      })
      .catch((error) => {
        console.log(error)
      })
    // if (error) {
    //   console.log("Error in code here");
    //   console.log(error)
    //   res.status(500).json({ msg: 'Sorry, internal server errors'});
    //   return;
    // }
    // else {
    //   console.log("Has been Saved! " + user)
    // }

});

app.put('/api/EmailVerification/:token', (req, res) => {
  console.log(req.params.token)
  console.log(jwt.verify(req.params.token, process.env.EMAIL_SECRET))
  try {
    const userId = jwt.verify(req.params.token, process.env.EMAIL_SECRET);
    console.log('id is ' + userId.id);
    Users.findOneAndUpdate(
      { _id: userId.id }, { $set: { verified: true }
    })
    .then((data) => {
      console.log('success somehow! ' + data)
    })
    .catch((e) => {
      console.log('failure retrieving data ' + e)
    })
  }
  catch(e) {
    console.log(e);
    return res.status(500).json({
      msg: "you are a failure."
    })
  }

  return res.status(200).json({
    msg: "success"
  })
})

app.post('/api/PasswordRecovery', (req, res) => 
{
  console.log("The email is " + req.body.email);
  Users.find({email: req.body.email})
    .then((data) => {
      if (data.length > 1)
      {
        try
        {

          jwt.sign(
            {
              user: req.body.userName
            },
            process.env.EMAIL_SECRET,
            {
              expiresIn: '1d',
            },
            (err, resetToken) => {
              const url = `https://florida-covid-tracking.herokuapp.com/PasswordReset/${resetToken}`
              
              console.log('email token is ' + resetToken)
              
              const passwordResetData = {
                from: process.env.EMAIL,
                to: req.body.email,
                subject: 'Reset your password',
                text: 'text',
                html: `<p>Please click the following link to reset your password:</p>
                        <a href=${url}">${url}</a>`
              };
      
              transporter.sendMail(passwordResetData, (error, info) => {
                if (error) {
                  return res.json({
                    msg: "Something broke. Did you enter your email correctly?"
                  });
                }
              });
            }
          )
        }
        catch(e)
        {
          console.log('failure: ' + e);
        }
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