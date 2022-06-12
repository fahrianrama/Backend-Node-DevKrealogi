import express from 'express';
import connection from '../config.js';

const router = express.Router();

router.get('/', (req, res) => {
    // get all user data from database
    connection.query('SELECT * FROM users', (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(rows);
        }
    }
    );
});


export default router;