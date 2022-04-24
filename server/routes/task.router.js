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

// Adds a new task to the To Do List
router.post('/', (req, res) => {
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

// Sets task to "done" by changing bool from static false to TRUE
router.put('/:taskId', (req, res) => {
  console.log("PUT (complete) in router is tickled.");
  let sqlQuery = `
    UPDATE "tasks"
      SET "complete"=true
      WHERE "id"=$1;
  `;
  let sqlValues = [
    // req.body.newTask,
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

// Deletes task from database
router.delete('/:taskId', (req, res) => {
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









