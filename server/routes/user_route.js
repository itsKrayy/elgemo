const express = require('express');
const user_router = express.Router();
const user_controller = require('../controller/user_controller');
const { ensureAuth , ensureGuest } = require('../middleware/auth');


user_router.get('', ensureGuest , ( req , res ) => {
        res.render('user');
});

user_router.put('/save' , (req, res) => {
   /*  if(req.isAuthenticated){
        //******** STILL NEED TO ADD SAVE FEATURE
    } else {
        res.redirect('/login');
    } */
});

module.exports = { user_router };