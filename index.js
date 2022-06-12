const express = require('express');
const bodyParser = require('body-parser');

const Users = require('./routes/api/users');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use all user route
app.use('/api/users', Users);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Krealogi app listening on port ${port}!`);
});