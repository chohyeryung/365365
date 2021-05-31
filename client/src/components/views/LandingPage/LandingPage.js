import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { SERVER } from '../../Config';
import './landingpage.scss';
import RowComponent from './RowComponent';

function LandingPage() {

  // States
  const [Students, setStudents] = useState([]);

  // get states from redux store
  const grade = useSelector(state => state.send.grade);
  const major = useSelector(state => state.send.major);
  
  useEffect(() => {
    if(grade === 4) {
      const endpoint = `${SERVER}unchecking/`;
      axios.get(endpoint)
      .then(response => {
        setStudents([...response.data])
      })
    } else {
      const endpoint = `${SERVER}students/${grade}/${major}`;
      axios.get(endpoint)
      .then(response => {
        setStudents([...response.data])})
    }
  }, [Students]);
  
    return (
        <div className="content-table">
          <table>
              <tbody>
              <tr className="table-head">
                <td style={{ width: '100px' }}>학번</td>
                <td style={{ width: '100px' }}>이름</td>
                <td style={{ width: '100px' }}>시간</td>
                <td style={{ width: '100px' }}>체온</td>
              </tr>
              {/* map 함수를 이용해서 서버에서 json 형태로 받아오면 데이터 추출해서 row 추가하기 */}
              {Students.map(function(student, i) {
                  return (
                      student.temp === '' && student.checked_time === '00:00'
                      ? <RowComponent key={ Number(student.stnum) } student={ student } color='green' />
                    : ( Number(student.temp) >= 37.5
                    ? <RowComponent key={ Number(student.stnum) } student={ student } color='red' />
                    : <RowComponent key={ Number(student.stnum) } student={ student } color='white' />
                    )
                  )
                })
              }
              </tbody>
              
          </table>
        </div>
    )
}

export default LandingPage
