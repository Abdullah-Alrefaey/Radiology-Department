const mongoose = require('mongoose');
const validator = require('validator');

// Create userSchema
const adminSchema = new mongoose.Schema(
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
            minlength: 7,
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
            default: 'Admin'
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
);

// Create users model
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;





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