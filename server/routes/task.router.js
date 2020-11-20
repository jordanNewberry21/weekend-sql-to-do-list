const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

// Get Task list from SQL DB
router.get('/', (req, res) => {
    let sqlText = `SELECT * FROM tasks ORDER BY id;`;
    pool.query(sqlText).then(result => {
        console.log(result.rows);
        // Sends back the results in an object
        res.send(result.rows);
    }).catch(error => {
        console.log('error getting tasks', error);
        res.sendStatus(500);
      });
})

// POST route here for adding new task to DB
router.post('/', (req, res) => {
    let task = req.body; // req.body is POST object from client
    console.log('adding task to list...', req.body);
    let sqlText = `INSERT INTO tasks (task, task_completed)
                    VALUES ($1, $2);`; // default status for task_completed should be false
    pool.query(sqlText, [task.task, task.task_completed])
        .then(result => {
            res.sendStatus(200);
        }).catch(error => {
            console.log(`Error adding new task`, error);
            res.sendStatus(500);
          });
})



module.exports = router;