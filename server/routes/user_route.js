const express = require('express');
const user_router = express.Router();
const user_controller = require('../controller/user_controller')

user_router.get('', ( req , res ) => {
/*     if(req.isAuthenticated){
        res.render('user');
    } else {
        res.redirect('/login');
    } */
});

user_router.put('/save' , (req, res) => {
   /*  if(req.isAuthenticated){
        //******** STILL NEED TO ADD SAVE FEATURE
    } else {
        res.redirect('/login');
    } */
});

module.exports = { user_router };