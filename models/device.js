const mongoose = require('mongoose');

// Create userSchema
const deviceSchema = new mongoose.Schema(
    {
        devName: {
            type: String,
            required: true
        },
        devCode: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        image: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
);

// Create users model
const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;