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



module.exports = router;