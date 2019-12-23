// Required Packages
const express = require('express');
require('./db/mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const port = process.env.PORT || 3000;

// Create instance of express
app = express();

// Load Models
require('./models/user');
require('./models/doctor');
require('./models/admin');
require('./models/device');

// Passport Config
// require('./config/passport')(passport);
const {loginFunction} = require('./config/passport-local-v2');
loginFunction(passport);

// Load Routes
const indexRoute = require('./routes/index');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const adminRoute = require('./routes/admins');
const doctorRoute = require('./routes/doctors');
const patientRoute = require('./routes/patients');
const deviceRoute = require('./routes/devices');

// Handlebars Helpers
const { stripTags, truncate } = require('./helpers/hbs');

// Handlebars Helpers
const hbs = exphbs.create({
    defaultLayout:'main',

    // Create Custom helpers
    helpers: {
        ifEquals: function (arg1, arg2, options) {
            return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
        },
        truncate: truncate,
        stripTags: stripTags
    }
});

// Handlebars Middleware
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Set Static Folders (CSS, Images)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/users/uploads', express.static('uploads'));
app.use('/devices/uploads', express.static('uploads'));

// bodyParser middleware Configuration
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// methodOverride Middleware
app.use(methodOverride('_method'));

// Cookie Parser
app.use(cookieParser());

// Session Configuration
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Passport Middleware Configuration
app.use(passport.initialize());
app.use(passport.session());

// Flash middleware
app.use(flash());

// Set global Variables (get access to user anywhere)
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    res.locals.doctor = req.doctor || null;
    res.locals.admin = req.admin || null;
    next();
});

// Use Routes
app.use('/', indexRoute);
app.use('/auth', authRoute);
app.use('/users', userRoute);
app.use('/admins', adminRoute);
app.use('/doctors', doctorRoute);
app.use('/patients', patientRoute);
app.use('/devices', deviceRoute);

// Listen to Port
app.listen(port, () => {
    console.log(`Server started at ${port}`);
});