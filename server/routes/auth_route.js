const express = require('express');
const auth_router = express.Router();
const passport = require('passport');
const passportLocal = require('passport-local');
const User = require('../model/register_model');

//To accept JSON
auth_router.use(express.json());

const login_controller = require('../controller/login_controller'); //getting controller for Login
const register_controller = require('../controller/register_controller'); //gets register contoller

//GOOGLE ROUTES
auth_router.get('/google',
  passport.authenticate('google', { scope: ['profile'] }));

auth_router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/auth/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/frontpage');
  });

//Renders login page
auth_router.get('/login', ( req, res ) => {
    res.render("login.ejs")
});

//Renders register page
auth_router.get('/register' , ( req , res) =>{
    res.render('register.ejs');
});

//API
auth_router.post('/login' , login_controller.auth);
auth_router.post('/create' , register_controller.create);
auth_router.get('/logout' , (req , res) => {
    // //use passport logout
    // req.logout();
    // req.redirect('/auth/login');
});


module.exports = { auth_router }