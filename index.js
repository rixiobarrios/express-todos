// Require the todosController that contains all of our route handlers
const todosController = require('./controllers/todos');

// Require the ExpressJS package that we installed with
// npm i express
const express = require('express');
// Invoke express and store the instance in a variable
const app = express();
// Include express.json, a built-in middleware function that parses
// incoming requests with JSON payloads.  app.use always mounts
// middleware that is executed between the request and the response
// thus the name "middle"ware
app.use(express.json());
// In the the express.urlencoded middleware that parses incoming
// requests with urlencoded payloads.
app.use(express.urlencoded({ extended: true }));

// Tell Express to use Handlebars as its view engine for this app
// which we installed with npm i hbs
app.set('view engine', 'hbs');

// Require the method-override package that we installed with
// npm i method-override
const methodOverride = require('method-override');

// The method-override package is middleware so set it to be used
// Its job is to replace the POST method from any incoming requests
// that contain a query string with a `_method` key in it.
// So a request to /todos/somelongasstodoid?_method=DELETE will
// replace the POST with DELETE before it is processed by our
// route handlers in the todosController.  This is only needed because
// we have a fullstack app in this case that combines the front and back end
app.use(methodOverride('_method'));

// Add our controller that contains all of the todo route handlers and
// business logic.  Notice that we're using app.use here.  Our route handlers
// are technically middleware!! A response is the only thing that terminates
// the cycle (such as response.json, response.send, response.render, etc.)
// so a route handler can technically process a request and pass it to
// another middleware or route instead of closing the cycle.  We do this
// whenever we use response.redirect!
// The first argument makes it so the controller only matches requests from
// URIs that start with /todos
app.use('/todos', todosController);

// Set up our server to listen on port 4000
app.listen(4000, () => {
  console.log('app listening on port 4000');
});
