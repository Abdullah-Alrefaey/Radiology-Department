const LocalStrategy  = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load user model
const User = require('../models/user');
const Admin = require('../models/admin');
const Doctor = require('../models/doctor');


const loginUser = function (passport)
{
    passport.use('user-local', new LocalStrategy({
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



const loginAdmin = function (passport)
{
    passport.use('admin-local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    },
    (email, password, done) => {
        // Match Admin
        Admin.findOne({ email: email }).then(admin => {
            if(!admin)
            {
                return done(null, false, {message: 'No Admin Found'});
            } 

            // Match password
            bcrypt.compare(password, admin.password, (err, isMatch) => {
                if(err) throw err;

                if(isMatch)
                {
                    return done(null, admin);
                }
                else
                {
                    return done(null, false, {message: 'Password Incorrect'});
                }
            })
        })
    }));

    // For Admin
    passport.serializeUser(function(admin, done) {
        done(null, admin.id);
    });
    
    passport.deserializeUser(function(id, done) {
        Admin.findById(id, function(err, admin) {
            done(err, admin);
        });
    });
}





// const loginFunction = function (passport)
// {
//     passport.use(new LocalStrategy({
//         usernameField: 'email',
//         passwordField: 'password',
//         passReqToCallback: true
//     },
//     (req, email, password, done) => {
//         if (req.body.role === 'Patient')
//         {
//             patientLoginProcess(email, password, done);
//         }

//         if (req.body.role === 'Doctor')
//         {
//             doctorLoginProcess(email, password, done);
//         }

//         if (req.body.role === 'Admin')
//         {
//             adminLoginProcess(email, password, done);
//         }

//     }));
    
//     // For Patient
//     passport.serializeUser(function(user, done) {
//         done(null, user.id);
//     });
    
//     passport.deserializeUser(function(id, done) {
//         User.findById(id, function(err, user) {
//             done(err, user);
//         });
//     });

//     // For Doctor
//     passport.serializeUser(function(doctor, done) {
//         done(null, doctor.id);
//     });
    
//     passport.deserializeUser(function(id, done) {
//         User.findById(id, function(err, doctor) {
//             done(err, doctor);
//         });
//     });

//     // For Admin
//     passport.serializeUser(function(admin, done) {
//         done(null, admin.id);
//     });
    
//     passport.deserializeUser(function(id, done) {
//         User.findById(id, function(err, admin) {
//             done(err, admin);
//         });
//     });
// }


// // Login Check For Patient
// const patientLoginProcess = (email, password, done) => {
//     // Match user
//     User.findOne({ email: email }).then(user => {
//         if(!user)
//         {
//             return done(null, false, {message: 'No User Found'});
//         } 

//         // Match password
//         bcrypt.compare(password, user.password, (err, isMatch) => {
//             if(err) throw err;

//             if(isMatch)
//             {
//                 return done(null, user);
//             }
//             else
//             {
//                 return done(null, false, {message: 'Password Incorrect'});
//             }
//         })
//     })
// }

// // Login Check For Doctor
// const doctorLoginProcess = (email, password, done) => {
//     // Match user
//     Doctor.findOne({ email: email }).then(doctor => {
//         if(!doctor)
//         {
//             return done(null, false, {message: 'No Doctor Found'});
//         } 

//         // Match password
//         bcrypt.compare(password, doctor.password, (err, isMatch) => {
//             if(err) throw err;

//             if(isMatch)
//             {
//                 return done(null, doctor);
//             }
//             else
//             {
//                 return done(null, false, {message: 'Password Incorrect'});
//             }
//         })
//     })
// }

// // Login Check For Admin
// const adminLoginProcess = (email, password, done) => {
//     // Match user
//     Admin.findOne({ email: email }).then(admin => {
//         if(!admin)
//         {
//             return done(null, false, {message: 'No Admin Found'});
//         } 

//         // Match password
//         bcrypt.compare(password, admin.password, (err, isMatch) => {
//             if(err) throw err;

//             if(isMatch)
//             {
//                 return done(null, admin);
//             }
//             else
//             {
//                 return done(null, false, {message: 'Password Incorrect'});
//             }
//         })
//     })
// }


module.exports = {
    loginUser,
    loginAdmin
}