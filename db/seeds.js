// Build a little helper to "seed" our database with
// some demo data.

// Require our model that we exported from the file named schema
const Todo = require('./schema');
// Require the data file
const seedData = require('./seeds.json');

// Use the model to first remove all the documents in the todos
// collection.  This method `remove` is deprecated, but this isn't
// part of our app anyway.  In our app, we should use deleteMany().
// The empty object is what causes the remove to remove all documents
// Since this is normally where we filter the collection to apply
// whatever the operation is (update/delete/etc.) with a query, in this
// case we've set NO conditions in our query and thus it matches every
// document!
Todo.remove({})
  // After everything is removed insert the seed data from the json file
  // When all done with however long it will take to insert the data
  // resolve the promise and let the next then in the chain run
  .then(() => Todo.collection.insert(seedData))
  // Always close the connect to the DB. Again, we would normally do
  // this more gracefully, but this is not part of our app, it's just
  // a helper to run occassionally when the data needs to be refreshed.
  .then(() => {
    process.exit();
  });
