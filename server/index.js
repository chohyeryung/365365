const express = require('express');
const bodyParser = require('body-parser');
const excel = require('exceljs');
const app = express();
const port = 1000;
const db = require('./db');
const cors = require('cors');

const setting = require('./setting');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/inputtemp/:scode', (req, res) => {
    let scode = req.params.scode;

    const diff_sql = `SELECT * FROM students WHERE banum = ?`;

    db.query(diff_sql, [scode], (error, student) => {
        if(student.length == 0) {
            res.send({ hakbun : "해당 학생은 존재하지 않습니다.", name : "해당 학생은 존재하지 않습니다." });
        } else {
            let hakbun = student[0].stnum;
            let name = student[0].name;
            res.send({ hakbun : hakbun, name : name});
        }
    });
});

app.get('/updating', (req, res) => {

    // const info = req.body;
    // let hakbun = info.hakbun;
    //let tmp = info.temperture;   //학생 온도

    let tmp = "36.5";
    let hakbun = 3414;

    const insert_sql = `UPDATE check_students SET temp = ?, date = ?, checked = ? WHERE stnum = ?`;
    
    db.query(insert_sql, [tmp, new Date(), 1, hakbun], (error, result) => {
        if(error) throw error;
        console.log(result);
    });
});

app.use('/students/:grade/:major', (req, res) => {
    let sgrade = req.params.grade;
    let smajor = req.params.major;
    let sclass = new Array();
    if(smajor == "뉴미디어소프트웨어") {
        sclass.push('1');
        sclass.push('2');
    }else if(smajor == "뉴미디어웹솔루션") {
        sclass.push('3');
        sclass.push('4');
    }else {
        sclass.push('5');
        sclass.push('6');
    }

    const select_sql = `SELECT stnum, name, SUBSTRING(date, 12) AS date, temp 
                        FROM check_students WHERE LEFT(stnum, 1) = ? 
                        AND (SUBSTRING(stnum, 2,1) = ? OR SUBSTRING(stnum, 2,1) = ?)`;
    var student_array = new Array();

    db.query(select_sql, [sgrade, sclass[0], sclass[1]], (error, students) => {
        if(error) throw error;
        
        for(let j=0; j<students.length; j++) {
            student_array.push(students[j]);
        }
       
        ssend(student_array);

    });

    function ssend(studenta) {
        res.send(studenta);
    }

});


app.get('/file_saving', (req, res) => {
    // let sdate = req.body.sdate;
    let sdate = '2021-05-05';
    const select_sql = `SELECT * FROM check_students WHERE date LIKE '${sdate}%'`;
    
    db.query(select_sql, (error, students) => {
        const jsonStudents = JSON.parse(JSON.stringify(students));
    
        let workbook = new excel.Workbook();
        let worksheet = workbook.addWorksheet('students');

        worksheet.columns = [
            { header: '학번', key: 'stnum', width: 15 },
            { header: '이름', key: 'name', width: 15 },
            { header: '온도', key: 'temp', width: 15 },
            { header: '날짜', key: 'date', width: 25 },
            { header: '체크여부', key: 'checked', width: 10 }
        ];

        worksheet.addRows(jsonStudents);

        workbook.xlsx.writeFile(`${(jsonStudents[0].date).substr(0, 10)}.xlsx`)
        .then(function() {
            console.log("다운 성공");
            return;
        });
    });
});


app.get('/unchecking', (req, res) => {
    let now = new Date();
    let yyyy= now.getFullYear();
    let month= now.getMonth()+1;
    let day= now.getDate();

    if(month < 10) {
        month = `0${month}`
    }

    if(day < 10) {
        day = `0${day}`
    }

    now =  yyyy+'-'+month+'-'+day;
    
    const select_sql = `SELECT * FROM check_students WHERE checked = 0 and date like '%${now}%'`;
    
    db.query(select_sql, (error, students) => {
        if(error) throw error;
        
        res.send(students);
    }); 
});

app.listen(port, () => console.log(`app listening on port ${port}`));