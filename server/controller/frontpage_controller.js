const movieCollection = require('../model/movies_model');

exports.render = (req , res) => {
    movieCollection.find()
    .then(movies => {
        res.render('frontpage2' , {movie : movies})
    })
    .catch(err => {
        res.send('error');
        console.log('Error in retrieving Movies')
    })
};


    