const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const app = express();

// Body Parser
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
 
// // parse application/json
// app.use(bodyParser.json())

app.use(express.json());


// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
.connect(db, {useNewUrlParser: true})
.then(() => {
    console.log('Mongodb connected!');
})
.catch(err => {
    console.log(err);
})


// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);


// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})