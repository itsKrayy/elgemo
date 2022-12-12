const movieCollection = require('../model/movies_model');
const axios = require('axios');
const { json } = require('express');



exports.render = (req , res) => {

    //calls the Movie API and sets the options for Axios Request
    const options = {
        method: 'GET',
        url: 'https://moviesdatabase.p.rapidapi.com/titles/x/upcoming',
        params: {year: '2022', limit: '12'},
        headers: {
        'X-RapidAPI-Key': '023f7e16e1mshca7dc90f44a339cp115442jsneec24ab01ef1',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    };

    //Executes the Axios Request with the options and renders the page with the data from API
    axios.request(options).then(function (response) {
        // console.log(response.data);
        // console.log(response.data.results[7].primaryImage.url);
        res.render('frontpage2' , {movie: response.data.results});

    }).catch(function (error) {
        console.error(error);
    });


    //OLD CODE
   /*  movieCollection.find()
    .then(movies => {
        
        // res.render('frontpage2' , {movie : movies}) //The old way of rendering
    })
    .catch(err => {
        res.send('error');
        console.log('Error in retrieving Movies')
    }) */
};

exports.search = (req , res) => {

    console.log('here in search');
    var keyword = req.query.search;
    var query = keyword.replaceAll(' ' , '%20')
    var url = 'https://moviesdatabase.p.rapidapi.com/titles/search/keyword/' + query;
    console.log(url)

    const options = {
      method: 'GET',
      url: url,
      headers: {
        'X-RapidAPI-Key': '023f7e16e1mshca7dc90f44a339cp115442jsneec24ab01ef1',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
        res.render('searchpage' , {movie: response.data.results , searches: keyword});
    }).catch(function (error) {
        console.error(error);
    });
};

exports.view = (req , res) => {
    console.log('viewing a movie');
    var id = req.params.id;

    var url = 'https://moviesdatabase.p.rapidapi.com/titles/' + id;

    console.log(url);

    const options = {
    method: 'GET',
    url: url,
    headers: {
        'X-RapidAPI-Key': '023f7e16e1mshca7dc90f44a339cp115442jsneec24ab01ef1',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
    };

    axios.request(options).then(function (response) {
        // console.log(response.data);

        res.render('movie' , {movie: response.data.results})
    }).catch(function (error) {
        console.error(error);
    });
}

    