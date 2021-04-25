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

app.use('/students/:grade/:major', (req, res) => {
    let sgrade = req.params.grade;
    let smajor = req.params.major;
    let sclass = new Array();
    if(smajor == "뉴미디어소프트웨어과") {
        sclass.push('1');
        sclass.push('2');
    }else if(smajor == "뉴미디어웹솔루션과") {
        sclass.push('3');
        sclass.push('4');
    }else {
        sclass.push('5');
        sclass.push('6');
    }

    const select_sql = "SELECT * FROM check_students WHERE LEFT(stnum, 1) = ? AND (SUBSTRING(stnum, 2,1) = ? OR SUBSTRING(stnum, 2,1) = ?)";
    var student_array = new Array();

    db.query(select_sql, [sgrade, sclass[0], sclass[1]], function(error, students) {
        if(error) throw error;

        for(let j=0; j<students.length; j++) {
                student_array.push(students[j]);
        }
        ssend(student_array);

    });

    function ssend(studenta) {
        res.send(studenta);
    }
  
    //select로 학번을 가져와서
    //slice로 학년이랑 반을 뽑아와야함 -> 그다음 where 절로 select
    //json 형태로 client에 다시 보내주기
});

app.listen(port, () => console.log(`app listening on port ${port}`));