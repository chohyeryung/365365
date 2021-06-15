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

// const lex = require('greenlock-express').create({
//     version: 'draft-11', // 인증서 버전 (버전2)
//     configDir: '/etc/letsencrypt', // 인증서 pem 위치
//     server: 'https://acme-v02.api.letsencrypt.org/directory',
//     approveDomains: (opts, certs, cb) => {
//       if (certs) {
//         opts.domains = ['samyukoh.com', 'www.samyukoh.com']; // 도메인 및 서브 도메인까지 입력
//       }
//       else {
//         opts.email = 's2019w38@e-mirim.hs.kr'; // 사용자 이메일 입력
//         opts.agreeTos = true;
//       }
//       cb(null, { options: opts, certs });
//     },
//     renewWithin: 81 * 24 * 60 * 60 * 1000,
//     renewBy: 80 * 24 * 60 * 60 * 1000,
// });

const getDate = () => {
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

    ndate = yyyy + '-' + month + '-' + day;
    return ndate;
}

const getDateTime = () => {
    let now = new Date();
    let yyyy= now.getFullYear();
    let month= now.getMonth()+1;
    let day= now.getDate();
    let hour = now.getHours();
    let minute = now.getMinutes();
    
    if(month < 10) {
        month = `0${month}`
    }

    if(day < 10) {
        day = `0${day}`
    }

    if(hour < 12) {
        hour = `0${hour}`
    }

    if(minute < 10) {
        minute = `0${minute}`
    }

    ndate = yyyy + '-' + month + '-' + day;
    ntime =  hour + ':' + minute;

    return { ndate, ntime };
}

//학생 정보 존재 판별
app.get('/api/inputtemp/:scode', (req, res) => {
    let scode = req.params.scode;

    const diff_sql = `SELECT * FROM students WHERE banum = ?`;

    db.query(diff_sql, [scode], (error, student) => {
        if(student.length == 0) {
            res.send({ hakbun : "해당 학생은 존재하지 않습니다.", name : "해당 학생은 존재하지 않습니다." });
        } else {
            let hakbun = student[0].stnum;
            let name = student[0].name;
            let info = hakbun+' '+name;
            res.send({ info : info });
        }
    });
});

//학생 정보 수정, 온도 입력
app.get('/api/updating/:hakbun/:temperture', (req, res) => {
    let dateTime = getDateTime();
    let ndate = dateTime.ndate;
    let ntime = dateTime.ntime;

    let shakbun = req.params.hakbun;
    let stmp = req.params.temperture;

    const update_sql = `UPDATE check_students SET temp = ?, checked_time = ?, checked = ? WHERE checked_date = ? AND stnum = ?`;
    db.query(update_sql, [stmp, ntime, 1, ndate, shakbun], (error, result) => {
        if(error) throw error;
        console.log(result);
    });
});

//학생 정보 조회
app.get('/api/students/:grade/:major', (req, res) => {
    let ndate = getDate();

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

    const select_sql = `SELECT stnum, name, checked_time, temp 
                        FROM check_students WHERE LEFT(stnum, 1) = ? 
                        AND (SUBSTRING(stnum, 2,1) = ? OR SUBSTRING(stnum, 2,1) = ?)
                        AND checked_date = ?`;
    var student_array = new Array();

    db.query(select_sql, [sgrade, sclass[0], sclass[1], ndate], (error, students) => {
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

//해당 날짜 엑셀 파일 저장
app.get('/api/file_saving/:sdate', (req, res) => {
    let sdate = req.params.sdate;
    const select_sql = `SELECT * FROM check_students WHERE checked_date = '${sdate}'`;
    
    db.query(select_sql, (error, students) => {
        if(error) throw error;

        console.log(students);
        res.send(students);
    });
});

//체크 안한 학생 조회
app.get('/api/unchecking', (req, res) => {
    let ndate = getDate();
      
    const select_sql = `SELECT * FROM check_students WHERE checked = 0 and checked_date = '${ndate}'`;
    
    db.query(select_sql, (error, students) => {
        if(error) throw error;
        
        res.send(students);
    }); 
});

app.listen(port, () => console.log(`app listening on port ${port}`));