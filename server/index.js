const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 1000;
const db = require('./db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    db.query("SELECT * FROM check_students", function(error, results){
        console.log(results);
    });
});

app.post('/student', (req, res) => {
    let student = req.body;
});

app.listen(port, () => console.log(`app listening on port ${port}`));