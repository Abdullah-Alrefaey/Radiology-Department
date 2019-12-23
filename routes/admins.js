const express = require('express');
const router = new express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

const Admin = require('../models/admin');

// // User login Route
// router.get('/login', (req, res) => {
//     res.render('users/login');
// });

// // Login Form POST
// router.post('/login', (req, res, next) => {
//     passport.authenticate('local', {
//         successRedirect:'/home',
//         failureRedirect: '/users/login',
//         failureFlash: true,
//     })(req, res, next);
// });

module.exports = Admin;