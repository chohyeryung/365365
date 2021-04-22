const schedule = require('node-schedule');
// const excel = require('exceljs')
const db = require('./db');

function getYesterday(date) {
    var yyyy= date.getFullYear();
    var month= date.getMonth()+1;
    var day= date.getDate()-1;

    if(month < 10) {
        month = `0${month}`
    }

    if(day < 10) {
        day = `0${day}`
    }

    return yyyy+'-'+month+'-'+day;
}

function getFormDate(date) {
    var yyyy= date.getFullYear();
    var month= date.getMonth()+1;
    var day= date.getDate();

    if(month < 10) {
        month = `0${month}`
    }

    if(day < 10) {
        day = `0${day}`
    }

    return yyyy+'-'+month+'-'+day;
}

var job = schedule.scheduleJob('15 * * * * *', function() {
    let now = new Date();

    let students_sql = "SELECT stnum, name FROM students";
    let insert_sql = `INSERT INTO check_students (stnum, name, temp, date, checked) 
                        VALUES (?, ?, "", ?, 0);`
    db.query(students_sql, function(error, students) {  //자정이 되면 초기화
        for(let i=0; i<students.length; i++) {
            let snum = students[i].stnum;
            let sname = students[i].name;
            db.query(insert_sql, [snum, sname, getFormDate(now)], function(e, result) {
                if(e) throw e;
            });
        }
    });

    let date_sql = "SELECT * FROM check_students WHERE DATE_FORMAT(date, '%Y-%m-%d') = ?";
    db.query(date_sql, [getYesterday(now)], function(error, results) {
        if(results) {   //어제와 날짜가 같은 튜플이 있으면
            console.log('데이터가 있다');
            //엑셀 만들기 후 데이터 지우기
        }
    });
})

module.exports = job;