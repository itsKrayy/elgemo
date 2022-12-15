if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

//Importing Libraries that we install using npm
const express = require("express") //the main framework
const app = express(); 
const bcrypt = require("bcrypt") //Importing bcrpyt package
const port = 3000; //Port
const dotenv = require('dotenv'); //for environment variable
const axios = require('axios'); //for requesting HTTP 
const passport = require('passport'); //for verifying users
const session = require('express-session'); //for establishing sessions
const MongoStore = require('connect-mongo'); //for storing sessions in the MongoDB Database

//APP UTILIZATION
dotenv.config({path: '.env'}); //adding .env file
app.set('view engine' , 'ejs'); //setting EJS as view engine for render HTML
app.use(express.json()); //for reading JSON requests
app.use(express.urlencoded({extended: true})); //use to parse requests etc.
  
require('./server/service/passport')(passport);

//DATBASE INITIALIZATION
const db = require('./server/database/mongoose');
db.connect();

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://elgemo:elgemo123@elgemo.iyre22j.mongodb.net/mongodb?retryWrites=true&w=majority' })
  }));


app.use(passport.initialize());
app.use(passport.session());

/* app.use((req , res , next) => {
    if(req.isAuthenticated){
        console.log('Now we can set global variable');
        res.locals.user = req.user;
        next();
    } else {
        console.log("Now we can set global variable");
        res.locals.user = null;
        next();
    }
}) */



app.listen(port, ()=>{console.log("Listening to the server on http://localhost:3000")});

//ROUTES
//Route for Index
const index_route = require('./server/routes/index_route');
app.use('/' , index_route.index_router);
/* 
//Route for login
const login_route = require('./server/routes/login_route');
app.use('/login' , login_route.login_router);

//Route for register
const register_route = require('./server/routes/register_route');
app.use('/register' , register_route.register_router);
 */

//route for Login and Register
const auth_route = require('./server/routes/auth_route');
app.use('/auth' , auth_route.auth_router);
//Route for frontpage
const frontpage_route = require('./server/routes/frontpage_route');
app.use('/frontpage' , frontpage_route.frontpage_router);

//Route for User Profile
const user_route = require('./server/routes/user_route');
app.use('/user' , user_route.user_router);

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


