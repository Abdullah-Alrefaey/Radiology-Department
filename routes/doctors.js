const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const Doctor = require('../models/doctor');


// Get All Doctors --> For Admin Only
router.get('/', (req, res) => {
    res.render('doctors/index');
});

router.get('/me/:id', (req, res) => {
    Doctor.findOne({
        _id: req.params.id
    })
    .populate('User')
    .then(doctor => {

        if (req.user)
        {
            if (req.user.id == doctor.examins._id)
            {
                res.render('doctors/me', {
                    doctor: doctor
                });
            }
            else
            {
                res.redirect('/home');
            }
        }
        else
        {
            res.redirect('/home');
        }

    });

});

module.exports = router;