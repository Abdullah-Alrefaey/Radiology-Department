const mongoose = require('mongoose');
const validator = require('validator');

// Create userSchema
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value))
                {
                    throw new Error('Email is invalid');
                }
            }
        },
        password: {
            type: String,
            required: true,
            minlength: 5,
            validate(value) {
                if (value.toLowerCase().includes('password'))
                {
                    throw new Error('Password should not contain "password" word!');
                }
        },
        trim: true
        },
        image: {
            type: String
        },
        role: {
            type: String,
            required: true
        },
        deviceType: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Device'
        },
        date: {
            type: Date,
            default: Date.now()
        }
    }
);


// Create users model
const User = mongoose.model('User', userSchema);

module.exports = User;





// // For Google
// const userSchema = new mongoose.Schema({
//     googleID: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true
//     },
//     firstName: {
//         type: String,
//         required: true
//     },
//     lastName: {
//         type: String,
//         required: true
//     },
//     image: {
//         type: String
//     },
//     role: {
//         type: String
//     }
// }, {
//     timestamps: true
// });