const movieCollection = require('../model/movies_model');
const axios = require('axios');
const { json } = require('express');



exports.render = (req , res) => {

    const options = {
        method: 'GET',
        url: 'https://advanced-movie-search.p.rapidapi.com/discover/movie',
        params: {with_genres: '37', page: '1'},
        headers: {
            'X-RapidAPI-Key': '2c90058ceemsh83ffa0e874d6308p180c22jsn57ffa452ffd1',
            'X-RapidAPI-Host': 'advanced-movie-search.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data.results[0].backdrop_path);
        res.render('frontpage2' , {movie: response.data.results});
    }).catch(function (error) {
        console.error(error);
    });

    /* //calls the Movie API and sets the options for Axios Request
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
    }); */


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

    var keyword = req.query.search;

    const options = {
        method: 'GET',
        url: 'https://advanced-movie-search.p.rapidapi.com/search/movie',
        params: {query: keyword, page: '1'},
        headers: {
          'X-RapidAPI-Key': '2c90058ceemsh83ffa0e874d6308p180c22jsn57ffa452ffd1',
          'X-RapidAPI-Host': 'advanced-movie-search.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
        //   console.log(response.data);
        res.render('searchpage' , {movie: response.data.results , searches: keyword});
      }).catch(function (error) {
          console.error(error);
      });

    /* console.log('here in search');
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
    }); */
};

exports.view = (req , res) => {

    var id = req.params.id;

    const options = {
        method: 'GET',
        url: 'https://advanced-movie-search.p.rapidapi.com/movies/getdetails',
        params: {movie_id: id},
        headers: {
          'X-RapidAPI-Key': '2c90058ceemsh83ffa0e874d6308p180c22jsn57ffa452ffd1',
          'X-RapidAPI-Host': 'advanced-movie-search.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
          console.log(response.data.id);
          res.render('movie' , {movie: response.data})
      }).catch(function (error) {
          console.error(error);
      });


    /* console.log('viewing a movie');
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
    }); */
}

    