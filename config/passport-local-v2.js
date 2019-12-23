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
        passReqToCallback: true
    },
    (req, email, password, done) => {
        
        // Match user
        User.findOne({ email: email }, function(err, user) {
            if (!err && user && passwordMatches(password, user.password))
            {
                console.log('This is user');
                return done(null, user);
            }

            // Match user
            Admin.findOne({ email: email }, function(err, user) {
                if (!err && user && passwordMatches(password, user.password))
                {
                    console.log('This is admin')
                    return done(null, user);
                }
            })
        });

        // Fail to find anything
        return done(null, false, {message: 'Invalid email or password'});

    }));


    
    // Check which user Type is back
    passport.serializeUser(function(user, done) {
        done(null, user.id);
        
    });
    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
}

function passwordMatches(password1, password2) {
    bcrypt.compare(password1, password2, (err, isMatch) => {
        if(err) throw err;

        if(isMatch) return true;
    })
}

module.exports = {
    loginFunction
}