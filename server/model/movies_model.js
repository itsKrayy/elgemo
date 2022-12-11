const mongoose = require('mongoose');

const movie_model = mongoose.Schema({
    movieName: {
        type: String
    },

    description: {
        type: String
    },

    imgURL: {
        type: String
    },

    movieURL: {
        type: String
    },
    videoURL: {
        type: String
    },

});
movie_model.index({movieName: 'text'});


const movie_coll = mongoose.model('movieCollection' , movie_model);
module.exports = movie_coll;