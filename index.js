const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Users = require('./routes/api/users');
const Pelatihan = require('./routes/api/pelatihan');
const MD5 = require('./services/token');
var ls = require('local-storage');
const connection = require('./config');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options('*', cors())

// use all user route
app.use('/users', Users);
// use all pelatihan route
app.use('/pelatihan', Pelatihan);

app.get('/', (req, res) => {
    if(ls.get("token") != null){
        console.log("trying to auth");
        if(ls.get("token") == MD5("admin")){
            res.sendFile(__dirname + '/index.html');
        }
        else if(ls.get("token") == MD5("user")){
            res.send("Anda harus masuk sebagai admin");
        }
    }
    else{
        res.sendFile(__dirname + '/login.html');
    }
});

app.post('/auth', (req,res)=>{
    const username = "adminkrealogidev";
    const password = "krealogidev012_oye";
    console.log(req.body.username);
    if (req.body.username == username && req.body.password == password){
        ls.set("token" , MD5("admin"));
        res.redirect('/');
    }
    else{
        res.sendFile(__dirname + '/login.html');
    }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, err => {
    if(err){
        console.log("ERROR", err);
    }
    console.log(`Krealogi app listening on port ${port}!`);
});