// Require Express so we can create our router
const express = require('express');
// Require our Mongoose model for todos
const Todo = require('../db/schema');

// Create a router to allow us to use the router methods
// outside of our index.js file
const router = express.Router();

// **index operation**: Will process GET requests on `/todos`
router.get('/', (req, res) => {
  // Find ALL the todos
  Todo.find({})
    .then(todos => {
      // Render them in the index.hbs template
      res.render('index', { todos });
    })
    .catch(console.error);
});

// **new operation**: Will process GET requests on `/todos/new`
router.get('/new', (req, res) => {
  // Just render the new.hbs template
  res.render('new');
});

// Will process GET requests on `/todos/someid/edit`
router.get('/:id/edit', (req, res) => {
  // Find the specific todo using the id from the URI
  Todo.findById(req.params.id).then(todo => {
    // Render the edit form with the fields prepopulated by
    // passing the found todo to the hbs template
    res.render('edit', todo);
  });
});

// **edit operation**: Will process PUT requests on `/todos/someid`
router.put('/:id', (req, res) => {
  // Use a ternary to check if the complete value is set to `on`
  // and if it is use true, otherwise use false
  const complete = req.body.complete === 'on' ? true : false;
  // Build a new todo object so we can replace the complete value
  // or add it if it doesn't exist so that Mongoose will validate
  // our data and perform the update
  const todo = {
    title: req.body.title,
    complete
  };
  // Use the find one and update to: find the matching document, then
  // in the second argument we pass the data using the new object that
  // we created.  In the third argument we tell Mongoose to return the
  // newly updated document instead of the old document before it was
  // updated.
  // Both findOneAndRemove and findOneAndUpdate will now throw deprecation
  // errors, so we need to add `useFindAndModify: false` to our mongoose
  // connect options in the db/connection.js file if we want that to go away.
  Todo.findOneAndUpdate({ _id: req.params.id }, todo, { new: true }).then(
    todo => {
      // When the update is done we can redirect back to the list of all todos
      res.redirect('/todos');
      // OR we can redirect to the newly updated document with:
      // res.redirect(`/todos/${todo._id}`)
    }
  );
});

// **delete operation**: Will process DELETE requests on `/todos/someid`
router.delete('/:id', (req, res) => {
  // Use the findOneAndRemove method and use the id of from
  // the request params to filter the results in the query
  // Both findOneAndRemove and findOneAndUpdate will now throw deprecation
  // errors, so we need to add `useFindAndModify: false` to our mongoose
  // connect options in the db/connection.js file if we want that to go away.
  Todo.findOneAndRemove({ _id: req.params.id }).then(() => {
    // After deleting the document redirect back to the index route
    res.redirect('/todos');
  });
});

// **show operation**: Will process GET requests on `/todos/someid`
// The show operation will display a single resource
router.get('/:id', (req, res) => {
  Todo.findById(req.params.id)
    .then(todo => {
      res.render('show', todo);
    })
    .catch(console.error);
});

// **create operation**: Will process POST requests on `/todos`
router.post('/', (req, res) => {
  // Use create and pass it the data from our request body
  // it's already been turned into an object that we can work
  // with by the middleware we added in the index.js when we
  // added this line: `app.use(express.urlencoded({ extended: true }));`
  Todo.create(req.body)
    .then(todo => {
      // When the document done being created we can redirect back to the list of all todos
      res.redirect('/todos');
      // OR we can redirect to the newly updated document with:
      // res.redirect(`/todos/${todo._id}`)
    })
    .catch(console.error);
});

// Export our router so that all of the route handlers can be
// added to the index.js file
module.exports = router;
