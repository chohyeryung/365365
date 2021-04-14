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
        //res.send({ students:results })
    });
});

app.post('/check', (req, res) => {
    let student = req.body;
    let temperature = student.temp; //학생이 직접 입력한 온도 가져옴(form)
    // let scode = student.code; ?? -> 학생증에 찍힌 코드를 가져옴
    //scode where like로 찾아서 insert
});

app.listen(port, () => console.log(`app listening on port ${port}`));