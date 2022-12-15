const express = require('express');
const user_router = express.Router();
const user_controller = require('../controller/user_controller');
const { ensureAuth , ensureGuest } = require('../middleware/auth');


user_router.get('', ensureGuest , ( req , res ) => {
        res.render('user' , {movie: "" ,searches: ""});
});

user_router.get('/save' , ensureAuth , (req, res) => {
    if(req.isAuthenticated){
        console.log('Saved!')
    } else {
        res.redirect('/login');
    }
});

module.exports = { user_router };