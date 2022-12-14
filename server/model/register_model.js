const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-find-or-create');

const reg_model = mongoose.Schema({
    googleId: {
        type: String
    },
    username: {
        type: String
    },
    picture: {
        type: String,
        required: true
    },

    movies: [{type: String}]

});

reg_model.plugin(passportLocalMongoose);
reg_model.plugin(findOrCreate);


const register_coll = mongoose.model('usersCollection' , reg_model);
module.exports = register_coll;

//SAMPLE DATA FROM GOOGLE
/* Trying to access Google Account {
    id: '113485296695662397927',
    displayName: 'KRYST JUROLAN',
    name: { familyName: 'JUROLAN', givenName: 'KRYST' },
    photos: [
      {
        value: 'https://lh3.googleusercontent.com/a/AEdFTp5nIHHaMf7EEimkmmOKJjU1I1lokp_zfrnZ9fj3tw=s96-c'
      }
    ],
    provider: 'google',
    _raw: '{\n' +
      '  "sub": "113485296695662397927",\n' +
      '  "name": "KRYST JUROLAN",\n' +
      '  "given_name": "KRYST",\n' +
      '  "family_name": "JUROLAN",\n' +
      '  "picture": "https://lh3.googleusercontent.com/a/AEdFTp5nIHHaMf7EEimkmmOKJjU1I1lokp_zfrnZ9fj3tw\\u003ds96-c",\n' +
      '  "locale": "en"\n' +
      '}',
    _json: {
      sub: '113485296695662397927',
      name: 'KRYST JUROLAN',
      given_name: 'KRYST',
      family_name: 'JUROLAN',
      picture: 'https://lh3.googleusercontent.com/a/AEdFTp5nIHHaMf7EEimkmmOKJjU1I1lokp_zfrnZ9fj3tw=s96-c',
      locale: 'en'
    }
  } */