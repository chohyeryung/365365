const express = require('express');
const bodyParser = require('body-parser');
const excel = require('exceljs');
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

    const diff_sql = `SELECT * FROM students WHERE banum = ?`;
    const insert_sql = `UPDATE check_students SET temp = ?, date = ?, checked = ? WHERE stnum = ?`;

    db.query(diff_sql, [scode], (error, student) => {
        if(student.length == 0) {
            console.log("해당 학생은 존재하지 않습니다.")
        }

        let hakbun = student[0].stnum;
        let now = new Date();
        
        db.query(insert_sql, [tmp, now, 1, hakbun], (error2, result) => {
            if(error2) throw error2;
            console.log(result);
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

    const select_sql = `SELECT stnum, name, SUBSTRING(date, 12) AS date, temp FROM check_students WHERE LEFT(stnum, 1) = ? 
    AND (SUBSTRING(stnum, 2,1) = ? OR SUBSTRING(stnum, 2,1) = ?)`;
    var student_array = new Array();

    db.query(select_sql, [sgrade, sclass[0], sclass[1]], (error, students) => {
        if(error) throw error;
        console.log(students);
        for(let j=0; j<students.length; j++) {
                student_array.push(students[j]);
        }
       
        ssend(student_array);

    });

    function ssend(studenta) {
        res.send(studenta);
    }

});

//엑셀 저장
app.get('/file_saving', (req, res) => {
    // let sdate = req.body.sdate;
    let sdate = '2021-05-05';
    const select_sql = `SELECT * FROM check_students WHERE date LIKE '${sdate}%'`;
    
    db.query(select_sql, (error, students) => {
        console.log(students);
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

//체크 안 한 애들만 보여주는 페이지
app.get('/unchecking', (req, res) => {
    const select_sql = `SELECT * FROM check_students WHERE checked = 0`;

    db.query(select_sql, (error, students) => {
        if(error) throw error;
        
        res.send(students);
    }); 
});

app.get('/test', (req, res) => {
    const select_sql = `SELECT * FROM check_students`;

    db.query(select_sql, (error, students) => {
        if(error) throw error;
        console.log(students);
    }); 
})

app.listen(port, () => console.log(`app listening on port ${port}`));