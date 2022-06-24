const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '217.21.73.49',
    user: 'u1716933_krealogidev',
    password: 'r6ZuLJTPn5KvjqZ',
    database: 'u1716933_krealogi'
})

module.exports = connection;