import express from 'express';
import bodyParser from 'body-parser';

import Users from './routes/users.js';

const app = express();
app.use(bodyParser.json());

// use all user route
app.use('/users', Users);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Krealogi app listening on port ${port}!`);
});