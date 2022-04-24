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

  let queryText = `INSERT INTO "tasks" ("description")
                   VALUES ($1);`;
  pool.query(queryText, [newTask.description])
    .then(result => {
      res.sendStatus(201);
    })
    .catch(error => {
      console.log(`Error adding new task`, error);
      res.sendStatus(500);
    });
});


router.put('/:taskId', (req, res) => {
  let sqlQuery = `
    UPDATE "tasks"
      SET "complete"=true
      WHERE "id"=$1;
  `;
  let sqlValues = [
    req.body.newTask,
    req.params.taskId
  ]
  pool.query(sqlQuery, sqlValues)
    .then((dbResult) => {
      res.sendStatus(200);
    })
    .catch((dbError) => {
      console.log('error in PUT /tasks db request:');
      res.sendStatus(500);
    })
})

router.delete('/:taskId', (req, res) => {
  // We can access the value that was supplied
  // to this route parameter by:
  let taskToDelete = req.params.taskId;
  let sqlQuery = `
    DELETE FROM "tasks"
      WHERE "id"=$1;
  `
  let sqlValues = [taskToDelete];
  pool.query(sqlQuery, sqlValues)
    .then((dbResult) => {
      res.sendStatus(200);
    })
    .catch((dbError) => {
      console.log('error in DELETE /tasks db request:');
      res.sendStatus(500);
    })
})

module.exports = router;









