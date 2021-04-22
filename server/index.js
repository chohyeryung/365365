const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 1000;
const db = require('./db');

const setting = require('./setting');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/inserting', (req, res) => {

    // const info = req.body;
    // let scode = info.code;  //학생 고유 코드
    //let tmp = info.temperture;   //학생 온도
    let tmp = "36.5";
    let scode = "BC2110101";

    const diff_sql = "SELECT * FROM students WHERE banum = ?";
    const insert_sql = "INSERT INTO check_students (stnum, name, temp, date, checked) VALUES (?, ?, ?, ?, ?)";

    db.query(diff_sql, [scode], function(error, student){
        if(student.length == 0) {
            console.log("해당 학생은 존재하지 않습니다.")
        }
        let hakbun = student[0].stnum;
        // let bacode = student[0].banum;
        let name = student[0].name;
        let now = new Date();
        
        db.query(insert_sql, [hakbun, name, tmp, now, 1], function(error2, result) {
            if(error2) throw error2;
            console.log('좋은 하루 되세요');
        })
    });
});

app.post('/check', (req, res) => {
    var job = schedule.scheduleJob('15 * * * * *', function() {
        let now = new Date();
        console.log(now);
    })
});

app.listen(port, () => console.log(`app listening on port ${port}`));