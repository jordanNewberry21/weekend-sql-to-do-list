const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

// Get Task list from SQL DB
router.get('/', (req, res) => {
    let sqlText = `SELECT * FROM tasks ORDER BY task_completed;`;
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

// PUT route for updating task_completed status
router.put('/:id', (req, res) => {
    // let task = req.body; // task to be updated coming in
    let id = req.params.id; // id of the task to update
    console.log(`Updating task at id: ${id}...`);
    let sqlText = `UPDATE tasks SET task_completed=true WHERE id=$1;`;

    pool.query(sqlText, [id])
        .then((result) => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('Error from db:', error);
            res.sendStatus(500);
        });
})

// PUT route for editing text of the task
router.put('/:id', (req, res) => {
    const updatedTaskText = req.body;
    const id = req.params.id;
    console.log(`Updating task description at id: ${id}`);
    const sqlText = `UPDATE tasks SET task=$1 WHERE id=$2;`
    // query the DB
    pool.query(sqlText, [updatedTaskText, id])
        .then((result) => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('Error from db: ', error);
            res.sendStatus(500);
        })
})

// DELETE route for removing tasks from data table
router.delete('/:id', (req, res) => {
    let id = req.params.id; // id of task to delete, coming in from the client via ajax function
    console.log(`deleting task at id: ${id}`);
    let sqlText = `DELETE FROM tasks WHERE id=$1;`;

    pool.query(sqlText, [id])
        .then((result) => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('Error from db:', error);
            res.sendStatus(500);
        });
})



module.exports = router;