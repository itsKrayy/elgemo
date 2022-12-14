if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
   
}

const express =  require('express');
const login_router = express.Router(); //initalizing Express
const login_controller = require('../controller/login_controller'); //getting controller for Login

//Renders login page
login_router.get('/', ( req, res ) => {
    res.render("login.ejs")
});

//API
login_router.post('/auth' , login_controller.auth);
login_router.post('/logout' , (req , res) => {
    //use passport logout
    req.logout();
    req.redirect('/login');
});



module.exports = { login_router } //exports router
