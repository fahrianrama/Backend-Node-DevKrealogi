const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Users = require('./routes/api/users');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use all user route
app.use('/api/users', Users);

// enable cors
app.use(cors());

// view index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/api', (req, res) => {
    res.send('Yay! It works!');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Krealogi app listening on port ${port}!`);
});