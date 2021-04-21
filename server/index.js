const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 1000;
const db = require('./db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/inserting', (req, res) => {

    // const info = req.body;
    // let scode = info.code;  //학생 고유 코드
    //let tmp = info.temperture;   //학생 온도
    let scode = "BC2110101";

    const diff_sql = "SELECT * FROM students WHERE banum = ?";
    const insert_sql = "INSERT INTO check_student (stnum, name, temp, date, checked) VALUES (?, ?, ?, ?, ?)";

    db.query(diff_sql, [scode], function(error, student){
        if(student.length == 0) {
            alert("해당 학생은 존재하지 않습니다.")
        }
        let hakbun = student[0].stnum;
        // let bacode = student[0].banum;
        let name = student[0].name;
        let now = new Date();
        
        db.query(insert_sql, [hakbun, name, tmp, now, 1], function(error2, result) {
            if(erorr2) throw error2;
            alert('좋은 하루 되세요');
        })
    });
});

app.post('/check', (req, res) => {
    let student = req.body;
    let temperature = student.temp; //학생이 직접 입력한 온도 가져옴(form)
    // let scode = student.code; ?? -> 학생증에 찍힌 코드를 가져옴
    //scode where like로 찾아서 insert
});

app.listen(port, () => console.log(`app listening on port ${port}`));