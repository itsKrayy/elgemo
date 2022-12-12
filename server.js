if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

//Importing Libraries that we install using npm
const express = require("express")
const app = express();
const bcrypt = require("bcrypt") //Importing bcrpyt package
const port = 3000; //Port
const dotenv = require('dotenv');
const axios = require('axios');
const passport = require('passport-local'); //for login
const flash = require('express-flash');
const session = require('express-session');


//LOGIN CONFIG
const initializePassport = require('./server/service/passport-config');
initializePassport(passport , 
    email => users.find(user => user.email === email)
);

//DATBASE INITIALIZATION
const db = require('./server/database/mongoose');
db.connect();

//APP UTILIZATION
dotenv.config({path: '.env'})
app.set('view engine' , 'ejs'); //setting EJS as view engine for render HTML
app.use(express.json()); //for reading JSON requests
/*
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET ,
    resave: false ,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session())
*/

const users = []

app.use(express.urlencoded({extended: false}))
//app.use('/decoy', require('./server/routes/decoy')); //just for testing MVC - JUST IGNORE

app.listen(port, ()=>{console.log("Listening to the server on http://localhost:3000")});

//ROUTE

//Route for Index
const index_route = require('./server/routes/index_route');
app.use('/' , index_route.index_router);

//Route for login
const login_route = require('./server/routes/login_route');
app.use('/login' , login_route.login_router);

//Route for register
const register_route = require('./server/routes/register_route');
app.use('/register' , register_route.register_router);

//Route for frontpage
const frontpage_route = require('./server/routes/frontpage_route');
app.use('/frontpage' , frontpage_route.frontpage_router);

//Route for Adding Movies
const movie_route = require('./server/routes/movie_route');
app.use('/movie' , movie_route.movie_router);
//END ROUTE

//Static Files
//app.use('/static',express.static(path.join(__dirname,'public')))
//app.use('/assets',express.static(path.join(__dirname,'public/assets')))
app.use(express.static('public'))
app.use('/assets', express.static(__dirname +  'public/assets'))
//app.use('/js', express.static(__dirname +  'public/js'))
//app.use('/img', express.static(__dirname +  'public/img'))

console.log(users); //Display newly register in the console

