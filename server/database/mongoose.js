const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const dbURL = "mongodb+srv://elgemo:elgemo123@elgemo.iyre22j.mongodb.net/mongodb?retryWrites=true&w=majority"
const connectionParams = {
    useNewURLParser: true,
    useUnifiedTopology: true,
};

const connect = async () => {
    mongoose.connect(dbURL, connectionParams);

const db = mongoose.connection;
db.on("error" , () => {
    console.log("could not connect");
});
db.once("open", () => {
    console.log("Successfully connected to database");
});
};

module.exports = { connect };


