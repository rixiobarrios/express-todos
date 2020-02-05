// Require Mongoose from the connection.js file
const mongoose = require('./connection');

// Use Mongoose's schema method to create a schema for
// our todos.  Each schema maps to a MongoDB collection and
// defines the shape of the documents within that collection:
const ToDoSchema = new mongoose.Schema({
  title: String,
  complete: Boolean
});

// Here we use the schema to create a model that we can use in our app.
// Models are fancy constructors compiled from Schema definitions.
// The first argument, "Todo" in this case, is the *singular* name of our model.
// ** Mongoose automatically looks for a collection named with
// the plural, lowercased version of your model name. **
const Todo = mongoose.model('Todo', ToDoSchema);

// Export the model so we can use it elsewhere in our app.
module.exports = Todo;
