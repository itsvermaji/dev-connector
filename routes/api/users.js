// Authentication, Login, Password

const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load User Model
const User = require("../../models/User");
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');



// @route           GET /api/users/test
// @description     Tests users route
// @access Public   Public

router.get("/test", (req, res) => {
  res.status(404).json({
    msg: "Users works!",
  });
});

// @route           POST /api/users/public
// @description     Tests users route
// @access Public   Public
router.post("/register", (req, res) => {
  User.findOne({
      email: req.body.email
    })
    .then(user => {
      if (user) {
        return res.status(400).json({
          email: "Email already exists!"
        });
      } else {
        // Create a new User
        const avatar = gravatar.url(req.body.email, {
          s: '200', // size
          r: 'pg', // Rating
          d: 'mm', // Default
        })

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;

          bcrypt.hash(newUser.password, salt, (err, hashPassword) => {
            if (err) throw err;

            newUser.password = hashPassword;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          })

        })


      }
    })
});

// @route           GET /api/users/login
// @description     Login users /Returning JWT Token
// @access Public   Public

router.post('/login', (req, res) => {
  const {
    email,
    password
  } = req.body;

  // Find user by email
  User.findOne({
      email
    })
    .then(user => {
      // Check for User
      if (!user) {
        return res.status(404).json({
          email: 'User email not found!'
        })
      } else {
        // Check for password
        console.log('User is present!');
        bcrypt.compare(password, user.password)
          .then(isMatch => {
            // user exists
            if (isMatch) {
              // User matches

              const payload = { id: user.id, name: user.name, avatar: user.avatar };  // Create JWT payload
              
              // Sign Token
              const accessToken = jwt.sign(
                payload,
                keys.secretOrKey, 
                { algorithm: "HS256", expiresIn: 3600 },
                (err, token) => {
                  console.log('Token is generated!');
                  return res.json({
                    success: true,
                    token: 'Bearer ' + token
                  })
                }
              )

              
            } else {
              return res.status(400).json({
                msg: 'Password is Incorrect!'
              })
            }
          })
          .catch(err => {
            throw err;
          })

      }
    })


});

// @route           GET /api/users/current
// @description     Return Current user
// @access Public   Private
router.get('/current', passport.authenticate('jwt', { session: false}), (req, res) => {
  res.json({
    msg: `Welcome ${req.user.name}, Good Afternoon`
  });

})


module.exports = router;