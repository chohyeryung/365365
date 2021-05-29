const schedule = require('node-schedule');
const db = require('./db');

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

    return yyyy + '-' + month + '-' + day;
}

//0 0 0 * * * 자정이 되면 초기화
var job = schedule.scheduleJob('0 0 0 * * *', function() {
    let now = new Date();

    let students_sql = "SELECT stnum, name FROM students";
    let insert_sql = `INSERT INTO check_students (stnum, name, temp, checked_date, checked_time, checked) 
                        VALUES (?, ?, "", ?, "00:00", 0);`
    db.query(students_sql, function(error, students) { 
        for(let i=0; i<students.length; i++) {
            let snum = students[i].stnum;
            let sname = students[i].name;
            db.query(insert_sql, [snum, sname, getFormDate(now)], function(e, result) {
                if(e) throw e;
            });
        }
    });
})

module.exports = job;