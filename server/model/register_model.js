const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const reg_model = mongoose.Schema({
    username: {
        type: String
    },

    email: {
        type: String
    },

    password: {
        type: String
    },

    movies: [{type: String}]

});


const register_coll = mongoose.model('usersCollection' , reg_model);
module.exports = register_coll;