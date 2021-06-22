const express = require('express');
const bodyParser = require('body-parser');
const excel = require('exceljs');
const app = express();
const db = require('./db');
const path = require('path');
const cors = require('cors');

// https
const http = require('http')
const https = require('https')
const fs = require('fs')

require('dotenv/config')
const setting = require('./setting');

const PORT = process.env.PORT || 1000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/build')))
app.use(bodyParser.json());

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
app.get('/api/inputtemp', (req, res) => {
    let scode = req.body.scode;

    const diff_sql = `SELECT * FROM students WHERE banum = ?`;

    db.query(diff_sql, [scode], (error, student) => {
        if(student.length == 0) {
            res.send({ info: '해당 학생은 존재하지 않습니다.' });
        } else {
            let hakbun = student[0].stnum;
            let name = student[0].name;
            let info = hakbun+' '+name;
            res.send({ info : info });
        }
    });
});

//학생 정보 수정, 온도 입력
app.post('/api/updating', (req, res) => {
    let dateTime = getDateTime();
    let ndate = dateTime.ndate;
    let ntime = dateTime.ntime;

    let shakbun = req.body.hakbun;
    let stmp = req.body.temperture;

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

// 404
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// app.listen(PORT, () => console.log(`app listening on port ${PORT}`));

if (process.env.NODE_ENV === "production") {
    // production mode
    // https
    // .pem key base url
    const KEY_URL = process.env.KEY_URL;
    const options = {
      key: fs.readFileSync(`${KEY_URL}/privkey.pem`),
      cert: fs.readFileSync(`${KEY_URL}/cert.pem`),
      ca: fs.readFileSync(`${KEY_URL}/chain.pem`),
    };
  
    https.createServer(options, app).listen(443, () => {
      console.log(`365 listening at port 443`);
    });
  
    // set up a route to redirect http to https
    // https://stackoverflow.com/questions/7450940/automatic-https-connection-redirect-with-node-js-express
    http
      .createServer((req, res) => {
        res.writeHead(301, {
          Location: "https://" + req.headers["host"] + req.url,
        });
        res.end();
      })
      .listen(PORT, () => {
        // 365 listening at port 80
        console.log(`365 listening at port ${PORT}`);
      });
  } else {
    // development mode
    // http
    http.createServer(app).listen(PORT, () => {
      // 365 listening at port 5000
      console.log(`365 listening at port ${PORT}`);
    });
  }

// "start": "export PORT=80 && react-scripts start",