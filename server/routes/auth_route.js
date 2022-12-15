const express = require('express');
const auth_router = express.Router();
const passport = require('passport');
const User = require('../model/register_model');

const login_controller = require('../controller/login_controller'); //getting controller for Login
const register_controller = require('../controller/register_controller'); //gets register contoller
const { ensureAuth , ensureGuest } = require('../middleware/auth');

//Renders login page
auth_router.get('/login', ensureGuest, ( req, res ) => {
    res.render("login.ejs")
});

//Renders register page
auth_router.get('/register' , ( req , res) =>{
    res.render('register.ejs');
});

//API
// auth_router.post('/login' , login_controller.auth);
// auth_router.post('/create' , register_controller.create);
auth_router.get('/logout' , ensureAuth , (req , res) => {
    // //use passport logout
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/auth/login');
      });
});

//GOOGLE ROUTES
auth_router.get('/google',
  passport.authenticate('google', { scope: ['profile'] }));

auth_router.get('/google/callback', 
  passport.authenticate('google', { successRedirect: '/frontpage', failureRedirect: '/auth/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/frontpage');
  });


module.exports = { auth_router }