var usersCollection = require('../model/register_model'); //gets register model
const bcrypt = require('bcrypt'); //imports Bycrypt module
const passport = require('passport');




//Adds new User
exports.create = async ( req , res ) => {
    //validate request
    if(!req.body){
        res.status(400).send({message: "Content Cannot be empty"});
        return;
    }else{

    }

    
/* 
    try {
        const registerUser = await usersCollection.register(
            { username: req.body.username},
            { email: req.body.email },
            req.body.password
        );
        if(registerUser){
            passport.authenticate("local")(req , res , function(){
                res.redirect('/login');
            });
        } else {
            res.redirect('/register');
        }
    } catch (error) {
        res.send(err);
    } */


    //OLD CODE FOR ADDING USERS
/* 
    //new user
    try {
        // const hashedPassword = await bcrypt.hash(req.body.password, 10)
        var user = new usersCollection({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
    } catch(e) {
        console.log(e);
        res.redirect("/register");
    }

    //save user in the database
    user
        .save(user)
        .then(data =>{
            //res.send(data)
            console.log('User Added to Database Successfully');
            res.redirect('/login');
        })
        .catch(err =>{
            res.status(500).send({
                message: err.message
            });
        }); */
};