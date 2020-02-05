// Requre Mongoose JS which we installed with
// npm i mongoose
const mongoose = require('mongoose');

// Use mongoose's connect method to connect to our
// local MongoDB server that runs on mongodb://localhost:27017
// The todo at the end of the url tells the server to
// use the database called todo (and create one if it doesn't
// exist).  To remove all of the warnings/errors in the console
// we're passing an object as the second argument with some
// options specified.
mongoose.connect('mongodb://localhost/todo', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false // <-- Add this
});

// Export mongoose so we can use it elsewhere in our app.
module.exports = mongoose;
