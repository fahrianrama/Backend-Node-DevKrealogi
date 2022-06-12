const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'sql6.freesqldatabase.com',
    user: 'sql6499295',
    password: 'RI471ySLP3',
    database: 'sql6499295'
})

module.exports = connection;