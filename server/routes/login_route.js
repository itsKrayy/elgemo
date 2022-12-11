if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
   
}


//initalizing Express
const express =  require('express');
//const dotenv = require('dotenv');
const login_router = express.Router();
const passport = require('passport'); //for login
const flash = require('express-flash');
const session = require('express-session');

//LOGIN CONFIG
const initializePassport = require('../service/passport-config');
initializePassport( passport , 
    email => users.find(user => user.email === email)
);

//dotenv.config({path: '.env'})
login_router.use(flash());
login_router.use(session({
    secret: process.env.SESSION_SECRET ,
    resave: false ,
    saveUninitialized: false
}))

login_router.use(passport.initialize());
login_router.use(passport.session())

//Renders login page
login_router.get('/', ( req, res ) => {
    res.render("login.ejs")
});

//API
login_router.post('' , passport.authenticate('local' , {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

module.exports = { login_router } //exports router
