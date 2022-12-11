const { application } = require('express');
const express = require('express'); //adds express
const register_router = express.Router(); //makes a router object
const mongoose = require('mongoose'); //for database
const passport = require('passport');

register_router.use(express.json());

const register_controller = require('../controller/register_controller'); //gets register contoller

//Renders register page
register_router.get('' , ( req , res) =>{
    res.render('register.ejs');
});

//API
register_router.post('/' , register_controller.create);

module.exports = { register_router };