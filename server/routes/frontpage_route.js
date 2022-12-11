const { urlencoded, json } = require('express');
const express = require('express');
const frontpage_router = express.Router();
const movieCollection = require('../model/movies_model');
const frontpage_Controller = require('../controller/frontpage_controller');

frontpage_router.use(express.json());
frontpage_router.use(express.urlencoded({extended: false}))

frontpage_router.get('/', frontpage_Controller.render);
frontpage_router.post('/', frontpage_Controller.render);

frontpage_router.get('/search' , (req , res) => {

    var search = req.query.search;
    console.log(search);

    movieCollection.find({"movieName": search})
    .then(movies =>{
        if(!movies){
            //res.status(404).send({message: `Movie not found with ID ${id}`})
            console.log(`Movie Search is NULL!!!!`);
            console.log(movies);
        }
            console.log(`Found some movie ${movies}`)
            res.render('searchpage' , {movie: movies , searches: search});
    
    })
    .catch(err =>{
        //res.status(500).send({ message: "Error retrieving Movie with ID " + id})
        console.log("There is something wrong in searching for movies ");
    })
    
});

frontpage_router.get('/:id' , (req , res) => {
    //res.send('hello');

    var id = req.params.id
    // console.log(newid)
    //res.send(id)
    //  var id = newid.substring(3);

     console.log(id);
    movieCollection.findById(id)
        .then(movies =>{
            if(!movies){
                //res.status(404).send({message: `Movie not found with ID ${id}`})
                console.log(`Movie not found with ID ${id}`);
                console.log(movies);
            }
                console.log(`Found the movie ${movies.movieName}`)
                res.render('movie' , {movie: movies});
        
        })
        .catch(err =>{
            //res.status(500).send({ message: "Error retrieving Movie with ID " + id})
            console.log("Error retrieving Movie with ID " + id);
        })


});



module.exports = { frontpage_router };