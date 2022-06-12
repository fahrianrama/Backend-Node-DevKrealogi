const express = require('express');
const connection = require('../../config.js');
const sendVerificationCode = require('../../services/mail.js');

const router = express.Router();

router.get('/', (req, res) => {
    // get all user data from database
    connection.query('SELECT * FROM users', (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(rows);
        }
    });
});

router.get('/:id', (req, res) => {
    // get user data from database
    connection.query('SELECT * FROM users WHERE user_id = ?', [req.params.id], (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(rows);
        }
    });
});

// store user data in database
router.post('/store', (req, res) => {
    // add new user to database
    const user = req.body;
    // create random verification code
    const verificationCode = Math.floor(Math.random() * 1000000);
    // send verification code to user's email
    sendVerificationCode(user.email, user.username, verificationCode);
    connection.query(`INSERT INTO users (email, password, role, verification) VALUES ('${user.email}', '${user.password}', '${user.role}', '${verificationCode}')`, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    }
    );
});

// update data of user in database
router.post('/update/:id', (req, res) => {
    // update user data in database
    const user = req.body;
    connection.query(`UPDATE users SET email = '${user.email}', password = '${user.password}', role = '${user.role}' WHERE user_id = ${req.params.id}`, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
});

// delete user from database
router.delete('/delete/:id', (req, res) => {
    // delete user from database
    connection.query(`DELETE FROM users WHERE user_id = ${req.params.id}`, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
});

// check verification code
router.post('/verify', (req, res) => {
    // check verification code
    const user = req.body;
    connection.query(`SELECT * FROM users WHERE email = '${user.email}' AND verification = '${user.verification}'`, (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            // set status of user to verified
            connection.query(`UPDATE users SET status = 'verified' WHERE email = '${user.email}' AND verification = '${user.verification}'`);
            res.json(rows);
        }
    }
    );
});

module.exports = router;