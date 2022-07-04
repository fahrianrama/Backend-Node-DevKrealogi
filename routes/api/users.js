const express = require('express');
const connection = require('../../config.js');
const sendVerificationCode = require('../../services/mail.js');

const router = express.Router();

let user = {
    id: null,
}

router.get('/', (req, res) => {
    // get all user data from database
    connection.query('SELECT user_id, provinsi_id, kota_id, pelatihan_id, konsultasi_id, email, nama_umkm, telepon, alamat, role, status, create_at, update_at FROM users', (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(rows);
        }
    });
});

// auth
router.post('/auth', (req, res) => {
    // get user data from database
    connection.query('SELECT * FROM users WHERE email = ?', [req.body.email], (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (rows.length > 0) {
                if (rows[0].password === req.body.password) {
                    user.id = rows[0].user_id;
                    res.json({
                        success: true,
                        message: 'Authentication successful!',
                        user: rows[0]
                    });
                } else {
                    res.status(401).json({
                        success: false,
                        message: 'Incorrect password!'
                    });
                }
            } else {
                res.status(401).json({
                    success: false,
                    message: 'Incorrect email!'
                });
            }
        }
    });
}
);

// logout
router.get('/logout', (req, res) => {
    user.id = null;
    res.json({
        success: true,
        message: 'Logout successful!'
    });
});

router.get('/getid', (req, res) => {
    res.json({id:user.id});
});

router.get('/:id', (req, res) => {
    // get user data from database
    connection.query('SELECT image_url, user_id, provinsi_id, kota_id, pelatihan_id, konsultasi_id, email, nama_umkm, telepon, alamat, role, status, create_at, update_at FROM users WHERE user_id = ?', [req.params.id], (err, rows) => {
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
    // check req body not empty
    if (user.email && user.password && user.role) {
        // check if email already exists
        connection.query('SELECT * FROM users WHERE email = ?', [user.email], (err, rows) => {
            if (err) {
                res.status(500).send(err);
            } else {
                if (rows.length > 0) {
                    res.status(401).json({
                        success: false,
                        message: 'Email already exists!'
                    });
                } else {
                    // add new user to database
                    // create random verification code
                    const verificationCode = Math.floor(Math.random() * 1000000);
                    // send verification code to user's email
                    sendVerificationCode(user.email, user.username, verificationCode);
                    connection.query(`INSERT INTO users (image_url, provinsi_id, kota_id, pelatihan_id, email, password, nama_umkm, telepon, alamat, role, verification, status, create_at, update_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`, [user.image_url, user.provinsi_id, user.kota_id, user.pelatihan_id, user.email, user.password, user.nama_umkm, user.telepon, user.alamat, user.role, verificationCode, 'unverified'], (err, rows) => {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            res.json(rows);
                        }
                    }
                    );
                }
            }
        }
        );
    }
    else {
        res.status(401).json({
            success: false,
            message: 'Please fill in all fields!'
        });
    }
});

// update data of user in database
router.post('/update/:id', (req, res) => {
    // update user data in database
    const user = req.body;
    connection.query(`UPDATE users SET image_url = ?, provinsi_id = ?, kota_id = ?, pelatihan_id = ?, email = ?, nama_umkm = ?, telepon = ?, alamat = ?, update_at = NOW() WHERE user_id = ?`, [user.image_url, user.provinsi_id, user.kota_id, user.pelatihan_id, user.email, user.nama_umkm, user.telepon, user.alamat, req.params.id], (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(rows);
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
            if(rows!=[]){
                res.json({"status":"verified"});
            }
            else{
                res.json({"status":"wrong verification code!"});
            }
        }
    }
    );
});

module.exports = router;