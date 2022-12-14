
var usersCollection = require('../model/register_model'); //gets register model
const passport = require('passport');

exports.auth = async ( req , res ) => {

    const user = new usersCollection({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    //VALIDATING USER INPUT CREDENTIALS
    req.login(user, (err) => {
        if(err){
            console.log(err);
        } else {
            passport.authenticate("local")(req , res , function(){
                res.redirect('/user');
            });
        }
    })

};
