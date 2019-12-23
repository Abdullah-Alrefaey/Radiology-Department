const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcryptjs');
const keys = require('./keys');

// Load user model
const User = require('../models/user');

module.exports = function (passport)
{
    passport.use(
        new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        }, (accessToken, refreshToken, profile, done) => {

            const newUser = {
                googleID: profile.id,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: profile.emails[0].value,
                image: profile.photos[0].value
            }

            // Check for existing user
            User.findOne({
                googleID: profile.id
            }).then(user => {
                if(user)
                {
                    // Return User
                    done(null, user);
                }
                else
                {
                    // Create User 
                    new User (newUser)
                    .save()
                    .then(user => {
                        done(null, user);
                    });
                }
            })
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    })

    passport.deserializeUser((id, done) => {
        User.findById(id).then(user => {
            done(null, user);
        });
    });
}