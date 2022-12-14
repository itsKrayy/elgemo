const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../model/register_model');

module.exports = (passport) => {
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
   async function(accessToken, refreshToken, profile, done) {
    // console.log('Trying to access Google Account' , profile)

    User.findOrCreate({ googleId: profile.id , username: profile.displayName , picture: profile.photos[0].value}, function (err, user) {
        return done(err, user);
      });

    // try {
    //     console.log('the profile ID: ' + profile.id)

    //     function verify (data) {
    //         if(data === null){

    //             console.log('CREATED NEW USER');
    //             const newUser = new User({
    //                 googleId: profile.id,
    //                 name: profile.displayName,
    //                 picture: profile.photos[0].value
    //             });
    //                         console.log('About to be added user: ' + newUser.googleId);
    //             const user = User.create(newUser);
    //                          console.log('Newly added user: ' + user.googleId);
    //             return done(null, user);

    //         } else {
                
    //             console.log('FALLEN IN HERE')
    //             return done(null, data);
                
    //         }
    //     };

    //     User.findOne({googleId: profile.id} , function(err , data) {
    //         if (err) {
    //             console.log(err)
    //         } else {
    //             verify(data);
    //         }
    //     })

        
            // console.log('HEREEEEE ' + data.googleId);
        
        
        /* console.log('HEREEEEE ' + user);
        if(user){
            console.log('FALLEN IN HERE')
            done(null, user);
        } else {
            console.log('CREATED NEW USER');
            const newUser = new User({
                googleId: profile.id,
                name: profile.displayName,
                picture: profile.photos[0].value
            });
            user = await User.create(newUser);
            done(null, user);
        } */

    // } catch (error) {
    //     console.error(error)
    // }

    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
  }

  
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
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