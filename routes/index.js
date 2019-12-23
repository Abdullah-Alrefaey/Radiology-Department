const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');
const {ensureAuthenticated, ensureGuest, checkAdmin} = require('../helpers/auth');

// Home Page Route
router.get('/', (req, res) => {
    res.render('index/welcome');
});

// Home Page Route
router.get('/home', (req, res) => {
    res.render('index/home');
});

router.get('/admins', checkAdmin, (req, res) => {
    res.render('index/admin')
});

module.exports = router;