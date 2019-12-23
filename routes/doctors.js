const express = require('express');
const router = new express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
    res.render('doctors/index');
});

module.exports = router;