const LocalStrategy  = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load user model
const User = require('../models/user');
const Admin = require('../models/admin');
const Doctor = require('../models/doctor');


const loginFunction = function (passport)
{
    passport.use('local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    },
    (email, password, done) => {
        // Match user
        User.findOne({ email: email }).then(user => {
            if(!user)
            {
                return done(null, false, {message: 'No User is Found'});
            } 

            // Match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) throw err;

                if(isMatch)
                {
                    return done(null, user);
                }
                else
                {
                    return done(null, false, {message: 'Password Incorrect'});
                }
            })
        })
    }));


    // For Patient
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
}



// function passwordMatches(password1, password2) {
//     bcrypt.compare(password1, password2, (err, isMatch) => {
//         if(err) throw err;

//         if(isMatch) return true;
//     })
// }

module.exports = {
    loginFunction
}