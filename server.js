const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080; // 8080 is just for local testing

const routes = require('./routes/api');

const MONGODB_URI = 'mongodb+srv://Group10:Group10@cluster0-ldbdm.mongodb.net/FLtracking?retryWrites=true&w=majority'
// ||'mongodb://localhost/fla-covid-tracking'
mongoose.connect(process.env.MONGODB_URI, {
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
app.use('/api', routes);

// Testing if the application is on heroku
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
