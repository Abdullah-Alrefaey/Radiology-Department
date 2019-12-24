const express = require('express');
const router = new express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

const User = require('../models/user');
const upload = require('../helpers/multer');

// User login Route
router.get('/login', (req, res) => {
    res.render('users/login');
});

// Login Form POST
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect:'/home',
        failureRedirect: '/users/login',
        failureFlash: true,
    })(req, res, next);
});

// User register Route
router.get('/register', (req, res) => {
    res.render('users/register');
});


// Register Form POST
router.post('/register', (req, res) => {
    let errors = [];

    if(req.body.password != req.body.password2)
    {
        errors.push({text: 'Passwords do not match'});
    }

    if(req.body.password.length < 4)
    {
        errors.push({text: 'Password must be at least 4 characters'});
    }

    if (errors.length > 0)
    {
        res.render('users/register', {
            errors,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            password2: req.body.password2
        });
    }
    else {
        User.findOne({email: req.body.email})
          .then(user => {
            if(user){
              req.flash('error_msg', 'Email already regsitered');
              res.redirect('/users/register');
            } else {
              const newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
              });
              
              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if(err) throw err;
                  newUser.password = hash;
                  newUser.save()
                    .then(user => {
                      req.flash('success_msg', 'You are now registered and can log in');
                      res.redirect('/users/login');
                    })
                    .catch(err => {
                      console.log(err);
                      return;
                    });
                });
              });
            }
          });
      }

});


// Get User Profile
router.get('/me', ensureAuthenticated, (req, res) => {
  res.render('users/profile');
});

// Update Profile Picture
router.post('/me/avatar', ensureAuthenticated, upload.single('avatar'), async (req, res) => {
    // console.log(req.file);
    req.user.image = req.file.path;
    await req.user.save();
    res.redirect('/users/me');
});


// Contact Us form Route
router.get('/contact', (req, res) => {
    res.render('users/contact');
});

// Contact us form Route
router.post('/contact', (req, res) => {
    req.flash('success_msg', 'Your message has been sent successfully');
    res.redirect('/home');
});

// Logout User
router.get('/logout', (req, res) => {
    req.logOut();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
})

module.exports = router;