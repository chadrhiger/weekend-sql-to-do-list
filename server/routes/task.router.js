const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

// Get all tasks
router.get('/', (req, res) => {
  let queryText = 'SELECT * FROM "tasks" ORDER BY "id";';
  pool.query(queryText).then(result => {
    // Sends back the results in an object
    res.send(result.rows);
  })
  .catch(error => {
    console.log('error getting tasks', error);
    res.sendStatus(500);
  });
});

// Adds a new book to the list of awesome reads
// Request body must be a book object with a title and author.
router.post('/',  (req, res) => {
  let newTask = req.body;
  console.log(`Adding task`, newTask);

  let queryText = `INSERT INTO "tasks" ("task")
                   VALUES ($1);`;
  pool.query(queryText, [newTask.task])
    .then(result => {
      res.sendStatus(201);
    })
    .catch(error => {
      console.log(`Error adding new task`, error);
      res.sendStatus(500);
    });
});

// TODO - PUT (or MARK AS COMPLETED)~~~~~~~~~~~~`
// Updates a task to show that it has been read
// Request must include a parameter indicating what task to update - the id
// Request body must include the content to update - the status


// TODO - DELETE 
// Removes a task to show that it has been read
// Request must include a parameter indicating what task to update - the id


module.exports = router;










// const express = require('express');
// const router = express.Router();

// const pool = require('../modules/pool');

// Get all tasks
// router.get('/', (req, res) => {
//   let queryText = 'SELECT * FROM "tasks" ORDER BY "id";';
//   pool.query(queryText).then(result => {
//     // Sends back the results in an object
//     res.send(result.rows);
//   })
//   .catch(error => {
//     console.log('error getting tasks', error);
//     res.sendStatus(500);
//   });
// });

// // Adds a new tasks to the list 
// // Request body must be a task object with a title and an id.
// router.post('/',  (req, res) => {
//   let newTask = req.body;
//   console.log(`Adding task`, newTask);
//   let queryText = `INSERT INTO "tasks" ("id", "task")
//                    VALUES ($1, $2);`;
//   pool.query(queryText, [newTask.task])
//     .then(result => {
//       res.sendStatus(201);
//     })
//     .catch(error => {
//       console.log(`Error adding new task`, error);
//       res.sendStatus(500);
//     });
// });



// // router.post('/',  (req, res) => {
// //   let newBook = req.body;
// //   console.log(`Adding book`, newBook);
// //   let queryText = `INSERT INTO "books" ("author", "title")
// //                    VALUES ($1, $2);`;
// //   pool.query(queryText, [newBook.author, newBook.title])
// //     .then(result => {
// //       res.sendStatus(201);
// //     })
// //     .catch(error => {
// //       console.log(`Error adding new book`, error);
// //       res.sendStatus(500);
// //     });
// // });
