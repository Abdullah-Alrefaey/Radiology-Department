const mongoose = require('mongoose');
const keys = require('../config/keys');

// connect to database
mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('MongoDB Connected');
}).catch((err) => {
    console.log(err);
});