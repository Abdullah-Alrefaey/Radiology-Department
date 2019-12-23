const express = require('express');
const router = new express.Router();
const Device = require('../models/device');

// For Multer Uploading Images
const upload = require('../helpers/multer');

// Add device Route
router.get('/add', (req, res) => {
    res.render('devices/add');
});

// Devices Index
router.get('/', (req, res) => {
    Device.find()
    .then(devices => {
        res.render('devices/index', {
            devices: devices
        });
    })
})

// Add device Form
router.post('/add', upload.single('avatar'), (req, res) => {
    console.log(req.file);

    const newDevice = {
        devName: req.body.name,
        devCode: req.body.code,
        description: req.body.description,
        image: req.file.path
    }

    // Create New Device
    new Device(newDevice)
    .save()
    .then(device => {
        res.redirect('/devices', {
            devices: device
        });
    });
});

module.exports = router;