const express = require('express');
const movie_router = express.Router();
const movieCollection = require('../model/movies_model')


movie_router.post('' , (req , res) => {
    if(!req.body){
        res.status(400).send({message: "Content Cannot be empty"});
        console.log('Content Cannot be empty');
        return;
    }else

    //new movie
    try {
        var movie = new movieCollection({
            movieName: req.body.movieName,
            description: req.body.description,
            imgURL: req.body.imgURL,
            movieURL: req.body.movieURL
        });
    } catch(e) {
        console.log(e);
        res.send('failed to get movie details');
    }

    //save movie in the database
    movie
        .save(movie)
        .then(data =>{
            res.send(data)
            console.log('Movie Added to Database Successfully');
            //res.redirect('/login');
        })
        .catch(err =>{
            res.status(500).send({
                message: err.message
            });
        });

});

module.exports = { movie_router };
