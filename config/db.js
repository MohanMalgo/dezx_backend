const mongoose = require('mongoose');
const config = require('../config/config');
const dbConnection = config.dbConnection

function connectDB() {
  mongoose.connect(dbConnection, {
  }).then(() => { console.log('Mongo DB connected') }).catch(error => console.error("mongo connection error", error));
}

connectDB();

mongoose.connection.on('connected', function () {
  console.log('------------------------------------Mongoose default connection open to DATE' + new Date());
});

mongoose.connection.on('error', function (err) {
  console.error('Mongoose default connection error: ' + err);
  connectDB();
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected', new Date());
  connectDB();
});

process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});


module.exports = mongoose.connection;