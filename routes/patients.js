const express = require('express');
const router = new express.Router();
const User = require('../models/user');

// Show All Patients ---> Availabe for Admins Only
router.get('/', (req, res) => {
    res.render('patients/index');
});

module.exports = router;