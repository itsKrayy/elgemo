const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../model/register_model');

module.exports = (passport) => {
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
   async function(accessToken, refreshToken, profile, cb) {
    // console.log('Trying to access Google Account' , profile)

    User.findOrCreate({ googleId: profile.id , username: profile.displayName , picture: profile.photos[0].value}, function (err, user) {
        // console.log(user);
        return cb (err, user);
      });
    }

  
));

passport.serializeUser(function (user, done) {
    console.log('Serializing the user..');
    console.log('USER ID IN SERIALIZATION: ' + user.googleId);
    return done(null, user.googleId);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        return done(err, user);
    });
});

};



/* const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/register_model');
const bcrypt = require('bcrypt');


function initialize( passport , getUserByEmail){
    const authenticateUser = async (email , password , done) => {
        const user = getUserByEmail(email)
        if (user == null) {
            return done( null , false , { message: 'No User with that email'});
        };

        try{
            if ( await bcrypt.compare( password , user.password )) {
                return done(null , user);
            } else {
                return done(null , false , { message: 'Password Incorrect' })
            }
        } catch (e) {
            return done(e);
        }

    passport.use(new LocalStrategy({ usernameField: 'email'}, authenticateUser ))
    passport.serializeUser(( user , done ) => {  } );
    passport.deserializeUser(( id , done ) => {  } );
    };

    
}

module.exports = initialize;
 */