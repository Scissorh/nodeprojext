const mongoose = require('mongoose');
const users_collection1 = require('./userdata');

mongoose.connect('mongodb://localhost:27017/facebookdb')
.then(() => {
    console.log('mongoose connection successful')
})
.catch((err) => {
    console.log(err)
})