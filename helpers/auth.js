const Admin = require('../models/admin');
const User = require('../models/user');

const ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
    {
        return next();
    }
    else
    {
        res.redirect('/');
    }
}

const ensureGuest = function (req, res, next) {
    if (req.isAuthenticated())
    {
        res.redirect('/welcome');
    }
    else
    {
        return next();
    }
}

const checkAdmin = function (req, res, next) {
    if (Admin.find())
    {
        return next();
    }
    else
    {
        res.redirect('/');
    }
}

module.exports = {
    ensureAuthenticated,
    ensureGuest,
    checkAdmin
}